// mobile/app/fitbit-connect.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

const COLORS = {
  background: '#F9FAFB',
  text: '#1F2937',
  textLight: '#6B7280',
  white: '#FFFFFF',
  fitbitTeal: '#11d8a0ff',
};

export default function FitbitIntegrationScreen() {


const handlePress = async () => {
    const url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23TQDR&scope=activity+cardio_fitness+heartrate+nutrition+profile+sleep+weight&redirect_uri=https%3A%2F%2Fpreindulgent-romelia-unreputable.ngrok-free.dev%2Ffitbit%2Fcallback&code_challenge=Su9OOtJ919d2BrZ0mWcOQwr9XA70hVQGDVtOTB4of_0&code_challenge_method=S256&state=xyz123"; // Replace with your desired URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
    
  const handleConnect = () => {
    // TODO: Implement Fitbit OAuth connection
    console.log('Connect to Fitbit');
  };

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>

      {/* Define router for back arrow */}
                          <TouchableOpacity
                            onPress={() => router.push("/user_profile")}
                        activeOpacity={0.8}>
                      <Ionicons name="arrow-back" size={30} color="#10B981" />
                    </TouchableOpacity>
      <View style={styles.content}>
        {/* Fitbit Logo */}
        <View style={styles.logoContainer}>
          <Svg width="180" height="80" viewBox="0 0 180 80">
            <Rect width="180" height="80" rx="12" fill="white" />
            <Circle cx="90" cy="40" r="25" fill="#11d8a0ff" />
            <Path
              d="M85 40 L88 43 L95 36"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        {/* Title */}
        <Text style={styles.title}>Connect to Fitbit</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Sync your steps, heart rate, and activity data to personalize your
          diet planning.
        </Text>

        {/* Connect Button */}
        <TouchableOpacity
          style={styles.connectButton}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Ionicons name="watch-outline" size={22} color={COLORS.white} />
          <Text style={styles.buttonText}>Connect Fitbit</Text>

        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          By connecting, you allow Dietly to access your Fitbit activity and
          health data.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    maxWidth: 400,
    lineHeight: 24,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.fitbitTeal,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: COLORS.fitbitTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 350,
    lineHeight: 18,
  },
});