/**
 * src/firebaseConfig.js
 * ---------------------------------------------------------------------------
 * App Firebase do banco de dados (projeto ihelpbd-ea1df).
 * A autenticação continua no firebaseConfig.js da raiz (projeto auth-ihelp).
 * ---------------------------------------------------------------------------
 */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firestoreConfig = {
  apiKey: "AIzaSyAymDNF52vXsz_UIjsEGyZ7NSrvLr3tb_E",
  authDomain: "ihelpbd-ea1df.firebaseapp.com",
  projectId: "ihelpbd-ea1df",
  storageBucket: "ihelpbd-ea1df.firebasestorage.app",
  messagingSenderId: "15027668372",
  appId: "1:15027668372:web:12d8216bca6358285f7b81",
  measurementId: "G-8P7FS0MK9L",
};

const NOME_APP = "iHelpBD";

const firestoreApp = getApps().some((app) => app.name === NOME_APP)
  ? getApp(NOME_APP)
  : initializeApp(firestoreConfig, NOME_APP);

export const db = getFirestore(firestoreApp);
