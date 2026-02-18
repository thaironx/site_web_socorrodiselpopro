// servic.js - JavaScript para solicitação de socorro

// ============================================
// CONFIGURAÇÕES
// ============================================

// IMPORTANTE: Substitua pelo número do WhatsApp do grupo
// Formato: código do país + DDD + número (apenas números)
const WHATSAPP_NUMBER = '5531993452813'; // Exemplo: 55 (Brasil) + 31 (DDD) + 999999999

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

let selectedProblem = null;
let selectedService = null;
let selectedPrice = null;
let selectedTime = null;
let userLatitude = null;
let userLongitude = null;
let userLocation = null;

// ============================================
// ELEMENTOS DO DOM
// ============================================

const problems = document.querySelectorAll('.problem');
const getLocationBtn = document.getElementById('getLocationBtn');
const locationText = document.getElementById('location-text');
const locationBtnText = document.getElementById('locationBtnText');
const serviceDetails = document.getElementById('serviceDetails');
const selectedServiceEl = document.getElementById('selectedService');
const servicePriceEl = document.getElementById('servicePrice');
const serviceTimeEl = document.getElementById('serviceTime');
const descriptionInput = document.getElementById('description');
const vehiclePlateInput = document.getElementById('vehiclePlate');
const confirmBtn = document.getElementById('confirmBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// ============================================
// SELEÇÃO DE PROBLEMA
// ============================================

problems.forEach(problem => {
    problem.addEventListener('click', function() {
        // Remove seleção anterior
        problems.forEach(p => p.classList.remove('active'));
        
        // Adiciona nova seleção
        this.classList.add('active');
        
        // Captura dados do serviço
        selectedProblem = this.querySelector('.problem-name').textContent;
        selectedService = this.dataset.service;
        selectedPrice = this.dataset.price;
        selectedTime = this.dataset.time;
        
        // Mostra detalhes do serviço
        showServiceDetails();
        
        // Feedback visual
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ============================================
// MOSTRAR DETALHES DO SERVIÇO
// ============================================

function showServiceDetails() {
    selectedServiceEl.textContent = selectedService;
    servicePriceEl.textContent = `R$ ${selectedPrice},00`;
    serviceTimeEl.textContent = `${selectedTime} minutos`;
    
    serviceDetails.style.display = 'block';
    serviceDetails.style.animation = 'slideIn 0.4s ease';
}

// ============================================
// GEOLOCALIZAÇÃO
// ============================================

getLocationBtn.addEventListener('click', function() {
    if (!navigator.geolocation) {
        showError('Geolocalização não é suportada pelo seu navegador.');
        return;
    }
    
    // Desabilita botão e mostra feedback
    this.disabled = true;
    locationBtnText.textContent = 'Obtendo localização...';
    
    navigator.geolocation.getCurrentPosition(
        // Sucesso
        function(position) {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            
            // Usa API de geocodificação reversa para obter endereço
            getReverseGeocode(userLatitude, userLongitude);
            
            getLocationBtn.disabled = false;
            locationBtnText.textContent = '✓ Localização obtida';
            getLocationBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
            
            showSuccess('Localização obtida com sucesso!');
        },
        // Erro
        function(error) {
            console.error('Erro ao obter localização:', error);
            
            // Mensagens de erro específicas
            let errorMessage = '';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Você negou o acesso à localização. Por favor, permita o acesso nas configurações do navegador.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Localização indisponível no momento. Tente novamente.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Tempo esgotado ao tentar obter localização. Tente novamente.';
                    break;
                default:
                    errorMessage = 'Erro ao obter localização. Verifique se o GPS está ativado.';
            }
            
            showError(errorMessage, 6000);
            
            getLocationBtn.disabled = false;
            locationBtnText.textContent = 'Tentar novamente';
        },
        // Opções
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
});

// ============================================
// GEOCODIFICAÇÃO REVERSA
// ============================================

function getReverseGeocode(lat, lng) {
    // Usa a API de Nominatim (OpenStreetMap) para converter coordenadas em endereço
    // É gratuita e não requer API key
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=pt-BR`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.display_name) {
                userLocation = data.display_name;
                locationText.textContent = `📍 ${userLocation}`;
                locationText.style.color = '#4caf50';
            } else {
                // Fallback: mostra apenas coordenadas
                userLocation = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                locationText.textContent = `📍 ${userLocation}`;
            }
        })
        .catch(error => {
            console.error('Erro ao obter endereço:', error);
            // Fallback: mostra apenas coordenadas
            userLocation = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
            locationText.textContent = `📍 ${userLocation}`;
        });
}

// ============================================
// VALIDAÇÃO E CONFIRMAÇÃO
// ============================================

confirmBtn.addEventListener('click', function() {
    // Validações
    if (!selectedProblem) {
        showWarning('Por favor, selecione o tipo de problema.');
        // Scroll até a seção de problemas
        document.querySelector('.problem-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    if (!userLocation) {
        showWarning('Por favor, obtenha sua localização antes de confirmar.');
        // Scroll até o botão de localização
        getLocationBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        getLocationBtn.focus();
        return;
    }
    
    const vehiclePlate = vehiclePlateInput.value.trim();
    if (!vehiclePlate) {
        showWarning('Por favor, informe a placa do veículo.');
        vehiclePlateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        vehiclePlateInput.focus();
        return;
    }
    
    // Validação do formato da placa
    const cleanedPlate = vehiclePlate.replace(/[-\s]/g, '').toUpperCase();
    const oldFormat = /^[A-Z]{3}\d{4}$/;
    const mercosulFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!oldFormat.test(cleanedPlate) && !mercosulFormat.test(cleanedPlate)) {
        showWarning('Placa inválida. Use o padrão antigo (ABC-1234) ou Mercosul (ABC1D23).');
        const plateError = document.getElementById('plateError');
        if (plateError) plateError.style.display = 'block';
        vehiclePlateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        vehiclePlateInput.focus();
        return;
    }
    
    // Captura descrição (opcional)
    const description = descriptionInput.value.trim();
    
    // Mostra loading
    showLoading();
    
    // Aguarda 2 segundos antes de abrir WhatsApp (para dar tempo de ver o loading)
    setTimeout(() => {
        openWhatsApp(vehiclePlate, description);
    }, 2000);
});

// ============================================
// ABRIR WHATSAPP COM MENSAGEM PRONTA
// ============================================

function openWhatsApp(vehiclePlate, description) {
    // Monta a mensagem
    let message = `🚨 *SOLICITAÇÃO DE SOCORRO* 🚨\n\n`;
    message += `📋 *Serviço:* ${selectedService}\n`;
    message += `💰 *Valor estimado:* R$ ${selectedPrice},00\n`;
    message += `⏱ *Tempo estimado:* ${selectedTime} minutos\n\n`;
    message += `🚛 *Veículo:* ${vehiclePlate}\n`;
    message += `📍 *Localização:* ${userLocation}\n`;
    
    if (userLatitude && userLongitude) {
        message += `🗺 *Coordenadas:* ${userLatitude.toFixed(6)}, ${userLongitude.toFixed(6)}\n`;
        message += `🔗 *Google Maps:* https://www.google.com/maps?q=${userLatitude},${userLongitude}\n`;
    }
    
    if (description) {
        message += `\n📝 *Descrição:*\n${description}\n`;
    }
    
    message += `\n_Mensagem enviada via Socorro Diesel Pro_`;
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Monta a URL do WhatsApp
    // Para web: https://web.whatsapp.com/send
    // Para mobile: https://api.whatsapp.com/send
    
    // Detecta se é mobile ou desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const whatsappURL = isMobile 
        ? `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    // Abre o WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Esconde loading após abrir
    setTimeout(() => {
        hideLoading();
        showSuccessMessage();
    }, 1000);
}

// ============================================
// LOADING
// ============================================

function showLoading() {
    loadingOverlay.style.display = 'flex';
    confirmBtn.disabled = true;
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
    confirmBtn.disabled = false;
}

// ============================================
// MENSAGEM DE SUCESSO
// ============================================

function showSuccessMessage() {
    // Cria elemento de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            text-align: center;
            z-index: 10000;
            animation: successPop 0.5s ease;
        ">
            <div style="font-size: 50px; margin-bottom: 15px;">✓</div>
            <h2 style="margin-bottom: 10px;">Solicitação Enviada!</h2>
            <p style="margin-bottom: 15px;">Aguarde o retorno via WhatsApp</p>
            <p style="font-size: 14px; opacity: 0.8;">Tempo estimado: ${selectedTime} minutos</p>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove após 4 segundos
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 4000);
}

// ============================================
// ANIMAÇÕES E EFEITOS
// ============================================

// Adiciona animação CSS para o sucesso
const style = document.createElement('style');
style.textContent = `
    @keyframes successPop {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LOGS E DEBUG
// ============================================

console.log('Sistema de Socorro - Inicializado');
console.log('Número WhatsApp configurado:', WHATSAPP_NUMBER);
