import { StyleSheet } from "react-native";

import { cores, fonte } from "../../theme";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.branco,
  },
  conteudo: {
    flex: 1,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    marginTop: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarVazio: {
    backgroundColor: cores.fundoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInicial: {
    fontFamily: fonte.headline.bold,
    fontSize: 16,
    color: cores.primary,
  },
  localizacao: {
    flex: 1,
  },
  localizacaoRotuloLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  localizacaoRotulo: {
    fontFamily: fonte.corpo.semibold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: cores.textoSuave,
  },
  localizacaoTexto: {
    fontFamily: fonte.headline.bold,
    fontSize: 16,
    color: cores.texto,
    marginTop: 2,
  },
  busca: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.fundoSuave,
    borderRadius: 28,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    marginBottom: 14,
  },
  buscaCampo: {
    flex: 1,
    fontFamily: fonte.corpo.regular,
    fontSize: 14,
    color: cores.texto,
    padding: 0,
  },
  chips: {
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  chipAtivo: {
    backgroundColor: cores.primary,
    borderColor: cores.primary,
  },
  chipTexto: {
    fontFamily: fonte.corpo.medium,
    fontSize: 13,
    color: cores.texto,
  },
  chipTextoAtivo: {
    color: cores.textoInverso,
  },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardImagemCaixa: {
    height: 168,
    backgroundColor: cores.fundoSuave,
  },
  cardImagem: {
    width: "100%",
    height: "100%",
  },
  salvar: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCorpo: {
    padding: 16,
  },
  cardTitulo: {
    fontFamily: fonte.headline.bold,
    fontSize: 18,
    color: cores.texto,
    marginBottom: 6,
  },
  cardDescricao: {
    fontFamily: fonte.corpo.regular,
    fontSize: 13,
    lineHeight: 19,
    color: cores.textoSuave,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  cardNota: {
    fontFamily: fonte.corpo.semibold,
    fontSize: 13,
    color: cores.texto,
  },
  cardAvaliacoes: {
    fontFamily: fonte.corpo.regular,
    color: cores.textoSuave,
  },
  badge: {
    backgroundColor: cores.fundoSuave,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeTexto: {
    fontFamily: fonte.corpo.medium,
    fontSize: 11,
    color: cores.primary,
  },
  botaoOrcamento: {
    backgroundColor: cores.primary,
    borderRadius: 24,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  botaoOrcamentoTexto: {
    fontFamily: fonte.headline.semibold,
    fontSize: 14,
    color: cores.textoInverso,
  },
  vazio: {
    fontFamily: fonte.corpo.regular,
    textAlign: "center",
    color: cores.textoSuave,
    marginTop: 24,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 8,
  },
  placeholderTitulo: {
    fontFamily: fonte.headline.bold,
    fontSize: 22,
    color: cores.texto,
    marginTop: 8,
  },
  placeholderTexto: {
    fontFamily: fonte.corpo.regular,
    fontSize: 14,
    color: cores.textoSuave,
    textAlign: "center",
  },
  botaoSair: {
    marginTop: 24,
    width: 200,
  },
  tabBarSafe: {
    backgroundColor: cores.branco,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: cores.branco,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  tabRotulo: {
    fontFamily: fonte.corpo.medium,
    fontSize: 11,
    color: cores.textoSuave,
  },
  tabRotuloAtivo: {
    color: cores.primary,
  },
});
