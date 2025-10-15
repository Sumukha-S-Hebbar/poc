
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FacebookIcon, GoogleIcon, MicrosoftIcon, TowerBuddyLogo } from '@/components/icons/SocialIcons';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => handleBackendLogin(tokenResponse.code, 'google'),
    flow: 'auth-code',
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleFacebookLogin = () => {
    // This would typically involve using the Facebook SDK (e.g., FB.login)
    // For demonstration, we'll simulate receiving an access token.
    const fakeAccessToken = 'fake-facebook-access-token-67890';
    console.log('Received Facebook Access Token:', fakeAccessToken);
    handleBackendLogin(fakeAccessToken, 'facebook');
  };
  
  const handleMicrosoftLogin = () => {
    // This would typically involve a library like '@azure/msal-react'
    // For demonstration, we'll simulate receiving an access token.
    const fakeAccessToken = 'fake-microsoft-access-token-abcde';
    console.log('Received Microsoft Access Token:', fakeAccessToken);
    handleBackendLogin(fakeAccessToken, 'microsoft');
  };

  const handleBackendLogin = async (credential: string, provider: 'google' | 'facebook' | 'microsoft') => {
    console.log(`Sending credential to backend for provider: ${provider}`);
    // This is where you would make an API call to your own backend.
    // For example:
    // try {
    //   const response = await fetch('/api/auth/social-login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ credential, provider }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Handle successful login, e.g., store session token, redirect user
    //     console.log('Backend login successful:', data);
    //     // router.push('/dashboard');
    //   } else {
    //     // Handle backend error
    //     console.error('Backend login failed:', data.message);
    //   }
    // } catch (error) {
    //   console.error('API call failed:', error);
    // }
    alert(`Simulating backend call for ${provider} with credential: ${credential}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg md:grid md:grid-cols-2">
        <div className="flex flex-col justify-between bg-blue-500 p-8 text-white">
          <div>
            <div className="flex items-center gap-3">
              <TowerBuddyLogo className="h-12 w-12" />
              <span className="text-2xl font-bold">tower buddy</span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              START EARNING TODAY
            </h1>
          </div>
          <footer className="text-sm">
            i4sight Technologies | All Rights Reserved
          </footer>
        </div>
        <div className="p-8">
          <form>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">EMAIL ADDRESS</Label>
                <Input id="email" type="email" placeholder="Enter Email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">PASSWORD</Label>
                <Input id="password" type="password" placeholder="Enter Password" />
              </div>
            </div>
            <div className="mt-4 text-right">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button className="mt-6 w-full bg-blue-500 text-lg hover:bg-blue-600">
              Login &rarr;
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or Continue With
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12" onClick={handleGoogleLogin}>
              <GoogleIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" className="h-12" onClick={handleFacebookLogin}>
              <FacebookIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" className="h-12" onClick={handleMicrosoftLogin}>
              <MicrosoftIcon className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-8 text-center text-sm">
            Don't have an account?{' '}
            <Link href="#" className="font-medium text-blue-600 hover:underline">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
