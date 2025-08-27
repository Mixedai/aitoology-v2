// Bu kodu localhost:5173'te console'da çalıştırın

// Önce mevcut durumu temizle
localStorage.removeItem('sb-tbvfyhtkrvetmcibalfb-auth-token');

// Doğru formatta session oluştur
const sessionData = {
  currentSession: {
    access_token: "eyJhbGciOiJIUzI1NiIsImtpZCI6InlKTys1TmsyaWtoWUpXcVAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3RidmZ5aHRrcnZldG1jaWJhbGZiLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiZTE1NDZhZC0zNWNkLTQ3ZjEtOTkzMS1kZmRmNWM3ODI1YjUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoyMDcxODE0NzM2LCJpYXQiOjE3NTYyOTgwMjUsImVtYWlsIjoiZGVtb0B0ZXN0LmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzU2Mjk4MDI1fV0sInNlc3Npb25faWQiOiI4MWVmOGVlNS1jNDM4LTRmODctYmNhMC05ZDZkMWY0MzI2ZmMiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.EeIe0-A7IpCjBDKO_wqkfpT7mTfEkNYoVjkj9tQZrKs",
    refresh_token: "test_refresh_token",
    expires_in: 3600000,
    expires_at: 2071814736,
    token_type: "bearer",
    user: {
      id: "be1546ad-35cd-47f1-9931-dfdf5c7825b5",
      aud: "authenticated",
      role: "authenticated",
      email: "demo@test.com",
      email_confirmed_at: "2025-08-27T11:58:21.05067Z",
      phone: "",
      confirmed_at: "2025-08-27T11:58:21.05067Z",
      last_sign_in_at: "2025-08-27T12:33:45.065017267Z",
      app_metadata: {
        provider: "email",
        providers: ["email"]
      },
      user_metadata: {
        email_verified: true
      },
      identities: [{
        identity_id: "866ffe7b-2c50-4a78-bee7-799570966282",
        id: "be1546ad-35cd-47f1-9931-dfdf5c7825b5",
        user_id: "be1546ad-35cd-47f1-9931-dfdf5c7825b5",
        identity_data: {
          email: "demo@test.com",
          email_verified: true,
          phone_verified: false,
          sub: "be1546ad-35cd-47f1-9931-dfdf5c7825b5"
        },
        provider: "email",
        last_sign_in_at: "2025-08-27T11:58:21.047559Z",
        created_at: "2025-08-27T11:58:21.047617Z",
        updated_at: "2025-08-27T11:58:21.047617Z",
        email: "demo@test.com"
      }],
      created_at: "2025-08-27T11:58:21.046008Z",
      updated_at: "2025-08-27T12:33:45.068962Z",
      is_anonymous: false
    }
  },
  expiresAt: 2071814736
};

// Session'ı kaydet
localStorage.setItem('sb-tbvfyhtkrvetmcibalfb-auth-token', JSON.stringify(sessionData));

// Kontrol et
const saved = localStorage.getItem('sb-tbvfyhtkrvetmcibalfb-auth-token');
console.log('Session saved:', !!saved);

if (saved) {
  const parsed = JSON.parse(saved);
  console.log('User email:', parsed.currentSession?.user?.email);
  console.log('Token starts with:', parsed.currentSession?.access_token?.substring(0, 50));
}

// Sayfayı yenile
console.log('Reloading page in 1 second...');
setTimeout(() => location.reload(), 1000);