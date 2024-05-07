const questions = [
    {
        queston: "ori xe tyea?",
        answers:[
            {text: "zvigeni", correct: false},
            {text: "bati", correct: false},
            {text: "yava", correct: false},
            {text: "bidzina ivanishvili", correct: true},
        ]
    },{
        queston: "ori kaladze romeli qalaqia?",
        answers:[
            {text: "tbilisi", correct: false},
            {text: "sagarejo", correct: false},
            {text: "gurjaani", correct: false},
            {text: "milani", correct: true},
        ] 
    },
    {
        queston: "ori daqali koshmaria?",
        answers:[
            {text: "gamis", correct: false},
            {text: "dgis", correct: false},
            {text: "kacis", correct: true},
            {text: "samyarosi", correct: false},
        ]
    },{
        queston: "sadauria kanoni?",
        answers:[
            {text: "rusuli", correct: false},
            {text: "italiuri", correct: false},
            {text: "chinuri", correct: false},
            {text: "kaxuri", correct: true},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";
    showQuestions();
};

function showQuestions(){
    // console.log(11)
    resetState();
    let currentQueston = questions[currentQuestionIndex];
    let questonNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questonNo + ". " + currentQueston.queston;
  
    currentQueston.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}


function resetState(){
    nextButtons.style.display = "none";
    while(answerButtons.firstChild){
          answerButtons.removeChild(answerButtons.firstChild);

    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
      nextButtons.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you score ${score} out of ${questions.length}`;
    nextButtons.innerHTML = "play Again";
    nextButtons.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButtons.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();

