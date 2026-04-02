/**
 * Generate Chrome Web Store promotional assets.
 * Run with: node store/generate-promo.js
 *
 * Produces:
 *   store/promo-tile-440x280.png  — Small promo tile
 *   store/promo-tile-920x680.png  — Large promo tile (marquee)
 *
 * Requires: npm install canvas (node-canvas)
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generatePromoTile(width, height, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background — dark, matching Twitter/X dark mode
  ctx.fillStyle = '#15202b';
  ctx.fillRect(0, 0, width, height);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, 'rgba(233, 69, 96, 0.15)');
  grad.addColorStop(1, 'rgba(26, 26, 46, 0.3)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Title text
  const titleSize = Math.round(width * 0.085);
  ctx.font = `bold ${titleSize}px -apple-system, "Segoe UI", sans-serif`;
  ctx.fillStyle = '#e7e9ea';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Gom Yapper', width / 2, height * 0.35);

  // Subtitle
  const subSize = Math.round(width * 0.04);
  ctx.font = `${subSize}px -apple-system, "Segoe UI", sans-serif`;
  ctx.fillStyle = '#8899a6';
  ctx.fillText('Resilience training for your timeline', width / 2, height * 0.5);

  // Accent line
  const lineWidth = width * 0.3;
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo((width - lineWidth) / 2, height * 0.6);
  ctx.lineTo((width + lineWidth) / 2, height * 0.6);
  ctx.stroke();

  // Tagline
  const tagSize = Math.round(width * 0.032);
  ctx.font = `${tagSize}px -apple-system, "Segoe UI", sans-serif`;
  ctx.fillStyle = '#e94560';
  ctx.fillText('Master your instincts under pressure', width / 2, height * 0.72);

  // Border
  ctx.strokeStyle = 'rgba(233, 69, 96, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  // Save
  const outPath = path.join(__dirname, filename);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${outPath} (${buffer.length} bytes)`);
}

generatePromoTile(440, 280, 'promo-tile-440x280.png');
generatePromoTile(920, 680, 'promo-tile-920x680.png');

console.log('\nDone. Upload these to the Chrome Web Store developer dashboard.');
console.log('Screenshots must be captured manually from the extension running on Twitter/X.');
