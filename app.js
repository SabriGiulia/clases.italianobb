// ==========================================================
// Interactive Diagnostic & Placement Test Engine
// @clases.italianobb
// ==========================================================

// Ensure page always starts at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // 1. FAQ Accordions
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        accordionItems.forEach(i => {
          i.classList.remove('active');
          const h = i.querySelector('.accordion-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 2. Comprehensive Question Database (46 Progressive Questions)
  const questionBank = [
    // --- STAGE 1: Principiante Inicial ---
    {
      id: 1,
      stage: 'Nivel Inicial A1',
      context: 'Completa la frase:',
      question: '1. Voi ______ di Milano?',
      options: ['a. siete', 'b. siamo', 'c. sono'],
      correct: 0
    },
    {
      id: 2,
      stage: 'Nivel Inicial A1',
      context: 'Completa la frase:',
      question: '2. Lei ______ la segretaria?',
      options: ['a. faccio', 'b. fai', 'c. fa'],
      correct: 2
    },
    {
      id: 3,
      stage: 'Nivel Inicial A1',
      context: 'Completa la frase:',
      question: '3. Arianna ______ in un ufficio.',
      options: ['a. lavora', 'b. lavoro', 'c. lavori'],
      correct: 0
    },
    {
      id: 4,
      stage: 'Nivel Inicial A1',
      context: 'Completa la frase:',
      question: '4. Tu quanti anni ______ ?',
      options: ['a. hai', 'b. ho', 'c. abbiamo'],
      correct: 0
    },
    {
      id: 5,
      stage: 'Nivel Inicial A1',
      context: 'Artículos (un / uno / un’ / una):',
      question: '5. Vorrei ___ aperitivo, ___ toast e poi ___ aranciata.',
      options: [
        'a. uno / un’ / una',
        'b. un / un / un’',
        'c. un / un / un’ (toast maschile, aranciata femminile)'
      ],
      correct: 1
    },
    {
      id: 6,
      stage: 'Nivel Inicial A1',
      context: 'Artículos definidos (i / gli / le):',
      question: '6. Preferisci ___ (1) tortellini o ___ (2) lasagne? ___ (3) spaghetti o ___ (4) tagliatelle?',
      options: [
        'a. i tortellini / le lasagne / gli spaghetti / le tagliatelle',
        'b. gli tortellini / i lasagne / i spaghetti / le tagliatelle',
        'c. le tortellini / le lasagne / gli spaghetti / gli tagliatelle'
      ],
      correct: 0
    },
    {
      id: 7,
      stage: 'Nivel Inicial A1',
      context: 'Verbos en presente (fare / andare / stare):',
      question: '7. «Voi cosa ___ nel tempo libero?» — «Di solito ___ sport, ___ in palestra. Io invece ___ a casa.»',
      options: [
        'a. fate / facciamo / andiamo / sto',
        'b. fanno / fate / andate / sta',
        'c. fare / fanno / vanno / fai'
      ],
      correct: 0
    },
    {
      id: 8,
      stage: 'Nivel Inicial A1',
      context: 'Preposiciones (in / con / al / di):',
      question: '8. «___ febbraio affitto appartamento situato ___ zona centrale, ___ ogni comfort e vicino ___ mare.»',
      options: [
        'a. Nel / a / su / di',
        'b. In / in / con / al',
        'c. Di / nel / di / da'
      ],
      correct: 1
    },

    // --- STAGE 2: Elemental A1.2 / A2 ---
    {
      id: 9,
      stage: 'Nivel Elemental A1.2',
      context: 'Partículas y adjetivos (ci / dei / ci sono / belle):',
      question: '9. «La signora Vanzetta conosce bene Bologna e ___ (1) va spesso. In questa città ___ (2) tante cose da vedere: delle ___ (3) chiese e ___ (4) musei.»',
      options: [
        'a. ci / ci sono / belle / dei',
        'b. in città / c’è / bello / i',
        'c. Bologna / può vedere / bella / degli'
      ],
      correct: 0
    },
    {
      id: 10,
      stage: 'Nivel Elemental A1.2',
      context: 'Direcciones en la ciudad:',
      question: '10. «C’è una libreria qui vicino?» — «Sì, Lei adesso ___ (1) dall’albergo, poi gira ___ (2) e lì, ___ (3) il supermercato e la banca, c’è la libreria.»',
      options: [
        'a. gira / avanti / davanti',
        'b. va / dritto / all’angolo',
        'c. esce / a destra / fra'
      ],
      correct: 2
    },
    {
      id: 11,
      stage: 'Nivel Elemental A1.2',
      context: 'Pedir información con cortesía:',
      question: '11. «Scusi, sa ___ l’hotel Lux?» — «No, ___, non sono di qui.»',
      options: [
        'a. se c’è / allora',
        'b. dov’è / mi dispiace',
        'c. c’è / si figuri'
      ],
      correct: 1
    },
    {
      id: 12,
      stage: 'Nivel Elemental A2.1',
      context: 'Passato Prossimo (essere vs avere):',
      question: '12. «Ieri Carlo e Anna ___ (1) in un museo e poi ___ (2) in un ristorante. La sera Anna ___ (3) al cinema.»',
      options: [
        'a. hanno stato / hanno pranzato / sono andati',
        'b. sono stati / hanno pranzato / è andata',
        'c. sono state / ho pranzato / è andato'
      ],
      correct: 1
    },
    {
      id: 13,
      stage: 'Nivel Elemental A2.1',
      context: 'Pronombres directos y partícula "ne":',
      question: '13. «Prende due etti di mortadella, ma ___ (1) vuole affettata sottile. Vuole del formaggio e ___ (2) prende tre etti. Compra delle olive e ___ (3) vuole nere.»',
      options: [
        'a. la / ne / le',
        'b. lo / lo / la',
        'c. ne / li / ne'
      ],
      correct: 0
    },
    {
      id: 14,
      stage: 'Nivel Elemental A2.1',
      context: '¿Cuál es la respuesta correcta?:',
      question: '14. «Ti alzi presto la mattina?»',
      options: [
        'a. Sì, verso le sei.',
        'b. Sì, dopo pranzo.',
        'c. Dalle otto alle dieci.'
      ],
      correct: 0
    },
    {
      id: 15,
      stage: 'Nivel Elemental A2.1',
      context: 'Verbos reflexivos en pasado:',
      question: '15. «Silvia ___ (1) in fisica e noi ___ (2) in questa città da poco.»',
      options: [
        'a. si è laureata / ci siamo trasferiti',
        'b. è laureato / abbiamo trasferito',
        'c. ti sei laureata / sono trasferiti'
      ],
      correct: 0
    },
    {
      id: 16,
      stage: 'Nivel Elemental A2.1',
      context: 'Posesivos con familia (mio / la mia / i miei):',
      question: '16. «___ (1) sorella è più grande e ___ (2) fratelli sono più piccoli. ___ (3), invece, vivono vicino.»',
      options: [
        'a. Mia / i miei / I miei (genitori)',
        'b. La mia / miei / Miei',
        'c. Mio / mio / Genitori'
      ],
      correct: 0
    },

    // --- STAGE 3: Pre-Intermedio A2.2 ---
    {
      id: 17,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Compras y ropa:',
      question: '17. «Che taglia porta?»',
      options: [
        'a. La 52.',
        'b. Un capo classico.',
        'c. Un paio di pantaloni.'
      ],
      correct: 0
    },
    {
      id: 18,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Pronombres indirectos y combinados:',
      question: '18. «Vede dei mocassini che ___ (1) piacciono molto. La moglie vede delle scarpe ___ (2) care che ___ (3) sembrano comode. Il marito ___ (4) prova e le compra.»',
      options: [
        'a. li / più / gli / lo',
        'b. le / troppo / ci / ne',
        'c. gli / meno / le / le'
      ],
      correct: 2
    },
    {
      id: 19,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Imperfetto vs Passato Prossimo:',
      question: '19. «Quando io ___ (1) piccolo, ___ (2) in campagna. Normalmente noi ___ (3) le vacanze al mare, ma una volta ___ (4) in montagna.»',
      options: [
        'a. sono stato / sono andato / passavamo / andavamo',
        'b. ero / vivevo / passavamo / siamo andati',
        'c. avevo / sono vissuto / abbiamo passato / andavano'
      ],
      correct: 1
    },
    {
      id: 20,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Comparativos de igualdad:',
      question: '20. «Marco è alto ______ Carlo.»',
      options: ['a. quanto (o come)', 'b. come', 'c. meno'],
      correct: 1
    },
    {
      id: 21,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Acuerdo en passato prossimo:',
      question: '21. «Le vacanze ______ .»',
      options: ['a. sono finite', 'b. hanno finito', 'c. l’ho finita'],
      correct: 0
    },
    {
      id: 22,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Pronombres relativos con preposición:',
      question: '22. «È una città ______ siamo già stati.»',
      options: ['a. in cui', 'b. che', 'c. ci'],
      correct: 0
    },
    {
      id: 23,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Conoscere vs Sapere al passato:',
      question: '23. «Scusa il ritardo, ma non ______ la strada.»',
      options: ['a. ho conosciuto', 'b. conoscevo', 'c. ho saputo'],
      correct: 1
    },
    {
      id: 24,
      stage: 'Nivel Pre-Intermedio A2.2',
      context: 'Verbos impersonales de tiempo:',
      question: '24. «Per arrivare a Firenze ______ tre ore.»',
      options: ['a. ci vogliono', 'b. ci vuole', 'c. si vuole'],
      correct: 0
    },

    // --- STAGE 4: Intermedio B1.1 ---
    {
      id: 25,
      stage: 'Nivel Intermedio B1.1',
      context: 'Imperativo con pronombres:',
      question: '25. «Lo chiamo o gli scrivo?»',
      options: [
        'a. Scrivigli una mail!',
        'b. Gli scrivi!',
        'c. Chiamala!'
      ],
      correct: 0
    },
    {
      id: 26,
      stage: 'Nivel Intermedio B1.1',
      context: 'Meglio vs Migliore:',
      question: '26. «La cosa ______ è andare in vacanza.»',
      options: ['a. meglio', 'b. migliore', 'c. ottimo'],
      correct: 1
    },
    {
      id: 27,
      stage: 'Nivel Intermedio B1.1',
      context: 'Imperativo formal (forma di cortesia Lei):',
      question: '27. «Se va al mare, ______ (1) le ore calde e ______ (2) un cappello!»',
      options: [
        'a. evita / metti (informale)',
        'b. eviti / metta (formale)',
        'c. evito / mette'
      ],
      correct: 1
    },
    {
      id: 28,
      stage: 'Nivel Intermedio B1.1',
      context: 'Acción continua en pasado:',
      question: '28. «È entrata mentre ______ il giornale.»',
      options: ['a. leggevo', 'b. ho letto', 'c. leggendo'],
      correct: 0
    },
    {
      id: 29,
      stage: 'Nivel Intermedio B1.1',
      context: 'Preposiciones temporales:',
      question: '29. «L’ho conosciuto ______ un viaggio.»',
      options: ['a. mentre', 'b. durante', 'c. nel'],
      correct: 1
    },
    {
      id: 30,
      stage: 'Nivel Intermedio B1.1',
      context: 'Verbo stare per + infinito pronominale:',
      question: '30. «Quando sei arrivato, stavo proprio per ______ .»',
      options: ['a. andandomene', 'b. vada', 'c. andarmene'],
      correct: 2
    },
    {
      id: 31,
      stage: 'Nivel Intermedio B1.1',
      context: 'Congiuntivo presente e opinione:',
      question: '31. «Penso che oggi non ___ facile trovare lavoro. Bisogna essere flessibili e ci ___ anche fortuna.»',
      options: [
        'a. sia / vuole',
        'b. è / ci vuole',
        'c. sia / ci vuole'
      ],
      correct: 2
    },
    {
      id: 32,
      stage: 'Nivel Intermedio B1.1',
      context: 'Uso del congiuntivo vs indicativo:',
      question: '32. «Secondo me non ___ (1) una buona idea. Lei invece pensa che ___ (2) un’ottima cosa.»',
      options: [
        'a. sia / è',
        'b. è / sia',
        'c. sia / sia'
      ],
      correct: 1
    },

    // --- STAGE 5: Intermedio Alto B1.2 / B2 ---
    {
      id: 33,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Trapassato Prossimo:',
      question: '33. «Non ha voluto niente perché ______ già mangiato prima.»',
      options: ['a. aveva', 'b. ha', 'c. avendo'],
      correct: 0
    },
    {
      id: 34,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Pronome combinato con parlare (parlare di qualcosa):',
      question: '34. «Non gli hai detto niente?» — «Ma certo che ______ ho parlato.»',
      options: ['a. glielo', 'b. gliene', 'c. le'],
      correct: 1
    },
    {
      id: 35,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Condizionale Passato:',
      question: '35. «Al suo posto ______ più gentile.»',
      options: ['a. sarò stata', 'b. ero', 'c. sarei stata'],
      correct: 2
    },
    {
      id: 36,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Pronombre posesivo sin sustantivo:',
      question: '36. «Prestami la tua bicicletta. ______ si è rotta.»',
      options: ['a. È mia', 'b. La mia', 'c. Mia'],
      correct: 1
    },
    {
      id: 37,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Congiuntivo passato:',
      question: '37. «Non credo che stiano ancora insieme; penso che ______ qualche tempo fa.»',
      options: ['a. si lascino', 'b. si siano lasciati', 'c. si lascerebbero'],
      correct: 1
    },
    {
      id: 38,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Discorso indiretto:',
      question: '38. «Gianni chiede a Luca se vuole ___ (1) a cena da ___ (2). Luca risponde che ___ (3) dispiace.»',
      options: [
        'a. venire / te / mi',
        'b. andare / lui / gli',
        'c. volere / me / lo'
      ],
      correct: 1
    },
    {
      id: 39,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Congiuntivo imperfetto dopo "Avevo paura che":',
      question: '39. «Il treno stava per partire! Avevo paura che tu non ______ in tempo!»',
      options: ['a. arrivassi', 'b. fossi arrivata', 'c. arrivi'],
      correct: 0
    },
    {
      id: 40,
      stage: 'Nivel Intermedio Alto B1.2',
      context: 'Congiuntivo con superlativo relativo:',
      question: '40. «Venezia è una delle più belle città che io ______ mai visto.»',
      options: ['a. ho', 'b. vedessi', 'c. abbia'],
      correct: 2
    },

    // --- STAGE 6: Avanzado B2 ---
    {
      id: 41,
      stage: 'Nivel Avanzado B2',
      context: 'Uso del gerundio "andando":',
      question: '41. In quale frase si può sostituire la parte <u>sottolineata</u> con "andando"?',
      options: [
        'a. <u>Mentre andava</u> a casa, Ada ha incontrato il figlio.',
        'b. <u>Dopo esser andata</u> a casa, ha incontrato Ada.',
        'c. <u>Prima di andare</u> a casa, ha incontrato Ada.'
      ],
      correct: 0
    },
    {
      id: 42,
      stage: 'Nivel Avanzado B2',
      context: 'Periodo ipotetico dell’irrealtà:',
      question: '42. «Se in passato avessi lavorato di più, ______ .»',
      options: [
        'a. oggi avrei meno problemi (misto)',
        'b. vengo a trovarti',
        'c. te lo presterei'
      ],
      correct: 0
    },
    {
      id: 43,
      stage: 'Nivel Avanzado B2',
      context: 'Formas impersonales con congiuntivo:',
      question: '43. «Dicono che Leonardo da Vinci ___ (1) figlio di un notaio e che ___ (2) la Gioconda al re di Francia.»',
      options: [
        'a. sia / venda',
        'b. fosse / abbia venduto',
        'c. fu / vendesse'
      ],
      correct: 1
    },
    {
      id: 44,
      stage: 'Nivel Avanzado B2',
      context: 'Discorso indiretto al passato:',
      question: '44. «"Dovrei uscire alle 7" -> Lui disse che ______ alle 7.»',
      options: [
        'a. dovrebbe uscire',
        'b. dovesse uscire',
        'c. sarebbe dovuto uscire'
      ],
      correct: 2
    },
    {
      id: 45,
      stage: 'Nivel Avanzado B2',
      context: 'Discorso indiretto dell’imperativo:',
      question: '45. «"Esci subito dalla classe!" -> Lui disse che ______ subito dalla classe.»',
      options: [
        'a. esca',
        'b. uscisse',
        'c. usciva'
      ],
      correct: 1
    },
    {
      id: 46,
      stage: 'Nivel Avanzado B2',
      context: 'Discorso indiretto con periodo ipotetico:',
      question: '46. «"Se avessi mangiato sarei ingrassato" -> Lui disse che ______ .»',
      options: [
        'a. se avesse mangiato sarebbe ingrassato',
        'b. se mangiasse ingrasserebbe',
        'c. se avesse mangiato ingrasserebbe'
      ],
      correct: 0
    }
  ];

  // DOM Elements
  const screenWelcome = document.getElementById('screen-welcome');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenResults = document.getElementById('screen-results');

  const studentNameInput = document.getElementById('student-name');
  const btnStartTest = document.getElementById('btn-start-test');

  const stageBadge = document.getElementById('stage-badge');
  const currentStepText = document.getElementById('current-step-text');
  const stepperProgress = document.getElementById('stepper-progress');
  const qContextText = document.getElementById('q-context-text');
  const qTitleText = document.getElementById('q-title-text');
  const qOptionsBox = document.getElementById('q-options-box');

  const btnPrevQ = document.getElementById('btn-prev-q');
  const btnNextQ = document.getElementById('btn-next-q');
  const btnStopEarly = document.getElementById('btn-stop-early');

  const resLevelIcon = document.getElementById('res-level-icon');
  const resGreeting = document.getElementById('res-greeting');
  const resScoreNumber = document.getElementById('res-score-number');
  const resLevelName = document.getElementById('res-level-name');
  const resLevelDescription = document.getElementById('res-level-description');
  const btnSendWhatsappFinal = document.getElementById('btn-send-whatsapp-final');
  const btnRestartAll = document.getElementById('btn-restart-all');

  // Test State
  let currentQuestionIndex = 0;
  let userAnswers = {}; // { questionIndex: selectedOptionIndex }
  let studentName = '';

  // Start Test
  btnStartTest.addEventListener('click', () => {
    const nameVal = studentNameInput.value.trim();
    if (!nameVal) {
      alert('Por favor, ingresá tu nombre y apellido para comenzar el diagnóstico.');
      studentNameInput.focus();
      return;
    }
    studentName = nameVal;
    screenWelcome.classList.add('hidden');
    screenQuiz.classList.remove('hidden');
    currentQuestionIndex = 0;
    userAnswers = {};
    renderQuestion(0);
  });

  // Render Question
  function renderQuestion(index) {
    const q = questionBank[index];
    stageBadge.textContent = q.stage;
    currentStepText.textContent = `Pregunta ${index + 1} de ${questionBank.length}`;
    
    const percent = Math.round(((index + 1) / questionBank.length) * 100);
    stepperProgress.style.width = `${percent}%`;

    qContextText.innerHTML = q.context;
    qTitleText.innerHTML = q.question;

    qOptionsBox.innerHTML = '';
    q.options.forEach((opt, optIndex) => {
      const btn = document.createElement('button');
      btn.className = 'q-opt-btn';
      if (userAnswers[index] === optIndex) {
        btn.classList.add('selected');
        btn.innerHTML = `<i class="fa-solid fa-circle-dot"></i> <span>${opt}</span>`;
      } else {
        btn.innerHTML = `<i class="fa-regular fa-circle"></i> <span>${opt}</span>`;
      }

      btn.addEventListener('click', () => {
        userAnswers[index] = optIndex;
        renderQuestion(index);
      });
      qOptionsBox.appendChild(btn);
    });

    btnPrevQ.disabled = index === 0;
    btnNextQ.textContent = index === questionBank.length - 1 ? 'Finalizar Test' : 'Siguiente';
  }

  // Navigation Buttons
  btnPrevQ.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion(currentQuestionIndex);
    }
  });

  btnNextQ.addEventListener('click', () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      alert('⚠️ Por favor, seleccioná una opción para continuar. Si no conocés la respuesta, podés tocar abajo en "No sé más (Finalizar aquí)".');
      qOptionsBox.classList.add('shake-highlight');
      setTimeout(() => qOptionsBox.classList.remove('shake-highlight'), 600);
      return;
    }

    if (currentQuestionIndex < questionBank.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      finishAndShowResults();
    }
  });

  // Stop Early Button
  btnStopEarly.addEventListener('click', () => {
    if (confirm('¿Querés finalizar el test hasta acá? Calcularemos tu nivel con las preguntas respondidas.')) {
      finishAndShowResults();
    }
  });

  // Calculate & Display Results
  function finishAndShowResults() {
    screenQuiz.classList.add('hidden');
    screenResults.classList.remove('hidden');

    let totalScore = 0;
    const answeredCount = Object.keys(userAnswers).length;

    Object.keys(userAnswers).forEach(qIdx => {
      const idx = parseInt(qIdx, 10);
      if (userAnswers[idx] === questionBank[idx].correct) {
        totalScore++;
      }
    });

    resGreeting.textContent = `¡Diagnóstico Listo, ${studentName}!`;
    resScoreNumber.textContent = `Puntaje: ${totalScore} de ${questionBank.length} Puntos`;

    let levelTitle = '';
    let levelDesc = '';
    let icon = '🎯';

    // Diagnostic Scale:
    if (totalScore >= 34) {
      icon = '🏆';
      levelTitle = 'Nivel Avanzado (B2 / C1)';
      levelDesc = '¡Excelente dominio de estructuras complejas, subjuntivo y discurso indirecto! Ideal para clases de perfeccionamiento y conversación avanzada.';
    } else if (totalScore >= 25) {
      icon = '🌟';
      levelTitle = 'Nivel Intermedio (B1 / B2)';
      levelDesc = 'Tenés un gran control de tiempos verbales (passato prossimo, imperfetto, condizionale). Estás listo/a para ganar fluidez y naturalidad al hablar.';
    } else if (totalScore >= 16) {
      icon = '🌱';
      levelTitle = 'Nivel Pre-Intermedio (A2 / A2+)';
      levelDesc = 'Manejás bien el vocabulario cotidiano y el pasado básico. Con nuestras clases vamos a afianzar el imperfetto, los pronombres y la soltura.';
    } else if (totalScore >= 8) {
      icon = '🚀';
      levelTitle = 'Nivel Elemental (A1 Consolidado)';
      levelDesc = 'Conocés nociones básicas del presente y artículos. Tu siguiente paso es dominar el pasado próximo y la conversación en viajes y restaurantes.';
    } else {
      icon = '🇮🇹';
      levelTitle = 'Nivel Inicial (A1 Desde Cero)';
      levelDesc = '¡El mejor punto para comenzar! Te voy a acompañar paso a paso desde tu primera clase para que hables sin miedo y con una base sólida.';
    }

    resLevelIcon.textContent = icon;
    resLevelName.textContent = levelTitle;
    resLevelDescription.textContent = levelDesc;

    // Build WhatsApp message to send privately to teacher
    const waText = 
`¡Ciao! Soy ${studentName} y completé el Test de Nivelación en la web.
📊 *Mi Puntaje:* ${totalScore}/${questionBank.length} puntos (${answeredCount} preguntas respondidas)
🎯 *Nivel diagnosticado:* ${levelTitle}
👉 Quisiera coordinar mis clases de italiano 🇮🇹`;

    btnSendWhatsappFinal.href = `https://wa.me/5492914485405?text=${encodeURIComponent(waText)}`;
    screenResults.scrollIntoView({ behavior: 'smooth' });
  }

  // Restart
  btnRestartAll.addEventListener('click', () => {
    screenResults.classList.add('hidden');
    screenWelcome.classList.remove('hidden');
    studentNameInput.value = '';
    userAnswers = {};
    currentQuestionIndex = 0;
  });

  // 3. Interactive Star Rating & Reviews Form Logic
  const starPicker = document.getElementById('star-picker');
  const starItems = starPicker ? starPicker.querySelectorAll('.star-item') : [];
  const starRatingText = document.getElementById('star-rating-text');
  const reviewForm = document.getElementById('review-form');
  const reviewsContainer = document.getElementById('reviews-container');
  const reviewSuccessMsg = document.getElementById('review-success-msg');

  let selectedRating = 5;
  const ratingLabels = {
    1: 'Regular (1 estrella)',
    2: 'Aceptable (2 estrellas)',
    3: 'Buena (3 estrellas)',
    4: 'Muy buena (4 estrellas)',
    5: '¡Excelente! (5 estrellas)'
  };

  function updateStars(rating) {
    starItems.forEach(item => {
      const itemRating = parseInt(item.getAttribute('data-rating'), 10);
      if (itemRating <= rating) {
        item.classList.add('active');
        item.classList.replace('fa-regular', 'fa-solid');
      } else {
        item.classList.remove('active');
        item.classList.replace('fa-solid', 'fa-regular');
      }
    });
    if (starRatingText) {
      starRatingText.textContent = ratingLabels[rating] || `${rating} estrellas`;
    }
  }

  starItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const hoverRating = parseInt(item.getAttribute('data-rating'), 10);
      updateStars(hoverRating);
    });

    item.addEventListener('click', () => {
      selectedRating = parseInt(item.getAttribute('data-rating'), 10);
      updateStars(selectedRating);
    });
  });

  if (starPicker) {
    starPicker.addEventListener('mouseleave', () => {
      updateStars(selectedRating);
    });
  }

  // ----------------------------------------------------------
  // Firebase Realtime Cloud Database Configuration & Live Sync
  // ----------------------------------------------------------
  const FIREBASE_DB_ENDPOINT = 'https://clases-italiano-bb-default-rtdb.firebaseio.com/reviews.json';
  let reviewsDbRef = null;

  const firebaseConfig = {
    databaseURL: "https://clases-italiano-bb-default-rtdb.firebaseio.com",
    projectId: "clases-italiano-bb"
  };

  // Default Verified Student Reviews (Visible as fallback / base)
  const defaultVerifiedReviews = [
    {
      name: 'Camila Benítez',
      course: 'Clases Particulares 1 a 1',
      rating: 5,
      comment: 'Empecé de cero absoluto con mucha vergüenza de hablar y hoy puedo mantener conversaciones fluidas. La paciencia, la calidez y la dedicación de la profe son incomparables. ¡Súper recomendable!'
    },
    {
      name: 'Ignacio Rossi',
      course: 'Italiano para Viajeros y Ciudadanía',
      rating: 5,
      comment: 'Preparé mi viaje a Italia y el trámite de ciudadanía. Las clases son súper dinámicas, enfocadas en situaciones de la vida cotidiana y cultura. Me sirvió muchísimo en Roma y Florencia.'
    },
    {
      name: 'María Florencia Gómez',
      course: 'Apoyo Escolar y Exámenes',
      rating: 5,
      comment: 'Mi hijo preparó su examen de italiano y aprobó con excelente nota. Las explicaciones son muy claras y el material de estudio que entrega es completísimo.'
    }
  ];

  // Initialize Firebase Realtime Database SDK if loaded
  if (typeof firebase !== 'undefined' && firebaseConfig.databaseURL) {
    try {
      firebase.initializeApp(firebaseConfig);
      const database = firebase.database();
      reviewsDbRef = database.ref('reviews');

      // Live Cloud Realtime Sync: Triggers in real time for all visitors worldwide
      reviewsDbRef.on('value', snapshot => {
        const val = snapshot.val();
        renderReviewsFromCloud(val);
      });
    } catch (err) {
      console.warn('Firebase SDK init:', err);
    }
  }

  // Render combined reviews from cloud data
  function renderReviewsFromCloud(cloudVal) {
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';

    let list = [];
    if (cloudVal && typeof cloudVal === 'object') {
      list = Object.values(cloudVal);
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    // Combine with default verified reviews
    const combined = [...list, ...defaultVerifiedReviews];
    combined.forEach(rev => appendReviewCard(rev, false));
  }

  // Fetch reviews directly from Firebase REST API on load (ultra fast & lightweight)
  async function fetchCloudReviews() {
    try {
      const res = await fetch(FIREBASE_DB_ENDPOINT);
      if (res.ok) {
        const data = await res.json();
        renderReviewsFromCloud(data);
      } else {
        renderReviewsFromCloud(null);
      }
    } catch (err) {
      console.warn('Error fetching cloud reviews:', err);
      renderReviewsFromCloud(null);
    }
  }

  function appendReviewCard(data, prepend = true) {
    if (!reviewsContainer) return;

    // Remove empty reviews box if present
    const emptyBox = reviewsContainer.querySelector('.empty-reviews-box');
    if (emptyBox) {
      reviewsContainer.removeChild(emptyBox);
    }

    const card = document.createElement('div');
    card.className = 'review-card';

    // Initials
    const initials = (data.name || 'AL')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    let starsHtml = '';
    const ratingNum = parseInt(data.rating, 10) || 5;
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= ratingNum ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    card.innerHTML = `
      <div class="review-header">
        <div class="reviewer-avatar">${initials}</div>
        <div class="reviewer-info">
          <h4 class="reviewer-name">${data.name} <i class="fa-solid fa-circle-check verified-badge" title="Opinión Verificada"></i></h4>
          <span class="review-course">${data.course || 'Clases de Italiano'}</span>
        </div>
        <div class="review-stars">${starsHtml}</div>
      </div>
      <p class="review-body">"${data.comment}"</p>
    `;

    if (prepend && reviewsContainer.firstChild) {
      reviewsContainer.insertBefore(card, reviewsContainer.firstChild);
    } else {
      reviewsContainer.appendChild(card);
    }
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', async e => {
      e.preventDefault();

      const nameInput = document.getElementById('rev-name');
      const courseInput = document.getElementById('rev-course');
      const commentInput = document.getElementById('rev-comment');

      const reviewData = {
        name: nameInput.value.trim(),
        course: courseInput.value,
        comment: commentInput.value.trim(),
        rating: selectedRating,
        date: new Date().toISOString()
      };

      if (!reviewData.name || !reviewData.comment) {
        alert('Por favor, completá tu nombre y opinión.');
        return;
      }

      // Immediately append visually for the user
      appendReviewCard(reviewData, true);

      // Save to Firebase Cloud Database in real-time
      try {
        if (reviewsDbRef) {
          reviewsDbRef.push(reviewData);
        } else {
          await fetch(FIREBASE_DB_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
          });
        }
      } catch (err) {
        console.warn('Cloud DB save error:', err);
      }

      // Format WhatsApp message notification for teacher
      const starsString = '⭐'.repeat(reviewData.rating);
      const waMsg = `¡Hola! Dejé una nueva reseña en la web de @clases.italianobb 🇮🇹✨\n\n👤 *Nombre:* ${reviewData.name}\n📚 *Modalidad:* ${reviewData.course}\n⭐ *Calificación:* ${starsString} (${reviewData.rating}/5)\n💬 *Comentario:* "${reviewData.comment}"`;
      const waUrl = `https://wa.me/5492914485405?text=${encodeURIComponent(waMsg)}`;

      // Show success message
      if (reviewSuccessMsg) {
        reviewSuccessMsg.classList.remove('hidden');
        setTimeout(() => {
          reviewSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }

      // Open WhatsApp to notify teacher
      window.open(waUrl, '_blank');

      // Reset form
      reviewForm.reset();
      selectedRating = 5;
      updateStars(5);
    });
  }

  // Community & Events Form Handler
  const communityForm = document.getElementById('community-form');
  const communitySuccessMsg = document.getElementById('community-success-msg');

  if (communityForm) {
    communityForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('com-name')?.value.trim() || '';
      const contact = document.getElementById('com-contact')?.value.trim() || '';
      const idea = document.getElementById('com-idea')?.value.trim() || '';

      if (!name || !contact) {
        alert('Por favor, completá tu nombre y dato de contacto.');
        return;
      }

      // Construct formatted WhatsApp message
      let msg = `¡Ciao! Me sumo a la Comunidad Italiana de @clases.italianobb para enterarme y participar de futuros eventos y encuentros 🇮🇹✨\n\n👤 *Nombre:* ${name}\n📱 *Contacto:* ${contact}`;
      if (idea) {
        msg += `\n💡 *Mis ideas/propuestas:* ${idea}`;
      } else {
        msg += `\n💡 *Novedades:* ¡Quiero recibir información de futuros talleres y encuentros!`;
      }

      const waUrl = `https://wa.me/5492914485405?text=${encodeURIComponent(msg)}`;

      // Show success message
      if (communitySuccessMsg) {
        communitySuccessMsg.style.display = 'flex';
        communitySuccessMsg.classList.remove('hidden');
      }

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');

      // Reset form
      communityForm.reset();
    });
  }

  fetchCloudReviews();
});
