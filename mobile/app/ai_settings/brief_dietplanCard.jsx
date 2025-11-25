import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DietPlanCard({ plan, onPress }) {
  // plan example fields you may have:
  // plan.title, plan.calories, plan.durationMin, plan.ingredients[], plan.createdAt
  const ingredients = plan?.ingredients ?? [];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.emojiCircle}>
            <Text style={styles.emojiText}>{plan?.emoji ?? "🥗"}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>AI Generated</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {plan?.title ?? "Diet Plan Title"}
        </Text>

        {/* Meta row */}
        <View style={styles.metaRow}>
          {/* <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>
              {plan?.durationMin ?? "--"} min
            </Text>
          </View> */}

          <View style={styles.metaItem}>
            <Ionicons name="heart-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>
              {plan?.calories ?? "--"} cal
            </Text>
          </View>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionLabel}>Main Ingredients</Text>
        <View style={styles.chipsRow}>
          {ingredients.slice(0, 3).map((ing, i) => (
            <View key={`${ing}-${i}`} style={styles.chip}>
              <Text style={styles.chipText}>{ing}</Text>
            </View>
          ))}

          {ingredients.length > 3 && (
            <View style={styles.moreChip}>
              <Text style={styles.moreChipText}>
                +{ingredients.length - 3} more
              </Text>
            </View>
          )}
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <Text style={styles.createdText}>
            Generated {plan?.createdAt ?? "recently"}
          </Text>

          <View style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardContent: {
    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  emojiCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 26,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#10B981",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 12,
    color: "#1D4ED8",
    fontWeight: "700",
  },
  moreChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  moreChipText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createdText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
  },

  detailsButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});