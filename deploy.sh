#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  OpenReach — One-Command Deploy Script
#
#  SETUP (run once):
#    chmod +x deploy.sh
#    mv deploy.sh ~/openreach-app/deploy.sh
#
#  USAGE (run from inside openreach-app/):
#    ./deploy.sh "your commit message"
#
#  WHAT IT DOES:
#    1. Pulls latest App.jsx from your Desktop/Claude Code folder
#    2. Stages all changes
#    3. Commits with your message
#    4. Pushes to GitHub → Vercel auto-deploys
# ─────────────────────────────────────────────────────────────────────────────

set -e

CLAUDE_FOLDER="$HOME/Desktop/Claude Code"
REPO_SRC="$CLAUDE_FOLDER/App.jsx"
APP_DEST="./src/App.jsx"

echo ""
echo "🚀 OpenReach Deploy"
echo "───────────────────────────────────"

# ── Step 1: Pull latest App.jsx from Claude ───────────────────────────────────
if [ -f "$REPO_SRC" ]; then
  echo "📥 Pulling latest App.jsx from Desktop/Claude Code..."
  cp "$REPO_SRC" "$APP_DEST"
  echo "✅ App.jsx synced"
else
  echo "ℹ️  No updated App.jsx found in Desktop/Claude Code — using existing"
fi

# ── Step 2: Check for changes ─────────────────────────────────────────────────
git add .

if git diff --cached --quiet; then
  echo "✅ Nothing new to deploy — already up to date"
  exit 0
fi

# ── Step 3: Commit ────────────────────────────────────────────────────────────
COMMIT_MSG="${1:-"Update app $(date '+%Y-%m-%d %H:%M')"}"
echo "💬 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# ── Step 4: Push → triggers Vercel auto-deploy ────────────────────────────────
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Vercel is building your app now."
echo "🌐 Live at: https://app.openreach.io (in ~60 seconds)"
echo ""
