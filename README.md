Problem Statement:

Often we have seen how a student who needs to prepare for a test has to go through the struggle of finding good questions to practice, questions outside of the regular textbooks. Even if he finds them, the labour of manually checking the answers and relying upon one’s honesty while attempting them (which is great if works for him) cannot be ignored. Lexicon brings a great solution to this. User simply needs to enter the topic he wants to practice, number of questions he is willing to practice, the time duration if he wants to practice time bound, and simply click on generate quiz. The webpage will fetch a 4-options based MCQ quiz from Lex-Server and display it in an interactive form, with the ability to mark questions for review, viewing one question at a time, pausing the quiz if needed, question palette to jump to desired question when number of questions is more and many such features. When quiz is finished, the user can see the number of questions he attempted, number of questions he answered correctly, his accuracy, the time he took. Well this is not the end, he will also get an option of downloading the question paper/script and another option to revisit the quiz to see the difference between correct answers and his choices. Also on click of a button in the same page he can mail the report to himself. If you have read till here, it’s my keen request to please read the project goal at the end.

Technologies used:

HTML, CSS and Javascript (Apart from the one that runs in browser, it also makes use of Express and Nodemailer frameworks in Node js), OpenAI API resources.

Technical details:

There are several files in this repo. Here I shall explain them stepwise. Take a look at this picture:

