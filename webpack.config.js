const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');

const getPlugins = (argv) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'index.html',
      publicPath: '/'
    })
  ];
  if (argv.mode === 'development') {
    plugins.push(new HotModuleReplacementPlugin());
  }

  return plugins;
};

module.exports = (env, argv) => ({
  mode: 'development',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    compress: true,
    port: 3000,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    open: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource'
      // }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: getPlugins(argv)
});
