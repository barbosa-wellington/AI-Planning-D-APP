// import { View, Text } from "react-native";
// import React from "react";


// const ai_assistant = () => {


//     return (
//         <View>
//       {/* Page Content */}
//       <Text>AI Assistant This is a test page.</Text>

//     </View>
//   );
// };
// export default ai_assistant;

import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

const initialMessages = [
  {
    id: "m1",
    role: "ai",
    text:
      "Hi! I’m Dietly AI 🤖. Ask me anything — meals, macros, or what to eat next.",
    ts: Date.now(),
  },
  {
    id: "m2",
    role: "ai",
    text:
      "Tip: If you’re training today, aim for ~0.8–1g protein/kg by dinner 💪",
    ts: Date.now() + 1,
  },
];

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  };

  const onSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    scrollToEnd();

    // 👇 Mock AI reply (replace this with your real API later)
    setTimeout(() => {
      const aiReply = {
        id: `a-${Date.now()}`,
        role: "ai",
        text: mockAiResponse(text),
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, aiReply]);
      scrollToEnd();
    }, 500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="sparkles-outline" size={22} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Dietly AI Assistant</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={scrollToEnd}
        renderItem={({ item }) => (
          <Bubble text={item.text} role={item.role} />
        )}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          <Ionicons name="mic-outline" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Ask anything about your diet…"
          placeholderTextColor={COLORS.textLight}
          value={input}
          onChangeText={setInput}
          multiline
        />

        <TouchableOpacity
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          onPress={onSend}
          disabled={!input.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
</SafeAreaView>
  );
}

/** Chat bubble */
function Bubble({ text, role }) {
  const isUser = role === "user";
  return (
    <View
      style={[
        styles.bubbleRow,
        { justifyContent: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {!isUser && (
          <View style={styles.aiBadge}>
            <Ionicons name="sparkles" size={12} color={COLORS.white} />
          </View>
        )}
        <Text
          style={[
            styles.bubbleText,
            { color: isUser ? "#0b2e17" : COLORS.text },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

/** Very simple mock “AI” */
function mockAiResponse(userText) {
  const t = userText.toLowerCase();
  if (t.includes("protein"))
    return "Great goal! Try Greek yogurt + almonds or eggs on toast for a quick protein boost 🥚💪";
  if (t.includes("breakfast"))
    return "Ideas: Overnight oats with chia, Greek yogurt parfait, or avocado toast with egg 🥑";
  if (t.includes("calorie") || t.includes("kcal"))
    return "A steady 300–500 kcal deficit is a good start. Want me to calculate a target from your profile?";
  if (t.includes("water"))
    return "Aim for ~30–35 ml/kg/day. A bottle by your desk helps — want me to remind you hourly? 💧";
  return "Got it! I can suggest meals, track macros, or adjust your plan. What would you like to focus on?";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // soft mint from your theme
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 10,
    backgroundColor: COLORS.card ?? "#FFFFFF",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  listContent: {
    padding: 16,
    paddingBottom: 60,
  },
  bubbleRow: {
    flexDirection: "row",
    marginVertical: 6,
  },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#DCFCE7", // light green
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#E0F2FE", // soft blue - Assistant response
    borderTopLeftRadius: 4,
    position: "relative",
  },
  aiBadge: {
    position: "absolute",
    top: -8,
    left: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.secondary, // blue
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 20,
  },
  inputBar: {
  flexDirection: "row",
  alignItems: "flex-end",
  paddingHorizontal: 12,
  paddingVertical: 10,
  paddingBottom: Platform.OS === "ios" ? 30 : 20,
  marginBottom: 60,
  gap: 8,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: COLORS.border,
  backgroundColor: COLORS.card ?? "#FFFFFF", // text field color
},
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9", // icon voice
    marginBottom: 2,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    color: COLORS.text,
    fontSize: 15,
  },
  sendBtn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});
