/**
 * ==========================================================================
 * AcessaAula - Lógica da Aplicação (script.js)
 * Protótipo Front-end em Vanilla JavaScript
 * Apoio a professores de escolas estaduais para adaptação de atividades
 * ==========================================================================
 */

// ==========================================================================
// CONFIGURAÇÃO DO GOOGLE FORMS
// Formulário oficial de avaliação da adaptação:
// ==========================================================================
const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdQaiAxT3WvdMKS-DkKI6Ce4Lv9tFQFiu-GkPMXUP5xx44NTg/viewform?usp=publish-editor"; 

/**
 * BANCO DE DADOS EM MEMÓRIA / PROTÓTIPO
 * Sugestões pedagógicas e atividades pré-cadastradas para o protótipo
 */
const DATA_STORE = {
  // Exemplos de Atividades Originais por Tipo
  originalActivities: {
    sala: {
      title: "Atividade de sala (Exercício de Ciências)",
      text: "Leia o texto sobre o ciclo da água no livro e responda às cinco questões discursivas abaixo em seu caderno.",
      context: "Atividade regular individual com texto denso e perguntas abertas."
    },
    material: {
      title: "Material Didático (Apostila de Geografia)",
      text: "Observe o mapa hidrográfico brasileiro e descreva as principais bacias hidrográficas citando afluentes.",
      context: "Material impresso em preto e branco com alta densidade de detalhes cartográficos."
    },
    avaliacao: {
      title: "Avaliação / Prova (Bimestral de História)",
      text: "Leia o excerto documental do período colonial e responda às 5 perguntas dissertativas em folha separada.",
      context: "Instrumento avaliativo formal com tempo fixo de aula e enunciados extensos."
    },
    imagens: {
      title: "Atividade com Imagens (Biologia)",
      text: "Analise a lâmina histológica e identifique as organelas celulares numeradas de 1 a 6.",
      context: "Diagrama complexo com legendas reduzidas e elementos sobrepostos."
    },
    leitura: {
      title: "Atividade de Leitura (Língua Portuguesa)",
      text: "Leia a crônica de quatro páginas e responda à análise de personagens e figuras de linguagem.",
      context: "Texto literário longo sem subtítulos ou glossário."
    },
    etapas: {
      title: "Atividade em Etapas (Projeto Interdisciplinar)",
      text: "Desenvolva uma pesquisa sobre sustentabilidade local, elabore um relatório e apresente um seminário.",
      context: "Projeto longo de múltiplos passos sem cronograma fracionado prévio."
    }
  },

  // Catálogo de Sugestões Pedagógicas baseadas nas necessidades selecionadas
  catalogSuggestions: [
    {
      id: "sug-1",
      title: "Dividir a atividade em pequenas etapas com marcos claros",
      description: "Fracionar a atividade longa em 3 ou 4 blocos curtos de instrução-ação, permitindo pausas e checagem de compreensão após cada parte.",
      applicableNeeds: ["etapas", "rotina", "linguagem"],
      adaptedSteps: [
        { step: 1, title: "Etapa 1: Leitura do trecho 1", desc: "Ler apenas o parágrafo inicial que introduz o conceito central." },
        { step: 2, title: "Etapa 2: Pista visual de apoio", desc: "Observar a ilustração esquemática relacionada ao primeiro trecho." },
        { step: 3, title: "Etapa 3: Resolução guiada da questão 1", desc: "Responder apenas à primeira pergunta correspondente ao que acabou de ler." },
        { step: 4, title: "Etapa 4: Avanço monitorado", desc: "Receber o próximo trecho com validação positiva do professor." }
      ]
    },
    {
      id: "sug-2",
      title: "Utilizar recursos visuais e esquemas para ancorar o conceito",
      description: "Inserir diagramas limpos, setas direcionais, ícones de apoio e reduzir a densidade visual da folha de exercícios.",
      applicableNeeds: ["visual", "comunicacao", "linguagem"],
      adaptedSteps: [
        { step: 1, title: "Apresentação visual do conceito", desc: "Examinar o infográfico simplificado com cores contrastantes e legendas destacadas." },
        { step: 2, title: "Associação direta termo-imagem", desc: "Ligar cada termo ao elemento visual correspondente antes da escrita formal." },
        { step: 3, title: "Questão com múltipla escolha ilustrada", desc: "Escolher a resposta com suporte de pictogramas explicativos." },
        { step: 4, title: "Síntese em mapa mental rápido", desc: "Preencher o esquema visual resumido com palavras-chave pré-selecionadas." }
      ]
    },
    {
      id: "sug-3",
      title: "Apresentar uma questão por vez e reduzir estímulos concorrentes",
      description: "Disponibilizar uma pergunta por folha ou usar máscara de leitura/tira de papel para focar a atenção do estudante exclusivamente no item atual.",
      applicableNeeds: ["etapas", "rotina", "avaliacao"],
      adaptedSteps: [
        { step: 1, title: "Foco unitário no enunciado", desc: "Apresentar apenas a Questão 1 em cartão individual sem outras perguntas visíveis." },
        { step: 2, title: "Checagem prévia de comando", desc: "Identificar o verbo de ação da questão (ex: 'circule', 'assinale', 'desenhe')." },
        { step: 3, title: "Registro da resposta no seu tempo", desc: "Permitir resolução sem pressão de tempo ou contagem de páginas restantes." },
        { step: 4, title: "Entrega do item seguinte", desc: "Disponibilizar a Questão 2 somente após a conclusão tranquila da primeira." }
      ]
    },
    {
      id: "sug-4",
      title: "Permitir formatos flexíveis de resposta (oral, desenho ou gravação)",
      description: "Permitir que o aluno expresse o aprendizado por meio de relato oral, gravação de áudio no celular escolar ou esquemas conceituais.",
      applicableNeeds: ["avaliacao", "comunicacao"],
      adaptedSteps: [
        { step: 1, title: "Compreensão do tema central", desc: "O estudante escuta ou lê a síntese oral do enunciado mediada pelo professor." },
        { step: 2, title: "Organização mental com roteiro de tópicos", desc: "Uso de 3 cartões guia: 'O que aconteceu?', 'Por quê?', 'Qual a conclusão?'." },
        { step: 3, title: "Expressão em formato alternativo", desc: "Explicação oral de 2 minutos para o professor ou gravação em áudio." },
        { step: 4, title: "Registro avaliativo pelo docente", desc: "Professor anota os conceitos demonstrados na rubrica pedagógica." }
      ]
    },
    {
      id: "sug-5",
      title: "Reescrever enunciados em linguagem clara e objetiva",
      description: "Substituir períodos subordinados longos por frases curtas na ordem direta (sujeito + verbo + predicado) e destacar termos-chave em negrito.",
      applicableNeeds: ["linguagem", "visual"],
      adaptedSteps: [
        { step: 1, title: "Enunciado em ordem direta", desc: "'Observe a imagem. Encontre a parte principal. Escreva o nome dela.'" },
        { step: 2, title: "Glossário ilustrado no rodapé", desc: "Pequena caixa explicando palavras técnicas menos familiares com sinônimos cotidianos." },
        { step: 3, title: "Espaçamento ampliado para leitura", desc: "Texto impresso em tipografia legível, tamanho 14 e entrelinha 1.6." },
        { step: 4, title: "Verificação da compreensão", desc: "O estudante parafraseia com suas próprias palavras o que foi pedido." }
      ]
    },
    {
      id: "sug-6",
      title: "Criar rotina previsível e antecipar as etapas da atividade",
      description: "Apresentar um roteiro no quadro ('Começo - Meio - Fim') com tempos aproximados para evitar ansiedade e aumentar a autonomia.",
      applicableNeeds: ["rotina", "etapas"],
      adaptedSteps: [
        { step: 1, title: "Quadro de antecipação visual", desc: "Mostrar a linha do tempo da aula: 10 min leitura, 15 min atividade, 5 min revisão." },
        { step: 2, title: "Sinalizador visual de andamento", desc: "Estudante marca com adesivo ou visto a conclusão de cada etapa realizada." },
        { step: 3, title: "Aviso de transição prévio", desc: "Aviso calmo 3 minutos antes de mudar de atividade para facilitar a transição." },
        { step: 4, title: "Encerramento com sensação de conquista", desc: "Validação do esforço e registro no portfólio pedagógico do aluno." }
      ]
    }
  ]
};

