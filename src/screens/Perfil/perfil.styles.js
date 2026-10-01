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
  avatarTopo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.fundoSuave,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarTopoImagem: {
    width: "100%",
    height: "100%",
  },
  tituloTopo: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonte.headline.bold,
    fontSize: 18,
    color: cores.texto,
  },
  botaoBusca: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },
  cabecalhoPerfil: {
    alignItems: "center",
    marginBottom: 28,
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
  nome: {
    fontFamily: fonte.headline.bold,
    fontSize: 20,
    color: cores.texto,
    textAlign: "center",
  },
  email: {
    fontFamily: fonte.corpo.regular,
    fontSize: 14,
    color: cores.textoSuave,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },
  acoes: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    paddingHorizontal: 8,
  },
  botaoAcao: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: cores.fundoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAcaoTexto: {
    fontFamily: fonte.corpo.semibold,
    fontSize: 14,
    color: cores.texto,
  },
  lista: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  iconeItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.fundoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTextos: {
    flex: 1,
  },
  itemTitulo: {
    fontFamily: fonte.corpo.semibold,
    fontSize: 15,
    color: cores.texto,
  },
  itemSubtitulo: {
    fontFamily: fonte.corpo.regular,
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 2,
  },
});
