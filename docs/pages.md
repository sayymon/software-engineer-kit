# GitHub Pages

The site is published from releases only. A merge to `main` does not publish. Pushing a SemVer tag (`vX.Y.Z`) runs the release workflow, which verifies, builds, creates the GitHub Release and deploys Pages from the built artifact.

## Enable Pages

1. Open the repository on GitHub, Settings, Pages.
2. Set Source to "GitHub Actions".
3. Settings, Environments, `github-pages`: restrict deployment branches and tags to the tag pattern `v*`.

The default URL is `https://sayymon.github.io/software-engineer-kit`. The build reads `SITE_BASE` (`/software-engineer-kit`) and `SITE_URL` from the workflow environment.

## Trade-off

The site can lag behind `main` until the owner cuts a tag. In exchange, only a tag created by the owner changes what is published.
