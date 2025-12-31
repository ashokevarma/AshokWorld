/**
 * Post-build script for Cloudflare Pages deployment
 * Ensures the correct file structure for Pages with OpenNext
 */

const fs = require('fs');
const path = require('path');

const OPEN_NEXT_DIR = '.open-next';

console.log('📦 Running post-build script for Cloudflare Pages...');

// Rename worker.js to _worker.js for Cloudflare Pages
const workerSrc = path.join(OPEN_NEXT_DIR, 'worker.js');
const workerDest = path.join(OPEN_NEXT_DIR, '_worker.js');

if (fs.existsSync(workerSrc)) {
  // Copy instead of rename to preserve original
  fs.copyFileSync(workerSrc, workerDest);
  console.log('✅ Created _worker.js from worker.js');
}

// Create _routes.json to help with static asset routing
const routesConfig = {
  version: 1,
  include: ["/*"],
  exclude: [
    "/_next/static/*",
    "/favicon.ico",
    "/images/*",
    "/fonts/*"
  ]
};

const routesPath = path.join(OPEN_NEXT_DIR, '_routes.json');
fs.writeFileSync(routesPath, JSON.stringify(routesConfig, null, 2));
console.log('✅ Created _routes.json');

// Copy static assets to root of .open-next for direct serving
const assetsDir = path.join(OPEN_NEXT_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  // Copy _next folder from assets to root
  const nextStaticSrc = path.join(assetsDir, '_next');
  const nextStaticDest = path.join(OPEN_NEXT_DIR, '_next');
  
  if (fs.existsSync(nextStaticSrc)) {
    copyFolderRecursive(nextStaticSrc, nextStaticDest);
    console.log('✅ Copied _next static assets to root');
  }
}

console.log('✅ Post-build complete!');

/**
 * Recursively copy a folder
 */
function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

