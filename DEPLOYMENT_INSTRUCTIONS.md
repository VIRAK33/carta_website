# DirectAdmin Static Deployment Instructions

## What You Have

The `.output/public/` directory contains all pre-rendered static files ready for deployment:
- Pre-rendered HTML pages
- CSS and JavaScript bundles  
- Images and assets
- Slider data fetched from CMS at build time

## Deployment Steps

### Option 1: Upload via DirectAdmin File Manager (Easiest)

1. **Download the static files archive**:
   - File: `carta-static-build.tar.gz` (6.0 MB)
   - Location: Project root directory

2. **Login to DirectAdmin**:
   - Go to your DirectAdmin control panel
   - Navigate to File Manager

3. **Upload to your domain root**:
   - Upload `carta-static-build.tar.gz` to your public_html directory
   - Extract/decompress the file in DirectAdmin's file manager
   - Move contents from `public/` to the root of public_html

4. **Verify deployment**:
   - Visit your domain URL
   - Check that home page loads with slider images
   - Test navigation to other pages (/news, /about, /members, etc.)

### Option 2: Manual Copy (If extracted locally)

1. Copy entire contents of `.output/public/` folder
2. Paste into your DirectAdmin public_html directory
3. Replace any existing files

## Important Notes

⚠️ **API Calls at Build Time**:
- News, slider, and other content is pre-rendered from CMS API at build time
- The CMS_API_KEY was used during build to fetch data

⚠️ **Environment Variables**:
- Ensure `NUXT_PUBLIC_CMS_API_KEY` environment variable was set during build
- The API key is embedded in the pre-rendered pages (for build-time rendering only)

## What's NOT Included

❌ Server-side API routes (`/api/news`, `/api/slider`) won't work without Node.js
- These files are only in `.output/server/` (not deployed)
- All data is already pre-rendered into HTML

## Troubleshooting

### If pages don't load:
- Check file permissions (should be 644 for files, 755 for directories)
- Verify HTML files are in correct location
- Check browser console for 404 errors

### If images don't show:
- Verify `_nuxt/` directory was uploaded completely
- Check relative paths in HTML match the uploaded structure

### If links are broken:
- Check that all subdirectories (about/, news/, members/, etc.) were uploaded
- Verify `.output/public/` was the source, not `.output/`

## Next Steps

After deployment:
1. Test all main pages load correctly
2. Check images and styling display properly
3. Test navigation between pages
4. Verify responsive design on mobile/tablet

## Need to Update Content?

To update news, slider, or other CMS content:
1. Update CMS content at https://cms-api.graphmining.dev
2. Run `npm run build` locally
3. Re-upload the new `carta-static-build.tar.gz`

**Note**: The site is static and only updates when you rebuild and redeploy.
