const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.vk.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // удаление префикса "/api"
      },
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      minimize: true, // Включить минификацию (по умолчанию true для production)
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false, // Удалить комментарии
            },
            compress: {
              drop_console: true, // Удалить вызовы console.log
            },
          },
          extractComments: false, // Не выносить комментарии в отдельные файлы
        }),
      ],
    },
  },
  chainWebpack: config => {
    // Настроим правило для обработки файлов .vue
    config.module
        .rule('vue') // Ищем правило, которое будет обрабатывать файлы с расширением .vue
        .use('vue-loader') // Используем loader для обработки .vue файлов
        .loader('vue-loader') // Загружаем vue-loader, который предназначен для обработки Vue компонентов
        .options({

           transformAssetUrls: {
             'img': 'src',
            'image': 'xlink:href'
           },

        });
  }
});

