import { SafeAreaView } from "react-native-safe-area-context";
// Clerk imports for authentication login
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, Redirect, usePathname } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import SafeScreen from "@/components/SafeScreen";

function RootNavigator() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();

  if (!isLoaded) return null; // still loading Clerk

  // this code is working
   // If user is not signed in AND tries to go inside tabs → send to landing
  if (!isSignedIn && pathname.startsWith('/(tabs)')) {
    return <Redirect href="/" />;
  }

  // If user is signed in but tries to go to auth → send to tabs
  if (isSignedIn && pathname.startsWith('/(auth)')) {
    return <Redirect href="/(tabs)" />;
  
  }


  return <Slot />;
}

export default function RootLayout() {
  return (
    // This ClerkProvider function will wrapper-up the application for authentication process. 
    <ClerkProvider tokenCache={tokenCache}>
      {/* Modify the the view so that it will be visible on a screen structure. */}
    
    {/* <SafeAreaView style={{ flex: 1}}>
      <Slot />
    </SafeAreaView> */}
    <SafeScreen>
      {/* <Slot / > */}
      <RootNavigator/>
    </SafeScreen>
    </ClerkProvider>


  ) ;
}