/**
 * ESTADO GLOBAL DA APLICAÇÃO
 */
const AppState = {
  currentScreen: 1,
  selectedActivityType: "sala",
  selectedNeeds: ["etapas", "visual"],
  currentSuggestions: [],
  selectedSuggestionIndex: 0,
  activeSuggestion: null,
  suggestionVariationIndex: 0
};

// ==========================================================================
// ELEMENTOS DO DOM
// ==========================================================================
const DOM = {
  screens: {
    1: document.getElementById("screen-1"),
    2: document.getElementById("screen-2"),
    3: document.getElementById("screen-3"),
    4: document.getElementById("screen-4"),
    5: document.getElementById("screen-5"),
  },
  stepperNav: document.getElementById("stepper-nav"),
  stepItems: document.querySelectorAll(".step-item"),
  
  // Botões principais de navegação
  btnStart: document.getElementById("btn-start"),
  btnContinueToNeeds: document.getElementById("btn-continue-to-needs"),
  btnBackToStart: document.getElementById("btn-back-to-start"),
  btnGenerateSuggestions: document.getElementById("btn-generate-suggestions"),
  btnBackToActivityType: document.getElementById("btn-back-to-activity-type"),
  btnRegenerateSuggestions: document.getElementById("btn-regenerate-suggestions"),
  btnBackToNeeds: document.getElementById("btn-back-to-needs"),
  btnBackToSuggestions: document.getElementById("btn-back-to-suggestions"),
  btnRestartFlow: document.getElementById("btn-restart-flow"),
  
  // Containers dinâmicos
  activityTypeCards: document.querySelectorAll(".activity-choice-btn"),
  needCards: document.querySelectorAll(".need-choice-btn"),
  selectedNeedsCountBadge: document.getElementById("selected-needs-count"),
  
  // Tela 4 elementos
  summaryActivityTag: document.getElementById("summary-activity-tag"),
  summaryNeedsTagsContainer: document.getElementById("summary-needs-tags"),
  originalActivityTitle: document.getElementById("original-activity-title"),
  originalActivityText: document.getElementById("original-activity-text"),
  originalActivityContext: document.getElementById("original-activity-context"),
  suggestionsContainer: document.getElementById("suggestions-container"),
  
  // Tela 5 elementos
  finalOriginalText: document.getElementById("final-original-text"),
  finalAdaptedTitle: document.getElementById("final-adapted-title"),
  finalAdaptedStepsList: document.getElementById("final-adapted-steps-list"),
  finalSuggestionUsedTag: document.getElementById("final-suggestion-used-tag"),
  
  // Google Forms Modal e Ações
  btnEvaluateForm: document.getElementById("btn-evaluate-form"),
  formsModal: document.getElementById("forms-modal"),
  formsModalClose: document.getElementById("forms-modal-close"),
  formsModalGotIt: document.getElementById("forms-modal-gotit"),
  formsModalOpenDirect: document.getElementById("forms-modal-open-direct"),
  
  // Utilitários (Copiar / Imprimir)
  btnCopyAdapted: document.getElementById("btn-copy-adapted"),
  btnPrintAdapted: document.getElementById("btn-print-adapted"),
  toastNotice: document.getElementById("toast-notice"),
  toastMessage: document.getElementById("toast-message"),
  
  // Acessibilidade e Tema
  btnFontToggle: document.getElementById("btn-font-toggle"),
  btnThemeToggle: document.getElementById("btn-theme-toggle") || document.getElementById("btn-contrast-toggle"),
  themeIconMoon: document.getElementById("theme-icon-moon"),
  themeIconSun: document.getElementById("theme-icon-sun"),
  themeToggleText: document.getElementById("theme-toggle-text")
};

