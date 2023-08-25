//const dataFromUser=require('./prompt1Collect');

let quiz = "1) Which gland is known as the master gland?\n\na) Thyroid gland\nb) Adrenal gland\nc) Pituitary gland\nd) Pancreas\n\nAnswer: c) Pituitary gland\n\n2) Which hormone is responsible for regulating blood sugar levels?\n\na) Insulin\nb) Estrogen\nc) Testosterone\nd) Growth hormone\n\nAnswer: a) Insulin\n\n3) Which gland is responsible for controlling the body's metabolism?\n\na) Thyroid gland\nb) Pineal gland\nc) Parathyroid gland\nd) Ovaries\n\nAnswer: a) Thyroid gland";
let QuestionScript = quiz; // data that will be downloaded as .txt file
//let quiz='';
let time;
let totalSecondsToCountDown = 0;
let lastNotedTimeLeft = 0;
let noqs;
let topic;
let attempted = []; //will be used to count no. of questions attempted. 0/1 for unattempt/attempt
let correct = []; //will be used to count no. of questions correctly answered
let timeTaken; // time take in seconds
const questionElement = document.getElementById('question');
const nextButton = document.getElementById('next-btn');
const answerButton = document.getElementById('answer-button');
let questions = [];
const navcontrols = document.getElementById('navigation-controls');
let currrentQuestionIndex = 0;
let score = 0;
let terminateQuiz = false;
let marks = []; // marks for ith quetsion at ith index. 0/1

/*function buildQuestions() {
    alert("Preparing quiz");
    //const dataFromUser=require('./prompt1Collect');
    //alert(dataFromUser.prompt);
    //quiz=sessionStorage.getItem('fetchedQuiz');
    QuestionScript = quiz;
    noqs = sessionStorage.getItem('noqs');
    topic = sessionStorage.getItem('topic');
    time = sessionStorage.getItem('time');
    totalSecondsToCountDown = time * 60;

    let parserIndex = 0;
    for (let i = 0; i < noqs; i++) {
        let questionObject = {};

        parserIndex = quiz.indexOf(' ') + 1;
        questionObject.question = quiz.slice(parserIndex, quiz.indexOf('?') + 1);

        parserIndex = quiz.indexOf('?') + 1 + 1 + 1;
        quiz = quiz.slice(parserIndex);

        let answers = [];

        for (let j = 0; j < 4; j++) {
            let optionObject = {}; // option + correctness i.e. {text, correct}
            let start = quiz.indexOf(' ') + 1; // to exclude label  in option
            let txt = quiz.slice(start, quiz.indexOf('\n'));

            optionObject.text = txt;
            optionObject.correct = false;

            parserIndex = quiz.indexOf('\n') + 1;
            quiz = quiz.slice(parserIndex);

            answers[j] = optionObject;
        }
        quiz = quiz.slice(1); // quiz now begins with "Answer: ....."
        //console.log(quiz);
        let correctAnswer = quiz.indexOf(':') + 2;
        answers[quiz.charCodeAt(correctAnswer) - 'a'.charCodeAt(0)].correct = true;
        questionObject.correctOption = quiz.charCodeAt(correctAnswer) - 'a'.charCodeAt(0); // 0-based index of correct option
        console.log(answers);

        //quiz=quiz.slice(correctAnswer);
        parserIndex = quiz.indexOf('\n') + 2;
        quiz = quiz.slice(parserIndex);
        parserIndex = 0;

        questionObject.answers = answers;
        questionObject.selectedOption = -1;
        questions[i] = questionObject; 0
    }
    alert("about to begin");
    mode = 1;
    startQuiz();
}*/


function startQuiz(){
    questions=JSON.parse(sessionStorage.getItem("questions"));
    noqs = sessionStorage.getItem('noqs');
    topic = sessionStorage.getItem('topic');
    time = sessionStorage.getItem('time');
    let questionPallete = document.getElementById('questionPallete'); // display the question pallete on header
    questionPallete.addEventListener('change', jumpToQuestion);
    for (let i = 0; i < noqs; i++) {
        var option = document.createElement("option");
        option.innerHTML = i + 1;
        option.classList.add('jumpToQuestion');
        questionPallete.appendChild(option);
    }
    //No need of timer
    document.getElementById('topic').innerHTML = `${topic}`; // display topic on Header
    showQuestion(1);
}
function prevQuestion() {
    if (currrentQuestionIndex > 0) {
        currrentQuestionIndex--;
        showQuestion();
    }
    else alert('You are on first question.')
}
function nxtQuestion() {
    if (currrentQuestionIndex < noqs - 1) {
        currrentQuestionIndex++;
        showQuestion();
    }
    else alert('Last Question Reached')
}

function showQuestion() { // 1: Quiz attempting mode, 0: revisiting mode
    resetOptionsState();
    let currrentQuestion = questions[currrentQuestionIndex];
    let questionNo = currrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currrentQuestion.question;
    let ansbtn0 = document.getElementById('ans0');
    let ansbtn1 = document.getElementById('ans1');
    let ansbtn2 = document.getElementById('ans2');
    let ansbtn3 = document.getElementById('ans3');
    ansbtn0.innerHTML = 'A. ' + currrentQuestion.answers[0].text;
    ansbtn1.innerHTML = 'B. ' + currrentQuestion.answers[1].text;
    ansbtn2.innerHTML = 'C. ' + currrentQuestion.answers[2].text;
    ansbtn3.innerHTML = 'D. ' + currrentQuestion.answers[3].text;

    if (questions[currrentQuestionIndex].selectedOption != -1) { // display the selected option in blueviolet
        const selectedBtn = 'ans' + questions[currrentQuestionIndex].selectedOption;
        document.getElementById(selectedBtn).style.backgroundColor = 'blueviolet';
        document.getElementById(selectedBtn).style.color = 'white';
    }
    const correctBtn=document.getElementById('ans'+(questions[currrentQuestionIndex].correctOption));
    correctBtn.style.borderWidth='4px';
    correctBtn.style.borderColor='#58e668';
}
function resetOptionsState() {
    const ans0 = document.getElementById('ans0');
    const ans1 = document.getElementById('ans1');
    const ans2 = document.getElementById('ans2');
    const ans3 = document.getElementById('ans3');
    ans0.style.backgroundColor = "#fff"; ans0.style.color = "blueviolet"; ans0.style.borderColor="blueviolet"; ans0.style.borderWidth='2px';
    ans1.style.backgroundColor = "#fff"; ans1.style.color = "blueviolet"; ans1.style.borderColor="blueviolet"; ans1.style.borderWidth='2px';
    ans2.style.backgroundColor = "#fff"; ans2.style.color = "blueviolet"; ans2.style.borderColor="blueviolet"; ans2.style.borderWidth='2px';
    ans3.style.backgroundColor = "#fff"; ans3.style.color = "blueviolet"; ans3.style.borderColor="blueviolet"; ans3.style.borderWidth='2px';
}

function jumpToQuestion() {
    let jumpTo = document.getElementById('questionPallete').value;
    currrentQuestionIndex = jumpTo - 1;
    showQuestion();
}
function guide(){
    alert('Green border option: Correct answer\nShaded option: your choice')
}


startQuiz(); //--------------------> start this page by begining to build questions Array 