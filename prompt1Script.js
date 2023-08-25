function callLexServer() {
  spinner();
  const topic = document.getElementById('topic').value;
  const noqs = document.getElementById('noqs').value;
  const grd = document.getElementById('grd').value;
  const time = document.getElementById('time').value;
  let prompt = noqs + ' MCQs with 4 options on ' + topic + ' std.' + grd + ' with answers only and no solutions';
  const value = prompt;

  sessionStorage.setItem('time',time); //:::::::::::::::::::::::::: duration of quiz added to session data
  sessionStorage.setItem('noqs',noqs);//:::::::::::::::::::::::::: number of questions added to session data
  sessionStorage.setItem('topic',topic);//:::::::::::::::::::::::::: topic of quiz added to session data
  sessionStorage.setItem('playQuiz',1);//::::::::::::::::::::::::: whether to play the quiz or not
  sessionStorage.setItem('mailID',sessionStorage.getItem('mailID'));
  if (value) {
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set the request method and URL
    xhr.open('POST', 'http://localhost:3000/answer');
    // Set the request header to indicate JSON data
    xhr.setRequestHeader('Content-Type', 'application/json');


    // Set the response type to text
    xhr.responseType = 'text';

    // Set the onload function to handle the response
    xhr.onload = () => {
      // If the status is OK, display the response in the result div
      if (xhr.status === 200) {
        let quiz = xhr.response;
        console.log(quiz);
        sessionStorage.setItem('fetchedQuiz', quiz) //----------------> quiz added to session data
        window.location.href = 'quizPage.html'
      } else {
        // Otherwise, display an error message
        result.textContent = 'Something went wrong.';
      }
    };

    // Send the request
    // Send the request with a JSON object
    xhr.send(JSON.stringify({ prompt: value }));

  } else {
    // Otherwise, display a message to enter a prompt
    result.textContent = 'Please enter a prompt.';
  }
  //setTimeout(()=>{window.location.href = 'quizPage.html'},5000)
};

function spinner(){ // spins while quiz is fetched
  let spinner=document.getElementById('spinner');
  spinner.style.display='flex';
}
