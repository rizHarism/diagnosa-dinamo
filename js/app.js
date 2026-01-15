import gejala from "../data/gejala.json" with { type: "json" };
import kerusakan from "../data/kerusakan.json" with { type: "json" };
import rules from "../data/rules.json" with { type: "json" };

class DinamoDiagnosis {
  constructor() {
    this.gejala = gejala;
    this.kerusakan = kerusakan;
    this.rules = rules;
  }

  diagnose(facts) {
    const conclusions = new Set();

    this.rules.forEach((rule) => {
      const conditionsMet = rule.conditions.every((condition) => {
        if (typeof condition === "object" && condition.not) {
          return !facts.includes(condition.not);
        }
        return facts.includes(condition);
      });

      if (conditionsMet) {
        conclusions.add(rule.conclusion);
      }
    });

    return Array.from(conclusions).map((code) => this.kerusakan[code]);
  }

  getGejalaList() {
    return Object.entries(this.gejala).map(([code, desc]) => ({
      code,
      desc,
    }));
  }
}

// UI Setup
const diagnosisSystem = new DinamoDiagnosis();

function setupSymptomsCheckboxes() {
  const symptomsList = document.getElementById("symptomsList");
  symptomsList.innerHTML = diagnosisSystem
    .getGejalaList()
    .map(
      (symptom) => `
            <label class="symptom-checkbox">
                <input type="checkbox" value="${symptom.code}">
                ${symptom.desc}
            </label>
        `
    )
    .join("");
}

function getSelectedSymptoms() {
  const checkboxes = document.querySelectorAll(
    '#symptomsList input[type="checkbox"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

function displayResults(results) {
  const resultsDiv = document.getElementById("diagnosisResults");
  resultsDiv.innerHTML =
    results.length > 0
      ? results.map((res) => `<div class="result-item">${res}</div>`).join("")
      : "<div>Tidak ditemukan masalah yang spesifik</div>";
}

document.getElementById("diagnoseBtn").addEventListener("click", () => {
  const selectedSymptoms = getSelectedSymptoms();
  const results = diagnosisSystem.diagnose(selectedSymptoms);
  displayResults(results);
});

// Initialize
setupSymptomsCheckboxes();
