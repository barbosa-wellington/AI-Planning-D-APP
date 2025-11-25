import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import DietPlanCard from '../ai_settings/brief_dietplanCard'; 
// ✅ correct path from app/(tabs) to components

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // ✅ MOCK dietplans shaped for YOUR DietPlanCard
  const MOCK_PLANS = [
    {
      id: 'dp-1',
      title: 'Grilled Salmon with Asparagus',
      calories: 380,
      // durationMin: 20,
      createdAt: '2 days ago',
      emoji: '🐟',
      ingredients: ['Salmon', 'Asparagus', 'Lemon', 'Garlic'],
    },
    {
      id: 'dp-2',
      title: 'Salmon Sushi Bowl',
      calories: 450,
      // durationMin: 25,
      createdAt: '5 days ago',
      emoji: '🍣',
      ingredients: ['Salmon', 'Rice', 'Avocado', 'Soy sauce'],
    },
    {
      id: 'dp-3',
      title: 'Chicken Buddha Bowl',
      calories: 480,
      // durationMin: 30,
      createdAt: '1 week ago',
      emoji: '🍲',
      ingredients: ['Chicken', 'Brown rice', 'Broccoli'],
    },
  ];

  // ✅ results update live as user types
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return MOCK_PLANS.filter((plan) => {
      const inTitle = plan.title.toLowerCase().includes(q);
      const inIngredients = plan.ingredients
        .join(' ')
        .toLowerCase()
        .includes(q);

      return inTitle || inIngredients;
    });
  }, [query]);

  const renderItem = ({ item }) => (
    <DietPlanCard
      plan={item}
      onPress={() => {
        // ✅ when your real screen is ready:
        // router.push(`/dietplan/${item.id}`)
        console.log("Go to details:", item.id);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Search dietplans</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color="#9CA3AF"
            onPress={() => setQuery('')}
          />
        )}
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={() =>
          query.trim().length > 0 ? (
            <Text style={styles.placeholderText}>
              No diet plans found.
            </Text>
          ) : (
            <Text style={styles.placeholderText}>
              Start typing to search…
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  placeholderText: {
    marginTop: 20,
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
});

