-- First, check the current structure of tools table
-- and add category_id column if it doesn't exist

-- Add category_id column to tools table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'tools' 
        AND column_name = 'category_id'
    ) THEN
        ALTER TABLE tools 
        ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Update tools to assign them to categories based on category name
UPDATE tools 
SET category_id = categories.id
FROM categories
WHERE tools.category = categories.name;

-- Now we can fetch categories properly
-- Let's also update the categories to use the slug properly
UPDATE categories SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL;

-- Enable RLS on both tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Tools are viewable by everyone" ON tools;
CREATE POLICY "Tools are viewable by everyone" 
ON tools FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);

-- Test query to verify the setup
SELECT 
    c.name as category_name,
    c.slug,
    COUNT(t.id) as tool_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.slug
ORDER BY c.name;