// ==========================================================
// Interactive Logic: Test di Autovalutazione A1.1 (Nuovo Espresso 1)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Logic
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
  }

  // 2. Self-Evaluation Test Logic
  const checkboxes = document.querySelectorAll('.test-check');
  const liveScoreCount = document.getElementById('live-score-count');
  const calculateBtn = document.getElementById('calculate-results-btn');
  const calculateTopBtn = document.getElementById('calculate-results-top-btn');
  const resultBox = document.getElementById('test-result-box');
  const retestBtn = document.getElementById('retest-btn');

  // Result Elements
  const resBadgeIcon = document.getElementById('res-badge-icon');
  const resHeadline = document.getElementById('res-headline');
  const resScoreTag = document.getElementById('res-score-tag');
  const resLevelTitle = document.getElementById('res-level-title');
  const resLevelDesc = document.getElementById('res-level-desc');
  const scoreAscolto = document.getElementById('score-ascolto');
  const scoreLettura = document.getElementById('score-lettura');
  const scoreInterazione = document.getElementById('score-interazione');
  const scoreProduzione = document.getElementById('score-produzione');
  const scoreScritta = document.getElementById('score-scritta');
  const testWhatsappCta = document.getElementById('test-whatsapp-cta');

  // Category totals
  const totalItems = checkboxes.length; // 30

  // Update live score counter
  function updateLiveScore() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });
    liveScoreCount.textContent = `${checkedCount} / ${totalItems}`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateLiveScore);
  });

  // Calculate and display official results
  function calculateResults() {
    let total = 0;
    let scores = {
      ascolto: 0,
      lettura: 0,
      interazione: 0,
      produzione: 0,
      scritta: 0
    };

    checkboxes.forEach(cb => {
      if (cb.checked) {
        total++;
        const cat = cb.getAttribute('data-cat');
        if (scores[cat] !== undefined) {
          scores[cat]++;
        }
      }
    });

    // Populate Category Breakdown
    scoreAscolto.textContent = `${scores.ascolto} / 7`;
    scoreLettura.textContent = `${scores.lettura} / 4`;
    scoreInterazione.textContent = `${scores.interazione} / 10`;
    scoreProduzione.textContent = `${scores.produzione} / 6`;
    scoreScritta.textContent = `${scores.scritta} / 3`;

    resScoreTag.textContent = `${total} / 30 Punti`;

    let levelTitle = '';
    let levelDesc = '';
    let badge = '🇮🇹';
    let whatsappText = '';

    // Official Nuovo Espresso 1 Evaluation Scale:
    // da 1 a 15 punti: puoi usare NUOVO Espresso 1 dalla lezione 1
    // da 16 a 23 punti: puoi usare NUOVO Espresso 1 dalla lezione 3
    // da 24 a 30 punti: passa al test di livello A1.2
    if (total >= 24) {
      badge = '🌟';
      levelTitle = 'Nivel A1.2 / Preparado para Nivel Superior';
      levelDesc = '¡Excelente dominio de las bases de A1.1! Puedes incorporarte a cursos intermedios o avanzar directamente al test de nivel A1.2 de Nuovo Espresso.';
      whatsappText = `¡Ciao! Completé el Test de Autoevaluación A1.1 de Nuovo Espresso con ${total}/30 puntos (Nivel A1.2). Quisiera consultar por cursos avanzados / intermedios 🇮🇹`;
    } else if (total >= 16) {
      badge = '🌱';
      levelTitle = 'Nivel A1.1 Avanzado (Nuovo Espresso 1 • Lezione 3)';
      levelDesc = 'Tienes una base sólida en comprensión y frases cotidianas. Te recomendamos empezar a partir de la Lección 3 de Nuovo Espresso 1 para afianzar conversación.';
      whatsappText = `¡Ciao! Completé el Test de Autoevaluación A1.1 con ${total}/30 puntos (Recomendación: Nuovo Espresso 1 Lezione 3). Quiero información para sumarme a las clases 🇮🇹`;
    } else {
      badge = '🚀';
      levelTitle = 'Nivel A1.1 Inicial (Nuovo Espresso 1 • Lezione 1)';
      levelDesc = '¡El mejor punto de partida! Nuestro curso desde la Lección 1 de Nuovo Espresso te enseñará a presentarte, pedir en restaurantes y comunicarte sin miedos.';
      whatsappText = `¡Ciao! Hice el Test de Autoevaluación A1.1 en su web con ${total}/30 puntos (Recomendación: Inicio desde Lezione 1). Me gustaría consultar aranceles y horarios 🇮🇹`;
    }

    resBadgeIcon.textContent = badge;
    resHeadline.textContent = `Resultado: ${total} / 30 Puntos`;
    resLevelTitle.textContent = levelTitle;
    resLevelDesc.textContent = levelDesc;

    // Set WhatsApp link
    const encodedMessage = encodeURIComponent(whatsappText);
    testWhatsappCta.href = `https://wa.me/?text=${encodedMessage}`;

    // Show result box with smooth scroll
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateResults);
  }

  if (calculateTopBtn) {
    calculateTopBtn.addEventListener('click', calculateResults);
  }

  if (retestBtn) {
    retestBtn.addEventListener('click', () => {
      resultBox.classList.add('hidden');
      document.getElementById('test-autovalutazione').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
