export const hooks = {
  'prepare:types': function (option: any) {
    const paths = option.tsConfig.compilerOptions?.paths;
    if (!paths) return;
    delete paths['~'];
    delete paths['~/*'];
  },
};
