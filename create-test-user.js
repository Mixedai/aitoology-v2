// Node.js script to create user with service role key
// Run with: node create-test-user.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTestUser() {
  try {
    // Create user with admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'testuser@gmail.com',
      password: 'TestUser123!',
      email_confirm: true, // Auto confirm email
      user_metadata: {
        full_name: 'Test User'
      }
    });

    if (error) {
      console.error('Error creating user:', error);
      return;
    }

    console.log('✅ User created successfully!');
    console.log('Email:', data.user.email);
    console.log('ID:', data.user.id);
    console.log('Confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        full_name: 'Test User',
        username: 'testuser',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Profile error:', profileError);
    } else {
      console.log('✅ Profile created!');
    }

    console.log('\n📝 Login credentials:');
    console.log('Email: testuser@gmail.com');
    console.log('Password: TestUser123!');

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createTestUser();