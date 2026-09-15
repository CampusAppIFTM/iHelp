import { StyleSheet } from "react-native";

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
    fontSize: 56,
    color: "#555",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  uid: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  botao: {
    marginTop: 32,
    width: 200,
  },
});
