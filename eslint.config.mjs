import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
//import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
///import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});


export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended'
  ),
  {
    /* plugins: {
      prettier,
    }, */

    rules: {
      //'prettier/prettier': ['error'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
