#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote environment (web)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Verify essential files exist
if [ ! -f "index.html" ]; then
  echo "Error: index.html not found" >&2
  exit 1
fi

if [ ! -f "index.js" ]; then
  echo "Error: index.js not found" >&2
  exit 1
fi

if [ ! -f "index.css" ]; then
  echo "Error: index.css not found" >&2
  exit 1
fi

echo "✓ Environment ready for QHPMariniers project"
echo "✓ Static web application files verified"
