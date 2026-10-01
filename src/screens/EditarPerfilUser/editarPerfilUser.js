/**
 * src/screens/EditarPerfilUser/editarPerfilUser.js
 * ---------------------------------------------------------------------------
 * Edição dos dados do usuário autenticado.
 * ---------------------------------------------------------------------------
 */
import { useState } from "react";
import { View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { cores } from "../../theme";
import styles from "./editarPerfilUser.styles";

const AvatarGrande = ({ usuario }) => (
  <View style={styles.avatarGrande}>
    {usuario.photoURL ? (
      <Image style={styles.avatarGrandeImagem} source={{ uri: usuario.photoURL }} />
    ) : (
      <Ionicons name="person" size={40} color={cores.textoSuave} />
    )}
  </View>
);

const EditarPerfilUserScreen = ({ usuario, onVoltar }) => {
  const [nome, setNome] = useState(usuario?.displayName ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <View style={styles.tela}>
      <View style={styles.topo}>
        <Pressable style={styles.botaoVoltar} onPress={onVoltar} hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color={cores.texto} />
        </Pressable>
        <Text style={styles.tituloTopo}>Editar perfil</Text>
        <View style={styles.botaoVoltar} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AvatarGrande usuario={usuario} />
        <Pressable style={styles.botaoFoto}>
          <Text style={styles.botaoFotoTexto}>Alterar foto</Text>
        </Pressable>

        <View style={styles.formulario}>
          <Text style={styles.rotulo}>Nome</Text>
          <View style={styles.campo}>
            <TextInput
              style={styles.entrada}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              placeholderTextColor={cores.textoSuave}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.rotulo}>E-mail</Text>
          <View style={styles.campo}>
            <TextInput
              style={styles.entrada}
              value={email}
              onChangeText={setEmail}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor={cores.textoSuave}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.rotulo}>Telefone</Text>
          <View style={styles.campo}>
            <TextInput
              style={styles.entrada}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(00) 00000-0000"
              placeholderTextColor={cores.textoSuave}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.rotulo}>Endereço</Text>
          <View style={styles.campo}>
            <TextInput
              style={styles.entrada}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Rua das Flores, 123"
              placeholderTextColor={cores.textoSuave}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.rodape}>
        <Pressable style={styles.botaoSalvar} onPress={onVoltar}>
          <Text style={styles.botaoSalvarTexto}>Salvar alterações</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default EditarPerfilUserScreen;
