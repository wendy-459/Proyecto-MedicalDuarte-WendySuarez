const preguntas = [
  {
    texto: "¿Cuál de estos es un deber fundamental para mantener el orden en la clínica?",
    opciones: ["Ignorar las señales", "Mantener el buen orden y aseo en la institución", "Correr por los pasillos"],
    correcta: "Mantener el buen orden y aseo en la institución"
  },
  {
    texto: "Si te sientes mal, ¿cuál es tu derecho como paciente?",
    opciones: ["No decir nada", "Recibir atención requerida de acuerdo a sus necesidades", "Atenderte a ti mismo"],
    correcta: "Recibir atención requerida de acuerdo a sus necesidades"
  },
  {
    texto: "¿Qué debes hacer si tienes una cita médica?",
    opciones: ["Llegar tarde intencionalmente", "Cumplir las citas y requerimientos del personal de salud", "Cancelar sin avisar"],
    correcta: "Cumplir las citas y requerimientos del personal de salud"
  },
  {
    texto: "¿Qué derecho tienes sobre la información de tu salud?",
    opciones: ["Que te oculten información", "Conocer toda la información sobre la enfermedad, procedimientos y tratamientos", "Solo conocer lo básico"],
    correcta: "Conocer toda la información sobre la enfermedad, procedimientos y tratamientos"
  },
  {
    texto: "¿Cuál de estos es un deber relacionado con tu comportamiento hacia el personal?",
    opciones: ["Gritarles", "Respetar al personal de salud y a los usuarios", "Ignorarlos"],
    correcta: "Respetar al personal de salud y a los usuarios"
  },
  {
    texto: "Si no entiendes una prescripción, ¿cuál es tu derecho?",
    opciones: ["Asumir lo que dice", "Recibir prescripción de medicamentos y explicación de vías de administración", "Pedir a otro paciente que te explique"],
    correcta: "Recibir prescripción de medicamentos y explicación de vías de administración"
  },
  {
    texto: "¿Qué deber tienes sobre la información que brindas a la clínica?",
    opciones: ["Dar información falsa", "Exponer claramente su estado de salud y la causa de su visita", "No decir toda la verdad"],
    correcta: "Exponer claramente su estado de salud y la causa de su visita"
  },
  {
    texto: "Si quieres rechazar un procedimiento, ¿qué derecho tienes?",
    opciones: ["Hacerlo sin avisar", "Aceptar o rechazar procedimientos dejando constancia escrita", "No tener opción"],
    correcta: "Aceptar o rechazar procedimientos dejando constancia escrita"
  },
  {
    texto: "¿Cuál es tu deber si ves algo que daña la clínica?",
    opciones: ["No decir nada", "Informar de todo acto que afecte a la clinica", "Unirte al daño"],
    correcta: "Informar de todo acto que afecte a la clinica"
  },
  {
    texto: "¿Qué derecho tienes sobre el trato que recibes del personal?",
    opciones: ["Recibir un trato grosero", "Recibir un trato amable, cortés y humano por parte de todo el personal", "Ser ignorado"],
    correcta: "Recibir un trato amable, cortés y humano por parte de todo el personal"
  }
];

let preguntaActual = 0;
let feedbackTimeout; // To clear previous timeouts

function mostrarPregunta() {
  clearTimeout(feedbackTimeout); // Clear any existing feedback
  document.getElementById("feedback-message").textContent = ""; // Clear feedback text
  document.getElementById("feedback-message").classList.remove("feedback-correct", "feedback-incorrect"); // Remove classes

  const pregunta = preguntas[preguntaActual];
  document.getElementById("texto-pregunta").textContent = pregunta.texto;

  const contenedorOpciones = document.getElementById("opciones");
  contenedorOpciones.innerHTML = "";

  pregunta.opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.classList.add("opcion");
    boton.onclick = () => validarRespuesta(opcion, pregunta.correcta);
    contenedorOpciones.appendChild(boton);
  });
}

function validarRespuesta(opcionSeleccionada, respuestaCorrecta) {
  const feedbackMessage = document.getElementById("feedback-message");
  if (opcionSeleccionada === respuestaCorrecta) {
    feedbackMessage.textContent = "✅ ¡Correcto!";
    feedbackMessage.classList.remove("feedback-incorrect");
    feedbackMessage.classList.add("feedback-correct");
  } else {
    feedbackMessage.textContent = "❌ Intenta de nuevo.";
    feedbackMessage.classList.remove("feedback-correct");
    feedbackMessage.classList.add("feedback-incorrect");
  }
  // You can disable options here if you want only one attempt per question
  Array.from(document.querySelectorAll('.opcion')).forEach(button => {
      button.disabled = true;
  });

  // Automatically move to the next question after a short delay for feedback
  feedbackTimeout = setTimeout(siguientePregunta, 1500); // 1.5 seconds delay
}

function siguientePregunta() {
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    const juegoContainer = document.querySelector(".juego-container");
    juegoContainer.innerHTML = `
      <h1>🎉 ¡Felicidades! Has terminado el juego. 🎉</h1>
      <p style="font-size: 1.2em; color: #555;">¡Has aprendido mucho sobre tus derechos y deberes!</p>
      <button onclick="window.location.href='guia.html'" style="margin-top: 30px;">Volver a la Guía</button>
    `;
    // Hide the next button
    document.querySelector('button[onclick="siguientePregunta()"]').style.display = 'none';
  }
}

window.onload = mostrarPregunta;