import { Assets } from 'pixi.js';
import assetsManifestJson from '@/assets/assets-manifest.json';

const loadedBundles: string[] = [];

const checkBundleExists = (bundle: string) => (
  assetsManifestJson.bundles.some((b: { name: string }) => b.name === bundle)
);

export const loadBundles = async (bundles: string | string[]) => {
  if (typeof bundles === 'string') bundles = [bundles];

  for (const bundle of bundles) {
    if (!checkBundleExists(bundle)) {
      throw new Error(`[Assets] Invalid bundle: ${bundle}`);
    }
  }

  const loadList = bundles.filter((bundle) => !loadedBundles.includes(bundle));

  if (!loadList.length) return;

  await Assets.loadBundle(loadList);

  loadedBundles.push(...loadList);
};

export const areBundlesLoaded = (bundles: string[]) => {
  for (const name of bundles) {
    if (!loadedBundles.includes(name)) {
      return false;
    }
  }

  return true;
};

export const initAssets = async () => {
  await Assets.init({ manifest: assetsManifestJson, basePath: 'assets' });

  await loadBundles(['game']);

  const allBundles = assetsManifestJson.bundles.map((b: { name: string}) => b.name);

  Assets.backgroundLoadBundle(allBundles);
};
