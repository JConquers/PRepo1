/* server that takes  prompt from a post request and sends relevant response using openAI API*/ 
/* also mail sender*/

const express = require('express');
const openai = require('openai');
const nodemailer=require('nodemailer');

const app = express();
// Use the built-in middleware to parse JSON data
app.use(express.json());

app.use((req, res, next) => { //---------------------------------------> dealing with the no 'Acess-control-allow-origin in header' error in browser'
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// creating configuration for openai object
const config=new openai.Configuration({
  organization:'Lex-organiozation-id',
  apiKey:'api-key' // Samsung/M51-k2
});


const client = new openai.OpenAIApi(config); //OpenAI client

// route that handles POST requests to the /answer path
app.post('/answer', async (req, res) => {
  // Get the prompt from the request body
  const prompt = req.body.prompt;

  // If the prompt is provided, send a request to the OpenAI API
  if (prompt) {
    try {
      const response = await client.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

      // Get the text from the response
      const text = response.data.choices[0].message.content;
      res.send(text);
    } catch (error) {
      // Handle any errors from the OpenAI API
      console.error(error);
      res.status(500).send('Something went wrong.');
    }
  } else {
    // Otherwise, send a default message
    res.send('Please provide a prompt in the request body.');
  }
});

app.post('/mail',async(req,res)=>{
  // First, define send settings by creating a new transporter: 
  let mailID=req.body.mailID;
  let subject=req.body.subject;
  let message=req.body.message;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.domain.com), here I've written gmail's
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "xyz@gmail.com", // Lexicon email address. Values here won't work, these are just dummy values
      pass: "abc123", // Password (for gmail, use app password). Values here won't work, these are just dummy values
      // For better security, use environment variables set on the server for these values when deploying
    },
  });
  sendMail(transporter, mailID, subject, message);
  res.send('done dana done')
})
async function sendMail(transporter, mailID, subject, message){
  let info = await transporter.sendMail({
    from: 'xyzg@gmail.com',
    to: mailID,
    subject: subject,
    html: `
    <p>${message}</p>
    `,
  });
  console.log(info.messageId); // Random ID generated after successful send (optional)
}
/*app.get('/answer',(req,res)=>{
  res.send('Just to check working of server')
})*/
  
  app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
