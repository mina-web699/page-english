// Array to store all rules
let rulesData = [];

// Load data on start
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("notebookRules")) {
    rulesData = JSON.parse(localStorage.getItem("notebookRules"));
    renderRules();
  } else {
    // Initial demo data if empty
    rulesData = [
      {
        name: "Present Perfect Simple (المضارع التام البسيط)",
        structure: "S + have / has + P.P (V3)",
        usage:
          "يعبر عن حدث بدأ في الماضي وله أثر في الحاضر، أو حدث انتهى للتو.",
        keywords: "since, for, already, yet",
        examples:
          "I have already finished my English homework.\nShe has lived in Cairo since 2018.",
        negQuestion:
          "النفي: S + haven't / hasn't + P.P\nالسؤال: Have / Has + S + P.P ...?",
        tricks:
          "has gone to: ذهب ولم يعد بعد.\nhas been to: ذهب وعاد من المكان.",
      },
    ];
    saveAndRender();
  }
});

const form = document.getElementById("grammarForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const index = document.getElementById("editIndex").value;
  const newRule = {
    name: document.getElementById("ruleName").value,
    structure: document.getElementById("ruleStructure").value,
    usage: document.getElementById("ruleUsage").value,
    keywords: document.getElementById("keyWords").value,
    examples: document.getElementById("examples").value,
    negQuestion: document.getElementById("negQuestion").value,
    tricks: document.getElementById("tricks").value,
  };

  if (index === "") {
    // Add mode
    rulesData.unshift(newRule);
  } else {
    // Edit mode
    rulesData[index] = newRule;
    document.getElementById("editIndex").value = "";
    document.getElementById("submitBtn").innerText =
      "حفظ القاعدة في الكشكول 🚀";
    document.getElementById("submitBtn").classList.remove("edit-mode");
    document.getElementById("formHeader").innerText =
      "➕ إضافة قاعدة جديدة للكشكول";
  }

  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("notebookRules", JSON.stringify(rulesData));
  renderRules();
}

function renderRules() {
  const container = document.getElementById("rulesContainer");
  container.innerHTML = "";

  rulesData.forEach((rule, index) => {
    // Badges
    let badgesHTML = "";
    if (rule.keywords.trim() !== "") {
      rule.keywords.split(",").forEach((word) => {
        if (word.trim() !== "")
          badgesHTML += `<span class="badge">${word.trim()}</span>`;
      });
    }

    // Examples
    let examplesHTML = "";
    rule.examples.split("\n").forEach((line) => {
      if (line.trim() !== "")
        examplesHTML += `<div class="example-item">${line.trim()}</div>`;
    });

    const layout = `
                <div class="rule-spread" id="rule-card-${index}">
                    <div class="rule-actions">
                        <button class="btn-action btn-print" onclick="printRule(${index})">طباعة 🖨️</button>
                        <button class="btn-action btn-edit" onclick="editRule(${index})">تعديل ✏️</button>
                        <button class="btn-action btn-delete" onclick="deleteRule(${index})">حذف 🗑️</button>
                    </div>
                    
                    <div class="page right-page">
                        <div class="rule-title">${rule.name}</div>
                        <div class="section-heading">📐 التكوين الهيكلي:</div>
                        <div class="box-form">${rule.structure}</div>
                        <div class="section-heading">💡 الاستخدام:</div>
                        <div class="usage-text">${rule.usage.replace(/\n/g, "<br>")}</div>
                        <div class="section-heading">🔑 الكلمات الدالة:</div>
                        <div class="badge-list">${badgesHTML}</div>
                    </div>
                    
                    <div class="page left-page">
                        <div class="section-heading" style="margin-top:0;">📝 أمثلة حية:</div>
                        <div class="example-block">${examplesHTML}</div>
                        <div class="section-heading">🔄 النفي والسؤال:</div>
                        <div class="neg-q-block">${rule.negQuestion.replace(/\n/g, "<br>")}</div>
                        <div class="trick-box">
                            <h4>⚠️ تريكات الامتحانات والملاحظات:</h4>
                            <p>${rule.tricks.replace(/\n/g, "<br>")}</p>
                        </div>
                    </div>
                </div>
            `;
    container.insertAdjacentHTML("beforeend", layout);
  });
}

// Action: Delete
function deleteRule(index) {
  if (confirm("هل أنت متأكد من حذف هذه القاعدة من كشكولك؟")) {
    rulesData.splice(index, 1);
    saveAndRender();
  }
}

// Action: Edit Setup
function editRule(index) {
  const rule = rulesData[index];
  document.getElementById("ruleName").value = rule.name;
  document.getElementById("ruleStructure").value = rule.structure;
  document.getElementById("ruleUsage").value = rule.usage;
  document.getElementById("keyWords").value = rule.keywords;
  document.getElementById("examples").value = rule.examples;
  document.getElementById("negQuestion").value = rule.negQuestion;
  document.getElementById("tricks").value = rule.tricks;

  document.getElementById("editIndex").value = index;
  document.getElementById("submitBtn").innerText = "تعديل وحفظ التغييرات ✏️";
  document.getElementById("submitBtn").classList.add("edit-mode");
  document.getElementById("formHeader").innerText = "✏️ تعديل القاعدة الحالية";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Action: Print Single Rule
function printRule(index) {
  const card = document.getElementById(`rule-card-${index}`);
  card.classList.add("print-area");
  window.print();
  card.classList.remove("print-area");
}
