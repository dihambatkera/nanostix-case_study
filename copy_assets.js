const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Mujahid/.gemini/antigravity-ide/brain/abac7123-3284-46b1-ae7a-6909c3a9ad21';
const destDir = './assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const targetPrefixes = ['hero_image', 'company_large', 'company_logo', 'prob1_large', 'prob1_small', 'prob2_large', 'prob2_small', 'prob3_large', 'prob3_small', 'prob4_large', 'prob4_small', 'prob5_large', 'prob5_small'];

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.png') && targetPrefixes.some(prefix => file.startsWith(prefix))) {
    try {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`SUCCESS COPIED: ${file}`);
    } catch (err) {
      console.error(`ERROR for ${file}:`, err.message);
    }
  }
});
