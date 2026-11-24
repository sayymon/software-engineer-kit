#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Applies the GitHub settings described in docs/governance.md.
# DRY-RUN by default: prints every API call. Pass --apply to run them.
# Usage: bash tools/github/apply-settings.sh [--apply] [--repo owner/name]
set -euo pipefail

REPO="sayymon/software-engineer-kit"
APPLY=0

# Required status checks: the job names of pr.yml and codeql.yml. Keep in sync (a test checks it).
REQUIRED_CHECKS=(build-test dependency-review npm-audit codeql secret-scan public-terms reuse actionlint)

while [ $# -gt 0 ]; do
  case "$1" in
    --apply) APPLY=1 ;;
    --repo)
      shift
      REPO="${1:?--repo needs owner/name}"
      ;;
    -h | --help)
      sed -n '2,5p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
  shift
done

if [ "$APPLY" -eq 1 ]; then
  echo "APPLY mode: calls will run against $REPO"
else
  echo "DRY-RUN: nothing is executed. Pass --apply to run these calls against $REPO"
fi

# call METHOD PATH [JSON_BODY]: prints the call, runs it only with --apply.
call() {
  local method="$1" path="$2" body="${3:-}"
  echo
  echo "gh api -X $method $path"
  [ -n "$body" ] && echo "$body"
  if [ "$APPLY" -eq 1 ]; then
    if [ -n "$body" ]; then
      printf '%s' "$body" | gh api -X "$method" "$path" --input - > /dev/null
    else
      gh api -X "$method" "$path" > /dev/null
    fi
  fi
}

# upsert_ruleset NAME JSON_BODY: PUT when a ruleset with this name exists, else POST.
upsert_ruleset() {
  local name="$1" body="$2" id=""
  if [ "$APPLY" -eq 1 ]; then
    id="$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id")"
  else
    echo
    echo "# lookup skipped in dry-run: gh api repos/$REPO/rulesets (PUT when '$name' exists, POST otherwise)"
  fi
  if [ -n "$id" ]; then
    call PUT "repos/$REPO/rulesets/$id" "$body"
  else
    call POST "repos/$REPO/rulesets" "$body"
  fi
}

checks_json=""
for c in "${REQUIRED_CHECKS[@]}"; do
  checks_json+="{\"context\":\"$c\"},"
done
checks_json="[${checks_json%,}]"

# 1. Merge settings and secret scanning.
call PATCH "repos/$REPO" '{
  "allow_squash_merge": true,
  "allow_merge_commit": false,
  "allow_rebase_merge": false,
  "allow_auto_merge": false,
  "delete_branch_on_merge": true,
  "squash_merge_commit_title": "PR_TITLE",
  "squash_merge_commit_message": "PR_BODY",
  "security_and_analysis": {
    "secret_scanning": {"status": "enabled"},
    "secret_scanning_push_protection": {"status": "enabled"}
  }
}'

# 2. Dependabot alerts and security updates, private vulnerability reporting.
call PUT "repos/$REPO/vulnerability-alerts"
call PUT "repos/$REPO/automated-security-fixes"
call PUT "repos/$REPO/private-vulnerability-reporting"

# 3. Ruleset for main. Repository admin role (id 5) bypasses in pull request mode only.
upsert_ruleset "main-protection" "{
  \"name\": \"main-protection\",
  \"target\": \"branch\",
  \"enforcement\": \"active\",
  \"conditions\": {\"ref_name\": {\"include\": [\"~DEFAULT_BRANCH\"], \"exclude\": []}},
  \"bypass_actors\": [{\"actor_id\": 5, \"actor_type\": \"RepositoryRole\", \"bypass_mode\": \"pull_request\"}],
  \"rules\": [
    {\"type\": \"deletion\"},
    {\"type\": \"non_fast_forward\"},
    {\"type\": \"required_linear_history\"},
    {\"type\": \"pull_request\", \"parameters\": {
      \"required_approving_review_count\": 1,
      \"dismiss_stale_reviews_on_push\": true,
      \"require_code_owner_review\": true,
      \"require_last_push_approval\": false,
      \"required_review_thread_resolution\": true,
      \"allowed_merge_methods\": [\"squash\"]
    }},
    {\"type\": \"required_status_checks\", \"parameters\": {
      \"strict_required_status_checks_policy\": true,
      \"required_status_checks\": $checks_json
    }}
  ]
}"

# 4. Ruleset for release tags (v*). Admin role bypasses always.
upsert_ruleset "release-tags" '{
  "name": "release-tags",
  "target": "tag",
  "enforcement": "active",
  "conditions": {"ref_name": {"include": ["refs/tags/v*"], "exclude": []}},
  "bypass_actors": [{"actor_id": 5, "actor_type": "RepositoryRole", "bypass_mode": "always"}],
  "rules": [{"type": "creation"}, {"type": "update"}, {"type": "deletion"}]
}'

# 5. Pages from GitHub Actions. POST creates, PUT updates; the POST fails harmlessly when Pages already exists.
if [ "$APPLY" -eq 1 ]; then
  if gh api "repos/$REPO/pages" > /dev/null 2>&1; then
    call PUT "repos/$REPO/pages" '{"build_type":"workflow"}'
  else
    call POST "repos/$REPO/pages" '{"build_type":"workflow"}'
  fi
else
  echo
  echo "# Pages: PUT when the site exists, POST otherwise (lookup skipped in dry-run)"
  call POST "repos/$REPO/pages" '{"build_type":"workflow"}'
fi

# 6. github-pages environment: deploy only from v* tags.
call PUT "repos/$REPO/environments/github-pages" '{"deployment_branch_policy":{"protected_branches":false,"custom_branch_policies":true}}'
call POST "repos/$REPO/environments/github-pages/deployment-branch-policies" '{"name":"v*","type":"tag"}'

# 7. Actions defaults: read-only token, workflows cannot approve PRs, approval for all outside contributors.
call PUT "repos/$REPO/actions/permissions/workflow" '{"default_workflow_permissions":"read","can_approve_pull_request_reviews":false}'
call PUT "repos/$REPO/actions/permissions/fork-pr-contributor-approval" '{"approval_policy":"all_external_contributors"}'

echo
if [ "$APPLY" -eq 1 ]; then echo "Done."; else echo "DRY-RUN finished. Nothing was changed."; fi
