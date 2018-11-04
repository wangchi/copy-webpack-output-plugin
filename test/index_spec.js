const assert = require('assert');
const fs = require('fs');
const path = require('path');
const CopyWebpackOutputPlugin = require('../index');

// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe('Copy', () => {
  describe('copy nothing', () => {
    it('nothing to copy', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin();
      let result = copyWebpackOutputPlugin.apply();
    });
  });


  // src: test/_src/...
  // dest: test/_dest/...

  describe('copy single file', () => {
    it('copy single file to destionation', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin([{
        src: path.resolve(__dirname, './_src/index.js'),
        dest: path.resolve(__dirname, './_dest_single')
      }]);
      let result = copyWebpackOutputPlugin.apply();
    });
  });

  describe('copy multiple files', () => {
    it('copy single file to destionation', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin([{
        src: path.resolve(__dirname, './_src/index.js'),
        dest: path.resolve(__dirname, './_dest_multiple')
      }, {
        src: path.resolve(__dirname, './_src/index.css'),
        dest: path.resolve(__dirname, './_dest_multiple')
      }]);
      let result = copyWebpackOutputPlugin.apply();
    });
  });

  describe('copy nested files', () => {
    it('copy nested file to destionation', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin([{
        src: path.resolve(__dirname, './_src/nested/nested_index.js'),
        dest: path.resolve(__dirname, './_dest_nested')
      }, {
        src: path.resolve(__dirname, './_src/index.css'),
        dest: path.resolve(__dirname, './_dest_nested')
      }]);
      let result = copyWebpackOutputPlugin.apply();
    });
  });

  describe('copy matching files', () => {
    it('copy matching file to destionation', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin([{
        src: path.resolve(__dirname, './_src/**/*.js'),
        dest: path.resolve(__dirname, './_dest_matching')
      }, {
        src: path.resolve(__dirname, './_src/*.css'),
        dest: path.resolve(__dirname, './_dest_matching')
      }]);
      let result = copyWebpackOutputPlugin.apply();
    });
  });

  describe('copy matching files without folder', () => {
    it('copy matching file to destionation without folder', () => {
      let copyWebpackOutputPlugin = new CopyWebpackOutputPlugin([{
        src: path.resolve(__dirname, './_src/**/*.js'),
        dest: path.resolve(__dirname, './_dest_without_folder/js')
      }, {
        src: path.resolve(__dirname, './_src/*.css'),
        dest: path.resolve(__dirname, './_dest_without_folder/css')
      }], {
        nodir: true
      });
      let result = copyWebpackOutputPlugin.apply();
    });
  });
});
