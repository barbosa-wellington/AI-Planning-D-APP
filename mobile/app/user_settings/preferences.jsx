// import { View, Text } from "react-native";
// import React from "react";


// const preference = () => {


//     return (
//         <View>
//       {/* Page Content */}
//       <Text>preference This is a test page.</Text>
//       <Text>preference This is a test page.</Text>
      

//     </View>
//   );
// };
// export default preference;

// mobile/app/dietary-preferences.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#F9FAFB',
  text: '#1F2937',
  textLight: '#6B7280',
  white: '#FFFFFF',
  primary: '#10B981',
  border: '#D1D5DB',
};

export default function DietaryPreferences() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: '',
    allergies: '',
    dislikedFoods: '',
  });

  const handleSave = () => {
    // Validation
    if (!preferences.dietaryRestrictions && !preferences.allergies && !preferences.dislikedFoods) {
      Alert.alert('Notice', 'Please fill at least one field');
      return;
    }

    // TODO: Save to backend API
    console.log('Saving preferences:', preferences);
    
    Alert.alert('Success', 'Your dietary preferences have been saved!');
  };

  const handleClear = () => {
    setPreferences({
      dietaryRestrictions: '',
      allergies: '',
      dislikedFoods: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="restaurant-outline" size={48} color={COLORS.primary} />
            <Text style={styles.title}>Dietary Preferences</Text>
            <Text style={styles.subtitle}>
              Tell us about your dietary needs and preferences
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            
            {/* Dietary Restrictions */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="nutrition-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.label}>Dietary Restrictions</Text>
              </View>
              <Text style={styles.hint}>
                e.g., Vegetarian, Vegan, Keto, Gluten-Free
              </Text>
              <TextInput
                style={styles.textInput}
                value={preferences.dietaryRestrictions}
                onChangeText={(text) =>
                  setPreferences({ ...preferences, dietaryRestrictions: text })
                }
                placeholder="Enter your dietary restrictions"
                placeholderTextColor={COLORS.textLight}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Allergies */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="warning-outline" size={20} color="#EF4444" />
                <Text style={styles.label}>Allergies</Text>
              </View>
              <Text style={styles.hint}>
                e.g., Peanuts, Dairy, Shellfish, Eggs
              </Text>
              <TextInput
                style={styles.textInput}
                value={preferences.allergies}
                onChangeText={(text) =>
                  setPreferences({ ...preferences, allergies: text })
                }
                placeholder="Enter your allergies"
                placeholderTextColor={COLORS.textLight}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Disliked Foods */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="close-circle-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.label}>Disliked Foods</Text>
              </View>
              <Text style={styles.hint}>
                e.g., Mushrooms, Olives, Broccoli
              </Text>
              <TextInput
                style={styles.textInput}
                value={preferences.dislikedFoods}
                onChangeText={(text) =>
                  setPreferences({ ...preferences, dislikedFoods: text })
                }
                placeholder="Enter foods you dislike"
                placeholderTextColor={COLORS.textLight}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
                <Text style={styles.saveButtonText}>Save Preferences</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                activeOpacity={0.8}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 28,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});

