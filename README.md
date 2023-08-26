Problem Statement:

	Often we have seen how a student who needs to  prepare for a test has to  go through the atruggle of finding good questions to pratice, questions outside of the regular textbooks.
	Even if he finds then the labour of manually checking the answers and relying upon one's honesty while attempting them (which is great if works for him) cannot be ignored. Lexicon 
	brings a great solution to this. User simply needs to enter the topic he wants to practice, number of questions he is willing to practice, the time duration if he wants to 
	practice time bound, and simply click on generate quiz. The webpage will fetch a 4-options based MCQ quiz from Lex-Server and display it in an interactive form, will the ability to mark questions for 
	review, viewing one question at a time, pausing the quiz if needed, question pallete to jump to desired question when number of questions is more and many such features. When quiz is 
	finished, the user can see the number of questions he attempted, number of questions he answered correctly, his accuracy, the time he took. Well this is not the end, he will also get
        an option of downloading the question paper/script and another option to revisit the quizt to see the difference between correct answers and his choices. Also on click of a button in the
        same page he can mail the report to himself. If yoou have read till here, its my keen request to please read the project goal the the end.

Technologies used:

        HTML, CSS and Javascipt (Apart from the one that runs in browser, it also makes use of Express and Nodemailer frameworks in Node js), OpenAI API resources.

Technical details:

        There several files in this repo. Here I shall explain them stepwise. Take a look at this picture:
	
	![20230826_151209](https://github.com/JConquers/PRepo1/assets/112703837/8ee547e3-6e5e-4389-a7ef-1b110e54b23b)

        The above picture gives a good idea of the control flow through this project. In prompt0.html, user enters his name and email id. Going on to next page i.e. prompt1.html, user enters his topic
	no.  of  questions, grade and time. Clicking on 'generate quiz' button, a spinner starts on the same page while the quiz is being fetched from LexServer.cjs with a POST request that contains a 
 	prompt. Once the quiz is fetched in form of a string, the quiz along with topic, time, grade, no. of questions and email ID is passed into the session storage and control is directedc to the next
  	page quizPage.html which ha sthe following layout:

    	![20230826_152723](https://github.com/JConquers/PRepo1/assets/112703837/181bef87-be34-4378-9b72-e45198d96161)

	Buttons in the navigation bar and header are self-explanatory and their purpose can easily be inferred by those who have taken atleast one interactive quiz in their life (so those who attempted
    	JEE/NEEt can understand it even in first glance :) ). When an option is selected, it is becomes shaded. The user can finish the quiz anytime by clicking on finish quiz or the quiz will end  on 
     	its own once the timer ends. The layout will be formatted on the same page and in the question bar the user shall be able to see how many questions did he attempt, how many went correct, his 
      	accuracy, time taken. Also there are 2 buttons in the same section: Revisit answers and Download Script. On clicking the former the user shall be directed to a new page revisitQuiz.html where
	he can navigate through quiz just like before and see the distinction between his choice and correct answer(user's choice is shown shaded and correct answer is shown with a green border). On
 	clicking the later button, a copy of the question paper will be downloaded on user's device for future refererences. Also the user can mail the report to himself by clicking on the mail icon.

   	Question based process like keeping track of selected option, correct option, status of being marked/unmarked is handled by an array 'questions' where each item is an object containing, questions,
    	answers(again an array of 4 items where each item is an object containing option label and correctness value), correct option, selected option and  isMarked.This array is prepared from the quiz
     	string retrived from session storage.

      	LexServer.cjs, built using express framework runs on port 3000 and has two post methods, one at URL: ...../answer and another at URL: ...../mail. First one is used to fetch quiz using OpenAI's
       	API and second one uses nodemailer to send mail. app.post('/answer'...) works by using an already configured OpenAI object (configured using org. id and api key) and  app.post('/mail'...) creates
	a node mailer transporter object (can be configured using org. mailId and app password)  to send the mail. 

 Difficulties encountered:

  	I spent a lot of time figuring out how to run a node js file in browser. I was completely new and had no idea that a node js filees cannot be run inside a browser; the javascript that runs in browser
   	is different from node js in some aspects. Only thing i knew was 'Node is for server side', unaware of its implications I spent a lot of time trying to run node js file from  html page. At last, 
    	with guidance of some great seniors, some online resources adnd tutorials I learned how to create a node js server and use AJAX to run it fron within the browser.

     	Secondly, each time I tried to access LexServer.cjsit threw an error 'Acess-Control-Allow-Origin: header absent'. Thanks to the Computer Networks couse that we had recently, I could understand 
      	the meaning of such errors. After going though some online resouces, I could finally correct that error.

       	Lastly, the struggles of understanding git as a beginer. A million thanks to all those amazing seniors and online resources/tutorial contributors who guided me through this project.

Project Goals:

	Constrained by deadline; I could not take this project to what I had anticipated, but that doesn't mean I  leave hopes and stop making efforts. Here is what I am trying to take it to:
 	User oriented-account based service where user creates his account wherein he specifies his mailID, twitter and instagram handles (obviously optional) and other such things. Next time the user logs in
  	to his account he would be able to see his past quizes and progress. Another fetaure I want to add is that user can specify his exam dates in advance, then based on the topic Lexicon will create and 		schedule a set of quizes based on that topic and as per the schedule the user will receive a reminder mail one day prior to the quizes. This way the user can prepare better for his exams.
   	Another thing I am working on is to find efficient algorithms to create the 'questions' array by parsing the quiz string because at present it is not able to handle those cases when a code snippet needs 
    	to be displayed.
     	Currently it is using gpt-3/3.5 model if OpenAI whose results are sometimes inconsitent with the standard of questions. This can be solved by using gpt-4 or as OpenAI improves its models. 

   	
