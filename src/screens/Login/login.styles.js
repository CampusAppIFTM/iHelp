import { StyleSheet } from "react-native";

import { cores, fonte } from "../../theme";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.branco,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.branco,
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
    fontFamily: fonte.headline.bold,
    fontSize: 32,
    color: cores.texto,
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: fonte.corpo.regular,
    fontSize: 16,
    color: cores.textoSuave,
    marginBottom: 32,
    textAlign: "center",
  },
  formulario: {
    width: "100%",
    maxWidth: 400,
  },
  rotulo: {
    fontFamily: fonte.corpo.bold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: cores.texto,
    marginBottom: 8,
  },
  campo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.fundoSuave,
    borderRadius: 28,
    paddingHorizontal: 16,
    height: 52,
    gap: 10,
    marginBottom: 16,
  },
  entrada: {
    flex: 1,
    fontFamily: fonte.corpo.regular,
    fontSize: 15,
    color: cores.texto,
    padding: 0,
  },
  linhaSenha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  linkLaranja: {
    fontFamily: fonte.corpo.semibold,
    color: cores.primary,
    fontSize: 13,
  },
  botaoEntrar: {
    marginTop: 8,
    backgroundColor: cores.primary,
    borderRadius: 28,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  textoBotaoEntrar: {
    fontFamily: fonte.headline.bold,
    color: cores.textoInverso,
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
    backgroundColor: cores.borda,
  },
  divisorTexto: {
    fontFamily: fonte.corpo.regular,
    color: cores.textoSuave,
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
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    gap: 10,
    shadowColor: cores.sombra,
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
    fontFamily: fonte.corpo.medium,
    fontSize: 16,
    color: cores.texto,
  },
  areaAviso: {
    minHeight: 28,
    justifyContent: "center",
    marginTop: 12,
  },
  erro: {
    fontFamily: fonte.corpo.regular,
    color: cores.erro,
    textAlign: "center",
  },
  aviso: {
    fontFamily: fonte.corpo.regular,
    color: cores.primary,
    textAlign: "center",
  },
  rodape: {
    fontFamily: fonte.corpo.regular,
    marginTop: 8,
    textAlign: "center",
    color: cores.textoSuave,
    fontSize: 14,
  },
});
