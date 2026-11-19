/**
 * src/screens/Home/home.js
 * ---------------------------------------------------------------------------
 * Feed de serviços após o login.
 * ---------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { sair } from "../../services/autenticacao";
import { listarServicos, cadastrarServico } from "../../services/servicos";
import { cores } from "../../theme";
import styles from "./home.styles";
import PerfilScreen from "../Perfil/perfil";
import EditarPerfilUserScreen from "../EditarPerfilUser/editarPerfilUser";
import encanadorImg from "../../../assets/encanador.png";

const CATEGORIAS = ["Todos", "Eletricista", "Encanador", "Pintura"];
const CATEGORIAS_CADASTRO = ["Eletricista", "Encanador", "Pintura", "Outros"];

const ABAS = [
  { id: "inicio", rotulo: "Início", icone: "home-outline", iconeAtivo: "home" },
  { id: "pedidos", rotulo: "Pedidos", icone: "clipboard-outline", iconeAtivo: "clipboard" },
  { id: "mensagens", rotulo: "Mensagens", icone: "chatbubble-outline", iconeAtivo: "chatbubble" },
  { id: "perfil", rotulo: "Perfil", icone: "person-outline", iconeAtivo: "person" },
];

const Avatar = ({ usuario, onPress }) => {
  if (usuario.photoURL) {
    return (
      <Pressable onPress={onPress}>
        <Image style={styles.avatar} source={{ uri: usuario.photoURL }} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={[styles.avatar, styles.avatarVazio]}>
      <Text style={styles.avatarInicial}>
        {(usuario.displayName ?? "?").charAt(0).toUpperCase()}
      </Text>
    </Pressable>
  );
};

const CardServico = ({ item, salvo, onSalvar }) => (
  <View style={styles.card}>
    <View style={styles.cardImagemCaixa}>
      <Image
        source={item.imagem ? { uri: item.imagem } : encanadorImg}
        style={styles.cardImagem}
        resizeMode="cover"
      />
      <Pressable style={styles.salvar} onPress={() => onSalvar(item.id)} hitSlop={8}>
        <Ionicons
          name={salvo ? "bookmark" : "bookmark-outline"}
          size={18}
          color={salvo ? cores.primary : cores.texto}
        />
      </Pressable>
    </View>

    <View style={styles.cardCorpo}>
      <Text style={styles.cardTitulo}>{item.titulo}</Text>
      <Text style={styles.cardDescricao}>{item.descricao}</Text>

      <View style={styles.cardMeta}>
        <Ionicons name="star" size={14} color={cores.estrela} />
        <Text style={styles.cardNota}>
          {Number(item.nota || 0).toFixed(1)}
          <Text style={styles.cardAvaliacoes}> ({item.avaliacoes} avaliações)</Text>
        </Text>
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{item.badge}</Text>
          </View>
        ) : null}
      </View>

      <Pressable style={styles.botaoOrcamento}>
        <Text style={styles.botaoOrcamentoTexto}>Solicitar Orçamento Grátis</Text>
        <Ionicons name="arrow-forward" size={16} color={cores.textoInverso} />
      </Pressable>
    </View>
  </View>
);

const HomeScreen = ({ usuario }) => {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [aba, setAba] = useState("inicio");
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [salvos, setSalvos] = useState([]);
  const [saindo, setSaindo] = useState(false);
  const [servicosCadastrados, setServicosCadastrados] = useState([]);
  const [carregandoServicos, setCarregandoServicos] = useState(true);
  const [erroServicos, setErroServicos] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("Eletricista");
  const [novaImagem, setNovaImagem] = useState("");
  const [novoBadge, setNovoBadge] = useState("");
  const [salvandoServico, setSalvandoServico] = useState(false);

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      setCarregandoServicos(true);
      setErroServicos("");

      try {
        const lista = await listarServicos();
        if (ativo) setServicosCadastrados(lista);
      } catch (e) {
        console.log("Falha ao ler serviços:", e?.code, e?.message);
        if (ativo) {
          setErroServicos(
            e?.code === "permission-denied"
              ? "Sem permissão para ler a coleção servico no Firestore."
              : "Não foi possível carregar os serviços."
          );
        }
      } finally {
        if (ativo) setCarregandoServicos(false);
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const servicos = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return servicosCadastrados.filter((servico) => {
      const naCategoria = categoria === "Todos" || servico.categoria === categoria;
      const naBusca =
        !termo ||
        servico.titulo.toLowerCase().includes(termo) ||
        servico.descricao.toLowerCase().includes(termo) ||
        servico.categoria.toLowerCase().includes(termo);

      return naCategoria && naBusca;
    });
  }, [busca, categoria, servicosCadastrados]);

  const aoSalvar = (id) => {
    setSalvos((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    );
  };

  const aoSair = async () => {
    setSaindo(true);
    try {
      await sair();
    } catch (e) {
      console.log("Falha ao sair:", e);
      setSaindo(false);
    }
  };

  const limparFormulario = () => {
    setNovoTitulo("");
    setNovaDescricao("");
    setNovaCategoria("Eletricista");
    setNovaImagem("");
    setNovoBadge("");
  };

  const aoFecharModal = () => {
    if (salvandoServico) return;
    setModalAberto(false);
    limparFormulario();
  };

  const aoCadastrarServico = async () => {
    if (!novoTitulo.trim()) {
      Alert.alert("Atenção", "Por favor, informe o título do serviço.");
      return;
    }
    if (!novaDescricao.trim()) {
      Alert.alert("Atenção", "Por favor, informe a descrição do serviço.");
      return;
    }

    setSalvandoServico(true);
    try {
      const servicoCriado = await cadastrarServico({
        titulo: novoTitulo,
        descricao: novaDescricao,
        categoria: novaCategoria,
        imagem: novaImagem,
        badge: novoBadge,
      });

      setServicosCadastrados((anteriores) => [servicoCriado, ...anteriores]);
      setModalAberto(false);
      limparFormulario();
      Alert.alert("Sucesso", "Serviço cadastrado com sucesso!");
    } catch (e) {
      console.log("Falha ao cadastrar serviço:", e);
      Alert.alert(
        "Erro ao salvar",
        "Não foi possível salvar o serviço no banco de dados." +
          (e?.message ? `\n(${e.message})` : "")
      );
    } finally {
      setSalvandoServico(false);
    }
  };

  const cabecalho = (
    <View>
      <View style={styles.topo}>
        <Avatar usuario={usuario} onPress={() => setAba("perfil")} />
        <View style={styles.localizacao}>
          <View style={styles.localizacaoRotuloLinha}>
            <Ionicons name="location-outline" size={12} color={cores.textoSuave} />
            <Text style={styles.localizacaoRotulo}>LOCALIZAÇÃO ATUAL</Text>
          </View>
          <Text style={styles.localizacaoTexto}>Rua dos Pinheiros, 120</Text>
        </View>
      </View>

      <View style={styles.busca}>
        <Ionicons name="search" size={18} color={cores.textoSuave} />
        <TextInput
          style={styles.buscaCampo}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar eletricista, encanador, pintura..."
          placeholderTextColor={cores.textoSuave}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIAS.map((item) => {
          const ativo = categoria === item;

          return (
            <Pressable
              key={item}
              onPress={() => setCategoria(item)}
              style={[styles.chip, ativo && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderConteudo = () => {
    if (aba === "perfil" && editandoPerfil) {
      return (
        <EditarPerfilUserScreen
          usuario={usuario}
          onVoltar={() => setEditandoPerfil(false)}
        />
      );
    }

    if (aba === "perfil") {
      return (
        <PerfilScreen
          usuario={usuario}
          onSair={aoSair}
          saindo={saindo}
          onBuscar={() => setAba("inicio")}
          onEditarPerfil={() => setEditandoPerfil(true)}
        />
      );
    }

    if (aba !== "inicio") {
      const titulo = aba === "pedidos" ? "Pedidos" : "Mensagens";

      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitulo}>{titulo}</Text>
          <Text style={styles.placeholderTexto}>Esta área ainda está em construção.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardServico
            item={item}
            salvo={salvos.includes(item.id)}
            onSalvar={aoSalvar}
          />
        )}
        ListHeaderComponent={cabecalho}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          carregandoServicos ? (
            <ActivityIndicator color={cores.primary} style={{ marginTop: 24 }} />
          ) : (
            <Text style={styles.vazio}>
              {erroServicos || "Nenhum serviço encontrado."}
            </Text>
          )
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.tela} edges={["top"]}>
      <View style={styles.conteudo}>
        {renderConteudo()}

        {aba === "inicio" && !editandoPerfil && (
          <Pressable
            style={styles.fab}
            onPress={() => setModalAberto(true)}
            accessibilityRole="button"
            accessibilityLabel="Adicionar novo serviço"
          >
            <Ionicons name="add" size={32} color={cores.textoInverso} />
          </Pressable>
        )}
      </View>

      <Modal
        visible={modalAberto}
        animationType="slide"
        transparent={true}
        onRequestClose={aoFecharModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Adicionar Serviço</Text>
              <Pressable
                onPress={aoFecharModal}
                style={styles.modalFechar}
                hitSlop={8}
              >
                <Ionicons name="close" size={24} color={cores.texto} />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.grupoInput}>
                <Text style={styles.rotuloInput}>Título do serviço *</Text>
                <TextInput
                  style={styles.campoTexto}
                  value={novoTitulo}
                  onChangeText={setNovoTitulo}
                  placeholder="Ex: Instalação Elétrica Completa"
                  placeholderTextColor={cores.textoSuave}
                />
              </View>

              <View style={styles.grupoInput}>
                <Text style={styles.rotuloInput}>Categoria</Text>
                <View style={styles.categoriasContainer}>
                  {CATEGORIAS_CADASTRO.map((cat) => {
                    const ativo = novaCategoria === cat;
                    return (
                      <Pressable
                        key={cat}
                        onPress={() => setNovaCategoria(cat)}
                        style={[
                          styles.categoriaChip,
                          ativo && styles.categoriaChipAtivo,
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoriaChipTexto,
                            ativo && styles.categoriaChipTextoAtivo,
                          ]}
                        >
                          {cat}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.grupoInput}>
                <Text style={styles.rotuloInput}>Descrição *</Text>
                <TextInput
                  style={[styles.campoTexto, styles.campoTextoMultilinha]}
                  value={novaDescricao}
                  onChangeText={setNovaDescricao}
                  placeholder="Descreva detalhes sobre o serviço..."
                  placeholderTextColor={cores.textoSuave}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.grupoInput}>
                <Text style={styles.rotuloInput}>URL da imagem (opcional)</Text>
                <TextInput
                  style={styles.campoTexto}
                  value={novaImagem}
                  onChangeText={setNovaImagem}
                  placeholder="https://exemplo.com/foto.jpg"
                  placeholderTextColor={cores.textoSuave}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.grupoInput}>
                <Text style={styles.rotuloInput}>Destaque / Badge (opcional)</Text>
                <TextInput
                  style={styles.campoTexto}
                  value={novoBadge}
                  onChangeText={setNovoBadge}
                  placeholder="Ex: Novo, Destaque, Atendimento 24h"
                  placeholderTextColor={cores.textoSuave}
                />
              </View>

              <View style={styles.modalBotoes}>
                <Pressable
                  style={styles.botaoCancelarModal}
                  onPress={aoFecharModal}
                  disabled={salvandoServico}
                >
                  <Text style={styles.botaoCancelarModalTexto}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.botaoSalvarModal,
                    salvandoServico && styles.botaoSalvarModalDesabilitado,
                  ]}
                  onPress={aoCadastrarServico}
                  disabled={salvandoServico}
                >
                  {salvandoServico ? (
                    <ActivityIndicator color={cores.textoInverso} size="small" />
                  ) : (
                    <Text style={styles.botaoSalvarModalTexto}>Adicionar</Text>
                  )}
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {editandoPerfil ? null : (
        <SafeAreaView edges={["bottom"]} style={styles.tabBarSafe}>
          <View style={styles.tabBar}>
            {ABAS.map((item) => {
              const ativo = aba === item.id;

              return (
                <Pressable
                  key={item.id}
                  style={styles.tabItem}
                  onPress={() => {
                    setEditandoPerfil(false);
                    setAba(item.id);
                  }}
                >
                  <Ionicons
                    name={ativo ? item.iconeAtivo : item.icone}
                    size={22}
                    color={ativo ? cores.primary : cores.textoSuave}
                  />
                  <Text style={[styles.tabRotulo, ativo && styles.tabRotuloAtivo]}>
                    {item.rotulo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
