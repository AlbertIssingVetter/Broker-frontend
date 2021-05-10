const buildDir = __dirname + '/../build';
const fs = require('fs');
const path = require('path');
const {version} = require('../package.json')


const walk = route => {
    const files = []
    fs.readdirSync(route).forEach(file => {
        file = path.resolve(route, file);
        if(fs.statSync(file).isDirectory()) {
            files.push(...walk(file))
        } else {
            files.push(file);
        }
    });
    return files;
}

const createCacheList = files => {
    const ignores = [
        'scss',
        'map',
    ]
    const cacheFiles = []
    files.forEach(file => {
        const ext = file.substr(file.lastIndexOf('.') + 1);
        if (!ignores.includes(ext) && !file.includes('sw.js')) {
            if (ext === 'css') {
                cacheFiles.push("." + file.substr(file.indexOf('/build/') + 6) + '?version=' + version)
            } else {
                cacheFiles.push("." + file.substr(file.indexOf('/build/') + 6))
            }
        }
    })
    let sw = fs.readFileSync(buildDir + "/sw.js", 'utf8');
    let lines = sw.split('\n');
    lines.splice(0,2)
    let data = [];
    data.push(`const cacheFiles = ${JSON.stringify(cacheFiles)}`);
    data.push(`const cacheVersion = '${process.argv[2]}'`)
    data.push(...lines)
    sw = data.join('\n')
    fs.writeFileSync(buildDir + "/sw.js", sw);
}

createCacheList(walk(buildDir))
