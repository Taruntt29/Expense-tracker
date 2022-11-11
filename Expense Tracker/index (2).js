"use strict"

const form = document.querySelector('#addForm');
const mainList = document.querySelector('#mainList');

form.addEventListener('submit',saveToLocal);
document.addEventListener('DOMContentLoaded',refresh);

function refresh(){
    axios
        .get('https://crudcrud.com/api/3384f42262d946aa9063e449fdbaf093/expense-tracker')
        .then((res) => {
            res.data.forEach(obj => {
                console.log(obj);
                showOnScreen(obj);
            })
        })
        .catch((err) => {'Error Block: ',err})
}

function saveToLocal(e){
    e.preventDefault();
    const amount = document.querySelector('#amount').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;
    const expense = {
        amount,
        description,
        category
    };
    axios
        .post('https://crudcrud.com/api/3384f42262d946aa9063e449fdbaf093/expense-tracker',expense)
        .then(() => {
            showOnScreen(expense);
        })
        .catch((err) => {console.log("Error Block: ",err);})
}

function showOnScreen(expObj){
    form.reset();
    removeExpenseFromScreen(expObj.description);
    const liHTML = `<li class="list-group-item" id="${expObj._id}"> Amount- Rs. ${expObj.amount}<br>Description- ${expObj.description}<br>Category- ${expObj.category}
                    <span id=${expObj.description} hidden>${expObj}</span>
                    <button class="btn btn-danger btn-sm float-right delete" onclick=deleteExpense('${expObj._id}') style="margin-left:5px">Delete</button>
                    <button class="btn btn-danger btn-sm float-right delete" style="background-color:#f4f4f4; color:black" onclick=editExpense('${expObj.description}','${expObj.amount}','${expObj.category}','${expObj._id}')>Edit</button>                    
                    </li>`;
    mainList.innerHTML = mainList.innerHTML+liHTML; 
}

function deleteExpense(uniqID){  
        axios
            .delete(`https://crudcrud.com/api/3384f42262d946aa9063e449fdbaf093/expense-tracker/${uniqID}`)
            .then(() => {
                removeExpenseFromScreen(uniqID);
            })
            .catch((err) => {console.log("Error Block: ",err);})
}

function editExpense(description,amount,category,uniqID){
    document.querySelector('#amount').value = amount;
    document.querySelector('#description').value = description;
    document.querySelector('#category').value = category;
    deleteExpense(uniqID);
}

function removeExpenseFromScreen(uniqID){
    const expenseToBeDeleted = document.getElementById(`${uniqID}`);
    if(expenseToBeDeleted != null){
        mainList.removeChild(expenseToBeDeleted);
    }
}