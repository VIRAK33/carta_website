# News Pages Migration to CMS API

## Summary
Successfully migrated the news pages from the previous data source to the new CMS GraphQL Mining API.

## Files Modified
1. **pages/news/index.vue** - News list page
2. **pages/news/[slug].vue** - News detail page

## Backup Files Created
- `.backups/news-index.vue.backup` - Original news list page
- `.backups/news-[slug].vue.backup` - Original news detail page

## API Configuration
- **Endpoint**: `https://cms.graphmining.dev/api/public/1e549040-d9a9-4567-b65e-09d313f1fd81/news`
- **API Key**: `NUXT_PUBLIC_CMS_API_KEY` (stored in `.env`)
- **Site ID**: `1e549040-d9a9-4567-b65e-09d313f1fd81`

## Data Structure Changes

### Old Structure
```javascript
{
  success: boolean,
  data: [
    {
      data: {
        slug: string,
        short_content: string,
        thumbnail: string,
        title: string,
        content: string,
      },
      createdAt: string,
      updatedAt: string,
      id: string,
    }
  ],
  pagination: { page, limit, total, totalPages }
}
```

### New Structure (CMS API)
```javascript
{
  success: boolean,
  data: [
    {
      id: string,
      data: {
        thumbnail: string (full URL),
        content: string (HTML),
        title: string,
        gallery: string[] (array of full URLs),
      },
      createdAt: string,
      updatedAt: string,
    }
  ],
  pagination: { page, limit, total, totalPages }
}
```

## Key Changes

### 1. News List Page (`pages/news/index.vue`)
- ✅ Uses CMS API endpoint directly
- ✅ Fetches with pagination support
- ✅ Routes use item `id` instead of `slug`
- ✅ Short content extracted from HTML `content` field
- ✅ Gallery images handled directly (full URLs)
- ✅ Date formatting with `moment` library

### 2. News Detail Page (`pages/news/[slug].vue`)
- ✅ Parameter name `[slug]` actually contains the item `id`
- ✅ Fetches individual news by ID from CMS API
- ✅ Gallery images handled directly (full URLs)
- ✅ No "slug" field in metadata (removed)
- ✅ Excerpt generation from HTML content
- ✅ SEO meta tags updated with dynamic URLs

## Features Maintained
- ✅ Infinite scroll pagination on list page
- ✅ Full HTML content rendering on detail page
- ✅ Gallery image display
- ✅ SEO meta tags (title, description, OG tags, Twitter cards)
- ✅ Dark mode support
- ✅ Responsive design

## Features Enhanced
- ✅ Gallery images now load directly from S3 (no image processing needed)
- ✅ API responses include structured metadata
- ✅ Pagination information provided by API

## Next Steps (if needed)
1. Test the infinite scroll pagination
2. Verify gallery image loading
3. Check SEO meta tags in browser dev tools
4. Validate responsive design on different screen sizes
5. Test dark mode functionality
6. Consider caching strategies for frequently accessed articles

## Environment Variables Required
```
NUXT_PUBLIC_CMS_API_KEY=your_api_key_here
```

Ensure this is set in your `.env` file.
