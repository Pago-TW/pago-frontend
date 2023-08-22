/** @type {import("prettier").Config} */
const config = {
  printWidth: 80,
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
