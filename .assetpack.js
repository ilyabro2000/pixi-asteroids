import { compressWebp } from '@assetpack/plugin-compress';
import { audio } from '@assetpack/plugin-ffmpeg';
import { json } from '@assetpack/plugin-json';
import { pixiManifest } from '@assetpack/plugin-manifest';
import { pixiTexturePacker } from '@assetpack/plugin-texture-packer';
import { webfont } from '@assetpack/plugin-webfont';

export default {
  entry: './raw-assets',
  output: './public/assets/',
  cache: false,
  plugins: {
    webfont: webfont(),
    compressWebp: compressWebp(),
    audio: audio(),
    json: json(),
    texture: pixiTexturePacker({
      texturePacker: {
        removeFileExtension: true,
      },
    }),
    manifest: pixiManifest({
      output: './public/assets/assets-manifest.json'
    }),
  },
};
