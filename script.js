let problems = JSON.parse(localStorage.getItem("problems")) || [];



const form = document.getElementById("problemForm");
const list = document.getElementById("problemList");
const weakDiv = document.getElementById("weakAreas");

const patterns = [
    "Sliding Window",
    "Two Pointers",
    "Binary Search",
    "Recursion",
    "Backtracking",
    "Greedy",
    "DP",
    "Graph",
    "Tree",
    "Heap",
    "Trie",
    "Stack",
    "Queue",
    "Bit Manipulation",
    "Math",
    "Linked List",
    "Prefix Sum",
    "Monotonic Stack",
    "String",
    "Hash Table"
];


function saveData() {
    localStorage.setItem("problems", JSON.stringify(problems));
}

function renderProblems() {
    list.innerHTML = "";

     const selected = document.getElementById("filterPattern").value;

    problems.forEach((p, index) => {
        if (selected !== "All" && p.pattern !== selected) return;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.title}</td>
            <td>${p.pattern}</td>
            <td><span class="badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span></td>
            <td><button onclick="deleteProblem(${index})">X</button></td>
        `;
        list.appendChild(row);
    });
     document.getElementById("totalCount").innerText = problems.length;
    updateStats();
}
document.getElementById("filterPattern").addEventListener("change", renderProblems);



function deleteProblem(index) {
    problems.splice(index, 1);
    saveData();
    renderProblems();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const pattern = document.getElementById("pattern").value;
    const difficulty = document.getElementById("difficulty").value;

    problems.push({ title, pattern, difficulty });

    saveData();
    renderProblems();
    form.reset();
});

function updateStats() {
    let mastery = {};
    let weak = [];

    patterns.forEach(p => mastery[p] = 0);

    problems.forEach(p => {
        let weight = 1;
        if (p.difficulty === "Medium") weight = 2;
        if (p.difficulty === "Hard") weight = 3;
        mastery[p.pattern] += weight;
    });

    patterns.forEach(p => {
        const target = 30; 
        mastery[p] = Math.min((mastery[p] / target) * 100, 100);
        if (mastery[p] < 40 && mastery[p] > 0 ) weak.push(p);
    });

    renderChart(mastery);

    weakDiv.innerHTML = weak.length > 0 
        ? "⚠ Improve: " + weak.join(", ")
        : "Great job! No weak areas.";

    const achievements = document.getElementById("achievements");
    let badges = [];

    if (problems.length >= 10) badges.push("🔥 10 Problems Solved");
    if (problems.length >= 50) badges.push("🚀 50 Problems Milestone");
    if (problems.length >= 100) badges.push("🏆 100 Problems Master");

    achievements.innerHTML = badges.length
        ? badges.join(" | ")
        : "Start solving to earn achievements!";
}

function populatePatterns() {
    const patternSelect = document.getElementById("pattern");
    const filterSelect = document.getElementById("filterPattern");

    patterns.forEach(p => {
        const option1 = document.createElement("option");
        option1.value = p;
        option1.textContent = p;
        patternSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = p;
        option2.textContent = p;
        filterSelect.appendChild(option2);
    });
}


let chart;
function renderChart(data) {
    const ctx = document.getElementById("patternChart").getContext("2d");

    if (chart) chart.destroy();

   
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#ff7eb3");
    gradient.addColorStop(1, "#667eea");

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Mastery %',
                data: Object.values(data),
                backgroundColor: gradient,
                borderRadius: 10,
                barThickness: 25
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white",
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "#222",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    borderColor: "#ff7eb3",
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "white",
                        font: { size: 12 }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.1)"
                    }
                }
            }
        }
    });
}


document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

populatePatterns();
renderProblems();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("Service Worker Error:", err));
  });
}
