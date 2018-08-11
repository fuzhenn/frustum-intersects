const uglify = require('rollup-plugin-uglify').uglify;
const pkg = require('./package.json');

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2018-${new Date().getFullYear()} fuzhenn\n */`;

module.exports = {
    input: 'src/index.js',
    plugins: [
        uglify({
            output : { comments : /^!/ }
        })
    ],
    output: [
        {
            'sourcemap': false,
            'format': 'umd',
            'name': 'frustum',
            'banner': banner,
            'file': pkg.main
        }
    ]
};
