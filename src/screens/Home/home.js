/**
 * src/screens/Home/home.js
 * ---------------------------------------------------------------------------
 * Feed de serviços após o login.
 * ---------------------------------------------------------------------------
 */
import { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { sair } from "../../services/autenticacao";
import { cores } from "../../theme";
import styles from "./home.styles";
import PerfilScreen from "../Perfil/perfil";
import EditarPerfilUserScreen from "../EditarPerfilUser/editarPerfilUser";
import encanadorImg from "../../../assets/encanador.png";

const CATEGORIAS = ["Todos", "Eletricista", "Encanador", "Pintura"];

const SERVICOS = [
  {
    id: "1",
    categoria: "Eletricista",
    titulo: "Eletricista Residencial & Manutenção",
    descricao:
      "Instalações elétricas, quadros de distribuição, tomadas e reparos urgentes com garantia de segurança.",
    nota: 4.9,
    avaliacoes: 142,
    badge: "Atende em até 2h",
  },
  {
    id: "2",
    categoria: "Encanador",
    titulo: "Encanador Hidráulico & Desentupimento",
    descricao:
      "Conserto de vazamentos em canos, desentupimento de pias, ralos, vasos e revisão hidráulica completa.",
    nota: 4.8,
    avaliacoes: 98,
    badge: "Profissional Verificado",
  },
  {
    id: "3",
    categoria: "Pintura",
    titulo: "Pintura & Pequenos Reparos",
    descricao:
      "Pintura de paredes internas, forros, aplicação de massa corrida e retoques de acabamento com agilidade.",
    nota: 5.0,
    avaliacoes: 64,
    badge: "Visita Técnica Grátis",
  },
];

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
      <Image source={encanadorImg} style={styles.cardImagem} resizeMode="cover" />
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
          {item.nota.toFixed(1)}
          <Text style={styles.cardAvaliacoes}> ({item.avaliacoes} avaliações)</Text>
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{item.badge}</Text>
        </View>
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

  const servicos = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return SERVICOS.filter((servico) => {
      const naCategoria = categoria === "Todos" || servico.categoria === categoria;
      const naBusca =
        !termo ||
        servico.titulo.toLowerCase().includes(termo) ||
        servico.descricao.toLowerCase().includes(termo) ||
        servico.categoria.toLowerCase().includes(termo);

      return naCategoria && naBusca;
    });
  }, [busca, categoria]);

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
          <Text style={styles.vazio}>Nenhum serviço encontrado.</Text>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.tela} edges={["top"]}>
      <View style={styles.conteudo}>{renderConteudo()}</View>

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
