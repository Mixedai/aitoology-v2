# Supabase Database Setup Guide

## Overview
This guide will help you set up the Supabase database for the AI Tools platform.

## Prerequisites
- Supabase account (create one at https://supabase.com)
- Node.js installed
- Environment variables configured

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Project name: `aitoology` (or your preferred name)
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Click "Create new project"

## Step 2: Get API Keys

1. Go to Settings → API in your Supabase dashboard
2. Copy these values:
   - Project URL (VITE_SUPABASE_URL)
   - Anon/Public key (VITE_SUPABASE_ANON_KEY)
   - Service role key (SUPABASE_SERVICE_ROLE_KEY) - keep this secret!

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 4: Run Database Migrations

1. Go to SQL Editor in Supabase dashboard
2. Create a new query
3. Copy the contents of `supabase/schema.sql`
4. Run the query to create all tables and policies

## Step 5: Seed Initial Data

### Option A: Using the seed script (recommended)
```bash
# Install dependencies
npm install

# Run the seed script
npx tsx supabase/seed.ts
```

### Option B: Manual seeding via SQL
1. Go to SQL Editor in Supabase dashboard
2. Run insert queries for initial categories and tools

## Step 6: Configure Authentication

1. Go to Authentication → Providers in Supabase
2. Enable Email provider (already enabled by default)
3. Enable Google OAuth:
   - Get OAuth credentials from Google Cloud Console
   - Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`
4. Enable GitHub OAuth:
   - Create OAuth App in GitHub settings
   - Add callback URL: `https://your-project.supabase.co/auth/v1/callback`

## Step 7: Set Up Storage (Optional)

If you want to store images:

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `avatars` for user profile pictures
3. Create a bucket called `tool-logos` for tool images
4. Set appropriate policies for public/private access

## Step 8: Enable Realtime

1. Go to Database → Replication in Supabase
2. Enable replication for these tables:
   - tools (for live updates)
   - reviews (for new reviews)
   - tool_stats (for view counts)

## Testing the Setup

1. Start the development server:
```bash
npm run dev
```

2. Test features:
   - View tools list (should load from database)
   - Sign up for an account
   - Add tools to favorites
   - Write a review
   - Create a collection

## Troubleshooting

### Common Issues:

1. **"relation does not exist" error**
   - Make sure you ran the schema.sql file
   - Check that you're connected to the right database

2. **Authentication not working**
   - Verify environment variables are correct
   - Check that auth providers are enabled
   - Ensure redirect URLs are configured

3. **Data not loading**
   - Check RLS policies are set correctly
   - Verify the seed script ran successfully
   - Check browser console for errors

4. **Real-time not working**
   - Enable replication for the required tables
   - Check that WebSocket connections are allowed

## Security Notes

- Never commit `.env` file to version control
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use RLS policies to protect data
- Regularly rotate API keys
- Monitor usage in Supabase dashboard

## Next Steps

- Set up backup policies
- Configure rate limiting
- Add monitoring and analytics
- Set up production environment variables
- Configure custom domain (optional)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)