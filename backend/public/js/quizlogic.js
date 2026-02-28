const questions = {
  // ---- Q1 ----
  q1: {
    text: "When did your symptoms start?",
    options: {
      A: { text: "Within the last 24 hours", next: "q2a" },
      B: { text: "Within the last 3 days", next: "q2b" },
      C: { text: "Within the last 1 week", next: "q2c" },
      D: { text: "More than 1 week ago", next: "q2d" }
    }
  },

  // ---- Q2 ----
  q2a: {
    text: "Do you currently have fever?",
    options: {
      A: { text: "Yes, high", next: "q3a" },
      B: { text: "Yes, mild", next: "q3b" },
      C: { text: "No", next: "q3c" },
      D: { text: "Not sure", next: "q3d" }
    }
  },
  q2b: {
    text: "Do you have sore throat or difficulty swallowing?",
    options: {
      A: { text: "Yes, severe", next: "q3a" },
      B: { text: "Yes, mild", next: "q3b" },
      C: { text: "No", next: "q3c" },
      D: { text: "Occasional", next: "q3d" }
    }
  },
  q2c: {
    text: "Do you have a runny or blocked nose?",
    options: {
      A: { text: "Yes, severe", next: "q3a" },
      B: { text: "Yes, mild", next: "q3b" },
      C: { text: "No", next: "q3c" },
      D: { text: "Sometimes", next: "q3d" }
    }
  },
  q2d: {
    text: "Do you feel muscle or joint pain?",
    options: {
      A: { text: "Yes, severe", next: "q3a" },
      B: { text: "Yes, mild", next: "q3b" },
      C: { text: "No", next: "q3c" },
      D: { text: "Comes and goes", next: "q3d" }
    }
  },

  // ---- Q3 ----
  q3a: {
    text: "Have you experienced loss of taste or smell?",
    options: {
      A: { text: "Yes, complete", next: "q4a" },
      B: { text: "Yes, partial", next: "q4b" },
      C: { text: "No", next: "q4c" },
      D: { text: "Not sure", next: "q4d" }
    }
  },
  q3b: {
    text: "Do you have a persistent cough?",
    options: {
      A: { text: "Yes, dry cough", next: "q4a" },
      B: { text: "Yes, wet cough", next: "q4b" },
      C: { text: "No", next: "q4c" },
      D: { text: "Occasional", next: "q4d" }
    }
  },
  q3c: {
    text: "Do you have swelling in lymph nodes?",
    options: {
      A: { text: "Yes, noticeable", next: "q4a" },
      B: { text: "Yes, mild", next: "q4b" },
      C: { text: "No", next: "q4c" },
      D: { text: "Not sure", next: "q4d" }
    }
  },
  q3d: {
    text: "Do you have red or itchy eyes (conjunctivitis)?",
    options: {
      A: { text: "Yes, both eyes", next: "q4a" },
      B: { text: "Yes, one eye", next: "q4b" },
      C: { text: "No", next: "q4c" },
      D: { text: "Occasional", next: "q4d" }
    }
  },

  // ---- Q4 ----
  q4a: {
    text: "Do you have abdominal pain or discomfort?",
    options: {
      A: { text: "Yes, severe", next: "q5a" },
      B: { text: "Yes, mild", next: "q5b" },
      C: { text: "No", next: "q5c" },
      D: { text: "Sometimes", next: "q5d" }
    }
  },
  q4b: {
    text: "Have you experienced vomiting or nausea with fever?",
    options: {
      A: { text: "Yes, frequent", next: "q5a" },
      B: { text: "Yes, occasional", next: "q5b" },
      C: { text: "No", next: "q5c" },
      D: { text: "Not sure", next: "q5d" }
    }
  },
  q4c: {
    text: "Do you have diarrhea or dehydration?",
    options: {
      A: { text: "Yes, severe", next: "q5a" },
      B: { text: "Yes, mild", next: "q5b" },
      C: { text: "No", next: "q5c" },
      D: { text: "Not sure", next: "q5d" }
    }
  },
  q4d: {
    text: "Have you experienced sudden weight loss or loss of appetite?",
    options: {
      A: { text: "Yes, significant", next: "q5a" },
      B: { text: "Yes, mild", next: "q5b" },
      C: { text: "No", next: "q5c" },
      D: { text: "Not sure", next: "q5d" }
    }
  },

  // ---- Q5 ----
  q5a: {
    text: "Do you have mouth ulcers or blisters?",
    options: {
      A: { text: "Yes, multiple", next: "q6a" },
      B: { text: "Yes, few", next: "q6b" },
      C: { text: "No", next: "q6c" },
      D: { text: "Not sure", next: "q6d" }
    }
  },
  q5b: {
    text: "Have you noticed skin rashes spreading?",
    options: {
      A: { text: "Yes, widespread", next: "q6a" },
      B: { text: "Yes, mild", next: "q6b" },
      C: { text: "No", next: "q6c" },
      D: { text: "Not sure", next: "q6d" }
    }
  },
  q5c: {
    text: "Have you had unusual bleeding (nose/gums/skin spots)?",
    options: {
      A: { text: "Yes, severe", next: "q6a" },
      B: { text: "Yes, mild", next: "q6b" },
      C: { text: "No", next: "q6c" },
      D: { text: "Not sure", next: "q6d" }
    }
  },
  q5d: {
    text: "Do you have yellowing of eyes/skin (jaundice)?",
    options: {
      A: { text: "Yes, visible", next: "q6a" },
      B: { text: "Slight yellowing", next: "q6b" },
      C: { text: "No", next: "q6c" },
      D: { text: "Not sure", next: "q6d" }
    }
  },

  // ---- Q6 ----
  q6a: {
    text: "Do you feel extreme tiredness or chronic fatigue?",
    options: {
      A: { text: "Yes, severe", next: "q7a" },
      B: { text: "Yes, moderate", next: "q7b" },
      C: { text: "No", next: "q7c" },
      D: { text: "Not sure", next: "q7d" }
    }
  },
  q6b: {
    text: "Do you have difficulty breathing or shortness of breath?",
    options: {
      A: { text: "Yes, severe", next: "q7a" },
      B: { text: "Yes, mild", next: "q7b" },
      C: { text: "No", next: "q7c" },
      D: { text: "Sometimes", next: "q7d" }
    }
  },
  q6c: {
    text: "Do you have stiff neck or light sensitivity?",
    options: {
      A: { text: "Yes, severe", next: "q7a" },
      B: { text: "Yes, mild", next: "q7b" },
      C: { text: "No", next: "q7c" },
      D: { text: "Not sure", next: "q7d" }
    }
  },
  q6d: {
    text: "Do you have confusion or memory issues?",
    options: {
      A: { text: "Yes, severe", next: "q7a" },
      B: { text: "Yes, mild", next: "q7b" },
      C: { text: "No", next: "q7c" },
      D: { text: "Sometimes", next: "q7d" }
    }
  },

  // ---- Q7 ----
  q7a: {
    text: "Do you have prolonged high fever (5+ days)?",
    options: {
      A: { text: "Yes", next: "q8a" },
      B: { text: "No", next: "q8b" },
      C: { text: "Not sure", next: "q8c" },
      D: { text: "Off and on", next: "q8d" }
    }
  },
  q7b: {
    text: "Do you experience chills with headache?",
    options: {
      A: { text: "Yes, frequent", next: "q8a" },
      B: { text: "Yes, occasional", next: "q8b" },
      C: { text: "No", next: "q8c" },
      D: { text: "Not sure", next: "q8d" }
    }
  },
  q7c: {
    text: "Have you had nosebleeds or unusual bruising?",
    options: {
      A: { text: "Yes, frequent", next: "q8a" },
      B: { text: "Yes, rare", next: "q8b" },
      C: { text: "No", next: "q8c" },
      D: { text: "Not sure", next: "q8d" }
    }
  },
  q7d: {
    text: "Have you had seizures or fainting episodes?",
    options: {
      A: { text: "Yes, multiple", next: "q8a" },
      B: { text: "Yes, once", next: "q8b" },
      C: { text: "No", next: "q8c" },
      D: { text: "Not sure", next: "q8d" }
    }
  },

  // ---- Q8 ----
  q8a: {
    text: "Have you recently traveled to outbreak-prone areas?",
    options: {
      A: { text: "Yes, last 2 weeks", next: "q9a" },
      B: { text: "Yes, longer ago", next: "q9b" },
      C: { text: "No", next: "q9c" },
      D: { text: "Not sure", next: "q9d" }
    }
  },
  q8b: {
    text: "Have you been bitten by mosquitoes/ticks recently?",
    options: {
      A: { text: "Yes, multiple bites", next: "q9a" },
      B: { text: "Yes, few bites", next: "q9b" },
      C: { text: "No", next: "q9c" },
      D: { text: "Not sure", next: "q9d" }
    }
  },
  q8c: {
    text: "Do you live/work in crowded places (school/office/hostel)?",
    options: {
      A: { text: "Yes, daily", next: "q9a" },
      B: { text: "Sometimes", next: "q9b" },
      C: { text: "Rarely", next: "q9c" },
      D: { text: "No", next: "q9d" }
    }
  },
  q8d: {
    text: "Have you had close contact with an infected person?",
    options: {
      A: { text: "Yes, close contact", next: "q9a" },
      B: { text: "Yes, distant contact", next: "q9b" },
      C: { text: "No", next: "q9c" },
      D: { text: "Not sure", next: "q9d" }
    }
  },

  // ---- Q9 ----
  q9a: {
    text: "Are you up to date with vaccinations?",
    options: {
      A: { text: "Yes, all", next: "q10a" },
      B: { text: "Some only", next: "q10b" },
      C: { text: "No", next: "q10c" },
      D: { text: "Not sure", next: "q10d" }
    }
  },
  q9b: {
    text: "Do you experience severe dehydration (very little urine, extreme thirst)?",
    options: {
      A: { text: "Yes, severe", next: "q10a" },
      B: { text: "Yes, mild", next: "q10b" },
      C: { text: "No", next: "q10c" },
      D: { text: "Not sure", next: "q10d" }
    }
  },
  q9c: {
    text: "Do you have coughing with blood?",
    options: {
      A: { text: "Yes, frequent", next: "q10a" },
      B: { text: "Yes, rare", next: "q10b" },
      C: { text: "No", next: "q10c" },
      D: { text: "Not sure", next: "q10d" }
    }
  },
  q9d: {
    text: "Do you have frequent headaches with dizziness?",
    options: {
      A: { text: "Yes, frequent", next: "q10a" },
      B: { text: "Yes, occasional", next: "q10b" },
      C: { text: "No", next: "q10c" },
      D: { text: "Not sure", next: "q10d" }
    }
  },

  // ---- Q10 (final) ----
  q10a: {
    text: "Do you have rash with fever (like measles or dengue)?",
    options: {
      A: { text: "Yes", next: "result" },
      B: { text: "No", next: "result" },
      C: { text: "Not sure", next: "result" },
      D: { text: "Mild", next: "result" }
    }
  },
  q10b: {
    text: "Do you have stomach pain with vomiting and diarrhea?",
    options: {
      A: { text: "Yes", next: "result" },
      B: { text: "No", next: "result" },
      C: { text: "Not sure", next: "result" },
      D: { text: "Occasional", next: "result" }
    }
  },
  q10c: {
    text: "Do you experience chest pain with breathing difficulty?",
    options: {
      A: { text: "Yes", next: "result" },
      B: { text: "No", next: "result" },
      C: { text: "Not sure", next: "result" },
      D: { text: "Sometimes", next: "result" }
    }
  },
  q10d: {
    text: "Have you been hospitalized for similar illness before?",
    options: {
      A: { text: "Yes", next: "result" },
      B: { text: "No", next: "result" },
      C: { text: "Not sure", next: "result" },
      D: { text: "Prefer not to say", next: "result" }
    }
  }
};
