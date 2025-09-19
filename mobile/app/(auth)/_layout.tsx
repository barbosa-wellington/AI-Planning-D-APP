import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
    // This function will validate the user authentication
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />;
  }

  return <Stack />
}