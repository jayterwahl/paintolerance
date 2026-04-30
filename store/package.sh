#!/usr/bin/env bash
# Build a Chrome Web Store-ready zip from the repo root.
# Run from the repo root: bash store/package.sh

set -e

OUT="store/pain-tolerance.zip"

# Files/dirs to include in the extension package
INCLUDES=(
  manifest.json
  content.js
  corpus.js
  avatars.js
  selectors.js
  yapper.js
  popup/
  icons/
)

# Remove stale zip if present
rm -f "$OUT"

zip -r "$OUT" "${INCLUDES[@]}"

echo ""
echo "Created: $OUT"
echo "Size:    $(du -sh "$OUT" | cut -f1)"
echo ""
echo "Upload this file at:"
echo "  https://chrome.google.com/webstore/devconsole"
