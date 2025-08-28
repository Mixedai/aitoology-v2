-- Fix categories-tools relationship
-- This SQL ensures proper foreign key relationships between categories and tools

-- First, check if the foreign key already exists
DO $$ 
BEGIN
    -- Add foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'tools_category_id_fkey' 
        AND table_name = 'tools'
    ) THEN
        ALTER TABLE tools 
        ADD CONSTRAINT tools_category_id_fkey 
        FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- Create or replace the view for categories with tool counts
CREATE OR REPLACE VIEW categories_with_tool_count AS
SELECT 
    c.*,
    COALESCE(COUNT(t.id), 0) as tool_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id;

-- Grant permissions
GRANT SELECT ON categories_with_tool_count TO anon;
GRANT SELECT ON categories_with_tool_count TO authenticated;

-- Enable RLS on categories if not already enabled
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to categories
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
USING (true);

-- Also ensure tools table has proper RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to tools
DROP POLICY IF EXISTS "Tools are viewable by everyone" ON tools;
CREATE POLICY "Tools are viewable by everyone" 
ON tools FOR SELECT 
USING (true);

-- Test the relationship
SELECT 
    c.name as category_name,
    COUNT(t.id) as tool_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name
ORDER BY c.name;