const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ssvch\\.gemini\\antigravity\\brain\\102d605d-b6d8-414c-85f0-1e1f901d8173';
const destDir = path.join(__dirname, 'public');

fs.readdirSync(srcDir).forEach(file => {
  if (file.startsWith('aj4_') && file.endsWith('.png')) {
    const srcFile = path.join(srcDir, file);
    // clean filename
    const destFile = path.join(destDir, file.replace(/_\d+\.png$/, '.png'));
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to ${destFile}`);
  }
});
