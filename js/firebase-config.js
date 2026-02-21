// firebase-config.js - Configuração e inicialização do Firebase
// IMPORTANTE: Substitua estas credenciais pelas suas do Firebase Console

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ============================================
// CONFIGURAÇÃO DO FIREBASE
// Substitua pelos dados do seu projeto no Firebase Console:
// https://console.firebase.google.com/
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyD-B1QpA47yw9BQkNXSrdjzZM2dRHe0xN0",
  authDomain: "socorro-disel-po-pro.firebaseapp.com",
  projectId: "socorro-disel-po-pro",
  storageBucket: "socorro-disel-po-pro.firebasestorage.app",
  messagingSenderId: "523781752356",
  appId: "1:523781752356:web:e75cc4c861f6fab31d3ab1",
  measurementId: "G-PKSYS81KBR"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta instâncias para uso nos outros módulos
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
