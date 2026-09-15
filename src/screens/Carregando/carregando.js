/**
 * src/screens/Carregando/carregando.js
 * ---------------------------------------------------------------------------
 * Tela exibida enquanto o Firebase verifica se existe uma sessão salva.
 *
 * Sem ela, o app mostraria a tela de login por uma fração de segundo antes de
 * pular para a Home -- o clássico "piscar" de aplicativos mal resolvidos.
 * ---------------------------------------------------------------------------
 */
import { View, ActivityIndicator } from "react-native";

import styles from "./carregando.styles";

const CarregandoScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default CarregandoScreen;
