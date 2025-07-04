import { resolve } from 'path';
import { build } from 'esbuild';

export default function audioWorkletPlugin() {
  return {
    name: 'audio-worklet',
    async buildStart() {
      const input = resolve(__dirname, 'src/audio/oscillator-processor.ts');
      await build({
        entryPoints: [input],
        outfile: resolve(__dirname, 'public/oscillator-processor.js'),
        bundle: false,
        format: 'esm'
      });
    }
  };
}
