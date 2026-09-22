// ==========================================================
// Interactive Logic: Quiz, WhatsApp Link Generator & Accordions
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Logic
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Open first FAQ by default
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
  }

  // 2. Interactive Level Quiz Data
  const quizQuestions = [
    {
      question: '1. ¿Cómo responderías al saludo: "Ciao, come stai?"',
      options: [
        { text: 'A) Molto bene, grazie! E tu?', points: 1 },
        { text: 'B) Buongiorno, signore', points: 0 },
        { text: 'C) No entiendo qué me estás diciendo', points: 0 }
      ]
    },
    {
      question: '2. En un restaurante, para pedir la cuenta dices:',
      options: [
        { text: 'A) Voglio pagare adesso', points: 0 },
        { text: 'B) Il conto, per favore', points: 1 },
        { text: 'C) Scusa, quanto costa tutto?', points: 0 }
      ]
    },
    {
      question: '3. Completa la frase: "Domani io _____ a Roma."',
      options: [
        { text: 'A) Vado (del verbo Andare)', points: 1 },
        { text: 'B) Camminare', points: 0 },
        { text: 'C) Sono stato', points: 0 }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let totalScore = 0;

  const quizProgressBar = document.getElementById('quiz-progress');
  const stepIndicator = document.getElementById('step-indicator');
  const questionTitle = document.getElementById('quiz-question-title');
  const optionsContainer = document.getElementById('quiz-options');
  const questionBox = document.getElementById('quiz-question-box');
  const resultBox = document.getElementById('quiz-result-box');
  const resultBadge = document.getElementById('result-badge');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const resultWhatsappBtn = document.getElementById('result-whatsapp-btn');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  function loadQuestion(index) {
    const currentQ = quizQuestions[index];
    stepIndicator.textContent = `Pregunta ${index + 1} de ${quizQuestions.length}`;
    questionTitle.textContent = currentQ.question;
    
    // Update progress bar
    const progressPercent = ((index + 1) / quizQuestions.length) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;

    // Render options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<i class="fa-regular fa-circle"></i> <span>${opt.text}</span>`;
      btn.addEventListener('click', () => handleOptionSelect(opt.points));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelect(points) {
    totalScore += points;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  }

  function showResults() {
    questionBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    stepIndicator.textContent = '¡Test Completado!';
    quizProgressBar.style.width = '100%';

    let level = '';
    let description = '';
    let badge = '🇮🇹';

    if (totalScore === 3) {
      level = 'Nivel A2 / Intermedio Inicial';
      badge = '🌟';
      description = '¡Tienes muy buenos conceptos de vocabulario y gramática! Estás listo para enfocarte en conversación y soltar la lengua.';
    } else if (totalScore >= 1) {
      level = 'Nivel A1 / Principiante con Base';
      badge = '🌱';
      description = '¡Excelente intuición! Tienes nociones básicas y con un programa estructurado podrás aprender a comunicarte con total fluidez.';
    } else {
      level = 'Nivel A1 / Principiante desde Cero';
      badge = '🚀';
      description = '¡El mejor momento para empezar! Nuestro método paso a paso te hará hablar tus primeras frases completas desde la primera semana.';
    }

    resultBadge.textContent = badge;
    resultTitle.textContent = `Tu Nivel Sugerido: ${level}`;
    resultDesc.textContent = description;

    // Pre-fill WhatsApp message with level
    const message = encodeURIComponent(`¡Ciao! Hice el test en su página web y mi resultado fue: ${level} (${totalScore}/3 aciertos). Quisiera consultar sobre los horarios y cupos disponibles 🇮🇹`);
    resultWhatsappBtn.href = `https://wa.me/?text=${message}`;
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    resultBox.classList.add('hidden');
    questionBox.classList.remove('hidden');
    loadQuestion(0);
  }

  restartQuizBtn.addEventListener('click', resetQuiz);

  // Initialize Quiz
  loadQuestion(0);
});
