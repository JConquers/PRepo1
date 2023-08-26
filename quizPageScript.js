//let quiz = "1) Which gland is known as the master gland?\n\na) Thyroid gland\nb) Adrenal gland\nc) Pituitary gland\nd) Pancreas\n\nAnswer: c) Pituitary gland\n\n2) Which hormone is responsible for regulating blood sugar levels?\n\na) Insulin\nb) Estrogen\nc) Testosterone\nd) Growth hormone\n\nAnswer: a) Insulin\n\n3) Which gland is responsible for controlling the body's metabolism?\n\na) Thyroid gland\nb) Pineal gland\nc) Parathyroid gland\nd) Ovaries\n\nAnswer: a) Thyroid gland";
//let quiz='1) The magnitude of a vector is always:\na) Positive\nb) Negative\nc) Zero\nd) Variable\n\nAnswer: a) Positive\n\n2) The sum of two collinear vectors is always:\na) Collinear\nb) Perpendicular\nc) Coplanar\nd) Anti-parallel\n\nAnswer: a) Collinear\n\n3) The unit vector parallel to the x-axis is:\na) i\nb) j\nc) k\nd) 1\n\nAnswer: a) i\n\n4) The magnitude of a vector in terms of its components is given by:\na) acosθ\nb) asinθ\nc) √(a^2 + b^2)\nd) a + b\n\nAnswer: c) √(a^2 + b^2)\n\n5) The cross product of two parallel vectors is always:\na) Parallel\nb) Perpendicular\nc) Anti-parallel\nd) Zero\n\nAnswer: d) Zero';
//let quiz='1. Which of the following is NOT a valid data type in C++?\na) int\nb) bool\nc) float\nd) char\nAnswer: b) bool\n\n2. What is the output of the following code snippet?\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5;\n    cout << x << endl;\n    return 0;\n}\n```\na) 0\nb) 5\nc) Error\nd) Undefined\nAnswer: b) 5';
let quiz = '';
let QuestionScript = ''; // data that will be downloaded as .txt file
let questions = []; //Data structure to hold objects containing question, answer options, selected option and correct option 
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
const navcontrols = document.getElementById('navigation-controls');
let currrentQuestionIndex = 0;
let isPaused;
let mailid = ''; // to be retrieved from session storage
let msg = ''; // Contains name, score, answer script

