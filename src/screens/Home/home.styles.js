import { StyleSheet } from "react-native";

import { fonte } from "../../theme/fonte";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
  },
  fotoVazia: {
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  inicial: {
    fontFamily: fonte.bold,
    fontSize: 56,
    color: "#555",
  },
  nome: {
    fontFamily: fonte.bold,
    fontSize: 22,
    marginBottom: 4,
  },
  email: {
    fontFamily: fonte.regular,
    fontSize: 16,
    color: "#666",
  },
  uid: {
    fontFamily: fonte.regular,
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  botao: {
    marginTop: 32,
    width: 200,
  },
});
