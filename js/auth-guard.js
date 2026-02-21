// auth-guard.js - Proteção de rotas: redireciona para login se não autenticado

import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Páginas que requerem autenticação
const PROTECTED_PAGES = ['conta.html', 'veiculos.html', 'servic.html'];

// Obtém o nome da página atual
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Verifica autenticação e redireciona conforme necessário
onAuthStateChanged(auth, (user) => {
    if (!user && PROTECTED_PAGES.includes(currentPage)) {
        // Usuário não autenticado tentando acessar página protegida
        showInfo && showInfo('Faça login para continuar.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
});

// Exporta estado do usuário atual para uso em outras páginas
export function getCurrentUser() {
    return auth.currentUser;
}

export { auth, onAuthStateChanged };
