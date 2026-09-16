import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  botaoGoogle: {
    width: 240,
    height: 48,
  },
  areaAviso: {
    height: 48,
    justifyContent: "center",
  },
  erro: {
    color: "#c62828",
    textAlign: "center",
  },
});
