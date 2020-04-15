const version = require('broccoli-plugin/package.json').version;

console.log({ version });
if (version !== '1.3.1') {
    throw new Error(`Expected version 1.3.1`);
}