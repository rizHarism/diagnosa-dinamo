async function loadData() {
  try {
    // Load gejala data
    const gejalaResponse = await fetch("../data/gejala.json");
    const gejalaData = await gejalaResponse.json();

    // Load kerusakan data
    const kerusakanResponse = await fetch("../data/kerusakan.json");
    const kerusakanData = await kerusakanResponse.json();

    renderLists(gejalaData, kerusakanData);
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Gagal memuat data. Silakan coba lagi.");
  }
}

function renderLists(gejala, kerusakan) {
  const gejalaList = document.getElementById("symptoms-list");
  const kerusakanList = document.getElementById("damages-list");

  // Render gejala
  for (const [id, description] of Object.entries(gejala)) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="list-id">${id}</span>
      <span class="list-desc">${description}</span>
    `;
    gejalaList.appendChild(li);
  }

  // Render kerusakan
  for (const [id, description] of Object.entries(kerusakan)) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="list-id">${id}</span>
      <span class="list-desc">${description}</span>
    `;
    kerusakanList.appendChild(li);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", loadData);
