#!/bin/sh
PUBLIC_DIR="public"
OUTPUT_TS="src/cached-files.ts"

# Generate TS file with array export
echo "export const cachedFiles = [" > $OUTPUT_TS
find $PUBLIC_DIR -type f | sed 's/^public//' | awk '{printf "  '\''%s'\'',\n", $0}' >> $OUTPUT_TS
echo "];" >> $OUTPUT_TS

echo "Generated cached files list at $OUTPUT_TS"