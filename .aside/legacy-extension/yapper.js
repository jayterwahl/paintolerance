/**
 * Pain Tolerance — Reply Engine
 *
 * Produces complete fake reply objects using corpus data, avatar generation,
 * and deterministic seeding from tweet IDs.
 *
 * Depends on: PT_CORPUS (corpus.js), PT_AVATARS (avatars.js)
 */

const PT_YAPPER = (() => {
  // Simple seeded PRNG (LCG)
  function makeRng(seed) {
    let s = seed | 0;
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    };
  }

  // Hash a string to a 32-bit unsigned integer
  function hashStr(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  // Pick from array using rng
  function pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
  }

  // Weighted random selection of an archetype
  function pickArchetype(rng) {
    const archetypes = PT_CORPUS.archetypes;
    const totalWeight = archetypes.reduce((sum, a) => sum + a.weight, 0);
    let roll = rng() * totalWeight;
    for (const arch of archetypes) {
      roll -= arch.weight;
      if (roll <= 0) return arch;
    }
    return archetypes[archetypes.length - 1];
  }

  // Fill {slot} placeholders in a template string
  function fillSlots(template, rng) {
    return template.replace(/\{(\w+)\}/g, (_, slot) => {
      const fillers = PT_CORPUS.fillers[slot];
      if (!fillers || fillers.length === 0) return `{${slot}}`;
      return pick(fillers, rng);
    });
  }

  // Generate a display name
  function generateDisplayName(rng) {
    const id = PT_CORPUS.identity;
    const first = pick(id.firstNames, rng);

    // 50% chance of appending a last fragment
    if (rng() < 0.5) {
      return first + ' ' + pick(id.lastFragments, rng);
    }
    return first;
  }

  // Generate a handle matching real Twitter patterns
  function generateHandle(rng) {
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
  function generateMetrics(rng) {
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
  function generateTimestamp(rng) {
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
  function generateReply(seed) {
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
   * Generate a batch of fake replies for a tweet.
   *
   * @param {string} tweetId - The tweet's unique ID (for deterministic seeding)
   * @param {number} count   - Number of replies to generate
   * @returns {Array<object>} Array of fake reply objects
   */
  function generateReplies(tweetId, count) {
    const baseSeed = hashStr(tweetId);
    const replies = [];
    for (let i = 0; i < count; i++) {
      // Combine base seed with index for unique but deterministic per-reply seed
      const seed = (baseSeed + i * 2654435761) | 0;
      replies.push(generateReply(seed >>> 0));
    }
    return replies;
  }

  return { generateReply, generateReplies };
})();
