// ================= CLOCK =================
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");

  if (clock) {
    clock.innerText = now.toLocaleString();
  }
}
setInterval(updateClock, 1000);

// ================= CHAT =================
function openChat() {
  document.getElementById("chatbot").classList.remove("hidden");
  startChat();
}

function startChat() {
  clearChat();

  addBotMessage("Selecciona el problema detectado:");

  showOptions([
    "Falla en frenos",
    "Ruido o vibración",
    "Fuga de aceite",
    "Mantenimiento atrasado"
  ]);
}

function clearChat() {
  document.getElementById("chat-messages").innerHTML = "";
  document.getElementById("chat-options").innerHTML = "";
}

function addBotMessage(text) {
  const container = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "message bot";
  div.innerText = text;
  container.appendChild(div);
}

function addUserMessage(text) {
  const container = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "message user";
  div.innerText = text;
  container.appendChild(div);
}

function showOptions(options) {
  const container = document.getElementById("chat-options");
  container.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleOption(opt);
    container.appendChild(btn);
  });
}

// ================= LOGICA IA REALISTA =================
function handleOption(option) {
  addUserMessage(option);

  let response = "";
  let nextOptions = [];

  switch(option) {

    case "Falla en frenos":
      response = "🔴 Riesgo ALTO\nRevisar pastillas, discos y sistema hidráulico.\nUnidad NO debe operar.";
      nextOptions = ["Ver plan preventivo", "Registrar incidente"];
      break;

    case "Ruido o vibración":
      response = "🟠 Riesgo MEDIO\nPosible desgaste en suspensión o motor.\nProgramar inspección en 24h.";
      nextOptions = ["Ver checklist", "Agendar mantenimiento"];
      break;

    case "Fuga de aceite":
      response = "🟠 Riesgo MEDIO\nPuede causar daño mayor al motor.\nRevisar sellos y niveles.";
      nextOptions = ["Solicitar revisión", "Ver historial"];
      break;

    case "Mantenimiento atrasado":
      response = "🔴 Riesgo ALTO\nAlta probabilidad de falla.\nImplementar mantenimiento preventivo inmediato.";
      nextOptions = ["Crear plan", "Ver KPI flota"];
      break;

    default:
      response = "Acción registrada.";
  }

  setTimeout(() => {
    addBotMessage(response);
    showOptions(nextOptions);
  }, 500);
}
