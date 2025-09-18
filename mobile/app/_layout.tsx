import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// Clerk imports for authentication login
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'



export default function RootLayout() {
  return (
    // This ClerkProvider function will wrapper-up the application for authentication process.
    <ClerkProvider tokenCache={tokenCache}>
    <Slot/>
    </ClerkProvider>


  ) ;
}
