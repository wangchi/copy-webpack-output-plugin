const copy = require('copy');
const chalk = require('chalk');

const isObj = (obj) => {
  if (typeof(obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]') {
    return true;
  }
  return false;
}

const copyPromise = (src, dest, options) => {
  return new Promise((resolve, reject) => {
    copy(src, dest, options || {}, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};

class CopyWebpackOutputPlugin {
  constructor(patterns, options) {
    this.pluginName = 'copy-webpack-output-plugin';

    patterns = typeof patterns === 'undefined' ? [] : patterns;

    if (typeof options !== 'undefined' && !isObj(options)) {
      console.log(chalk.red(this.pluginName) + ' options must be a object');
      return;
    }

    patterns.map(item => {
      if (item.hasOwnProperty('options') && !isObj(item.options)) {
        console.log(chalk.red(this.pluginName) + ' options in patterns must be a object');
        return;
      }
      item.options = Object.assign({}, options, item.options || {});
    });

    this.patterns = patterns;
  }

  apply(compiler) {
    if (typeof compiler === 'undefined') {
      this.copy(compiler);
      return;
    }

    compiler.hooks.done.tap('CopyWebpackOutputPlugin', () => {
      this.copy(compiler);
    });
  }

  copy(compiler) {
    this.patterns.forEach(item => {
      copyPromise(item.src, item.dest, item.options).then(files => {
        if (compiler) {
          console.log(
            'copy-webpack-output-plugin copy ' +
            chalk.bold.green(item.src) +
            ' to ' +
            chalk.bold.green(item.dest) +
            ' success'
          );
        }
      }).catch(err => {
        throw err;
      });
    });
  }
}

module.exports = CopyWebpackOutputPlugin;
