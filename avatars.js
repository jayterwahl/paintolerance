/**
 * Pain Tolerance — Avatar Generator
 *
 * Generates profile picture data URLs using an offscreen canvas.
 * The fake username is hashed to deterministically select background color,
 * foreground letter, and style variations.
 */

const PT_AVATARS = (() => {
  // Curated palette of ~20 muted tones matching common Twitter avatar colors
  const PALETTE = [
    '#6B7280', '#9CA3AF', '#EF4444', '#F97316', '#F59E0B',
    '#84CC16', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6',
    '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
    '#F43F5E', '#78716C', '#57534E', '#0EA5E9', '#10B981',
  ];

  // Simple string hash -> unsigned 32-bit integer
  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  // Deterministic pseudo-random sequence from a seed
  function seededRand(seed) {
    let s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    };
  }

  /**
   * Generate a data:image/png;base64 avatar URL.
   *
   * @param {string} handle   - The fake handle (used as hash seed)
   * @param {string} displayName - The display name (first char used as letter)
   * @returns {string} data URL
   */
  function generate(handle, displayName) {
    const seed = hash(handle);
    const rand = seededRand(seed);

    const size = 48;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Pick background color deterministically
    const bgIndex = seed % PALETTE.length;
    const bgColor = PALETTE[bgIndex];

    // Draw circular background
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();

    // 10-15% chance of no letter (solid color avatar mimicking flat-color uploads)
    const noLetter = rand() < 0.12;

    if (!noLetter && displayName && displayName.length > 0) {
      // Extract first character for the foreground letter
      const letter = displayName.charAt(0).toUpperCase();

      // Slight font size variation: 22-26px
      const fontSize = 22 + Math.floor(rand() * 5);

      // Font weight variation: 600 or 700
      const fontWeight = rand() < 0.5 ? 600 : 700;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, size / 2, size / 2 + 1);
    }

    return canvas.toDataURL('image/png');
  }

  return { generate };
})();
