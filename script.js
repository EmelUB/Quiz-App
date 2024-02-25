const questions = [
    {
        question:"Hangi gezegen Güneş Sistemi'nde üçüncü sıradadır?",
        answer:[
            {text:"Venüs", correct:false},
            {text:" Mars", correct:false},
            {text:"Dünya", correct:true},
            {text:" Jüpiter", correct:false},
        ]
    },
    {
        question:"Leonardo da Vinci'nin en ünlü tablosu hangisidir?",
        answer:[
            {text:"Mona Lisa", correct:true},
            {text:" Akşam Yemeği", correct:false},
            {text:"Vitruvius Adamı", correct:false},
            {text:"Son Akşam Yemeği", correct:false},
        ]
    },
    {
        question:"Hangi ülkenin başkenti Buenos Aires'tir?",
        answer:[
            {text:"Meksika", correct:false},
            {text:"Brezilya", correct:false},
            {text:"Arjantin", correct:true},
            {text:"Kolombiya", correct:false},
        ]
    },
    {
        question:"Edebiyat tarihinde İlyada ve Odysseia destanlarıyla tanınan antik Yunan şairi kimdir?",
        answer:[
            {text:"Homeros", correct:true},
            {text:"Sophokles", correct:false},
            {text:"Herodot", correct:false},
            {text:"Aristoteles", correct:false},
        ]
    },
    {
        question:"Dünya üzerindeki en yüksek dağ zirvesi hangisidir?",
        answer:[
            {text:"K2", correct:false},
            {text:"Everest", correct:true},
            {text:"Kilimanjaro", correct:false},
            {text:"Denali", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Sonraki..";
    showQuestion();

}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
};

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}


function selectAnswer(e){
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display ="block";
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }
    else{
        showScore();
        const againEl = document.getElementById("try-again");
        againEl.style.display="block";

        againEl.addEventListener("click",startQuiz);
    }
};

function showScore(){
    resetState();
    questionElement.innerHTML=`Scorunuz: ${score}`;
}
startQuiz()