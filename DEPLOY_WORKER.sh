#!/bin/bash

echo "🚀 Cloudflare Worker Deployment Script"
echo "========================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo ""
echo "📁 Navigate to cms-proxy folder:"
echo "cd cms-proxy"
echo ""

echo "📝 Step 1: Install dependencies"
echo "npm install"
echo ""

echo "🔐 Step 2: Add your CMS API key as secret"
echo "npx wrangler secret put CMS_API_KEY"
echo "(Paste your API key when prompted)"
echo ""

echo "🧪 Step 3: Test locally (optional)"
echo "npx wrangler dev"
echo "(Then visit: http://localhost:8787/api/news)"
echo ""

echo "✅ Step 4: Deploy to production"
echo "npx wrangler deploy"
echo ""

echo "========================================"
echo "After deployment, you'll get your worker URL:"
echo "https://carta-cms-proxy.YOUR-USERNAME.workers.dev"
echo ""
echo "Share that URL so I can update the frontend!"
