-- Create tool_wallet table for users saved tools
CREATE TABLE IF NOT EXISTS tool_wallet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  subscription_type TEXT DEFAULT 'free',
  subscription_start_date DATE,
  subscription_end_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, tool_id)
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email_notifications BOOLEAN DEFAULT true,
  weekly_digest BOOLEAN DEFAULT true,
  product_updates BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  theme TEXT DEFAULT 'light',
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_interests table
CREATE TABLE IF NOT EXISTS user_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, category_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE tool_wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;

-- Tool wallet policies
CREATE POLICY "Users can view own tool wallet" 
  ON tool_wallet FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own tool wallet" 
  ON tool_wallet FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tool wallet" 
  ON tool_wallet FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from own tool wallet" 
  ON tool_wallet FOR DELETE 
  USING (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can view own preferences" 
  ON user_preferences FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" 
  ON user_preferences FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" 
  ON user_preferences FOR UPDATE 
  USING (auth.uid() = user_id);

-- User interests policies
CREATE POLICY "Users can view own interests" 
  ON user_interests FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own interests" 
  ON user_interests FOR ALL 
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tool_wallet_user_id ON tool_wallet(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_wallet_tool_id ON tool_wallet(tool_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_user_id ON user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_category_id ON user_interests(category_id);