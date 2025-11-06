import { View, Text } from "react-native";
import React from "react";


const ai_assistant = () => {


    return (
        <View>
      {/* Page Content */}
      <Text>AI Assistant screen.</Text>

    </View>
  );
};
export default ai_assistant;

// import React, { useRef, useState } from "react";
// import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


// // TODO: set this for your environment:
// const BASE_URL = "http://localhost:8000"; // <-- replace with YOUR_PC_LAN_IP or emulator URL

// const initialMessages = [
//   {
//     id: "m1",
//     role: "ai",
//     text: "Hi! I’m Dietly AI 🤖. Ask me anything — meals, macros, or what to eat next.",
//     ts: Date.now(),
//   },
// ];

// export default function AIAssistant() {
//   const [messages, setMessages] = useState(initialMessages);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef(null);

//   const insets = useSafeAreaInsets();
//   const tabBarHeight = useBottomTabBarHeight();
//   const scrollToEnd = () => {
//     requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
//   };

//   const onSend = async () => {
//     const text = input.trim();
//     if (!text || loading) return;

//     // add user message
//     const userMsg = { id: `u-${Date.now()}`, role: "user", text, ts: Date.now() };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     scrollToEnd();

//     // call API
//     try {
//       setLoading(true);
//       const resp = await fetch(`${BASE_URL}/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: text }),
//       });

//       if (!resp.ok) {
//         const errText = await resp.text();
//         throw new Error(`HTTP ${resp.status}: ${errText}`);
//       }

//       const data = await resp.json(); // { response: "..." }
//       const aiText = data?.response ?? "Sorry, I couldn’t generate a reply.";
//       const aiMsg = { id: `a-${Date.now()}`, role: "ai", text: aiText, ts: Date.now() };
//       setMessages((prev) => [...prev, aiMsg]);
//       scrollToEnd();
//     } catch (e) {
//       const errMsg = { id: `e-${Date.now()}`, role: "ai", text: `Error: ${e.message}`, ts: Date.now() };
//       setMessages((prev) => [...prev, errMsg]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
//       <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Dietly AI Assistant</Text>
//         </View>

//         {/* Messages */}
//         <FlatList
//           ref={listRef}
//           data={messages}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.listContent}
//           onContentSizeChange={scrollToEnd}
//           renderItem={({ item }) => <Bubble text={item.text} role={item.role} />}
//         />

//         {/* Input Bar */}
//         <View style={styles.inputBar}>
//           <TextInput
//             style={styles.input}
//             placeholder="Ask anything about your diet…"
//             value={input}
//             onChangeText={setInput}
//             multiline
//           />
//           <TouchableOpacity
//             style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
//             onPress={onSend}
//             disabled={!input.trim() || loading}
//             activeOpacity={0.8}
//           >
//             <Text style={{ color: "white", fontWeight: "600" }}>{loading ? "..." : "Send"}</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// function Bubble({ text, role }) {
//   const isUser = role === "user";
//   return (
//     <View style={[styles.bubbleRow, { justifyContent: isUser ? "flex-end" : "flex-start" }]}>
//       <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
//         <Text style={[styles.bubbleText, { color: isUser ? "#0b2e17" : "#111827" }]}>{text}</Text>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#e5e7eb",
//     backgroundColor: "#fff",
//   },
//   headerTitle: { textAlign: "center", fontSize: 16, fontWeight: "700", color: "#111827" },
//   listContent: { padding: 16, paddingBottom: 72 },
//   bubbleRow: { flexDirection: "row", marginVertical: 6 },
//   bubble: { maxWidth: "82%", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
//   userBubble: { backgroundColor: "#DCFCE7", borderTopRightRadius: 4 },
//   aiBubble: { backgroundColor: "#E0F2FE", borderTopLeftRadius: 4 },
//   bubbleText: { fontSize: 15, lineHeight: 20 },
//   inputBar: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     padding: 10,
//     gap: 8,
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderTopColor: "#e5e7eb",
//     backgroundColor: "#fff",
//   },
//   input: { flex: 1, maxHeight: 120, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#F8FAFC", fontSize: 15 },
//   sendBtn: { height: 40, paddingHorizontal: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#16a34a" },
//   sendBtnDisabled: { opacity: 0.5 },
// });