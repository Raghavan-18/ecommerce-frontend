const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const allFiles = getFiles('./src');
let foundError = false;

allFiles.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            const match = line.match(/import\s+.*?\s+from\s+['"](\.[^'"]+)['"]/);
            if (match) {
                const importPath = match[1];
                let exts = importPath.match(/\.[a-z]+$/) ? [''] : ['.jsx', '.js', '.css'];

                const targetDir = path.dirname(file);
                
                for(let ext of exts) {
                    const targetFile = path.resolve(targetDir, importPath + ext);
                    try {
                        const actualDir = path.dirname(targetFile);
                        const basename = path.basename(targetFile);
                        if (fs.existsSync(actualDir)) {
                            const filesInDir = fs.readdirSync(actualDir);
                            // If it exists in reality but case doesn't match
                            if (!filesInDir.includes(basename)) {
                                const lowerBasename = basename.toLowerCase();
                                const existingFile = filesInDir.find(f => f.toLowerCase() === lowerBasename);
                                if (existingFile) {
                                    console.log('CASE MISMATCH in', file, 'line', index + 1);
                                    console.log('Import:', importPath);
                                    console.log('Expected:', basename);
                                    console.log('Actual on disk:', existingFile);
                                    foundError = true;
                                }
                            }
                        }
                    } catch (e) {}
                }
            }
        });
    }
});
if(!foundError) console.log('No case mismatches found!');
