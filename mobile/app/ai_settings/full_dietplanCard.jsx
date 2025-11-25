import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";




const BreakfastPlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.aiMessage}>
        
        <View style={styles.mealCard}>
          <Text style={styles.mealTitle}> Breakfast</Text>
          <Text style={styles.mealTime}>7:00 AM - 9:00 AM</Text>
          <Text style={styles.recipeName}> Avocado Toast with Scrambled Eggs</Text>
        </View>

      <View style={styles.nutritionContainer} accessible accessibilityLabel="Nutrition summary: Calories, Carbs, and Fat">
      <View style={styles.tile} accessibilityLabel="Calories 380">
        <Text style={styles.label}>Calories</Text>
        <Text style={styles.value}>380</Text>
      </View>

      <View style={styles.tile} accessibilityLabel="Protein 18g">
        <Text style={styles.label}>Carbs</Text>
        <Text style={styles.value}>32g</Text>
      </View>

      <View style={styles.tile} accessibilityLabel="Carbs 32g">
        <Text style={styles.label}>Fat</Text>
        <Text style={styles.value}>20g</Text>
      </View>
      <View style={styles.tile} accessibilityLabel="Fat 20g">
        <Text style={styles.label}>Fat</Text>
        <Text style={styles.value}>20g</Text>
      </View>
      </View>
      <View>
        <Text style={styles.recipeName}> INCREDIENTS:</Text>

          <Text style={styles.descriptT}> 2 Slices whole grain bread</Text>
          <Text style={styles.descriptT}> 1 ripe Avocado</Text>
          <Text style={styles.descriptT}> 2 Eggs</Text>
          <Text style={styles.descriptT}> Cherry tomatoes (optional)</Text>
          <Text style={styles.descriptT}> Salt, pepper, ad red papper flakes</Text>
      </View>
      <View>
        <Text style={styles.recipeName}> INSTRUCTIONS:</Text>

          <Text style={styles.descriptT}> Toast the bread until golden brown</Text>
          <Text style={styles.descriptT}> Mash avocado and spread on toast</Text>
          <Text style={styles.descriptT}> Scramble eggs in olive iol</Text>
          <Text style={styles.descriptT}> Top toast with scrambled eggs</Text>
          <Text style={styles.descriptT}> Season with salt, pepper, ad red papper flakes</Text>
      </View>
    
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>💾 Save to My Plans</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  aiMessage: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginVertical: 10 },
  messageText: { fontSize: 14, color: "#111" },
  mealCard: { marginTop: 10 },
  mealTitle: { fontSize: 16, fontWeight: "600" },
  mealTime: { fontSize: 12, color: "#666" },
  recipeName: { fontSize: 14, marginTop: 4, color: "#111111ff" },
  descriptT: { fontSize: 11, color: "#5c5959ff", textAlign: "justify"},
  buttonPrimary: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 12, marginTop: 16, alignItems: "center",
  flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  nutritionContainer: {
  flexDirection: "row", // 👈 makes items go left → right
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12, // optional (RN 0.71+)
  marginTop: 12,
},

  tile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb", // zinc-200-ish
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    // Android shadow
    elevation: 2,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  label: {
    fontSize: 8,
    letterSpacing: 0.5,
    color: "#6b7280", // zinc-500-ish
    textTransform: "uppercase",
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0b1020",
  },
});

export default BreakfastPlanScreen;
