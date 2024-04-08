const { override, addWebpackModuleRule, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  // 按需加载 Ant Design 样式
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 使用 `true` 来加载 less 文件
  }),
  // 添加 Less Loader
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: {
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('autoprefixer'),
            ],
          },
        },
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
