const webpack = require('webpack');

// const env = 'production';
const env = 'development';
process.env.NODE_ENV = env;

const configFactory = require('../webpack');

const config = configFactory(env);

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    // console.log(stats);
  }
});
