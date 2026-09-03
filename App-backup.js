import { StyleSheet, Text, View, Button, ActivityIndicator, Image, Alert } from "react-native";
import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

//funções de autenticação
export const onLogin = async () => {
  const user = await GoogleSignin.signIn();
  return user;
};

export const onLogout = async () => {
  return await GoogleSignin.signOut();
};

GoogleSignin.configure({
  webClientId: "477646126837-6q2cmd3tt0dupmvacqptnlack9rpoge5.apps.googleusercontent.com",
});

// Telas
const LoginScreen = ({ login }) => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  return (
    <View style={styles.layout}>
      {isSigninInProgress && <ActivityIndicator />}
      <Text style={styles.title}>Login</Text>
      <Button
        title="entrar"
        onPress={async () => {
          setIsSigninInProgress(true);

          try {
            const user = await onLogin();

            const email = user.data.user.email;

            if (email.endsWith("iftm.edu.br")) {
              login(user);
            } else {
              await onLogout();

              Alert.alert("Acesso restrito");
            }
          } catch (error) {
            console.error("Erro no login:", error.message);
            console.error("Erro no login:", error.name);
            console.error("Erro no login:", error.code);

            Alert.alert("Não foi possível realizar o login com o Google");
          } finally {
            setIsSigninInProgress(false);
          }
        }}

      />
    </View>
  );
};

const HomeScreen = ({ user, login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
    <Image
      style={{ width: 300, height: 300, marginBottom: 30, borderRadius: 90 }}
      source={{
        uri: user.data.user.photo,
      }}
    />
    <Button title="Sair" onPress={() => onLogout().then(() => login(false))} />
  </View>
);

const App = () => {
  const [user, setUser] = useState(false);
  return <View style={styles.container}>{user ? <HomeScreen user={user} login={setUser} /> : <LoginScreen login={setUser} />}</View>;
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});