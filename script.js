import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmrrf41ZDZW_OHcCEQ1pIa4ta2h2IvW8Y",
  authDomain: "expense-tracker-mikey.firebaseapp.com",
  projectId: "expense-tracker-mikey",
  storageBucket: "expense-tracker-mikey.appspot.com",
  messagingSenderId: "490604212345",
  appId: "1:490604212345:web:e16ccfde57790e629164a8",
  measurementId: "G-3SVZCPVHBR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  loadExpenses();

  expenseForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const day = document.getElementById('day').value.padStart(2, '0');
    const month = document.getElementById('month').value.padStart(2, '0');
    const year = document.getElementById('year').value;
    const date = `${day}/${month}/${year}`;

    if (title && amount && date) {
      try {
        const docRef = await addDoc(collection(db, 'expenses'), {
          title,
          amount,
          date,
        });
        addExpenseToList(docRef.id, title, amount, date);
        expenseForm.reset();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      alert('Please fill out all fields.');
    }
  });

  async function loadExpenses() {
    try {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      querySnapshot.forEach((doc) => {
        const expense = doc.data();
        addExpenseToList(doc.id, expense.title, expense.amount, expense.date);
      });
    } catch (e) {
      console.error('Error loading documents: ', e);
    }
  }

  function addExpenseToList(id, title, amount, date) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${title} - ${amount} ₫ - ${date}
      <button class="delete-btn" onclick="deleteExpense('${id}')">Delete</button>
    `;
    expenseList.appendChild(li);
  }

  window.deleteExpense = async function(id) {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      document.querySelector(`li button[onclick="deleteExpense('${id}')"]`).parentElement.remove();
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
});
