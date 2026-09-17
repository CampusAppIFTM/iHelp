/**
 * src/screens/Login/login.js
 * ---------------------------------------------------------------------------
 * Tela de login.
 *
 * Observe o que ela NÃO faz:
 *   - não conhece o Firebase;
 *   - não recebe uma prop para "avisar" quem entrou.
 * Ela apenas dispara o login e cuida do próprio estado visual (carregando e
 * mensagem de erro). Quando o login dá certo, o observador em App.js troca a
 * tela sozinho.
 * ---------------------------------------------------------------------------
 */
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logoImg from "../../../assets/logo.png";
import googleImg from "../../../assets/google-g.png";
import {
  entrarComGoogle,
  entrarComEmailSenha,
  enviarRedefinicaoSenha,
  descreverErro,
} from "../../services/autenticacao";
import { cores } from "../../theme";
import styles from "./login.styles";

const LoginScreen = () => {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [aviso, setAviso] = useState(null);

  const executar = async (acao) => {
    setErro(null);
    setAviso(null);
    setCarregando(true);

    try {
      await acao();
    } catch (e) {
      console.log("Falha no login:", e);
      setErro(descreverErro(e));
    } finally {
      setCarregando(false);
    }
  };

  const aoEntrar = () => {
    if (!identificador.trim() || !senha) {
      setAviso(null);
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    executar(() => entrarComEmailSenha(identificador, senha));
  };

  const aoPressionarGoogle = () => executar(entrarComGoogle);

  const aoEsquecerSenha = () => {
    if (!identificador.trim()) {
      setAviso(null);
      setErro("Informe o e-mail para redefinir a senha.");
      return;
    }

    executar(async () => {
      await enviarRedefinicaoSenha(identificador);
      setAviso("Enviamos um e-mail para redefinir sua senha.");
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.titulo}>iHelp</Text>
        <Text style={styles.subtitulo}>
          Entre para gerenciar seus serviços ou solicitar ajuda residencial
        </Text>

        <View style={styles.formulario}>
          <Text style={styles.rotulo}>E-MAIL, CPF OU CELULAR</Text>
          <View style={styles.campo}>
            <Ionicons name="at" size={18} color={cores.textoSuave} />
            <TextInput
              style={styles.entrada}
              value={identificador}
              onChangeText={setIdentificador}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor={cores.textoSuave}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!carregando}
            />
          </View>

          <View style={styles.linhaSenha}>
            <Text style={styles.rotulo}>SUA SENHA</Text>
            <Pressable onPress={aoEsquecerSenha} disabled={carregando}>
              <Text style={styles.linkLaranja}>Esqueceu a senha?</Text>
            </Pressable>
          </View>
          <View style={styles.campo}>
            <Ionicons name="lock-closed-outline" size={18} color={cores.textoSuave} />
            <TextInput
              style={styles.entrada}
              value={senha}
              onChangeText={setSenha}
              placeholder="••••••••"
              placeholderTextColor={cores.textoSuave}
              secureTextEntry={!senhaVisivel}
              editable={!carregando}
            />
            <Pressable
              onPress={() => setSenhaVisivel((visivel) => !visivel)}
              hitSlop={8}
            >
              <Ionicons
                name={senhaVisivel ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={cores.textoSuave}
              />
            </Pressable>
          </View>

          <Pressable
            style={[styles.botaoEntrar, carregando && styles.botaoDesativado]}
            onPress={aoEntrar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={cores.textoInverso} />
            ) : (
              <>
                <Text style={styles.textoBotaoEntrar}>Entrar no iHelp</Text>
                <Ionicons name="arrow-forward" size={18} color={cores.textoInverso} />
              </>
            )}
          </Pressable>

          <View style={styles.divisor}>
            <View style={styles.divisorLinha} />
            <Text style={styles.divisorTexto}>ou continue com</Text>
            <View style={styles.divisorLinha} />
          </View>

          <View style={styles.linhaGoogle}>
            <Pressable
              style={[styles.botaoGoogle, carregando && styles.botaoDesativado]}
              onPress={aoPressionarGoogle}
              disabled={carregando}
            >
              <Image source={googleImg} style={styles.iconeGoogle} />
              <Text style={styles.textoGoogle}>Google </Text>
            </Pressable>
          </View>

          <View style={styles.areaAviso}>
            {erro && <Text style={styles.erro}>{erro}</Text>}
            {aviso && <Text style={styles.aviso}>{aviso}</Text>}
          </View>

          <Text style={styles.rodape}>
            Não tem uma conta?{" "}
            <Text style={styles.linkLaranja}>Cadastre-se grátis</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
