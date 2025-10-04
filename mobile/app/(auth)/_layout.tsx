import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
    // This function will validate the user authentication
  const { isSignedIn } = useAuth();

  // If user signIn then he will be redirect to the home page.
  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />;
  }


  return <Stack screenOptions={{ headerShown: false}}

  />
}