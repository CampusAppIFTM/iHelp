/**
 * src/services/servicos.js
 * ---------------------------------------------------------------------------
 * Lê os documentos da coleção `servico` no Firestore.
 * ---------------------------------------------------------------------------
 */
import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

const COLECAO_SERVICO = "servico";

function inferirCategoria(titulo, descricao) {
  const texto = `${titulo} ${descricao}`.toLowerCase();

  if (texto.includes("eletric")) return "Eletricista";
  if (texto.includes("encan") || texto.includes("hidrául") || texto.includes("hidraul")) {
    return "Encanador";
  }
  if (texto.includes("pintur")) return "Pintura";

  return "Outros";
}

function uriImagem(imagem) {
  if (typeof imagem !== "string" || !imagem.trim()) return null;
  if (imagem.startsWith("http") || imagem.startsWith("data:")) return imagem;
  return `data:image/jpeg;base64,${imagem}`;
}

function mapearServico(documento) {
  const dados = documento.data();
  const titulo = dados.título ?? dados.titulo ?? "";
  const descricao = dados.descricao ?? dados.descrição ?? "";

  return {
    id: documento.id,
    titulo,
    descricao,
    nota: Number(dados["avg-avaliacao"] ?? dados.avgAvaliacao ?? dados.nota ?? 0),
    avaliacoes: Number(
      dados["num-avaliacoes"] ?? dados.numAvaliacoes ?? dados.avaliacoes ?? 0
    ),
    imagem: uriImagem(dados.imagem),
    categoria: dados.categoria ?? inferirCategoria(titulo, descricao),
    badge: dados.badge ?? null,
  };
}

export async function listarServicos() {
  const consulta = await getDocs(collection(db, COLECAO_SERVICO));
  return consulta.docs.map(mapearServico);
}

export async function cadastrarServico(dados) {
  const titulo = dados.titulo?.trim() || "";
  const descricao = dados.descricao?.trim() || "";
  const categoria = dados.categoria?.trim() || inferirCategoria(titulo, descricao);
  const imagem = dados.imagem?.trim() || "";
  const badge = dados.badge?.trim() || "Novo";
  const nota = Number(dados.nota ?? 5.0);
  const avaliacoes = Number(dados.avaliacoes ?? 1);

  const payload = {
    titulo,
    descricao,
    categoria,
    imagem,
    "avg-avaliacao": nota,
    "num-avaliacoes": avaliacoes,
    badge,
    criadoEm: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, COLECAO_SERVICO), payload);

  return {
    id: docRef.id,
    titulo,
    descricao,
    categoria,
    imagem: uriImagem(imagem),
    nota,
    avaliacoes,
    badge,
  };
}
