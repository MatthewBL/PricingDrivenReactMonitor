import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import cssnano from "cssnano";

export default {
  input: "src/lib/components/editor/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    typescript(),
    terser(),
    postcss({ plugins: [cssnano()] }),
  ],
  external: ["react", "react-dom", "react-router-dom"],
};
