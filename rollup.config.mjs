import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import watchAssets from "rollup-plugin-watch-assets";
import { dts } from "rollup-plugin-dts";

//Postcss Plugins
import cssnano from "cssnano";

export default [
  {
    input: "src/lib/components/editor/index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
    },
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      typescript(),
      postcss({ extract: true, plugins: [cssnano()] }),
      copy({
        targets: [
          { src: "src/lib/components/editor/assets/**/*", dest: "dist/assets" },
        ],
      }),
      watchAssets({ assets: ["src"] }),
    ],
    external: ["react", "react-dom", "react-router-dom"],
  },
  {
    input: "src/lib/components/editor/types.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
