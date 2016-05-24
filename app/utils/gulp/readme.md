OneMa

# Generating ES6 to ES5 javascript files
There is currently an issue with gulp-babel: https://phabricator.babeljs.io/T2840

after installing ``npm install --save-dev gulp-babel`` open ``gulp-babel/node_modules/babel-core/lib/transformation/file/options/option-manager.js`` and change the following line:

``` javascript
// @line ~254

//dirname = dirname || process.cwd();
dirname = process.cwd();
```