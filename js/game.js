const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      question: "Qual é o padroeiro dos coroinhas?",
      choice1: "São Jorge",
      choice2: "Sa",
      choice3: "Antônio de Santarém",
      choice4: "Antônio de Coimbra",
      answer: 1
    },
    {
      question: "Qual dessas cidades é conhecida por ter uma grande devoção a Santo Antônio?",
      choice1: "Roma",
      choice2: "Lisboa",
      choice3: "Paris",
      choice4: "Madri",
      answer: 2
    },
    {
      question: "Qual é o dia dedicado a São Tarcísio no calendário litúrgico da Igreja Católica?",
      choice1: "13 de junho",
      choice2: "17 de janeiro",
      choice3: "15 de agosto",
      choice4: "22 de novembro",
      answer: 1
    },
    {
      question: "Qual é o nome de nascimento de Santo Antônio?",
      choice1: "Fernando de Bulhões",
      choice2: "Manuel de Andrade",
      choice3: "João de Sousa",
      choice4: "Rafael dos Santos",
      answer: 1
    },
    {
      question: "Santo Antônio é conhecido como o santo das ________.",
      choice1: "Flores",
      choice2: "Crianças",
      choice3: "Escolas",
      choice4: "Causas impossíveis",
      answer: 4
    },
    {
      question: "Qual era a nacionalidade de Santo Antônio?",
      choice1: "Portuguesa",
      choice2: "Espanhola",
      choice3: "Italiana",
      choice4: "Brasileira",
      answer: 1
    }
  ];
  
  

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // vai para o final da página
        return window.location.assign('../html/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //progresso nos pontos
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerHTML = currentQuestion['choice' + (index + 1)];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
