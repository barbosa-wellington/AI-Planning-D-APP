// styles/base.js
import { StyleSheet } from "react-native";

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Shorelines Script Bold",
    fontSize: 30,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 40,
  },
  arrowButton: {
    marginTop: 10,
  },
});
