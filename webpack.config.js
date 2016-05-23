// [name] under the output section denotes the entry prop names
module.exports = {
  entry: {
   dev_demo: ['webpack/hot/dev-server', './demo/src/demo.js'],
   dist: ['./main.js']
  },
  output: {
    path: './',
    filename: 'build/[name].coach-mark.js',
    libraryTarget: 'umd'
  },
  contentBase: "./demo", // for webpack dev server
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};
