// script.js

document.addEventListener("DOMContentLoaded", () => {
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const addExpenseBtn = document.getElementById("add-expense-btn");
    const expenseList = document.getElementById("expense-list");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let isEditing = false;
    let editingIndex = null;

    const saveExpenses = () => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    };

    const renderExpenses = () => {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            expenseList.appendChild(li);
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                editExpense(e.target.getAttribute("data-index"));
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                deleteExpense(e.target.getAttribute("data-index"));
            });
        });
    };

    const addOrUpdateExpense = () => {
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name && !isNaN(amount) && amount > 0) {
            if (isEditing) {
                expenses[editingIndex] = { name, amount };
                isEditing = false;
                editingIndex = null;
                addExpenseBtn.textContent = "Add Expense";
            } else {
                expenses.push({ name, amount });
            }

            saveExpenses();
            renderExpenses();
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        } else {
            alert("Please enter a valid name and amount.");
        }
    };

    const editExpense = (index) => {
        const expense = expenses[index];
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        addExpenseBtn.textContent = "Update Expense";
        isEditing = true;
        editingIndex = index;
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    addExpenseBtn.addEventListener("click", addOrUpdateExpense);
    renderExpenses();
});
