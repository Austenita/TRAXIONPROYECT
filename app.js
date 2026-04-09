* TRAXIÓN AI - Executive Logic 2026
 * Manejo de simulaciones de riesgo y UI dinámica
 */
  
function sendMessage() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    
    if (input.value.trim() !== "") {
        
        const userMsg = document.createElement('div');
        userMsg.style.alignSelf = 'flex-end';
        userMsg.style.color = 'var(--gold-muted)';
        userMsg.style.fontSize = '0.8rem';
        userMsg.style.fontWeight = 'bold';
        userMsg.innerText = `USUARIO: ${input.value.toUpperCase()}`;
        container.appendChild(userMsg);

        const mensaje = input.value.toLowerCase();
        input.value = "";

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.style.background = 'rgba(255,255,255,0.05)';
            botMsg.style.padding = '0.8rem';
            botMsg.style.borderLeft = '2px solid var(--gold-muted)';
            
            if (mensaje.includes("vibracion") || mensaje.includes("falla")) {
                botMsg.innerText = "SISTEMA: Analizando telemetría... Se recomienda ingresar valores en el simulador AMFE para determinar el RPN crítico.";
            } else if (mensaje.includes("hola")) {
                botMsg.innerText = "SISTEMA: Buen día. Consola Traxión AI activa. Lista para diagnóstico de flota.";
            } else {
                botMsg.innerText = "SISTEMA: Comando recibido. Procesando datos de mantenimiento preventivo.";
            }
            
            container.appendChild(botMsg);
            container.scrollTop = container.scrollHeight; // Auto-scroll al final
        }, 1000);
    }
}

document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-MX', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        clockElement.innerText = `SYSTEM TIME: ${timeString}`;
    }
}
setInterval(updateClock, 1000);

function calcular() {
    
    const s = parseInt(document.getElementById('sev').value) || 0;
    const o = parseInt(document.getElementById('ocu').value) || 0;
    const d = parseInt(document.getElementById('det').value) || 0;
    
    const rpn = s * o * d;
    
    const resultVal = document.getElementById('rpn-val') || document.getElementById('rpn-circ');
    const resultDesc = document.getElementById('rpn-desc') || document.getElementById('rpn-info');
    const statusLight = document.getElementById('status-light') || document.getElementById('rpn-circ');

    if (resultVal) resultVal.innerText = rpn;

    if (rpn === 0) {
        setResultStyle(statusLight, resultDesc, "#333", "Esperando parámetros de entrada...");
    } else if (rpn <= 50) {
        setResultStyle(statusLight, resultDesc, "#00c853", "ESTADO ÓPTIMO: Riesgo controlado. Continuar monitoreo pasivo.");
    } else if (rpn <= 150) {
        setResultStyle(statusLight, resultDesc, "#ffab00", "PRECAUCIÓN: Desviación detectada. Programar mantenimiento preventivo.");
    } else {
        setResultStyle(statusLight, resultDesc, "#d50000", "ALERTA CRÍTICA: Riesgo inminente. Se recomienda paro técnico inmediato.");
    }
}

function setResultStyle(element, descElement, color, message) {
    if (element) {
        element.style.borderColor = color;
        element.style.boxShadow = `0 0 25px ${color}44`;
        element.style.color = color;
    }
    if (descElement) {
        descElement.innerText = message;
    }
}

function toggleChat() {
    const chat = document.getElementById('chatbot');
    if (chat) {
        chat.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calcular();
        });
    });
});

function ejecutarAnalisis() { calcular(); }
function openChat() { toggleChat(); }
function closeChat() { toggleChat(); }
