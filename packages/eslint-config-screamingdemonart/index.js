module.exports = {
  extends: ['prettier', 'plugin:@typescript-eslint/eslint-recommended'],
  plugins: ['import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/jsx-key': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/default': 'off',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'react**/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@react**/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@trpc**/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '[A-Z]**',
            patternOptions: { dot: true, matchBase: true },
            group: 'parent',
            position: 'before',
          },
          {
            pattern: 'tamagui',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'react**',
          'react**/**',
          'tamagui',
          '@screamingdemonart/**',
          '~/**',
        ],
        warnOnUnassignedImports: true,
      },
    ],
  },
}
