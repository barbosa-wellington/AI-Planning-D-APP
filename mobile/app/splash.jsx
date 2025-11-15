import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, Dimensions, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { baseStyles } from "../assets/styles/base";

export default function Splash() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate progress from 0 to 100% over 3 seconds
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      router.replace("/"); // Navigate to Get Started screen
    });
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.8], // 80% of screen width
  });

  return (
    <ImageBackground
      source={require("../assets/images/Dietly-bg.png")}
      style={baseStyles.container}
      resizeMode="cover"
    >
      <Image
        source={require("../assets/images/Dietly_logo_white.png")}
        style={{ width: 80, height: 80, marginBottom: 10 }}
        resizeMode="contain"
      />
      <Text style={baseStyles.title}>Dietly</Text>
      <Text style={baseStyles.subtitle}>Your AI-powered diet planner</Text>

      {/* Custom progress bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "80%",
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    marginTop: 40,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});
