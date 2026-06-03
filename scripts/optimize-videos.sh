#!/usr/bin/env bash
# Transcodes oversized .mov screen recordings into web-optimized .mp4 files.
# - caps to 30fps (sources are 60-240fps) -- this is where the size savings come from
# - keeps NATIVE resolution so phone captures stay crisp on retina displays
# - H.264 high profile, yuv420p, CRF 20 (visually ~transparent for UI/screen content)
# - +faststart moves the moov atom to the front for instant progressive playback
# - strips audio (clips are muted on the site)
set -euo pipefail
cd "$(dirname "$0")/../public/assets"

FILES=(
  "bumbleflow/BumbleFlow_Kevin.mov"
  "bumbleflow/BumbleFlow_EdgeCase.mov"
  "bumbleflow/BumbleFlow_Lindsey_New.mov"
  "bumbleflow/BumbleFlow_PremiumxFree(John).mov"
  "bumbleflow/BumbleFlow_Premium(Jennifer)xFree.mov"
  "bumbleflow/BumbleFlow_FreexFree(John).mov"
  "bumbleflow/BumbleFlow_FreexFree(Jennifer).mov"
  "trippy/TrippyTrippySpotGeneration.mov"
  "trippy/TrippyAIGeneratedTripList.mov"
  "trippy/TrippyCommunity.mov"
)

for src in "${FILES[@]}"; do
  out="${src%.mov}.mp4"
  echo ">>> $src -> $out"
  ffmpeg -y -nostdin -i "$src" \
    -vf "fps=30" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 20 -preset slow \
    -movflags +faststart -an \
    "$out" </dev/null
done

echo "DONE_OPTIMIZE_VIDEOS"
ls -la bumbleflow/*.mp4 trippy/*.mp4
