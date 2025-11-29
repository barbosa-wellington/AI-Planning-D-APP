// import { View, Text } from "react-native";
// import React from "react";


// const ai_assistant = () => {


//     return (
//         <View>
//       {/* Page Content */}
//       <Text>AI Assistant screen.</Text>
//       <Text>AI Assistant screen.</Text>

//     </View>
//   );
// };
// export default ai_assistant;


import React, { useRef, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DietPlanCard from "../testing/ai_response_diet"; // adjust path if needed

// TODO: set this for your environment:
const MACHINE = "192.168.4.32";
const BASE_URL = Platform.OS == "web" ? "http://localhost:8000" : `http://${MACHINE}:8000`; // <-- replace with YOUR_PC_LAN_IP or emulator URL


const BACKEND_URL = Platform.OS == "web" ? "http://localhost:5001": `http://${MACHINE}:5001`; // ensure the service is up running

// Simple helper: decide if this message should trigger a diet plan
const isDietPlanRequest = (text) => {
  const lower = text.toLowerCase();
  return lower.includes("dietplan") || lower.includes("diet plan");
};

const initialMessages = [
  {
    id: "m1",
    role: "ai",
    text: "Hi! I’m Dietly AI 🤖. Ask me anything — meals, macros, or what to eat next.",
    ts: Date.now(),
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollToEnd = () => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };


  



  const onSend = async () => {
  const text = input.trim();
  if (!text || loading) return;

      console.log("Platform", Platform.OS);
      console.log("Base_URL in use:", BASE_URL);
      console.log("Calling endpoint", isDietPlanRequest(text)? `${BASE_URL}/diet/plan` : `${BASE_URL}/generate`);


  // 1) Add user message
  const userMsg = { id: `u-${Date.now()}`, role: "user", text, ts: Date.now() };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  scrollToEnd();

  try {
    setLoading(true);

    // 2) Decide which endpoint to call
    if (isDietPlanRequest(text)) {

      // ---- CALL DIET PLAN API ----
      const resp = await fetch(`${BASE_URL}/diet/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${errText}`);
      }

      const data = await resp.json();  // { recepies: [...] }

      // For now, just show the JSON in the bubble so you see it's working
      const firstMeal = data?.recepies?.[0];

      const aiMsg = {
        id: `a-${Date.now()}`,
        role: "ai",
        type: "diet_plan",   // 👈 new
        meal: firstMeal,     // 👈 store the structured object
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      scrollToEnd();

    } else {
      // ---- CALL NORMAL CHAT API ----
      const resp = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${errText}`);
      }

      const data = await resp.json(); // { response: "..." }
      const aiText = data?.response ?? "Sorry, I couldn’t generate a reply.";
      const aiMsg = { id: `a-${Date.now()}`, role: "ai", text: aiText, ts: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
      scrollToEnd();
    }
  } catch (e) {
    const errMsg = {
      id: `e-${Date.now()}`,
      role: "ai",
      text: `Error: ${e.message}`,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, errMsg]);
  } finally {
    setLoading(false);
  }
};

const handleSaveMeal = async (meal) => {
  try {
    console.log("🔧 [SAVE] Meal object received:", meal);

    // Turn ingredients & instructions arrays into strings for DB
    const ingridientsText = Array.isArray(meal.ingridients)
      ? meal.ingridients.join("\n")
      : meal.ingridients || "";

    const instructionsText = Array.isArray(meal.instructions)
      ? meal.instructions.join("\n")
      : meal.instructions || "";

    const payload = {
      diet_title: meal.diet_plan,
      time_diet: meal.time_diet,
      time_meal: meal.time_meal,
      
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      ingridients: ingridientsText,
      instructions: instructionsText,
    };

    console.log("🔧 [SAVE] Backend URL:", `${BACKEND_URL}/api/diets`);
    console.log("🔧 [SAVE] Payload being sent:", payload);

    const resp = await fetch(`${BACKEND_URL}/api/diets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("🔧 [SAVE] Response status:", resp.status);

    if (!resp.ok) {
      const err = await resp.text();
      console.log("❌ [SAVE] Backend error text:", err);
      throw new Error(`HTTP ${resp.status}: ${err}`);
    }

    // success message
    setMessages((prev) => [
      ...prev,
      {
        id: `save-${Date.now()}`,
        role: "ai",
        text: `✅ Saved "${meal.diet_plan}" to your plans.`,
        ts: Date.now(),
      },
    ]);
  } catch (e) {
    console.log("❌ [SAVE] Final error:", e);
    setMessages((prev) => [
      ...prev,
      {
        id: `save-err-${Date.now()}`,
        role: "ai",
        text: `❌ Could not save plan: ${e.message}`,
        ts: Date.now(),
      },
    ]);
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb"}}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dietly AI Assistant</Text>
        </View>

        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={scrollToEnd}
          // renderItem={({ item }) => <Bubble text={item.text} role={item.role} />}
  renderItem={({ item }) => {
  if (item.type === "diet_plan") {
    return (
      <View style={styles.bubbleRow}>
        <DietPlanCard
          meal={item.meal}
          onSave={handleSaveMeal}   // ✅ use the real handler
        />
      </View>
    );
  }

  return <Bubble text={item.text} role={item.role} />;
}}
        />

        {/* Input Bar */}
        <View style={[styles.inputBar, {marginBottom: tabBarHeight -26 }]}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about your diet…"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={onSend}
            disabled={!input.trim() || loading}
            activeOpacity={0.8}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>{loading ? "..." : "Send"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Bubble({ text, role }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubbleRow, { justifyContent: isUser ? "flex-end" : "flex-start" }]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.bubbleText, { color: isUser ? "#0b2e17" : "#111827" }]}>{text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerTitle: { textAlign: "center", fontSize: 16, fontWeight: "700", color: "#111827" },
  listContent: { padding: 16, paddingBottom: 72 },
  bubbleRow: { flexDirection: "row", marginVertical: 6 },
  bubble: { maxWidth: "82%", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
  userBubble: { backgroundColor: "#DCFCE7", borderTopRightRadius: 4 },
  aiBubble: { backgroundColor: "#E0F2FE", borderTopLeftRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 20 },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  input: { flex: 1, maxHeight: 120, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#F8FAFC", fontSize: 15 },
  sendBtn: { height: 40, paddingHorizontal: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#16a34a" },
  sendBtnDisabled: { opacity: 0.5 },
});
