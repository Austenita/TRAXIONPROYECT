function openChat() {
  document.getElementById("chatbot").classList.remove("hidden");
  addBotMessage("Hola 👋 Soy tu asistente de mantenimiento. Describe el estado del camión.");
}

function closeChat() {
  document.getElementById("chatbot").classList.add("hidden");
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();

  if (!text) return;

  addUserMessage(text);
  input.value = "";

  setTimeout(() => {
    const response = analyzeRisk(text);
    addBotMessage(response);
  }, 500);
}

function addUserMessage(text) {
  const container = document.getElementById("chat-messages");
  container.innerHTML += `<div class="message user">${text}</div>`;
  container.scrollTop = container.scrollHeight;
}

function addBotMessage(text) {
  const container = document.getElementById("chat-messages");
  container.innerHTML += `<div class="message bot">${text}</div>`;
  container.scrollTop = container.scrollHeight;
}

/* 🧠 Lógica IA simplificada */
function analyzeRisk(input) {
  input = input.toLowerCase();

  let risk = 0;
  let recommendations = [];

  if (input.includes("ruido") || input.includes("vibración")) {
    risk += 2;
    recommendations.push("Revisar sistema de suspensión y motor");
  }

  if (input.includes("freno") || input.includes("frenos")) {
    risk += 3;
    recommendations.push("Inspección urgente de sistema de frenos");
  }

  if (input.includes("aceite") || input.includes("fuga")) {
    risk += 2;
    recommendations.push("Verificar fugas y niveles de aceite");
  }

  if (input.includes("no mantenimiento") || input.includes("atrasado")) {
    risk += 3;
    recommendations.push("Implementar mantenimiento preventivo inmediato");
  }

  let level = "";

  if (risk >= 5) {
    level = "🔴 ALTO";
  } else if (risk >= 3) {
    level = "🟠 MEDIO";
  } else {
    level = "🟢 BAJO";
  }

  return `
  Nivel de riesgo: ${level}

  Recomendaciones:
  - ${recommendations.join("\n- ") || "Monitoreo continuo"}

  💡 Sugerencia IA:
  Migrar a mantenimiento preventivo basado en datos.
  `;
}
