import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { baseStyles } from "../assets/styles/base"; // forward slashes, no .js needed

export default function Landing() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  return (
    <LinearGradient
      colors={["#a7f3d0", "#6ee7b7", "#60a5fa"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={baseStyles.container} // use baseStyles
    >
      {/* Logo */}
      <Image
        source={require("../assets/images/Dietly_logo_white.png")} 
        style={{
          width: 80,
          height: 80,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={baseStyles.title}>Dietly</Text>

      {/* Subtitle */}
      <Text style={baseStyles.subtitle}>Your AI-powered diet planner</Text>

      {/* Arrow Button */}
      <TouchableOpacity
        style={baseStyles.arrowButton} // use baseStyles
        onPress={() => router.push("/sign-in")}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward-circle" size={64} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
