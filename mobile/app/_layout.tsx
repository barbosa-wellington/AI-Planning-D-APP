import { SafeAreaView } from "react-native-safe-area-context";
// Clerk imports for authentication login
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import SafeScreen from "@/components/SafeScreen";


export default function RootLayout() {
  return (
    // This ClerkProvider function will wrapper-up the application for authentication process. 
    <ClerkProvider tokenCache={tokenCache}>
      {/* Modify the the view so that it will be visible on a screen structure. */}
    
    {/* <SafeAreaView style={{ flex: 1}}>
      <Slot />
    </SafeAreaView> */}
    <SafeScreen>
      <Slot / >
    </SafeScreen>
    </ClerkProvider>


  ) ;
}
