import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const sharedConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [sharedConfig],

    rules: {
      "semi": [
        "error",
        "always"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "@typescript-eslint/member-delimiter-style": ["error", {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": true
        }
      }],
      "@typescript-eslint/no-empty-function": 1,
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/prefer-as-const": "off",
      "@typescript-eslint/no-inferrable-types": [
        "warn",
        {
          "ignoreParameters": true
        }
      ],
      "@typescript-eslint/ban-types": ["error",
        {
          "types": {
            "String": true,
            "Boolean": true,
            "Number": true,
            "Symbol": true,
            "{}": true,
            "Object": true,
            "object": false,
            "Function": false
          },
          "extendDefaults": true
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "warn",
      "no-trailing-spaces": "warn",
      "object-curly-spacing": [
        "warn",
        "always"
      ],
      "object-shorthand": "error",
      "spaced-comment": 1,
      "guard-for-in": "off",
      "prefer-object-spread": "error",
      "eqeqeq": [
        "warn",
        "always"
      ],
      "@typescript-eslint/no-shadow": "warn",
      "no-shadow": [
        "off",
        {
          "builtinGlobals": true
        }
      ],
      "no-throw-literal": "error",
      "semi-style": [
        "error",
        "last"
      ],
      "semi-spacing": [
        "error",
        {
          "before": false,
          "after": true
        }
      ],
      "space-infix-ops": "error",
      "no-whitespace-before-property": "error",
      "curly": "error",
      "brace-style": 1,
      "nonblock-statement-body-position": [
        "error",
        "below"
      ],
      "template-curly-spacing": [
        "error",
        "never"
      ],
      "key-spacing": [
        "error",
        {
          "mode": "strict"
        }
      ],
      "max-len": [
        "warn",
        {
          "code": 140
        }
      ],
      "func-call-spacing": [
        "warn",
        "never"
      ],
      "eol-last": [
        "warn",
        "always"
      ],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
    },
  },
]);