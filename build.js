const fs = require('fs');
const path = require('path');

const pug = require('pug');
const sass = require('sass');

const srcDir = 'src';
const outDir = 'build';

// Recreate the output directory
fs.rmdirSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

// Recursively list all files in the src directory
function getFiles(dir, rootDir) {
    rootDir = rootDir || (path.resolve(dir) + '/');
    let files = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            files.push(...getFiles(res, rootDir));
        } else {
            files.push(res.substring(rootDir.length));
        }
    })
    return files;
}
const files = getFiles(srcDir);

// Changes the given files extension
function changeExtension(file, extension) {
    const basename = path.basename(file, path.extname(file));
    return path.join(path.dirname(file), basename + extension);
}

// Loop through all files and compile
for (const file of files) {
    if (file.endsWith('.pug')) {
        console.log(`Rendering ${file}`);
        const srcFile = path.resolve(srcDir, file);
        const outFile = changeExtension(path.resolve(outDir, file), '.html');

        fs.mkdirSync(path.dirname(outFile), { recursive: true });

        const compiledFunction = pug.compileFile(srcFile);
        fs.writeFileSync(outFile, compiledFunction());

    } else if (file.endsWith('.scss')) {
        console.log(`Rendering ${file}`);
        const srcFile = path.resolve(srcDir, file);
        const outFile = changeExtension(path.resolve(outDir, file), '.css');

        fs.mkdirSync(path.dirname(outFile), { recursive: true });

        fs.writeFileSync(outFile, sass.renderSync({ file: srcFile }).css.toString());
    }
}
