// SPDX-License-Identifier: MIT
export { ANCHOR_TIPOS, deriveGuideEntities, type DerivedEntity, type DeriveResult, type KitRef } from './entities';
export { GuideLoadError, hasGuide, loadGuideDoc, loadGuideFiles, mergeGuideFiles, type GuideDoc, type GuideFile } from './load';
export { SUBTIPOS, TIPOS, TIPOS_LEGADOS, eComunicacao, rotuloSubtipo } from './taxonomia';
import { join } from 'node:path';

/** Folder of the guide YAML inside a content root. */
export const guideDir = (contentRoot: string) => join(contentRoot, 'guide');
