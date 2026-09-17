import { StyleSheet } from "react-native";

import { fonte } from "../../theme/fonte";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingVertical: 32,
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
    fontFamily: fonte.bold,
    fontSize: 32,
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: fonte.regular,
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  formulario: {
    width: "100%",
    maxWidth: 400,
  },
  rotulo: {
    fontFamily: fonte.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: "#121212",
    marginBottom: 8,
  },
  campo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6F7",
    borderRadius: 28,
    paddingHorizontal: 16,
    height: 52,
    gap: 10,
    marginBottom: 16,
  },
  entrada: {
    flex: 1,
    fontFamily: fonte.regular,
    fontSize: 15,
    color: "#1A1A1A",
    padding: 0,
  },
  linhaSenha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  linkLaranja: {
    fontFamily: fonte.semibold,
    color: "#005F73",
    fontSize: 13,
  },
  botaoEntrar: {
    marginTop: 8,
    backgroundColor: "#005F73",
    borderRadius: 28,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  textoBotaoEntrar: {
    fontFamily: fonte.bold,
    color: "#fff",
    fontSize: 16,
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    gap: 10,
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4E8E9",
  },
  divisorTexto: {
    fontFamily: fonte.regular,
    color: "#9AA6A9",
    fontSize: 13,
  },
  linhaGoogle: {
    alignItems: "center",
  },
  botaoGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    paddingHorizontal: 32,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E8ECEE",
    backgroundColor: "#fff",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  iconeGoogle: {
    width: 20,
    height: 20,
  },
  textoGoogle: {
    fontFamily: fonte.medium,
    fontSize: 16,
    color: "#3C4043",
  },
  areaAviso: {
    minHeight: 28,
    justifyContent: "center",
    marginTop: 12,
  },
  erro: {
    fontFamily: fonte.regular,
    color: "#c62828",
    textAlign: "center",
  },
  aviso: {
    fontFamily: fonte.regular,
    color: "#0A5C63",
    textAlign: "center",
  },
  rodape: {
    fontFamily: fonte.regular,
    marginTop: 8,
    textAlign: "center",
    color: "#6B7C80",
    fontSize: 14,
  },
});
