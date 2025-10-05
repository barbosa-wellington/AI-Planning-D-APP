import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";



// This is the homescreen file that shows the application Logo.

export default function Landing() {
  const router = useRouter();

  const { width, height }= Dimensions.get("window");
  return (

    // personalizing the background to match with the logo
    <LinearGradient
    colors={["#a7f3d0", "#6ee7b7", "#60a5fa"]} // lighter green to light teal to sky blue
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
  >
    {/* Logo */}
    <Image
      source={require("../assets/images/dietly-logo-v2.png")}
      style={{
        width: width * 0.9,
        height: height * 0.4,
        marginBottom: 30,
      }}
      resizeMode="contain"
    />

    {/* Subtitle */}
    <Text style={styles.subtitle}>Your AI-powered diet planner</Text>

    {/* Arrow Button */}
    <TouchableOpacity
      style={styles.arrowButton}
      onPress={() => router.push("/(auth)/sign-in")}
      activeOpacity={0.8}
    >
      <Ionicons name="arrow-forward-circle" size={64} color="#fff" />
    </TouchableOpacity>
  </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151", // gray-700
    textAlign: "center",
    marginBottom: 40,
  },
  arrowButton: {
    marginTop: 10,
  },
});