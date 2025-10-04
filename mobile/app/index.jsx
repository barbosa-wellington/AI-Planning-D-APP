import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/dietly-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App name */}
      <Text style={styles.title}>Dietly</Text>
      <Text style={styles.subtitle}>Your AI-powered diet planner</Text>

      {/* Arrow button */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => router.push("/(auth)/sign-in")}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward-circle" size={64} color="#22c55e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#3b82f6",
    textAlign: "center",
    marginBottom: 40,
  },
  arrowButton: {
    marginTop: 40,
  },
});
