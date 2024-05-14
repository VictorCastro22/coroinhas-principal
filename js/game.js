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
    question: "Qual é a função principal do Missal na celebração da Missa?",
    choice1: "Determinar o local da celebração",
    choice2: "Guiar o sacerdote nas orações e ritos da Missa",
    choice3: "Escolher as leituras do dia",
    choice4: "Definir o número de fiéis permitidos na igreja",
    answer: 2
  },
  {
    question: "O que é encontrado no Ordinário da Missa do Missal?",
    choice1: "Orações específicas para cada dia",
    choice2: "Leituras bíblicas e salmos",
    choice3: "Ritos e instruções para a celebração",
    choice4: "Informações sobre a vida dos santos",
    answer: 3
  },
  {
    question: "Qual é a função do turíbulo na liturgia católica?",
    choice1: "Iluminar o altar",
    choice2: "Incensar e purificar o ambiente",
    choice3: "Tocar música sacra",
    choice4: "Armazenar as hóstias consagradas",
    answer: 2
  },
  {
    question: "Como devem ser descartadas as cinzas do turíbulo após o uso?",
    choice1: "No lixo comum",
    choice2: "Em uma fogueira",
    choice3: "Sobre a água",
    choice4: "Na terra",
    answer: 4
  },
  {
    question: "Qual parte da Missa não envolve o uso do turíbulo?",
    choice1: "Procissão de entrada",
    choice2: "Salmo",
    choice3: "Evangelho",
    choice4: "Oração eucarística (consagração)",
    answer: 2
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
