/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: process.env.NODE_ENV !== 'production',
              runtimeInjection: false,
              enableInlinedConditionalMerge: true,
              treeshakeCompensation: true,
              aliases: {
                '@/*': ['./*'],
              },
              unstable_moduleResolution: {
                type: 'commonJS',
              },
            },
          ],
        ],
      },
      useCSSLayers: true,
    },
  },
};

export default config;

