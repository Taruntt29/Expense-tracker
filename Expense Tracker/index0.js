"use strict";

const form = document.querySelector("#addForm");
const mainList = document.querySelector("#mainList");
const apiLink = `https://crudcrud.com/api/2c25f9897d3f4ed6a12733787d221129/expense-tracker`;

form.addEventListener("submit", save);
document.addEventListener("DOMContentLoaded", refresh);

async function refresh() {
    try {
        debugger;
        const getResponse = await axios.get(apiLink);
        // console.log(getResponse.data);
        getResponse.data.forEach((obj) => {
            // console.log(obj);
            showOnScreen(obj);
        });
    } catch (error) {
        console.log("Error in refresh().");
    }
}

async function save(e) {
    try {
        debugger;
        e.preventDefault();
        const amount = document.querySelector("#amount").value;
        const description = document.querySelector("#description").value;
        const category = document.querySelector("#category").value;
        const expense = {
            amount,
            description,
            category,
        };
        try {
            const postResponse = await axios.post(apiLink, expense);
            // console.log(postResponse.data);
            showOnScreen(postResponse.data);
        } catch (error) {
            console.log("Error in post request in save().");
        }
    } catch (error) {
        console.log("Error at start of save()");
    }
}

function showOnScreen(expObj) {
    try {
        debugger;
        form.reset();
        removeExpenseFromScreen(expObj._id);
        const liHTML = `<li class="list-group-item" id="${expObj._id}"> Amount- Rs. ${expObj.amount}<br>Description- ${expObj.description}<br>Category- ${expObj.category}
                    <span id=${expObj.description} hidden>${expObj}</span>
                    <button class="btn btn-danger btn-sm float-right delete" onclick=deleteExpense('${expObj._id}') style="margin-left:5px">Delete</button>
                    <button class="btn btn-danger btn-sm float-right delete" style="background-color:#f4f4f4; color:black" onclick=editExpense('${expObj.description}','${expObj.amount}','${expObj.category}','${expObj._id}')>Edit</button>                    
                    </li>`;
        mainList.innerHTML = mainList.innerHTML + liHTML;
    } catch (error) {
        console.log("Error in showOnScreen().");
    }
}

async function deleteExpense(uniqID) {
    try {
        debugger;
        const deleteResponse = await axios.delete(`${apiLink}/${uniqID}`);
        // console.log(deleteResponse.status);
        removeExpenseFromScreen(uniqID);
    } catch (error) {
        console.log("Error in deleteExpense().");
    }
}

function editExpense(description, amount, category, uniqID) {
    debugger;
    try {
        document.querySelector("#amount").value = amount;
        document.querySelector("#description").value = description;
        document.querySelector("#category").value = category;
        deleteExpense(uniqID);
    } catch (error) {
        console.log("Error in editExpense().");
    }
}

function removeExpenseFromScreen(uniqID) {
    try {
        debugger;
        const expenseToBeDeleted = document.getElementById(`${uniqID}`);
        if (expenseToBeDeleted != null) {
            mainList.removeChild(expenseToBeDeleted);
        }
    } catch (error) {
        console.log("Error in removeExpenseFromScreen().");
    }
}