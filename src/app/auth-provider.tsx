'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, type Configuration } from '@azure/msal-browser';
import type { ReactNode } from 'react';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const msalClientId = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID;
const msalTenantId = process.env.NEXT_PUBLIC_MSAL_TENANT_ID;

// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: msalClientId || '',
    authority: `https://login.microsoftonline.com/${msalTenantId || 'common'}`,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default function AuthProvider({ children }: { children: ReactNode }) {
  let content = <>{children}</>;

  if (msalClientId && msalTenantId) {
    content = <MsalProvider instance={msalInstance}>{content}</MsalProvider>;
  } else {
    console.warn("Microsoft MSAL configuration is missing. Please add NEXT_PUBLIC_MSAL_CLIENT_ID and NEXT_PUBLIC_MSAL_TENANT_ID to your .env file.");
  }

  if (googleClientId && googleClientId !== "YOUR_GOOGLE_CLIENT_ID_HERE") {
    content = <GoogleOAuthProvider clientId={googleClientId}>{content}</GoogleOAuthProvider>;
  } else {
    console.warn("Google Client ID is not configured. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env file.");
  }

  // Note: Facebook SDK is usually loaded via a script tag in the main HTML, not a provider.
  // You would initialize it in a useEffect hook in your login component or a top-level component.

  return content;
}
