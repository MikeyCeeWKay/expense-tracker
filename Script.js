const expenseList = document.getElementById('expense-list');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const addExpenseBtn = document.getElementById('add-expense');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function formatDate(day, month, year) {
    return `${day}/${month}/${year}`;
}

function updateUI() {
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.title}: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(expense.amount)} on ${expense.date}
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

function addExpense() {
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const day = dayInput.value.padStart(2, '0').trim();
    const month = monthInput.value.padStart(2, '0').trim();
    const year = yearInput.value.trim();

    if (title && amount && day && month && year) {
        const date = formatDate(day, month, year);
        const expense = { title, amount, date };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateUI();
        titleInput.value = '';
        amountInput.value = '';
        dayInput.value = '';
        monthInput.value = '';
        yearInput.value = '';
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
}

addExpenseBtn.addEventListener('click', addExpense);

updateUI();