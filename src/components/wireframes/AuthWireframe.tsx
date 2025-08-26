import { WireframeBox } from "../WireframeBox";

interface AuthWireframeProps {
  breakpoint: "sm" | "md" | "lg";
  variant: "login" | "register" | "reset";
}

export function AuthWireframe({ breakpoint, variant }: AuthWireframeProps) {
  if (breakpoint === "sm") {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <WireframeBox width={120} height={32} className="mx-auto">AI TOOLOGIST</WireframeBox>
          <WireframeBox height={24}>
            {variant === "login" ? "WELCOME BACK" : 
             variant === "register" ? "CREATE ACCOUNT" : 
             "RESET PASSWORD"}
          </WireframeBox>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {variant === "register" && (
            <WireframeBox height={40}>FULL NAME</WireframeBox>
          )}
          <WireframeBox height={40}>EMAIL ADDRESS</WireframeBox>
          {variant !== "reset" && (
            <WireframeBox height={40}>PASSWORD</WireframeBox>
          )}
          {variant === "register" && (
            <WireframeBox height={40}>CONFIRM PASSWORD</WireframeBox>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <WireframeBox height={48} filled>
            {variant === "login" ? "SIGN IN" : 
             variant === "register" ? "CREATE ACCOUNT" : 
             "SEND RESET LINK"}
          </WireframeBox>
          
          {variant === "login" && (
            <>
              <WireframeBox height={24}>FORGOT PASSWORD?</WireframeBox>
              <WireframeBox height={2} className="bg-black"></WireframeBox>
              <WireframeBox height={40}>SIGN IN WITH GOOGLE</WireframeBox>
              <WireframeBox height={24}>DON'T HAVE AN ACCOUNT?</WireframeBox>
            </>
          )}
          
          {variant === "register" && (
            <>
              <WireframeBox height={40}>□ AGREE TO TERMS</WireframeBox>
              <WireframeBox height={24}>ALREADY HAVE ACCOUNT?</WireframeBox>
            </>
          )}
          
          {variant === "reset" && (
            <WireframeBox height={24}>BACK TO LOGIN</WireframeBox>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="w-1/2 p-12 space-y-8">
          <WireframeBox width={150} height={40}>AI TOOLOGIST</WireframeBox>
          <div className="space-y-4">
            <WireframeBox height={48}>DISCOVER THE BEST AI TOOLS FOR YOUR WORKFLOW</WireframeBox>
            <WireframeBox height={300}>HERO IMAGE / ILLUSTRATION</WireframeBox>
            <WireframeBox height={60}>TESTIMONIAL OR FEATURES</WireframeBox>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <WireframeBox height={32}>
                {variant === "login" ? "WELCOME BACK" : 
                 variant === "register" ? "CREATE YOUR ACCOUNT" : 
                 "RESET YOUR PASSWORD"}
              </WireframeBox>
              <WireframeBox height={24}>
                {variant === "login" ? "SIGN IN TO YOUR ACCOUNT" : 
                 variant === "register" ? "GET STARTED WITH AI TOOLOGIST" : 
                 "ENTER YOUR EMAIL TO RESET"}
              </WireframeBox>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {variant === "register" && (
                <div className="space-y-2">
                  <WireframeBox height={20}>FULL NAME</WireframeBox>
                  <WireframeBox height={48}>INPUT FIELD</WireframeBox>
                </div>
              )}
              
              <div className="space-y-2">
                <WireframeBox height={20}>EMAIL ADDRESS</WireframeBox>
                <WireframeBox height={48}>INPUT FIELD</WireframeBox>
              </div>

              {variant !== "reset" && (
                <div className="space-y-2">
                  <WireframeBox height={20}>PASSWORD</WireframeBox>
                  <WireframeBox height={48}>INPUT FIELD</WireframeBox>
                </div>
              )}

              {variant === "register" && (
                <div className="space-y-2">
                  <WireframeBox height={20}>CONFIRM PASSWORD</WireframeBox>
                  <WireframeBox height={48}>INPUT FIELD</WireframeBox>
                </div>
              )}

              {variant === "login" && (
                <div className="flex justify-between items-center">
                  <WireframeBox width={120} height={20}>□ REMEMBER ME</WireframeBox>
                  <WireframeBox width={120} height={20}>FORGOT PASSWORD?</WireframeBox>
                </div>
              )}

              {variant === "register" && (
                <WireframeBox height={40}>□ I AGREE TO TERMS AND CONDITIONS</WireframeBox>
              )}
            </div>

            {/* Primary Action */}
            <WireframeBox height={48} filled>
              {variant === "login" ? "SIGN IN" : 
               variant === "register" ? "CREATE ACCOUNT" : 
               "SEND RESET LINK"}
            </WireframeBox>

            {/* Divider & Social */}
            {variant !== "reset" && (
              <>
                <div className="flex items-center gap-4">
                  <WireframeBox height={1} className="flex-1 bg-black"></WireframeBox>
                  <WireframeBox width={40} height={20}>OR</WireframeBox>
                  <WireframeBox height={1} className="flex-1 bg-black"></WireframeBox>
                </div>

                <div className="space-y-3">
                  <WireframeBox height={48}>CONTINUE WITH GOOGLE</WireframeBox>
                  <WireframeBox height={48}>CONTINUE WITH GITHUB</WireframeBox>
                </div>
              </>
            )}

            {/* Footer Links */}
            <div className="text-center">
              {variant === "login" && (
                <WireframeBox height={24}>DON'T HAVE AN ACCOUNT? SIGN UP</WireframeBox>
              )}
              {variant === "register" && (
                <WireframeBox height={24}>ALREADY HAVE AN ACCOUNT? SIGN IN</WireframeBox>
              )}
              {variant === "reset" && (
                <WireframeBox height={24}>BACK TO SIGN IN</WireframeBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}