// ==========================================================================
// FUNÇÕES DE NAVEGAÇÃO ENTRE TELAS
// ==========================================================================
function goToScreen(screenNumber) {
  if (screenNumber < 1 || screenNumber > 5) return;
  
  AppState.currentScreen = screenNumber;
  
  // Atualiza visibilidade das telas
  Object.keys(DOM.screens).forEach((key) => {
    const screen = DOM.screens[key];
    if (screen) {
      if (parseInt(key, 10) === screenNumber) {
        screen.classList.add("active");
        screen.setAttribute("aria-hidden", "false");
      } else {
        screen.classList.remove("active");
        screen.setAttribute("aria-hidden", "true");
      }
    }
  });

  // Atualiza a barra de progresso (Stepper)
  updateStepper(screenNumber);

  // Rola até o início do conteúdo principal com suavidade
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Ações específicas ao entrar em cada tela
  if (screenNumber === 4) {
    renderSuggestionsScreen();
  } else if (screenNumber === 5) {
    renderFinalResultScreen();
  }
}

function updateStepper(screenNumber) {
  if (!DOM.stepperNav) return;
  
  // Na Tela 1 (Home), a barra de etapas pode ficar recolhida ou sutil
  if (screenNumber === 1) {
    DOM.stepperNav.style.display = "none";
  } else {
    DOM.stepperNav.style.display = "block";
    
    // Mapeamento: Tela 2 -> Passo 1, Tela 3 -> Passo 2, Tela 4 -> Passo 3, Tela 5 -> Passo 4
    const currentStepIndex = screenNumber - 1; // 1 a 4
    
    DOM.stepItems.forEach((item, index) => {
      const stepNum = index + 1;
      item.classList.remove("active", "completed");
      
      if (stepNum < currentStepIndex) {
        item.classList.add("completed");
      } else if (stepNum === currentStepIndex) {
        item.classList.add("active");
      }
    });
  }
}

