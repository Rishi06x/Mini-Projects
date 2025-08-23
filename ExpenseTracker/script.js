const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const filter = document.getElementById("filter");
const clearAllBtn = document.getElementById("clearAll");
const toast = document.getElementById("toast");

// UUID generator
function uuid() {
  return crypto.randomUUID();
}

form.addEventListener("submit", addTransaction);
filter.addEventListener("change", renderList);
clearAllBtn.addEventListener("click", clearAll);

function updateTotal() {
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  balance.textContent = formatter.format(incomeTotal - expenseTotal);
  income.textContent = formatter.format(incomeTotal);
  expense.textContent = formatter.format(expenseTotal);
}

function renderList() {
  list.innerHTML = "";
  const type = filter.value;
  const filtered = type === "all" ? transactions : transactions.filter(t => t.type === type);

  if (filtered.length === 0) {
    status.textContent = "No transactions.";
    return;
  }
  status.textContent = "";

  filtered.forEach(({ id, name, amount, date, type }) => {
    const li = document.createElement("li");
    li.className = type;

    li.innerHTML = `
      <div>
        <h4>${name}</h4>
        <small>${new Date(date).toLocaleDateString()}</small>
      </div>
      <div class="amount">${formatter.format(amount)}</div>
      <div class="action">
        <button data-id="${id}">❌</button>
      </div>
    `;

    li.querySelector("button").addEventListener("click", () => deleteTransaction(id));
    list.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();
  const data = new FormData(form);

  transactions.push({
    id: uuid(),
    name: data.get("name"),
    amount: parseFloat(data.get("amount")),
    date: data.get("date"),
    type: data.get("type")
  });

  form.reset();
  saveTransactions();
  updateTotal();
  renderList();
  showToast("Transaction added ✅");
}

function deleteTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  transactions.splice(index, 1);
  saveTransactions();
  updateTotal();
  renderList();
  showToast("Transaction deleted ❌");
}

function clearAll() {
  transactions.length = 0;
  saveTransactions();
  updateTotal();
  renderList();
  showToast("All transactions cleared 🗑️");
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 2000);
}

// init
updateTotal();
renderList();
