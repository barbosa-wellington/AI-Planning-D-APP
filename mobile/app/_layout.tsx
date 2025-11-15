import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import * as Font from "expo-font";

// Clerk imports for authentication login
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, Redirect, usePathname } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import SafeScreen from "@/components/SafeScreen";

function RootNavigator() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();

  if (!isLoaded) return null; // still loading Clerk

  // redirect logic
  if (!isSignedIn && pathname.startsWith("/(tabs)")) {
    return <Redirect href="/" />;
  }

  if (isSignedIn && pathname.startsWith("/(auth)")) {
    return <Redirect href="/home_screen" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Shorelines Script Bold": require("../assets/fonts/ShorelinesScriptBold.otf"), // Logo font
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Show a spinner until fonts are loaded
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <RootNavigator />
      </SafeScreen>
    </ClerkProvider>
  );
}