// ==========================================================================
// TELA 2: ESCOLHA DO TIPO DE ATIVIDADE
// ==========================================================================
function initActivityTypeSelection() {
  DOM.activityTypeCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");
      if (!type) return;
      
      AppState.selectedActivityType = type;
      
      // Atualiza estilo visual de seleção
      DOM.activityTypeCards.forEach((c) => {
        const isCurrent = c === card;
        c.classList.toggle("selected", isCurrent);
        c.setAttribute("aria-checked", isCurrent ? "true" : "false");
      });
      
      if (DOM.btnContinueToNeeds) {
        DOM.btnContinueToNeeds.disabled = false;
      }
    });

    // Acessibilidade por teclado (Enter / Espaço)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// ==========================================================================
// TELA 3: ESCOLHA DA NECESSIDADE DE ADAPTAÇÃO (Múltipla Seleção)
// ==========================================================================
function initNeedsSelection() {
  DOM.needCards.forEach((card) => {
    card.addEventListener("click", () => {
      const need = card.getAttribute("data-need");
      if (!need) return;
      
      const index = AppState.selectedNeeds.indexOf(need);
      if (index > -1) {
        // Se já está e temos mais de 1 selecionada, desmarca
        if (AppState.selectedNeeds.length > 1) {
          AppState.selectedNeeds.splice(index, 1);
          card.classList.remove("selected");
          card.setAttribute("aria-checked", "false");
        } else {
          showToast("Selecione ao menos 1 necessidade para gerar sugestões.");
        }
      } else {
        // Marca
        AppState.selectedNeeds.push(need);
        card.classList.add("selected");
        card.setAttribute("aria-checked", "true");
      }
      
      updateSelectedNeedsBadge();
    });

    // Acessibilidade por teclado
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  updateSelectedNeedsBadge();
}

function updateSelectedNeedsBadge() {
  const count = AppState.selectedNeeds.length;
  if (DOM.selectedNeedsCountBadge) {
    DOM.selectedNeedsCountBadge.textContent = count === 1 ? "1 necessidade selecionada" : `${count} necessidades selecionadas`;
  }
  if (DOM.btnGenerateSuggestions) {
    DOM.btnGenerateSuggestions.disabled = count === 0;
  }
}

// ==========================================================================
// TELA 4: RENDERIZAÇÃO DAS SUGESTÕES E ATIVIDADE DE REFERÊNCIA
// ==========================================================================
const ACTIVITY_NAMES = {
  sala: "Atividade de sala",
  material: "Material didático",
  avaliacao: "Avaliação / prova",
  imagens: "Atividade com imagens",
  leitura: "Atividade de leitura",
  etapas: "Atividade em etapas"
};

const NEED_NAMES = {
  visual: "Apoio visual",
  linguagem: "Linguagem simplificada",
  etapas: "Atividade em etapas",
  comunicacao: "Comunicação alternativa",
  rotina: "Rotina e antecipação",
  avaliacao: "Avaliação flexível"
};

function renderSuggestionsScreen() {
  // 1. Atualizar banner de resumo com as escolhas do professor
  const actName = ACTIVITY_NAMES[AppState.selectedActivityType] || "Atividade de sala";
  if (DOM.summaryActivityTag) {
    DOM.summaryActivityTag.textContent = actName;
  }
  
  if (DOM.summaryNeedsTagsContainer) {
    DOM.summaryNeedsTagsContainer.innerHTML = "";
    AppState.selectedNeeds.forEach((needKey) => {
      const span = document.createElement("span");
      span.className = "summary-tag tag-accent";
      span.textContent = NEED_NAMES[needKey] || needKey;
      DOM.summaryNeedsTagsContainer.appendChild(span);
    });
  }

  // 2. Apresentar a atividade fictícia correspondente
  const originalData = DATA_STORE.originalActivities[AppState.selectedActivityType] || DATA_STORE.originalActivities.sala;
  if (DOM.originalActivityTitle) {
    DOM.originalActivityTitle.textContent = originalData.title;
  }
  if (DOM.originalActivityText) {
    DOM.originalActivityText.textContent = `"${originalData.text}"`;
  }
  if (DOM.originalActivityContext) {
    DOM.originalActivityContext.textContent = `Contexto inicial: ${originalData.context}`;
  }

  // 3. Filtrar / Montar a lista de sugestões relevantes baseadas nas escolhas
  generateRelevantSuggestions();
}

function generateRelevantSuggestions() {
  // Ordena sugestões priorizando as que combinam com as necessidades selecionadas
  const scoredSuggestions = DATA_STORE.catalogSuggestions.map((sug) => {
    let score = 0;
    sug.applicableNeeds.forEach((need) => {
      if (AppState.selectedNeeds.includes(need)) score += 2;
    });
    return { ...sug, matchScore: score };
  });

  // Ordena por maior relevância e rotaciona se o usuário clicou em "Gerar outra sugestão"
  scoredSuggestions.sort((a, b) => b.matchScore - a.matchScore);

  // Aplica rotação de variação para o protótipo
  const offset = AppState.suggestionVariationIndex % scoredSuggestions.length;
  const rotated = [...scoredSuggestions.slice(offset), ...scoredSuggestions.slice(0, offset)];

  // Seleciona as 5 principais sugestões conforme o exemplo solicitado no prompt
  AppState.currentSuggestions = rotated.slice(0, 5);

  renderSuggestionsCards();
}

function renderSuggestionsCards() {
  if (!DOM.suggestionsContainer) return;
  DOM.suggestionsContainer.innerHTML = "";

  AppState.currentSuggestions.forEach((sug, index) => {
    const card = document.createElement("div");
    card.className = "suggestion-card";
    card.id = `suggestion-item-${index + 1}`;

    card.innerHTML = `
      <div class="suggestion-content">
        <div class="suggestion-number" aria-label="Sugestão número ${index + 1}">${index + 1}</div>
        <div class="suggestion-text-block">
          <h4>${sug.title}</h4>
          <p>${sug.description}</p>
        </div>
      </div>
      <button type="button" class="btn-use-suggestion" data-index="${index}" id="btn-use-${sug.id}">
        <span>Usar esta sugestão</span>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </button>
    `;

    // Ação do botão "Usar esta sugestão"
    const useBtn = card.querySelector(".btn-use-suggestion");
    if (useBtn) {
      useBtn.addEventListener("click", () => {
        selectSuggestionAndProceed(index);
      });
    }

    DOM.suggestionsContainer.appendChild(card);
  });
}

function selectSuggestionAndProceed(index) {
  AppState.selectedSuggestionIndex = index;
  AppState.activeSuggestion = AppState.currentSuggestions[index];
  goToScreen(5);
}

// ==========================================================================
// TELA 5: RESULTADO FINAL (ATIVIDADE ADAPTADA)
// ==========================================================================
function renderFinalResultScreen() {
  const originalData = DATA_STORE.originalActivities[AppState.selectedActivityType] || DATA_STORE.originalActivities.sala;
  const currentSug = AppState.activeSuggestion || AppState.currentSuggestions[0] || DATA_STORE.catalogSuggestions[0];

  // Texto Original
  if (DOM.finalOriginalText) {
    DOM.finalOriginalText.textContent = `"${originalData.text}"`;
  }

  // Tag da Sugestão Utilizada
  if (DOM.finalSuggestionUsedTag) {
    DOM.finalSuggestionUsedTag.textContent = `Adaptação aplicada: ${currentSug.title}`;
  }

  // Título da Atividade Adaptada
  if (DOM.finalAdaptedTitle) {
    DOM.finalAdaptedTitle.textContent = `Versão Adaptada para Sala de Aula`;
  }

  // Lista de Passos Adaptados
  if (DOM.finalAdaptedStepsList) {
    DOM.finalAdaptedStepsList.innerHTML = "";
    currentSug.adaptedSteps.forEach((stepItem) => {
      const li = document.createElement("li");
      li.className = "adapted-step-item";
      li.innerHTML = `
        <span class="adapted-step-badge">${stepItem.step}</span>
        <div class="adapted-step-content">
          <strong>${stepItem.title}</strong>
          <p>${stepItem.desc}</p>
        </div>
      `;
      DOM.finalAdaptedStepsList.appendChild(li);
    });
  }
}

// ==========================================================================
// INTEGRAÇÃO COM GOOGLE FORMS (ESTRUTURA PREPARADA)
// ==========================================================================
function initGoogleFormsIntegration() {
  if (DOM.btnEvaluateForm) {
    if (GOOGLE_FORMS_URL && GOOGLE_FORMS_URL.trim() !== "") {
      DOM.btnEvaluateForm.setAttribute("href", GOOGLE_FORMS_URL);
      DOM.btnEvaluateForm.setAttribute("target", "_blank");
      DOM.btnEvaluateForm.setAttribute("rel", "noopener noreferrer");
    } else {
      DOM.btnEvaluateForm.addEventListener("click", (e) => {
        e.preventDefault();
        openFormsModal();
      });
    }
  }

  if (DOM.formsModalClose) {
    DOM.formsModalClose.addEventListener("click", closeFormsModal);
  }

  if (DOM.formsModalGotIt) {
    DOM.formsModalGotIt.addEventListener("click", closeFormsModal);
  }

  if (DOM.formsModalOpenDirect) {
    DOM.formsModalOpenDirect.addEventListener("click", () => {
      closeFormsModal();
      if (GOOGLE_FORMS_URL && GOOGLE_FORMS_URL.trim() !== "") {
        window.open(GOOGLE_FORMS_URL, "_blank", "noopener,noreferrer");
      } else {
        showToast("Link de teste simulado com sucesso!");
      }
    });
  }

  // Fechar modal ao clicar fora
  if (DOM.formsModal) {
    DOM.formsModal.addEventListener("click", (e) => {
      if (e.target === DOM.formsModal) {
        closeFormsModal();
      }
    });
  }
}

function openFormsModal() {
  if (DOM.formsModal) {
    DOM.formsModal.classList.add("active");
    DOM.formsModal.setAttribute("aria-hidden", "false");
  }
}

function closeFormsModal() {
  if (DOM.formsModal) {
    DOM.formsModal.classList.remove("active");
    DOM.formsModal.setAttribute("aria-hidden", "true");
  }
}

// ==========================================================================
// UTILITÁRIOS (COPIAR TEXTO / IMPRIMIR / NOTIFICAÇÕES)
// ==========================================================================
function initUtilities() {
  // Copiar atividade adaptada
  if (DOM.btnCopyAdapted) {
    DOM.btnCopyAdapted.addEventListener("click", () => {
      const currentSug = AppState.activeSuggestion || AppState.currentSuggestions[0] || DATA_STORE.catalogSuggestions[0];
      const originalData = DATA_STORE.originalActivities[AppState.selectedActivityType] || DATA_STORE.originalActivities.sala;
      
      let textToCopy = `=== ACESSAAULA: ATIVIDADE ADAPTADA ===\n\n`;
      textToCopy += `Original: "${originalData.text}"\n`;
      textToCopy += `Sugestão aplicada: ${currentSug.title}\n\n`;
      textToCopy += `Etapas Adaptadas para o Estudante:\n`;
      currentSug.adaptedSteps.forEach((st) => {
        textToCopy += `${st.step}. ${st.title} - ${st.desc}\n`;
      });
      textToCopy += `\nGerado via protótipo AcessaAula para professores da rede estadual.`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast("Atividade adaptada copiada para a área de transferência!");
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  }

  // Imprimir folha adaptada
  if (DOM.btnPrintAdapted) {
    DOM.btnPrintAdapted.addEventListener("click", () => {
      window.print();
    });
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("Texto copiado com sucesso!");
  } catch (err) {
    showToast("Selecione e copie o texto manualmente.");
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  if (!DOM.toastNotice || !DOM.toastMessage) return;
  DOM.toastMessage.textContent = message;
  DOM.toastNotice.classList.add("show");
  
  clearTimeout(DOM.toastTimeout);
  DOM.toastTimeout = setTimeout(() => {
    DOM.toastNotice.classList.remove("show");
  }, 3500);
}

// ==========================================================================
// ACESSIBILIDADE VISUAL (TAMANHO DE FONTE E TEMA ESCURO)
// ==========================================================================
function initAccessibilityFeatures() {
  let fontMode = 0; // 0: Normal, 1: Grande, 2: Extra Grande
  
  if (DOM.btnFontToggle) {
    DOM.btnFontToggle.addEventListener("click", () => {
      fontMode = (fontMode + 1) % 3;
      document.body.classList.remove("font-large", "font-xlarge");
      
      if (fontMode === 1) {
        document.body.classList.add("font-large");
        DOM.btnFontToggle.setAttribute("aria-label", "Tamanho de fonte: Grande");
        showToast("Tamanho do texto aumentado (Grande)");
      } else if (fontMode === 2) {
        document.body.classList.add("font-xlarge");
        DOM.btnFontToggle.setAttribute("aria-label", "Tamanho de fonte: Extra Grande");
        showToast("Tamanho do texto aumentado (Extra Grande)");
      } else {
        DOM.btnFontToggle.setAttribute("aria-label", "Tamanho de fonte: Padrão");
        showToast("Tamanho do texto restaurado ao padrão");
      }
    });
  }

  // TEMA ESCURO: Proteção visual, redução do cansaço e suporte a fotofobia
  let isDarkTheme = false;
  try {
    isDarkTheme = localStorage.getItem("acessa-aula-theme") === "dark";
  } catch (e) {
    isDarkTheme = false;
  }

  function applyTheme(dark, notify = false) {
    isDarkTheme = dark;
    document.body.classList.toggle("dark-theme", isDarkTheme);
    document.body.classList.remove("high-contrast"); // Garante limpeza caso resquício exista

    try {
      localStorage.setItem("acessa-aula-theme", isDarkTheme ? "dark" : "light");
    } catch (e) {
      // localStorage pode estar restrito em alguns contextos
    }

    if (DOM.btnThemeToggle) {
      DOM.btnThemeToggle.setAttribute("aria-pressed", isDarkTheme ? "true" : "false");
      DOM.btnThemeToggle.setAttribute("aria-label", isDarkTheme ? "Alternar para tema claro" : "Alternar para tema escuro");
      DOM.btnThemeToggle.setAttribute("title", isDarkTheme ? "Alternar para tema claro" : "Alternar para tema escuro");
    }

    if (DOM.themeToggleText) {
      DOM.themeToggleText.textContent = isDarkTheme ? "Tema claro" : "Tema escuro";
    }

    if (DOM.themeIconMoon && DOM.themeIconSun) {
      DOM.themeIconMoon.style.display = isDarkTheme ? "none" : "block";
      DOM.themeIconSun.style.display = isDarkTheme ? "block" : "none";
    }

    if (notify) {
      showToast(isDarkTheme ? "Tema escuro ativado" : "Tema claro ativado");
    }
  }

  // Aplica preferência salva se houver
  if (isDarkTheme) {
    applyTheme(true, false);
  }

  if (DOM.btnThemeToggle) {
    DOM.btnThemeToggle.addEventListener("click", () => {
      applyTheme(!isDarkTheme, true);
    });
  }
}

// ==========================================================================
// INICIALIZAÇÃO DOS EVENTOS GERAIS
// ==========================================================================
function initEventListeners() {
  // Tela 1 -> Tela 2
  if (DOM.btnStart) {
    DOM.btnStart.addEventListener("click", () => {
      goToScreen(2);
    });
  }

  // Tela 2 -> Tela 3
  if (DOM.btnContinueToNeeds) {
    DOM.btnContinueToNeeds.addEventListener("click", () => {
      goToScreen(3);
    });
  }

  // Tela 2 -> Tela 1 (Voltar)
  if (DOM.btnBackToStart) {
    DOM.btnBackToStart.addEventListener("click", () => {
      goToScreen(1);
    });
  }

  // Tela 3 -> Tela 4 (Gerar sugestões)
  if (DOM.btnGenerateSuggestions) {
    DOM.btnGenerateSuggestions.addEventListener("click", () => {
      goToScreen(4);
    });
  }

  // Tela 3 -> Tela 2 (Voltar)
  if (DOM.btnBackToActivityType) {
    DOM.btnBackToActivityType.addEventListener("click", () => {
      goToScreen(2);
    });
  }

  // Tela 4: Gerar outra sugestão
  if (DOM.btnRegenerateSuggestions) {
    DOM.btnRegenerateSuggestions.addEventListener("click", () => {
      AppState.suggestionVariationIndex += 1;
      generateRelevantSuggestions();
      showToast("Novas sugestões pedagógicas carregadas!");
    });
  }

  // Tela 4 -> Tela 3 (Voltar)
  if (DOM.btnBackToNeeds) {
    DOM.btnBackToNeeds.addEventListener("click", () => {
      goToScreen(3);
    });
  }

  // Tela 5 -> Tela 4 (Voltar para sugestões)
  if (DOM.btnBackToSuggestions) {
    DOM.btnBackToSuggestions.addEventListener("click", () => {
      goToScreen(4);
    });
  }

  // Tela 5: Reiniciar fluxo / Nova adaptação
  if (DOM.btnRestartFlow) {
    DOM.btnRestartFlow.addEventListener("click", () => {
      AppState.suggestionVariationIndex = 0;
      AppState.activeSuggestion = null;
      goToScreen(2);
    });
  }
}

// ==========================================================================
// INICIALIZAÇÃO AO CARREGAR A PÁGINA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initActivityTypeSelection();
  initNeedsSelection();
  initAccessibilityFeatures();
  initGoogleFormsIntegration();
  initUtilities();
  initEventListeners();
  
  // Inicia na Tela 1
  goToScreen(1);
});