![20230826_151209](https://github.com/JConquers/PRepo1/assets/112703837/3eb5989d-df7b-452b-8cb0-2ac47e47da48)

The above picture gives a good idea of the control flow through this project. In prompt0.html, user enters his name and email id. Going on to next page i.e. prompt1.html, user enters his topic, number of questions, grade and time. Clicking on ‘generate quiz’ button, a spinner starts on the same page while the quiz is being fetched from Lex-Server.cjs with a POST request that contains a prompt. Once the quiz is fetched in form of a string, the quiz along with topic, time, grade, no. of questions and email ID is passed into the session storage and control is directed to the next page quizPage.html which has the following layout:

![20230826_152723](https://github.com/JConquers/PRepo1/assets/112703837/c53731e1-615f-42ab-be32-68accc3ec625)

Buttons in the navigation bar and header are self-explanatory and their purpose can easily be inferred by those who have taken at least one interactive quiz in their life (so those who attempted JEE/NEET can understand it even in first glance :) ). When an option is selected, it becomes shaded. The user can finish the quiz anytime by clicking on finish quiz or it will end on its own once the timer ends. The layout will be formatted on the same page and in the question bar the user shall be able to see how many questions did he attempt, how many went correct, his accuracy, time taken. Also there are 2 buttons in the same section: Revisit answers and Download Script. On clicking the former the user shall be directed to a new page revisitQuiz.html where he can navigate through quiz just like before and see the distinction between his choice and correct answer (user’s choice is shown shaded and correct answer is shown with a green border). On clicking the later button, a copy of the question paper will be downloaded on user’s device for future references. Also the user can mail the report to himself by clicking on the mail icon

Question based process like keeping track of selected option, correct option, status of being marked/unmarked is handled by an array ‘questions’ where each item is an object containing, questions, answers (again an array of 4 items where each item is an object containing option label and correctness value), correct option, selected option and isMarked. This array is prepared from the quiz string retrieved from session storage.

LexServer.cjs, built using express framework runs on port 3000 and has two post methods, one at URL: …/answer and another at URL: …/mail. First one is used to fetch quiz using OpenAI’s API and second one uses nodemailer to send mail. app.post(‘/answer’…) works by using an already configured OpenAI object (configured using org. id and api key) and app.post(‘/mail’…) creates a node mailer transporter object (can be configured using org. mailId and app password) to send the mail.

Explainig the functions in quizPageScript.js:

Understanding the structre of questions[] is important. Every item in questions[] is an object.
object={
    "questions"=question text,
    "correctOption"=0-based index of correct option,
    "selectedOption"= 0-based index of selected option, -1 incase none is selected.
    "answers"=[
        {"text"=option label, "correct"=true/false},
        {"text"=option label, "correct"=true/false},
        {"text"=option label, "correct"=true/false},
        {"text"=option label, "correct"=true/false}
    ]
} 
I presume this to be a lot more complex to understand than others. Let us go in a sequence.
The quiz has been fetched and control is redirected to  quizPage.html from prompt1.html. Along with the quiz, the prompt1Script.js also passes a variable 'playQuiz' with a value 1, whose importance shall be shortly realised.

i. 'main()'is called inside quizPageScript.js. 

ii. playQuiz being set to 1, 'buildQuestions()' is called which initialises global variables and also initialises 'questions[]' array from the string 'quiz' and at last it invokes 'startQuiz()'.

iii. startQuiz() sets up the Header section in layout by setting up the topic, question pallete and timer.

iv. On click of any option, 'checkAnswer()' is called which matches the selected option with correct value and accordingly sets the attempt[], correct[] and selectedOption in questions[] for that question.

v. 'showQuiz()' displays the question text with options, keeping in mind which options and buttons have to be highlighted.

vi. 'resetOptions()' resets the state of buttons when user navigates to a new question.

vii. 'nxtQuestion()', 'prevQuestion()', 'clearOptions()', 'pauseResume()', 'mark()', etc all have their roles inferable from their names.

viii. 'finQuiz()' is invoked when timer runs out or user forcefully end squiz by clicking Finish Quiz. For the first time this function is invoked by passing 1 as parameter. On the line 1 of this function playQuiz in session storage is set to 0. Accuracy, time taken is computed and question paper is readied fro download in .txt format. Option to share report is also available of which only sharing by gmail is enabled as of now. User can also revisit the quiz, this time no timer shall be switched on.

ix. Now here comes the role of playQuiz. When the user is on 'revisitQuiz.html' and clicks the back option in browser's top bar, the control will go to quizScript.html and main() shall be invoked. Now the playQuiz is set to 0 so directly finQuiz() will be called and quiz would not be restarted again. 

Difficulties encountered:

I spent a lot of time figuring out how to run a node js file in browser. I was completely new and had no idea that a node js files cannot be run inside a browser; the javascript that runs in browser is different from node js in some aspects. Only thing I knew was ‘Node is for server side’, unaware of its implications I spent a lot of time trying to run node js file from html page. At last, with guidance of some great seniors, some online resources and tutorials I learned how to create a node js server and use AJAX to run it from within the browser.

Secondly, each time I tried to access LexServer.cjs it threw an error ‘Acess-Control-Allow-Origin: header absent’. Thanks to the Computer Networks course that we had recently, I could understand the meaning of such errors. After going through some online resources, I could finally correct that error.

Lastly, the struggles of understanding git as a beginner. A million thanks to all those amazing seniors and online resources/tutorial contributors who guided me through this project.

Project Goals:

Constrained by deadline; I could not take this project to what I had anticipated, but that doesn’t mean I leave hopes and stop making efforts. Here is what I am trying to take it to: User oriented-account based service where user creates his account wherein he specifies his mailID, twitter and instagram handles (obviously optional) and other such things. This explains the existence of buttons on prompt0.html which are inactive right now like 'Login','Signup',etc. Next time the user logs in to his account he would be able to see his past quizzes and progress. Another feature I want to add is that user can specify his exam dates in advance, then based on the topic Lexicon will create and schedule a set of quizzes based on that topic and as per the schedule the user will receive a reminder mail one day prior to the quizzes. This way the user can prepare better for his exams. Another thing I am working on is to find efficient algorithms to create the ‘questions’ array by parsing the quiz string so that question text, answer options and correct answer can be segregated regardless of the format in which quiz is received. Currently it is using gpt-3/3.5 model of OpenAI whose results are sometimes inconsistent with the standard of questions. This can be solved by using gpt-4 or as OpenAI improves its models.
   	
