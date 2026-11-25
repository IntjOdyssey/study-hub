document.addEventListener("DOMContentLoaded", () => {
  const subjects = [
    // Fall
    { name: "Public Finance", term: "Fall", status: "In Progress", start: "2026-09-01", end: "2027-01-16" },
    { name: "Islamic Economics", term: "Fall", status: "In Progress", start: "2026-09-01", end: "2027-01-16" },
    { name: "Dynamic Optimization", term: "Fall", status: "In Progress", start: "2026-09-01", end: "2027-01-16" },
    { name: "Monetary Economics", term: "Fall", status: "In Progress", start: "2026-09-01", end: "2027-01-16" },
    { name: "Mathematical Economics", term: "Fall", status: "Not Started" },
    { name: "Comparative Economic Systems", term: "Fall", status: "Not Started" },
    { name: "Microeconomic Analysis", term: "Fall", status: "Not Started" },
    // Spring
    { name: "INTERNATIONAL ECONOMICS", term: "Spring", status: "Complete", start: "2026-02-03", end: "2026-05-22" },
    { name: "LABOUR ECONOMICS", term: "Spring", status: "Complete", start: "2026-02-03", end: "2026-05-22" },
    { name: "ENVIRONMENTAL ECONOMICS", term: "Spring", status: "Complete", start: "2026-02-03", end: "2026-05-22" },
  ];

  // ---- Render subject cards ----
  function badgeClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }

  function renderSubjects(term, targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
    subjects.filter(s => s.term === term).forEach(s => {
      const card = document.createElement("div");
      card.className = "subject-card";
      let dates = "";
      if (s.start && s.end) {
        dates = `<div class="dates">${s.start} → ${s.end}</div>`;
      }
      card.innerHTML = `
        <div class="name">${s.name}</div>
        <span class="badge ${badgeClass(s.status)}">${s.status}</span>
        ${dates}
      `;
      container.appendChild(card);
    });
  }

  renderSubjects("Fall", "fall-list");
  renderSubjects("Spring", "spring-list");

  // ---- Charts ----
  const chartColors = {
    "In Progress": "#f5c542",
    "Complete": "#4caf7d",
    "Not Started": "#c4c4c4",
  };

  function countStatus(list) {
    const counts = { "In Progress": 0, "Complete": 0, "Not Started": 0 };
    list.forEach(s => counts[s.status]++);
    return counts;
  }

  // Chart 1: all courses
  const allCounts = countStatus(subjects);
  new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(allCounts),
      datasets: [{
        data: Object.values(allCounts),
        backgroundColor: Object.keys(allCounts).map(k => chartColors[k]),
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    },
  });

  // Chart 2: Fall only
  const fallCounts = countStatus(subjects.filter(s => s.term === "Fall"));
  new Chart(document.getElementById("fallChart"), {
    type: "bar",
    data: {
      labels: Object.keys(fallCounts),
      datasets: [{
        label: "Courses",
        data: Object.values(fallCounts),
        backgroundColor: Object.keys(fallCounts).map(k => chartColors[k]),
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    },
  });
});
