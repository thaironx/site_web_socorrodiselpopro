// conta.js - JavaScript para a página Minha Conta

// ============================================
// LOGOUT
// ============================================

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        // Mostra notificação de confirmação customizada
        const confirmLogout = confirm('Tem certeza que deseja sair da sua conta?');
        
        if (confirmLogout) {
            // Mostra feedback visual
            this.textContent = '🔄 Saindo...';
            this.disabled = true;
            
            showInfo('Encerrando sessão...');
            
            // Simula logout (em produção, faria logout real)
            setTimeout(() => {
                showSuccess('Logout realizado com sucesso!');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 1000);
        }
    });
}

// ============================================
// ANIMAÇÕES DOS CARDS
// ============================================

// Anima os cards ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Info section
    const infoSection = document.querySelector('.info-section');
    if (infoSection) {
        infoSection.style.opacity = '0';
        infoSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            infoSection.style.transition = 'all 0.5s ease';
            infoSection.style.opacity = '1';
            infoSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // History items
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
    
    // Stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 400 + (index * 100));
    });
});

// ============================================
// EFEITO DE HOVER NOS CARDS DE HISTÓRICO
// ============================================

const historyItems = document.querySelectorAll('.history-item');
historyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ============================================
// ANIMAÇÃO DOS NÚMEROS NAS ESTATÍSTICAS
// ============================================

function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasNumber = /\d+/.test(text);
        
        if (hasNumber) {
            const number = parseInt(text.match(/\d+/)[0]);
            const suffix = text.replace(/\d+/, '');
            let current = 0;
            const increment = number / 30; // 30 frames
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Executa animação após um delay
setTimeout(animateNumbers, 500);

// ============================================
// ADICIONAR FUNCIONALIDADE DE EXPANDIR DETALHES
// ============================================

historyItems.forEach(item => {
    const header = item.querySelector('.history-header');
    const body = item.querySelector('.history-body');
    
    // Inicialmente esconde detalhes em mobile
    if (window.innerWidth < 768) {
        body.style.maxHeight = '0';
        body.style.overflow = 'hidden';
        body.style.transition = 'max-height 0.3s ease';
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            if (body.style.maxHeight === '0px') {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = '0';
            }
        });
    }
});

// ============================================
// FORMATAÇÃO DE VALORES
// ============================================

// Formata valores monetários se necessário
const priceElements = document.querySelectorAll('.history-body p');
priceElements.forEach(p => {
    const text = p.textContent;
    if (text.includes('Valor:') && text.includes('R$')) {
        p.style.fontWeight = 'bold';
        p.style.color = '#4caf50';
    }
});

// ============================================
// FEEDBACK VISUAL
// ============================================

// Adiciona efeito de pulso ao botão de logout
logoutBtn.addEventListener('mouseenter', function() {
    this.style.animation = 'pulse 0.5s ease';
});

logoutBtn.addEventListener('mouseleave', function() {
    this.style.animation = '';
});

// Adiciona animação de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LOG DE DEBUG
// ============================================

console.log('Página Minha Conta carregada com sucesso!');
console.log('Histórico de atendimentos:', historyItems.length);
