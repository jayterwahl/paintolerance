#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
ITER_FILE="$PROJECT_DIR/.iterations-remaining"

# Initialize the counter file
echo "$1" > "$ITER_FILE"

START_TIME=$(date +%s)

# Create a persistent directory for Docker's node_modules
DOCKER_NODE_MODULES="$HOME/.cache/roguelike-docker-node-modules"
mkdir -p "$DOCKER_NODE_MODULES"

# jq filter to extract streaming text from assistant messages
stream_text='select(.type == "assistant").message.content[]? | select(.type == "text").text // empty | gsub("\n"; "\r\n") | . + "\r\n\n"'

# jq filter to extract final result
final_result='select(.type == "result").result // empty'

i=0
while true; do
  REMAINING=$(cat "$ITER_FILE")
  
  if [ "$REMAINING" -le 0 ] 2>/dev/null; then
    echo "No iterations remaining. Exiting."
    break
  fi

  ((i++))
  echo "$((REMAINING - 1))" > "$ITER_FILE"

  ITER_START=$(date +%s)

  tmpfile=$(mktemp)
  trap "rm -f $tmpfile" EXIT

  docker sandbox run \
    -v "$DOCKER_NODE_MODULES:$PROJECT_DIR/roguelike-ts/node_modules" \
    claude \
    --verbose \
    --print \
    --output-format stream-json \
    "@CLAUDE.md @PRD.md \
  1. Read the PRD and progress file.
  2. Find the next incomplete task and implement it. 
  2. Run tests and type checks.
  3. Commit your changes.
  ONLY WORK ON A SINGLE TASK per iteration.
  4. Append a brief summary to progress.txt.
  If the PRD is complete, output <promise>COMPLETE</promise>." \
    | grep --line-buffered '^{' \
    | tee "$tmpfile" \
    | jq --unbuffered -rj "$stream_text"

  result=$(jq -r "$final_result" "$tmpfile")

  ITER_END=$(date +%s)
  ITER_ELAPSED=$((ITER_END - ITER_START))
  TOTAL_ELAPSED=$((ITER_END - START_TIME))
  echo "--- Iteration $i (${REMAINING} -> $((REMAINING - 1)) remaining): $((ITER_ELAPSED / 60))m $((ITER_ELAPSED % 60))s | Total elapsed: $((TOTAL_ELAPSED / 60))m $((TOTAL_ELAPSED % 60))s ---"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete after $i iterations."
    echo "Total time: $((TOTAL_ELAPSED / 60))m $((TOTAL_ELAPSED % 60))s"
    echo "0" > "$ITER_FILE"
    exit 0
  fi
done

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
echo "Completed $i iterations."
echo "Total time: $((ELAPSED / 60))m $((ELAPSED % 60))s"


##################

# Items I put in HUMAN_NOTES and it worked for like twelve hours just cleaning up code, so use these again:
# - Use the tool jscpd (search for this if you don't know it) to search for duplicated code. Examine it carefully and consider refactorings. There might be many, many refactorings to do (or there might not). Do them one at a time. This might be many, many tasks and that's okay—plan it out and work through them.
# - More general than the previous item: Scan for code smells: unused exports, dead code, inconsistent patterns. Make a plan for how you'll examine the whole codebase, getting through it in future iterations. Fix ONE issue per iteration.