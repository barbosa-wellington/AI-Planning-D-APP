// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";




// const BreakfastPlanScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.aiMessage}>
        
//         <View style={styles.mealCard}>
//           <Text style={styles.mealTitle}> Breakfast</Text>
//           <Text style={styles.mealTime}>7:00 AM - 9:00 AM</Text>
//           <Text style={styles.recipeName}> Avocado Toast with Scrambled Eggs</Text>
//         </View>

//       <View style={styles.nutritionContainer} accessible accessibilityLabel="Nutrition summary: Calories, Carbs, and Fat">
//       <View style={styles.tile} accessibilityLabel="Calories 380">
//         <Text style={styles.label}>Calories</Text>
//         <Text style={styles.value}>380</Text>
//       </View>

//       <View style={styles.tile} accessibilityLabel="Protein 18g">
//         <Text style={styles.label}>Carbs</Text>
//         <Text style={styles.value}>32g</Text>
//       </View>

//       <View style={styles.tile} accessibilityLabel="Carbs 32g">
//         <Text style={styles.label}>Fat</Text>
//         <Text style={styles.value}>20g</Text>
//       </View>
//       <View style={styles.tile} accessibilityLabel="Fat 20g">
//         <Text style={styles.label}>Fat</Text>
//         <Text style={styles.value}>20g</Text>
//       </View>
//       </View>
//       <View>
//         <Text style={styles.recipeName}> INCREDIENTS:</Text>

//           <Text style={styles.descriptT}> 2 Slices whole grain bread</Text>
//           <Text style={styles.descriptT}> 1 ripe Avocado</Text>
//           <Text style={styles.descriptT}> 2 Eggs</Text>
//           <Text style={styles.descriptT}> Cherry tomatoes (optional)</Text>
//           <Text style={styles.descriptT}> Salt, pepper, ad red papper flakes</Text>
//       </View>
//       <View>
//         <Text style={styles.recipeName}> INSTRUCTIONS:</Text>

//           <Text style={styles.descriptT}> Toast the bread until golden brown</Text>
//           <Text style={styles.descriptT}> Mash avocado and spread on toast</Text>
//           <Text style={styles.descriptT}> Scramble eggs in olive iol</Text>
//           <Text style={styles.descriptT}> Top toast with scrambled eggs</Text>
//           <Text style={styles.descriptT}> Season with salt, pepper, ad red papper flakes</Text>
//       </View>
    
//         <TouchableOpacity style={styles.buttonPrimary}>
//           <Text style={styles.buttonText}>💾 Save to My Plans</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
//   aiMessage: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginVertical: 10 },
//   messageText: { fontSize: 14, color: "#111" },
//   mealCard: { marginTop: 10 },
//   mealTitle: { fontSize: 16, fontWeight: "600" },
//   mealTime: { fontSize: 12, color: "#666" },
//   recipeName: { fontSize: 14, marginTop: 4, color: "#111111ff" },
//   descriptT: { fontSize: 11, color: "#5c5959ff", textAlign: "justify"},
//   buttonPrimary: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 12, marginTop: 16, alignItems: "center",
//   flexDirection: "row", justifyContent: "space-between", alignItems: "center"
//   },
//   nutritionContainer: {
//   flexDirection: "row", // 👈 makes items go left → right
//   justifyContent: "space-between",
//   alignItems: "center",
//   gap: 12, // optional (RN 0.71+)
//   marginTop: 12,
// },

//   tile: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#e5e7eb", // zinc-200-ish
//     // iOS shadow
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     // Android shadow
//     elevation: 2,
//   },
//   buttonText: { color: "#fff", fontWeight: "600" },
//   label: {
//     fontSize: 8,
//     letterSpacing: 0.5,
//     color: "#6b7280", // zinc-500-ish
//     textTransform: "uppercase",
//     marginBottom: 2,
//   },
//   value: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: "#0b1020",
//   },
// });

// export default BreakfastPlanScreen;


// ai_response_diet.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DietPlanCard from "./ai_response_diet"; // adjust path if needed


const DietPlanCard = ({ meal, onSave }) => {
  if (!meal) return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.mealHeader}>
        <Text style={styles.mealTime}>{meal.time_meal}</Text>
        <Text style={styles.mealTitle}>{meal.time_diet}</Text>
      </View>
      <Text style={styles.recipeName}>{meal.diet_plan}</Text>

      {/* Macros row */}
      <View style={styles.nutritionRow}>
        <View style={styles.tile}>
          <Text style={styles.label}>Calories</Text>
          <Text style={styles.value}>{meal.calories}</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.label}>Protein</Text>
          <Text style={styles.value}>{meal.protein}g</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.label}>Carbs</Text>
          <Text style={styles.value}>{meal.carbs}g</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.label}>Fat</Text>
          <Text style={styles.value}>{meal.fat}g</Text>
        </View>
      </View>

      {/* Ingredients */}
      <View style={{ marginTop: 12 }}>
        <Text style={styles.sectionTitle}>INGREDIENTS</Text>
        {meal.ingridients?.map((item, idx) => (
          <Text key={idx} style={styles.itemText}>
            • {item}
          </Text>
        ))}
      </View>

      {/* Instructions */}
      <View style={{ marginTop: 12 }}>
        <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
        {meal.instructions?.map((step, idx) => (
          <Text key={idx} style={styles.itemText}>
            {idx + 1}. {step}
          </Text>
        ))}
      </View>

      {/* Save button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log("🧪 Save button pressed in DietPlanCard");
          onSave?.(meal);  // VERY IMPORTANT
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>💾 Save to My Plans</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  mealTitle: { fontSize: 14, fontWeight: "600", color: "#111827" },
  mealTime: { fontSize: 12, color: "#6B7280" },
  recipeName: { fontSize: 14, fontWeight: "500", marginTop: 4, color: "#111827" },

  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tile: {
    flex: 1,
    marginHorizontal: 3,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#6B7280",
    marginBottom: 2,
  },
  value: { fontSize: 14, fontWeight: "700", color: "#111827" },

  sectionTitle: { fontSize: 13, fontWeight: "600", marginBottom: 4, color: "#111827" },
  itemText: { fontSize: 13, color: "#374151", marginBottom: 2 },

  saveButton: {
    marginTop: 14,
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
});

export default DietPlanCard;
