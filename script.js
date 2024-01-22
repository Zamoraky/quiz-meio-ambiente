const questions = [
    {
        question: "Qual é a principal causa do aquecimento global?",
        options: ["Desmatamento", "Queimadas", "Emissões de gases de efeito estufa", "Poluição do ar"],
        correctAnswer: "Emissões de gases de efeito estufa"
    },
    {
        question: "Qual é a principal fonte de poluição dos oceanos?",
        options: ["Plástico", "Petróleo", "Metais pesados", "Esgoto doméstico"],
        correctAnswer: "Plástico"
    },
    {
        question: "O que é a compostagem?",
        options: ["Reciclagem de plástico", "Transformação de resíduos orgânicos em adubo", "Separação de materiais recicláveis", "Queima de lixo para gerar energia"],
        correctAnswer: "Transformação de resíduos orgânicos em adubo"
    },
    {
        question: "Qual a importância das áreas de preservação permanente (APPs) nas margens dos rios?",
        options: ["Proteção contra enchentes", "Cultivo agrícola intensivo", "Construção de residências", "Despejo de resíduos industriais"],
        correctAnswer: "Proteção contra enchentes"
    },
    {
        question: "O que é o Protocolo de Kyoto?",
        options: ["Tratado internacional sobre biodiversidade", "Acordo para redução das emissões de gases de efeito estufa", "Convenção sobre a proteção dos oceanos", "Pacto global para a gestão de recursos hídricos"],
        correctAnswer: "Acordo para redução das emissões de gases de efeito estufa"
    },
    {
        question: "O que significa a sigla PGRS?",
        options: ["Plano de Gestão de Resíduos Sólidos", "Programa Global de Reflorestamento Sustentável", "Plano de Gerenciamento de Recursos Sustentáveis", "Projeto de Garantia de Reservas de Sustentabilidade"],
        correctAnswer: "Plano de Gestão de Resíduos Sólidos"
    },
    {
        question: "Qual é a principal causa do desmatamento na Amazônia?",
        options: ["Expansão agrícola", "Exploração madeireira ilegal", "Mineração", "Queimadas controladas"],
        correctAnswer: "Expansão agrícola"
    },
    {
        question: "O que são as 3Rs da sustentabilidade?",
        options: ["Reformar, Reparar, Reciclar", "Reduzir, Reciclar, Reutilizar", "Recuperar, Replantar, Reflorestar", "Renovar, Recriar, Restaurar"],
        correctAnswer: "Reduzir, Reciclar, Reutilizar"
    },
    {
        question: "Qual é o principal gás de efeito estufa liberado pela queima de combustíveis fósseis?",
        options: ["Dióxido de enxofre", "Metano", "Óxidos de nitrogênio", "Dióxido de carbono"],
        correctAnswer: "Dióxido de carbono"
    },
    {
        question: "Qual é a importância das abelhas para o meio ambiente?",
        options: ["Polinização de plantas", "Controle de pragas", "Produção de mel", "Melhoria da qualidade do ar"],
        correctAnswer: "Polinização de plantas"
    }
      
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const resultDisplay = document.getElementById("result");
const progressDisplay = document.getElementById("progress");
const retryButton = document.getElementById("retry-button");

function showQuestion() {
    const currentQ = questions[currentQuestion];
    questionContainer.innerHTML = `<p>${currentQ.question}</p>`;
    optionsContainer.innerHTML = currentQ.options.map(option =>
        `<input type="radio" name="option" value="${option}"> ${option}<br>`
    ).join("");

    // Adiciona um evento de clique para cada opção
    currentQ.options.forEach((option, index) => {
        const optionElement = optionsContainer.querySelector(`input[value="${option}"]`);
        optionElement.addEventListener("click", () => checkAnswer(option));
    });

    // Atualiza o contador de progresso
    progressDisplay.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
}

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        resultDisplay.textContent = "Parabéns, você acertou!";
        resultDisplay.style.color = "green";
        score++;
    } else {
        resultDisplay.textContent = `Poxa, você errou. A resposta correta é: ${correctAnswer}.`;
        resultDisplay.style.color = "red";
    }

    // Desabilita a seleção após a escolha
    const options = optionsContainer.querySelectorAll('input[name="option"]');
    options.forEach(option => option.disabled = true);

    // Mostra o botão "Próxima Pergunta"
    nextButton.style.display = "block";
}

function showResult() {
    resultDisplay.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    resultDisplay.style.color = score === questions.length ? "green" : "red";
    
    // Oculta o botão "Próxima Pergunta" e exibe o botão "Tentar Novamente"
    nextButton.style.display = "none";
    retryButton.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;

    // Verifica se é a última pergunta para atualizar o texto do botão
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finalizar";
    } else {
        nextButton.textContent = "Próxima Pergunta";
    }

    if (currentQuestion < questions.length) {
        // Limpa o feedback da resposta anterior
        resultDisplay.textContent = "";

        showQuestion();

        // Habilita as opções para a próxima pergunta
        const options = optionsContainer.querySelectorAll('input[name="option"]');
        options.forEach(option => option.disabled = false);
    } else {
        showResult();
        nextButton.disabled = true;
    }
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.disabled = false;
    nextButton.textContent = "Próxima Pergunta";
    showQuestion();
    resultDisplay.textContent = "";
    retryButton.style.display = "none"; // Oculta o botão "Tentar Novamente"
}

// Iniciar o quiz
showQuestion();