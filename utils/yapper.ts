/**
 * Pain Tolerance — Reply Engine
 *
 * Produces complete fake reply objects using corpus data, avatar generation,
 * and deterministic seeding from tweet IDs.
 *
 * Depends on: PT_CORPUS (corpus.js), PT_AVATARS (avatars.js)
 */

import { PT_AVATARS } from './avatars';
import { PT_CORPUS } from './corpus';

type Rng = () => number;
type Archetype = (typeof PT_CORPUS.archetypes)[number];
type FillerKey = keyof typeof PT_CORPUS.fillers;

export interface ReplyMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  bookmarks: number;
}

export interface GeneratedReply {
  archetypeId: string;
  displayName: string;
  handle: string;
  verified: boolean;
  avatar: string;
  text: string;
  timestamp: string;
  metrics: ReplyMetrics;
}

export const PT_YAPPER = (() => {
  // Simple seeded PRNG (LCG)
  function makeRng(seed: number): Rng {
    let s = seed | 0;
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    };
  }

  // Hash a string to a 32-bit unsigned integer
  function hashStr(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  // Pick from array using rng
  function pick<T>(arr: readonly T[], rng: Rng): T {
    return arr[Math.floor(rng() * arr.length)]!;
  }

  // Weighted random selection of an archetype
  function pickArchetype(rng: Rng): Archetype {
    const archetypes = PT_CORPUS.archetypes;
    const totalWeight = archetypes.reduce((sum, a) => sum + a.weight, 0);
    let roll = rng() * totalWeight;
    for (const arch of archetypes) {
      roll -= arch.weight;
      if (roll <= 0) return arch;
    }
    return archetypes[archetypes.length - 1]!;
  }

  // Fill {slot} placeholders in a template string
  function fillSlots(template: string, rng: Rng): string {
    return template.replace(/\{(\w+)\}/g, (_match: string, slot: string) => {
      const fillers = PT_CORPUS.fillers[slot as FillerKey];
      if (!fillers || fillers.length === 0) return `{${slot}}`;
      return pick(fillers, rng);
    });
  }

  // Generate a display name
  function generateDisplayName(rng: Rng): string {
    const id = PT_CORPUS.identity;
    const first = pick(id.firstNames, rng);

    // 50% chance of appending a last fragment
    if (rng() < 0.5) {
      return first + ' ' + pick(id.lastFragments, rng);
    }
    return first;
  }

  // Generate a handle matching real Twitter patterns
  function generateHandle(rng: Rng): string {
    const id = PT_CORPUS.identity;
    const pattern = pick(id.handlePatterns, rng);

    if (pattern === '{first}{4digit}') {
      const first = pick(id.firstNames, rng).toLowerCase().replace(/\s+/g, '');
      const num = String(Math.floor(rng() * 9000 + 1000));
      return '@' + first + num;
    }
    if (pattern === '{first}_{fragment}') {
      const first = pick(id.firstNames, rng).toLowerCase().replace(/\s+/g, '');
      const frag = pick(id.lastFragments, rng).toLowerCase();
      return '@' + first + '_' + frag;
    }
    if (pattern === '{adj}{noun}{2digit}') {
      const adj = pick(id.adjectives, rng);
      const noun = pick(id.nouns, rng);
      const num = String(Math.floor(rng() * 90 + 10));
      return '@' + adj + noun + num;
    }
    // {first}{year}
    const first = pick(id.firstNames, rng).toLowerCase().replace(/\s+/g, '');
    const year = String(Math.floor(rng() * 15 + 1990));
    return '@' + first + year;
  }

  // Generate engagement metrics following power-law distributions
  function generateMetrics(rng: Rng): ReplyMetrics {
    // Likes: 70% 0-2, 20% 3-15, 8% 16-50, 2% 50-200
    let likes;
    const likeRoll = rng();
    if (likeRoll < 0.70) {
      likes = Math.floor(rng() * 3);
    } else if (likeRoll < 0.90) {
      likes = Math.floor(rng() * 13) + 3;
    } else if (likeRoll < 0.98) {
      likes = Math.floor(rng() * 35) + 16;
    } else {
      likes = Math.floor(rng() * 150) + 51;
    }

    // Retweets: 85% 0, 10% 1-3, 5% 4-10
    let retweets;
    const rtRoll = rng();
    if (rtRoll < 0.85) {
      retweets = 0;
    } else if (rtRoll < 0.95) {
      retweets = Math.floor(rng() * 3) + 1;
    } else {
      retweets = Math.floor(rng() * 7) + 4;
    }

    // Replies: 80% 0, 15% 1-3, 5% 4-8
    let replies;
    const repRoll = rng();
    if (repRoll < 0.80) {
      replies = 0;
    } else if (repRoll < 0.95) {
      replies = Math.floor(rng() * 3) + 1;
    } else {
      replies = Math.floor(rng() * 5) + 4;
    }

    // Views: always some, power-law leaning small
    let views;
    const viewRoll = rng();
    if (viewRoll < 0.50) {
      views = Math.floor(rng() * 450) + 50;    // 50–499
    } else if (viewRoll < 0.80) {
      views = Math.floor(rng() * 1500) + 500;  // 500–1,999
    } else if (viewRoll < 0.95) {
      views = Math.floor(rng() * 3000) + 2000; // 2,000–4,999
    } else {
      views = Math.floor(rng() * 15000) + 5000; // 5,000–20,000
    }

    // Bookmarks: 70% zero, occasionally a few
    let bookmarks;
    const bkRoll = rng();
    if (bkRoll < 0.70) {
      bookmarks = 0;
    } else if (bkRoll < 0.90) {
      bookmarks = Math.floor(rng() * 3) + 1;
    } else {
      bookmarks = Math.floor(rng() * 17) + 4;
    }

    return { likes, retweets, replies, views, bookmarks };
  }

  // Generate a relative timestamp string (e.g., "2m", "1h", "3h")
  // Distributed between 1 min and 4 hours with early-skewed decay
  function generateTimestamp(rng: Rng): string {
    // Use squared random for decay curve (more replies appear early)
    const t = rng() * rng();
    const totalMinutes = Math.floor(t * 239) + 1; // 1 to 240 minutes

    if (totalMinutes < 60) {
      return totalMinutes + 'm';
    }
    const hours = Math.floor(totalMinutes / 60);
    return hours + 'h';
  }

  /**
   * Generate a single fake reply object.
   *
   * @param {number} seed - Deterministic seed (derived from tweet ID + reply index)
   * @returns {object} Fake reply with all display fields
   */
  function generateReply(seed: number): GeneratedReply {
    const rng = makeRng(seed);

    // 1. Roll archetype
    const archetype = pickArchetype(rng);

    // 2. Select template
    const template = pick(archetype.templates, rng);

    // 3. Fill slots
    const text = fillSlots(template, rng);

    // 4. Generate identity
    const displayName = generateDisplayName(rng);
    const handle = generateHandle(rng);
    const verified = rng() < 0.20; // ~20% blue check
    const avatar = PT_AVATARS.generate(handle, displayName);

    // 5. Generate metrics
    const metrics = generateMetrics(rng);

    // 6. Generate timestamp
    const timestamp = generateTimestamp(rng);

    return {
      archetypeId: archetype.id,
      displayName,
      handle,
      verified,
      avatar,
      text,
      timestamp,
      metrics,
    };
  }

  /**
   * Deterministically choose how many fake replies a tweet should receive.
   *
   * The range comes from the user's intensity setting; the selected value is
   * stable for the same tweet seed so profile cards and status pages agree.
   */
  function generateReplyCount(tweetSeed: string, range: readonly [number, number]): number {
    const [rawMin, rawMax] = range;
    const min = Math.max(0, Math.floor(Math.min(rawMin, rawMax)));
    const max = Math.max(min, Math.floor(Math.max(rawMin, rawMax)));
    return min + (hashStr(tweetSeed) % (max - min + 1));
  }

  /**
   * Deterministically choose a fake reply view count below the parent tweet's
   * current view count. The hashed seed becomes a stable percentage, so the
   * value scales proportionally as the parent tweet gains views.
   */
  function generateReplyViewCount(replySeed: string, parentTweetViews: number): number {
    const upperExclusive = Math.max(2, Math.floor(parentTweetViews));
    const percentage = ((hashStr(replySeed) % 10000) + 1) / 10001;
    return Math.min(upperExclusive - 1, Math.max(1, Math.floor(percentage * upperExclusive)));
  }

  function randomInt(rng: Rng, min: number, max: number): number {
    const lower = Math.ceil(min);
    const upper = Math.floor(max);
    if (upper <= lower) return lower;
    return lower + Math.floor(rng() * (upper - lower + 1));
  }

  function boundedSmallCount(rng: Rng, max: number, ceiling: number): number {
    const capped = Math.max(1, Math.min(max, Math.floor(ceiling)));
    // Squared RNG heavily favors 1 while still allowing occasional larger counts.
    return Math.max(1, Math.min(capped, 1 + Math.floor(rng() * rng() * capped)));
  }

  /**
   * Deterministically choose reply/like counts that cannot exceed the rendered
   * reply view count. The distribution is intentionally sparse: most fake
   * replies get no engagement, some get one or two likes/replies, and larger
   * outliers are gated at the parent-tweet level so every generated thread does
   * not automatically contain a high-engagement fake reply.
   */
  function generateReplyEngagementCounts(
    replySeed: string,
    parentTweetSeed: string,
    replyViews: number,
  ): Pick<ReplyMetrics, 'likes' | 'replies'> {
    const views = Math.max(0, Math.floor(replyViews));
    if (views <= 0) return { likes: 0, replies: 0 };

    const rng = makeRng(hashStr(`${replySeed}:engagement`));
    const outliersAllowed = hashStr(`${parentTweetSeed}:engagement-outliers`) % 3 === 0;

    let likes = 0;
    const likeOutlierRoll = rng();
    if (outliersAllowed && views >= 8 && likeOutlierRoll < 0.16) {
      const min = Math.max(2, Math.floor(views * 0.08));
      const max = Math.max(min, Math.floor(views * (0.20 + rng() * 0.35)));
      likes = randomInt(rng, min, Math.min(views, max));
    } else {
      const roll = rng();
      if (roll < 0.72) {
        likes = 0;
      } else if (roll < 0.93) {
        likes = boundedSmallCount(rng, views, Math.min(2, Math.ceil(views * 0.05)));
      } else if (roll < 0.985) {
        likes = boundedSmallCount(rng, views, Math.min(6, Math.ceil(views * 0.12)));
      } else {
        likes = boundedSmallCount(rng, views, Math.min(12, Math.ceil(views * 0.20)));
      }
    }

    let replies = 0;
    const replyOutlierRoll = rng();
    if (outliersAllowed && views >= 15 && replyOutlierRoll < 0.035) {
      const min = Math.max(2, Math.floor(views * 0.03));
      const max = Math.max(min, Math.floor(views * (0.08 + rng() * 0.18)));
      replies = randomInt(rng, min, Math.min(views, max));
    } else {
      const roll = rng();
      if (roll < 0.88) {
        replies = 0;
      } else if (roll < 0.97) {
        replies = 1;
      } else if (roll < 0.995) {
        replies = boundedSmallCount(rng, views, Math.min(3, Math.ceil(views * 0.04)));
      } else {
        replies = boundedSmallCount(rng, views, Math.min(6, Math.ceil(views * 0.08)));
      }
    }

    return {
      likes: Math.min(views, likes),
      replies: Math.min(views, replies),
    };
  }

  /**
   * Generate a batch of fake replies for a tweet.
   *
   * @param {string} tweetId - The tweet's unique ID (for deterministic seeding)
   * @param {number} count   - Number of replies to generate
   * @returns {Array<object>} Array of fake reply objects
   */
  function generateReplies(tweetId: string, count: number): GeneratedReply[] {
    const baseSeed = hashStr(tweetId);
    const replies = [];
    for (let i = 0; i < count; i++) {
      // Combine base seed with index for unique but deterministic per-reply seed
      const seed = (baseSeed + i * 2654435761) | 0;
      replies.push(generateReply(seed >>> 0));
    }
    return replies;
  }

  return {
    generateReply,
    generateReplyCount,
    generateReplyEngagementCounts,
    generateReplyViewCount,
    generateReplies,
  };
})();
