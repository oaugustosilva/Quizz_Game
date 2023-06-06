// Declaração de variáveis

const question       = document.querySelector("#question");
const answersBox     = document.querySelector("#answer-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters        = ["a", "b", "c", "d"];
let points           = 0;
let actualQuestion   = 0;
let contador = 0;

//Perguntas
/*Tenho um array de questions, que são objetos. Dentro de cada objeto (pergunta), eu tenho duas informações... o texto da pergunta em si, e a resposta, que é outro array... esse array contém
duas informações: o texto da resposta e se ela é a correta ou não...*/
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
]


//Substituição do quizz para a primeira pergunta

function init() {
  //Criar a primeira pergunta
  createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

  //Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  //Alterar o texto da pergunta

  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;


  //Mostrar as alternativas nos botões

  questions[i].answers.forEach(function (answer, i) {

    //Cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]); //Criando atributo no template para indicar se a alternativa é a correta. De acordo com as opções da estrutura de perguntas ali de cima.

    //Removar hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //Mostrando as alternativas na tela
    answersBox.appendChild(answerTemplate);

    //Inserindo evento de click nos botões
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    });

    console.log(answerTemplate);
  });

  //Incrementar o número da questão, para não se repetir
  actualQuestion++;

}

//Verificando resposta do usuário
function checkAnswer(btn) {
  console.log(btn);

  //selecionando todos os botões
  const buttons = answersBox.querySelectorAll("button");

  //verifica se a resposta está correta e adiciona classes nos botoões certos e errados;
  buttons.forEach(function (button) {

    if (button.getAttribute("correct-answer") === "true") {

      button.classList.add("correct-answer");

      //checa se o usuário clicou no botão da resposta certa
      if (button === btn) {
        points++;
        console.log("Acertos: " + points);
      }

    } else {

      button.classList.add("wrong-answer");

    }
  });

  //Exibir a próxima pergunta
  nextQuestion();

}

//Exibe a próxima pergunta do quizz
function nextQuestion() {

  //Timer para usuário ver a resposta
  setTimeout(() => {

    //verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      //apresenta msg de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  }, 700);

}

//Função para exibir a tela final de score

function showSuccessMessage() {

  hideOrShowQuizz();

  //Trocar dados com os valores reais do score
  const score = ((points / questions.length) * 100).toFixed(2);

  //inserindo a porcentagem real no placar
  const displayScore = document.querySelector("#display-score span");
  displayScore.textContent = score.toString();

  //inserindo a qntd de questões corretas no score
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  //alterando o total de perguntas do score
  const questQty = document.querySelector("#questions-qty");
  questQty.textContent = questions.length;

  restartQuizz();

}

//Mostra ou esconde o Score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

//Reiniciar o Quizz
function restartQuizz() {
  const restartBtn = document.querySelector("#restart");
  restartBtn.addEventListener("click", function () {

    //zerar o jogo
    points = 0;
    actualQuestion = 0;
    hideOrShowQuizz();
    init();
  });
}


//Inicialização do Quizz
init();