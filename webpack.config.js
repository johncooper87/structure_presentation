const path = require('path');
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

module.exports = _env => {
  const dev = !process.argv.includes('--mode=production');

  const env = {
    port: 3000,
    ...dotenv.parsed,
    ..._env,
  };

  const cssLoader = {
    loader: 'css-loader',
    options: {
      // url: {
      //   filter: (url, resourcePath) => {
      //     if (resourcePath.includes('node_modules')) return true;
      //     if (url.split('/')[0] === 'images') return false;
      //     return true;
      //   },
      // },
      modules: {
        auto: true,
        // exportLocalsConvention: 'camelCaseOnly',
        exportLocalsConvention: 'camelCase',
      },
    },
  };

  const styleLoader = dev
    ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    }
    : {
      loader: 'style-loader',
      options: {
        esModule: false,
      },
    };

  return {
    mode: dev ? 'development' : 'production',
    devtool: 'source-map',
    target: 'web',

    entry: './src/index.tsx',

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: path.resolve(__dirname, './src'),
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: dev ? [ReactRefreshTypeScript()] : [],
              }),
            },
          },
        },

        {
          test: /\.css$/,
          use: [styleLoader, cssLoader],
        },

        {
          test: /\.scss$/,
          use: [styleLoader, cssLoader, 'sass-loader'],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset',
          // use: 'url-loader',
        },
      ],
    },

    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        app: path.resolve(__dirname, 'src/app'),
        components: path.resolve(__dirname, 'src/components'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },

    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: env.REACT_APP_NAME,
      }),

      new MiniCssExtractPlugin(),

      new EnvironmentPlugin(env),

      new ProvidePlugin({
        // react
        React: ['react'],
        useState: ['react', 'useState'],
        useMemo: ['react', 'useMemo'],
        useCallback: ['react', 'useCallback'],
        useEffect: ['react', 'useEffect'],
        useLayoutEffect: ['react', 'useLayoutEffect'],
        useRef: ['react', 'useRef'],
        // react-query
        useQuery: ['react-query', 'useQuery'],
        useMutation: ['react-query', 'useMutation'],
        // react-redux
        useSelector: ['react-redux', 'useSelector'],
        shallowEqual: ['react-redux', 'shallowEqual'],
        // react-router
        usePathParams: ['react-router', 'useParams'],
      }),

      // new DefinePlugin({}),

      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),

      // new ESLintPlugin({
      //   extensions: ['js', 'ts', 'jsx', 'tsx'],
      //   lintDirtyModulesOnly: true,
      // }),

      ...[dev && new ReactRefreshWebpackPlugin()].filter(Boolean),
    ],

    optimization: {
      chunkIds: 'named',
      splitChunks: {
        chunks: 'async',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    devServer: {
      port: env.port,
      historyApiFallback: true,
      disableHostCheck: true,
      host: env.host,
      progress: true,
      hot: true,
      hotOnly: true,
      // publicPath: '/',
      // watchContentBase: true,
      proxy: {
        '/api': {
          target: env.REACT_APP_API,
          changeOrigin: true,
        },
      },
    },
  };
};
