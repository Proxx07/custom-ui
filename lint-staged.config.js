// https://github.com/lint-staged/lint-staged
export default {
  // Lint & auto-fix only the staged source files.
  '*.{js,ts,vue,mjs,cjs}': 'eslint --fix',

  // Type-check is project-wide (a change in one file can break types elsewhere),
  // so the function form ignores the matched filenames and runs the full check once —
  // but only when a .ts/.vue file is actually staged.
  '*.{ts,vue}': () => 'nuxt typecheck',
};
