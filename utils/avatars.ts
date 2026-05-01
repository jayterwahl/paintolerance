/**
 * Pain Tolerance — Avatar Picker
 *
 * Maps each fake username to a deterministic optimized avatar image from the
 * bundled avatar pool. The same fake handle always gets the same profile photo.
 */

import { PT_AVATAR_IMAGE_PATHS } from './avatar-images';

export const PT_AVATARS = (() => {
  // Simple string hash -> unsigned 32-bit integer
  function hash(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  /**
   * Pick an avatar image path from public/avatar-pool/.
   *
   * @param handle - The fake handle (used as the deterministic hash seed)
   * @param displayName - Fallback seed if a handle is unavailable
   * @returns Extension-relative image path
   */
  function generate(handle: string, displayName = ''): string {
    const key = (handle || displayName || 'pain-tolerance').trim().toLowerCase();
    const index = hash(key) % PT_AVATAR_IMAGE_PATHS.length;
    return PT_AVATAR_IMAGE_PATHS[index]!;
  }

  return { generate };
})();
