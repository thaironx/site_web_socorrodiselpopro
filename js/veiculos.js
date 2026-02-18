// veiculos.js - JavaScript para página de veículos

// ============================================
// BOTÕES DE AÇÃO
// ============================================

// Editar veículo
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
        const vehicleCard = this.closest('.vehicle-card');
        const modelo = vehicleCard.querySelector('.vehicle-info-item:nth-child(1) .info-value').textContent;
        
        showInfo(`Editando informações do veículo: ${modelo}`);
        
        // Aqui você pode abrir um modal de edição ou redirecionar para página de edição
        setTimeout(() => {
            showWarning('Funcionalidade de edição em desenvolvimento.');
        }, 1500);
    });
});

// Manutenções
document.querySelectorAll('.btn-maintenance').forEach(btn => {
    btn.addEventListener('click', function() {
        const vehicleCard = this.closest('.vehicle-card');
        const modelo = vehicleCard.querySelector('.vehicle-info-item:nth-child(1) .info-value').textContent;
        
        showInfo(`Carregando histórico de manutenções do ${modelo}...`);
        
        setTimeout(() => {
            showSuccess('Histórico de manutenções carregado!');
            // Aqui você pode mostrar um modal com o histórico
        }, 1500);
    });
});

// Documentos
document.querySelectorAll('.btn-documents').forEach(btn => {
    btn.addEventListener('click', function() {
        const vehicleCard = this.closest('.vehicle-card');
        const modelo = vehicleCard.querySelector('.vehicle-info-item:nth-child(1) .info-value').textContent;
        
        showInfo(`Acessando documentos do ${modelo}...`);
        
        setTimeout(() => {
            showSuccess('Documentos disponíveis para download!');
            // Aqui você pode listar os documentos (CRLV, etc)
        }, 1500);
    });
});

// Adicionar novo veículo
document.getElementById('addVehicleBtn').addEventListener('click', function() {
    showInfo('Abrindo formulário de cadastro...');
    
    setTimeout(() => {
        showWarning('Funcionalidade de cadastro em desenvolvimento.');
        // Aqui você pode abrir um formulário ou redirecionar
    }, 1500);
});

// ============================================
// ANIMAÇÕES AO CARREGAR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
});

// ============================================
// HOVER NOS CARDS
// ============================================

document.querySelectorAll('.vehicle-info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ============================================
// LOG
// ============================================

console.log('Página de Veículos carregada!');
console.log('Total de veículos:', document.querySelectorAll('.vehicle-card').length);
