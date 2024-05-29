import { Assets } from 'pixi.js';

let assetsManifest: any = { bundles: [] };

const loadedBundles: string[] = [];

const checkBundleExists = (bundle: string) => (
  !!assetsManifest.bundles.find((b: { name: string }) => b.name === bundle)
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

const fetchAssetsManifest = async (url: string) => {
  const response = await fetch(url);
  const manifest = await response.json();
  if (!manifest.bundles) {
    throw new Error('[Assets] Invalid assets manifest');
  }
  return manifest;
};

export const initAssets = async () => {
  assetsManifest = await fetchAssetsManifest('assets/assets-manifest.json');

  await Assets.init({ manifest: assetsManifest, basePath: 'assets' });

  await loadBundles(['game']);

  const allBundles = assetsManifest.bundles.map((b: { name: string}) => b.name);

  Assets.backgroundLoadBundle(allBundles);
};