function buildQuestions() {
    alert("Preparing quiz");
    quiz = sessionStorage.getItem('fetchedQuiz');
    noqs = sessionStorage.getItem('noqs');
    topic = sessionStorage.getItem('topic');
    time = sessionStorage.getItem('time');
    QuestionScript = quiz;
    isPaused = false;
    totalSecondsToCountDown = time * 60;

    // questions[] is built for all cases except when left margin for options is not 0
    let parserIndex = 0;
    for (let i = 0; i < noqs; i++) {
        let questionObject = {};
        questionObject.question='';

        parserIndex = quiz.indexOf(' ') + 1;
        let endParser=quiz.indexOf('\n');
        do{
            questionObject.question += (quiz.slice(parserIndex, endParser)+'<br>');
            parserIndex = endParser + 1;
            quiz = quiz.slice(parserIndex);
            parserIndex=0;
            endParser = quiz.indexOf('\n');
        }while(quiz[parserIndex]!='a' || quiz[parserIndex+1]!='\)' || quiz[parserIndex+2]!=' ');

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
        questionObject.isMarked = false;

        questions[i] = questionObject;
    }
    console.log(questions)
    alert('INSTRUCTIONS:\nIn the question pallete:\nOrange: marked for later\nGreen: attempted\nYou cannot navigate the quiz when it is paused.\nQuiz will end automatically when timer ends')
    startQuiz();
    /*let parserIndex = 0;
    for (let i = 0; i < noqs; i++) {
        let questionObject = {};

        parserIndex = quiz.indexOf(' ') + 1;
        questionObject.question = quiz.slice(parserIndex, quiz.indexOf(':') + 1);

        parserIndex = quiz.indexOf(':') + 1 + 1 + 1;
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
        questionObject.isMarked = false;

        questions[i] = questionObject;
    }
    alert('INSTRUCTIONS:\nIn the question pallete:\nOrange: marked for later\nGreen: attempted\nYou cannot navigate the quiz when it is paused.\nQuiz will end automatically when timer ends')
    startQuiz();*/

}
function startQuiz() {
    currrentQuestionIndex = 0;
    for (let i = 0; i < noqs; i++) {
        attempted[i] = 0;
        correct[i] = 0;
    }
    let questionPallete = document.getElementById('questionPallete'); // display the question pallete on header
    questionPallete.addEventListener('change', () => {
        if (!isPaused) jumpToQuestion();
        else alert('You cannot navigate. Quiz is Paused');
    });
    for (let i = 0; i < noqs; i++) {
        var option = document.createElement("option");
        option.innerHTML = i + 1;
        option.setAttribute('id', 'jumpTo' + i)
        questionPallete.appendChild(option);
    }
    totalSecondsToCountDown = time * 60;
    timer(); // start the timer on Header
    document.getElementById('topic').innerHTML = `${topic}`; // display topic on Header
    showQuestion();
}
function checkAnswer(ansIndex) {
    resetOptionsState();
    correct[currrentQuestionIndex] = (questions[currrentQuestionIndex].answers[ansIndex].correct) ? 1 : 0;
    if (attempted[currrentQuestionIndex] == 0) attempted[currrentQuestionIndex] = 1;
    questions[currrentQuestionIndex].selectedOption = ansIndex;
    let btnName = 'ans' + ansIndex;
    const selectedBtn = document.getElementById(btnName); // reflect change in option buttons
    selectedBtn.style.backgroundColor = 'blueviolet';
    selectedBtn.style.color = 'white';
    const obj = 'jumpTo' + currrentQuestionIndex; // rflect change in question pallete
    document.getElementById(obj).style.backgroundColor = '#58e668';
}
function clearOptions() {
    attempted[currrentQuestionIndex] = correct[currrentQuestionIndex] = 0;
    questions[currrentQuestionIndex].selectedOption = -1;
    const obj = 'jumpTo' + currrentQuestionIndex; // rflect change in question pallete
    document.getElementById(obj).style.backgroundColor = '#fff';
    resetOptionsState();
}
function prevQuestion() {
    if (!isPaused) {
        if (currrentQuestionIndex > 0) {
            currrentQuestionIndex--;
            showQuestion();
        }
        else alert('You are on first question.')
    }
    else alert('You cannot navigate. Quiz is paused');
}
function nxtQuestion() {
    if (!isPaused) {
        if (currrentQuestionIndex < noqs - 1) {
            currrentQuestionIndex++;
            showQuestion();
        }
        else alert('Last Question Reached')
    }
    else alert('You cannot navigate. Quiz is paused')
}
function finQuiz(visit) { // visit= 1->visiting finQuiz for first time, 0->otherwise
    sessionStorage.setItem('playQuiz', 0);
    //alert(sessionStorage.getItem('playQuiz'));
    document.getElementById('Heading').textContent = "...Quiz Over...";
    document.getElementById('answer-buttons').remove();

    if (visit == 1) {
        let Correct = 0, Attempted = 0;
        for (let i = 0; i < noqs; i++) {
            Correct += correct[i];
            Attempted += attempted[i];
        }
        const Accuracy = (Correct * 100 / Attempted).toFixed(2);
        timeTaken = time * 60 - totalSecondsToCountDown;

        msg = `Name: ${sessionStorage.getItem('name')}<br><br>
    Your score is ${Correct}/${noqs}<br><br>
    Attempted: ${Attempted}/${noqs}<br><br>
    Accuracy:${Accuracy}<br><br>
    Time Taken:${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s<br><br><hr>
    Question script:<br><br>${QuestionScript}`;

        sessionStorage.setItem('msg', msg);
        sessionStorage.setItem('attempted', JSON.stringify(attempted));
        sessionStorage.setItem('correct', JSON.stringify(correct));

        questionElement.innerHTML = `Your score is ${Correct}/${noqs}<br><br>
                               Attempted: ${Attempted}/${noqs}<br><br>
                               Accuracy:${Accuracy}<br><br>
                               Time Taken:${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s<br><br>`;

        const revisitMode = document.createElement('button'); revisitMode.innerHTML = 'Revisit Answers'; revisitMode.classList.add('btn2'); questionElement.appendChild(revisitMode);
        revisitMode.addEventListener('click', () => {
            sessionStorage.setItem('questions', JSON.stringify(questions)); //:::::::::::::::::::::::: adding to sessionStorage
            window.location.href = 'revisitQuiz.html';
        });

        const downloadScript = document.createElement('button'); downloadScript.innerHTML = 'Download Script'; downloadScript.classList.add('btn2'); questionElement.appendChild(downloadScript);
        downloadScript.style.marginLeft = '20px';
        downloadScript.addEventListener('click', () => {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(QuestionScript));
            element.setAttribute('download', 'Question-Script.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });

        document.getElementById('prev-btn').remove();
        document.getElementById('nxt-btn').remove();
        document.getElementById('fin-btn').remove();
        document.getElementById('clr-optns').remove();
        document.getElementById('pause-resume').remove();
        document.getElementById('mark').remove();
        const shareByMail = document.createElement('img'); /*shareByMail.classList.add('shareByMail');*/
        const shareByX = document.createElement('img'); /*shareByX.classList.add('shareByX');*/ shareByX.style.marginLeft = '20px';
        const shareByInsta = document.createElement('img'); /*shareByInsta.classList.add('shareByInsta');*/ shareByInsta.style.marginLeft = '20px'; shareByInsta.style.marginTop = '10px';
        const preText = document.createElement('p'); preText.textContent = 'Share report via: ';
        navcontrols.appendChild(preText);
        navcontrols.appendChild(shareByMail);
        navcontrols.appendChild(shareByX);
        navcontrols.appendChild(shareByInsta);
        shareByMail.addEventListener('click', sendByMail);
        shareByMail.addEventListener('mouseover', () => { shareByMail.style.opacity = 0.5; });
        shareByMail.addEventListener('mouseout', () => { shareByMail.style.opacity = 1 });
        shareByMail.src = 'Images/Mail.png'; shareByMail.style.width = '40px'; shareByMail.style.height = '40px';
        shareByX.src = 'Images/Twitter.png'; shareByX.style.width = '40px'; shareByX.style.height = '40px';
        shareByInsta.src = 'Images/Insta.png'; shareByInsta.style.width = '40px'; shareByInsta.style.height = '40px';
    }
    else {
        noqs = sessionStorage.getItem('noqs');
        topic = sessionStorage.getItem('topic');
        time = sessionStorage.getItem('time');
        QuestionScript = sessionStorage.getItem('fetchedQuiz');
        correct = JSON.parse(sessionStorage.getItem('correct'));
        attempted = JSON.parse(sessionStorage.getItem('attempted'));

        let Correct = 0, Attempted = 0;
        for (let i = 0; i < noqs; i++) {
            Correct += correct[i];
            Attempted += attempted[i];
        }
        const Accuracy = (Correct * 100 / Attempted).toFixed(2);
        timeTaken = time * 60 - totalSecondsToCountDown;

        questionElement.innerHTML = `Your score is ${Correct}/${noqs}<br><br>
                               Attempted: ${Attempted}/${noqs}<br><br>
                               Accuracy:${Accuracy}<br><br>
                               Time Taken:${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s<br><br>`;

        const revisitMode = document.createElement('button'); revisitMode.innerHTML = 'Revisit Answers'; revisitMode.classList.add('btn2'); questionElement.appendChild(revisitMode);
        revisitMode.addEventListener('click', () => {
            //sessionStorage.setItem('questions', JSON.stringify(questions)); //:::::::::::::::::::::::: adding to sessionStorage
            window.location.href = 'revisitQuiz.html';
        });

        const downloadScript = document.createElement('button'); downloadScript.innerHTML = 'Download Script'; downloadScript.classList.add('btn2'); questionElement.appendChild(downloadScript);
        downloadScript.style.marginLeft = '20px';
        downloadScript.addEventListener('click', () => {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(QuestionScript));
            element.setAttribute('download', 'Question-Script.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });

        document.getElementById('prev-btn').remove();
        document.getElementById('nxt-btn').remove();
        document.getElementById('fin-btn').remove();
        document.getElementById('clr-optns').remove();
        document.getElementById('pause-resume').remove();
        document.getElementById('mark').remove();
        const shareByMail = document.createElement('img'); /*shareByMail.classList.add('shareByMail');*/
        const shareByX = document.createElement('img'); /*shareByX.classList.add('shareByX');*/ shareByX.style.marginLeft = '20px';
        const shareByInsta = document.createElement('img'); /*shareByInsta.classList.add('shareByInsta');*/ shareByInsta.style.marginLeft = '20px'; shareByInsta.style.marginTop = '10px';
        const preText = document.createElement('p'); preText.textContent = 'Share report via: ';
        navcontrols.appendChild(preText);
        navcontrols.appendChild(shareByMail);
        navcontrols.appendChild(shareByX);
        navcontrols.appendChild(shareByInsta);
        shareByMail.addEventListener('click', sendByMail);
        shareByMail.addEventListener('mouseover', () => { shareByMail.style.opacity = 0.5; });
        shareByMail.addEventListener('mouseout', () => { shareByMail.style.opacity = 1 });
        shareByMail.src = 'Images/Mail.png'; shareByMail.style.width = '40px'; shareByMail.style.height = '40px';
        shareByX.src = 'Images/Twitter.png'; shareByX.style.width = '40px'; shareByX.style.height = '40px';
        shareByInsta.src = 'Images/Insta.png'; shareByInsta.style.width = '40px'; shareByInsta.style.height = '40px';
    }

}
function showQuestion() { 
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
    if (questions[currrentQuestionIndex].isMarked) { // reflect the state of being marked
        document.getElementById('mark').style.backgroundColor = 'black';
        document.getElementById('mark').style.color = 'white';
        document.getElementById('mark').innerHTML = 'Unmark';
    }
    else{
        document.getElementById('mark').style.backgroundColor = 'white';
        document.getElementById('mark').style.color = 'black';
        document.getElementById('mark').innerHTML = 'Mark';
    }
}
function resetOptionsState() {
    const ans0 = document.getElementById('ans0');
    const ans1 = document.getElementById('ans1');
    const ans2 = document.getElementById('ans2');
    const ans3 = document.getElementById('ans3');
    ans0.style.backgroundColor = "#fff";
    ans1.style.backgroundColor = "#fff";
    ans2.style.backgroundColor = "#fff";
    ans3.style.backgroundColor = "#fff";
    ans0.style.color = "blueviolet";
    ans1.style.color = "blueviolet";
    ans2.style.color = "blueviolet";
    ans3.style.color = "blueviolet";
}
// JS Timer 
function timer() {// duration in mins
    //totalSecondsToCountDown = duration * 60;
    // Update the totalSecondsToCountDown down every 1 second
    var x = setInterval(function () {
        // Time calculations for days, hours, minutes and seconds
        let minutes = Math.floor(totalSecondsToCountDown / 60);
        let seconds = totalSecondsToCountDown % 60;
        // Display the result in the element with id="timer"
        if (Number.isInteger(seconds) && Number.isInteger(minutes))
            document.getElementById("timer").innerHTML = minutes + 'm: ' + seconds + 's';
        totalSecondsToCountDown--;
        if (totalSecondsToCountDown == 7.5) { // just to check when to pause because it cannot become fraction naturally
            clearInterval(x);
            //finQuiz();
        }
        else if (totalSecondsToCountDown < 0) {
            clearInterval(x);
            finQuiz(1);
        }
    }, 1000);
}
function jumpToQuestion() {
    let jumpTo = document.getElementById('questionPallete').value;
    currrentQuestionIndex = jumpTo - 1;
    showQuestion();
}
function pauseResume() {
    if (document.getElementById('pause-resume').innerHTML == '||') {
        document.getElementById('pause-resume').innerHTML = '|>';
        document.getElementById('pause-resume').style.backgroundColor = 'black';
        document.getElementById('pause-resume').style.color = 'white';
        isPaused = true;
        lastNotedTimeLeft = totalSecondsToCountDown;
        totalSecondsToCountDown = 8.5;
    }
    else {
        document.getElementById('pause-resume').innerHTML = '||';
        document.getElementById('pause-resume').style.backgroundColor = 'white';
        document.getElementById('pause-resume').style.color = 'black';
        totalSecondsToCountDown = lastNotedTimeLeft;
        isPaused = false;
        timer();
    }
}
function sendByMail() {
    mailid = sessionStorage.getItem('mailID');
    msg=sessionStorage.getItem('msg');
    msg = msg.replace(/\n/g, '<br>');

    var xhr = new XMLHttpRequest();// Create a new XMLHttpRequest object
    xhr.open("POST", "http://localhost:3000/mail/");
    xhr.setRequestHeader('Content-Type', 'application/json');
    // Send the request to the server
    // Handle the response from the server
    xhr.onload = function () {
        if (xhr.status == 200) {
            // The request was successful
            console.log(xhr.responseText);
            alert(`Mail sent to ${mailid}`);
        } else {
            // The request failed
            console.log("Error: " + xhr.status);
        }
    };
    xhr.send(JSON.stringify({
        mailID: mailid,
        subject: `Report on Quiz: ${sessionStorage.getItem('topic')}`,
        message: msg
    }));


}
function markForLater() {
    const markButton = document.getElementById('mark');
    if (markButton.innerHTML == 'Mark') {
        const obj = 'jumpTo' + currrentQuestionIndex; // rflect change in question pallete
        document.getElementById(obj).style.backgroundColor = 'orange';
        //Reflect change in marked button
        markButton.style.backgroundColor = 'black';
        markButton.style.color = 'white';
        markButton.innerHTML = 'Unmark';
        questions[currrentQuestionIndex].isMarked = true;
    }
    else{
        const obj = 'jumpTo' + currrentQuestionIndex; // rflect change in question pallete
        document.getElementById(obj).style.backgroundColor = 'white';
        //Reflect change in marked button
        markButton.style.backgroundColor = 'white';
        markButton.style.color = 'black';
        markButton.innerHTML = 'Mark';
        questions[currrentQuestionIndex].isMarked = false;
    }

}
function guide() {
    alert('INSTRUCTIONS: In the question pallete:\nOrange: marked for later\nGreen: attempted\nYou cannot navigate the quiz when it is paused.\nQuiz will end automatically when timer ends');
}
function main() {
    let dummy = (sessionStorage.getItem('playQuiz'))
    if (dummy == 1) buildQuestions(); //--------------------> start this page by begining to build questions Array
    else finQuiz(0)
}
main();
