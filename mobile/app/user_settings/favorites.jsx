// mobile/app/(tabs)/search.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      {/* Define router for back arrow */}
                          <TouchableOpacity
                            onPress={() => router.push("/user_profile")}
                        activeOpacity={0.8}>
                      <Ionicons name="arrow-back" size={30} color="#10B981" />
                    </TouchableOpacity>
      {/* Title */}
      <Text style={styles.title}>Search Favorites</Text>

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

      {/* Body (Empty for now) */}
      <View style={styles.body}>
        <Text style={styles.placeholderText}>
          Start typing to search…
        </Text>
      </View>
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
    marginBottom: 20,

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

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 15,
    color: '#6B7280',
  },
});
