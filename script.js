const symptomInput = document.getElementById("symptom-input");
const checkBtn = document.getElementById("check-btn");
const resultsDiv = document.getElementById("results");
const historyList = document.getElementById("history-list");
const feedbackButtons = document.querySelectorAll("[data-feedback]");

let searchHistory = [];

checkBtn.addEventListener("click", async () => {
  const symptoms = symptomInput.value.trim();
  if (!symptoms) return;

  // Save to search history
  searchHistory.unshift(symptoms);
  updateHistory();

  try {
    const response = await fetch("/check-symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms })
    });

    const data = await response.json();

    resultsDiv.innerHTML = `
      <p><strong>AI Suggestion:</strong> ${data.llmResponse}</p>
      ${
        data.internalMatch
          ? `<p><strong>Internal Match:</strong> ${data.internalMatch.condition} (Severity: ${data.internalMatch.severity})</p>`
          : `<p>No exact internal match found.</p>`
      }
    `;
  } catch (error) {
    resultsDiv.innerHTML = `<p style="color:red;">Error checking symptoms.</p>`;
  }
});

function updateHistory() {
  historyList.innerHTML = "";
  searchHistory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}
//feedback button handler
feedbackButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert(`Thanks for your feedback: ${btn.dataset.feedback}`);
  });
});
