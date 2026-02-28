// Developed by [Tarique Khan]
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("result");




let questionPath = [];
let answers = [];

function askQuestion(id) {
  const question = questions[id];
  if (!question) {
    submitToAI();
    return;
  }

  questionPath.push(id);
  quizBox.innerHTML = `
    <div class="question"><strong>Question ${questionPath.length}:</strong><br>${question.text}</div>
    <div class="options">
      ${Object.entries(question.options).map(([key, opt]) =>
        `<div class="option" onclick="chooseOption('${key}', '${opt.next}')">${key}) ${opt.text}</div>`
      ).join("")}
    </div>
  `;
}


function chooseOption(choice, nextId) {
  const currentQ = questions[questionPath[questionPath.length - 1]];
  answers.push({ question: currentQ.text, answer: currentQ.options[choice].text });


  if (questionPath.length >= 10 || !nextId) {
    submitToAI();
  } else {
    askQuestion(nextId);
  }
}

async function submitToAI() {
  quizBox.innerHTML = "<div>Analyzing your answers...</div>";
  const messages = [
    {
  role: "system",
  content: "You are a medical diagnostic bot. Based on the quiz answers, provide the possible illness with an estimated likelihood (in percentage) and concise next steps in 2–3 lines. Do not explain reasoning or list symptoms. Keep the answer short and actionable."
}
,
    {
      role: "user",
      content: answers.map((q, i) => `Q${i + 1}: ${q.question} \nA: ${q.answer}`).join("\n")
    }
  ];

  try {
    const response = await fetch("/api/medicalquiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    // Remove [1][2][3] style references
    const cleanedReply = data.reply
  .replace(/\[\d+\]/g, "")
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");


    resultBox.innerHTML = cleanedReply.replace(
      "Click here to view medical guidance.",
      `<a class="res" href="medicalguidance.html">Click here to view medical guidance.</a>`
    );

    quizBox.style.display = "none"; 
  } catch (error) {
    console.error(error);  // log full error to browser console
    resultBox.innerHTML = "<div style='color:red;'>Error getting results. Check console.</div>";
}

}


// Start the quiz
askQuestion("q1");
