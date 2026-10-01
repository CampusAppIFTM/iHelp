/**
 * src/screens/Perfil/perfil.js
 * ---------------------------------------------------------------------------
 * Perfil do usuário autenticado, conforme o wireframe do Marketplace.
 * ---------------------------------------------------------------------------
 */
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { cores } from "../../theme";
import styles from "./perfil.styles";

const MENU = [
  {
    id: "configuracoes",
    icone: "settings-outline",
    titulo: "Configurações",
    subtitulo: "Conta, privacidade e preferências",
  },
  {
    id: "pagamentos",
    icone: "card-outline",
    titulo: "Pagamentos",
  },
  {
    id: "notificacoes",
    icone: "notifications-outline",
    titulo: "Notificações",
  },
  {
    id: "ajuda",
    icone: "help-circle-outline",
    titulo: "Ajuda",
  },
];

const AvatarMini = ({ usuario }) => (
  <View style={styles.avatarTopo}>
    {usuario.photoURL ? (
      <Image style={styles.avatarTopoImagem} source={{ uri: usuario.photoURL }} />
    ) : (
      <Ionicons name="person" size={18} color={cores.textoSuave} />
    )}
  </View>
);

const AvatarGrande = ({ usuario }) => (
  <View style={styles.avatarGrande}>
    {usuario.photoURL ? (
      <Image style={styles.avatarGrandeImagem} source={{ uri: usuario.photoURL }} />
    ) : (
      <Ionicons name="person" size={40} color={cores.textoSuave} />
    )}
  </View>
);

const PerfilScreen = ({ usuario, onSair, saindo, onBuscar }) => {
  const nome = usuario.displayName ?? "Usuário";

  return (
    <View style={styles.tela}>
      <View style={styles.topo}>
        <AvatarMini usuario={usuario} />
        <Text style={styles.tituloTopo}>Marketplace</Text>
        <Pressable style={styles.botaoBusca} onPress={onBuscar} hitSlop={8}>
          <Ionicons name="search" size={22} color={cores.texto} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalhoPerfil}>
          <AvatarGrande usuario={usuario} />
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.email}>{usuario.email}</Text>

          <View style={styles.acoes}>
            <Pressable style={styles.botaoAcao}>
              <Text style={styles.botaoAcaoTexto}>Editar perfil</Text>
            </Pressable>
            <Pressable style={styles.botaoAcao} onPress={onSair} disabled={saindo}>
              <Text style={styles.botaoAcaoTexto}>{saindo ? "Saindo..." : "Sair"}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.lista}>
          {MENU.map((item) => (
            <Pressable key={item.id} style={styles.item}>
              <View style={styles.iconeItem}>
                <Ionicons name={item.icone} size={20} color={cores.textoSuave} />
              </View>
              <View style={styles.itemTextos}>
                <Text style={styles.itemTitulo}>{item.titulo}</Text>
                {item.subtitulo ? (
                  <Text style={styles.itemSubtitulo}>{item.subtitulo}</Text>
                ) : null}
              </View>
              <Ionicons name="chevron-forward" size={18} color={cores.textoSuave} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PerfilScreen;
