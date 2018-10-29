# copy-webpack-output-plugin
A webpack plugin to copy your output files to somewhere

## Install

```bash
npm i copy-webpack-output-plugin --save-dev
```

## Usage

```js
const CopyWebpackOutputPlugin = require('./copy-webpack-output-plugin');

plugins: [
  new CopyWebpackOutputPlugin([{ src: '*.js', dest: 'foo' }], options)
]
```
The arguments `src` and `dest` are glob patterns like  [node-glob](https://github.com/isaacs/node-glob#glob-primer).

See the [options document](https://github.com/isaacs/node-glob#options) for usage detail and available methods.

## Example

In this example, we will copy vendor files to cdn folder, copy js and css files to static folder.

```js
const CopyWebpackOutputPlugin = require('./copy-webpack-output-plugin');

module.exports = {
  //...
  plugins: [
    new CopyWebpackOutputPlugin([
      {
        src: './dist/vendor.*',
        dest: './cdn'
      },
      {
        src: ['./dist/main.js', './dist/main.css'],
        dest: './static',
        options: {
          // will overwrite outside options nodir:true
          nodir: false
        }
      }
    ], {
      nodir: true
    })
  ]
}
```

## License

[MIT LICENSE](./LICENSE)
