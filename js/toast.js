// toast.js - Sistema de notificações modernas

// Cria o container de notificações se não existir
function createToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

// Função principal para mostrar notificação
function showToast(message, type = 'info', duration = 4000) {
    createToastContainer();
    
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const titles = {
        success: 'Sucesso!',
        error: 'Erro!',
        warning: 'Atenção!',
        info: 'Informação'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || 'ℹ'}</div>
        <div class="toast-content">
            <div class="toast-title">${titles[type] || 'Informação'}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Fechar">×</button>
    `;
    
    container.appendChild(toast);
    
    // Botão de fechar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto-remover após duração
    if (duration > 0) {
        setTimeout(() => removeToast(toast), duration);
    }
    
    return toast;
}

// Remove notificação com animação
function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('closing');
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 400);
}

// Atalhos para tipos específicos
function showSuccess(message, duration = 4000) {
    return showToast(message, 'success', duration);
}

function showError(message, duration = 5000) {
    return showToast(message, 'error', duration);
}

function showWarning(message, duration = 4500) {
    return showToast(message, 'warning', duration);
}

function showInfo(message, duration = 4000) {
    return showToast(message, 'info', duration);
}

// Exportar para uso global
window.showToast = showToast;
window.showSuccess = showSuccess;
window.showError = showError;
window.showWarning = showWarning;
window.showInfo = showInfo;
