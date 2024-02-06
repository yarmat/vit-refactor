module.exports = {
  // root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // __________________________________________________________________
    // поставити ; в кінці
    "semi": ["error", "always", {"omitLastInOneLineBlock": false}], 
    // прибрати , в кінці
    "comma-dangle": ["error", "never"], 
    // єдиний формат лапок
    quotes: ["error", "single"],  
    // типи даних. Для функції JournalItem({ title, text, date })
    'react/prop-types': [0],
    // табуляція 
    'indent': ['error', 'tab']
  },
}
