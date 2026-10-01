import { StyleSheet } from "react-native";

import { cores, fonte } from "../../theme";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.branco,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  botaoVoltar: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  tituloTopo: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
    fontFamily: fonte.headline.bold,
    fontSize: 18,
    color: cores.texto,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
  avatarGrande: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: cores.fundoSuave,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  avatarGrandeImagem: {
    width: "100%",
    height: "100%",
  },
  botaoFoto: {
    backgroundColor: cores.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  botaoFotoTexto: {
    fontFamily: fonte.corpo.bold,
    fontSize: 14,
    color: cores.branco,
  },
  formulario: {
    width: "100%",
  },
  rotulo: {
    fontFamily: fonte.corpo.regular,
    fontSize: 14,
    color: cores.texto,
    marginTop: 20,
    marginBottom: 8,
  },
  campo: {
    backgroundColor: cores.fundoSuave,
    borderRadius: 20,
    paddingHorizontal: 18,
    height: 52,
    justifyContent: "center",
  },
  entrada: {
    fontFamily: fonte.corpo.regular,
    fontSize: 15,
    color: cores.textoSuave,
    padding: 0,
  },
  rodape: {
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: cores.branco,
  },
  botaoSalvar: {
    height: 52,
    borderRadius: 26,
    backgroundColor: cores.neutral,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoSalvarTexto: {
    fontFamily: fonte.corpo.semibold,
    fontSize: 15,
    color: cores.branco,
  },
});
