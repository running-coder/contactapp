import fs from 'fs-extra';
import util from 'gulp-util';

module.exports = (gulp, pkg, functions) => {
    return (cb) => {

        if (!fs.existsSync(pkg.path.vendor)) {
            util.log(util.colors.red(`Invalid vendor path -> ${pkg.path.vendor}`));
            cb();
            return;
        }

        var dependency,
            dependencies = require('./vendor-to-libraries.json'),
            originalFile,
            copiedFile,
            copiedFilePath,
            counter;

        for (var i = 0; i < dependencies.length; i++) {
            dependency = dependencies[i];

            if (dependency instanceof Array) {
                originalFile = dependency[0];
                copiedFile = dependency[1];
            } else {
                originalFile = copiedFile = dependency;
            }

            if (!fs.existsSync(pkg.path.vendor + originalFile)) {
                util.log(functions.removeDoubleSlashes(
                    util.colors.red(`Missing File ${pkg.path.vendor} ${originalFile} -> ${pkg.path.libraries} ${copiedFile}`)
                ));
                continue;
            }

            util.log(functions.removeDoubleSlashes(
                `Copy ${util.colors.magenta(pkg.path.vendor + originalFile)} -> ${util.colors.cyan(pkg.path.libraries + copiedFile)}`
            ));

            fs.copySync(pkg.path.vendor + originalFile, pkg.path.libraries + copiedFile);

        }
        cb();
    }

};