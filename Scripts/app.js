import { GetNameFromLocalStorage, SetNameToLocalStorage, DeleteNameFromLocalStorage } from "./LocalStorage.js";

const namesContainer = document.getElementById("namesContainer");
const groupContainer = document.getElementById("groupContainer");
const nameInput = document.getElementById("nameInput");
const addNameButton = document.getElementById("addNameButton");
const groupSizeInput = document.getElementById("groupSizeInput");
const groupInput = document.getElementById("groupInput");
const peoplePerGroupDisplay = document.getElementById("peoplePerGroupDisplay");
const groupNumDisplay = document.getElementById("groupNumDisplay");

function DisplayNames() {
    namesContainer.innerHTML = "";

    let names = GetNameFromLocalStorage();
   
    for (let name of names) {
        const nameDiv = document.createElement('div');
        const nameName = document.createElement('p');
        const RemoveBtn = document.createElement('p');

        expenseName.innerText = name;
        expenseRemoveBtn.innerText = "X";

        nameDiv.classList.add("bg-green-100", "flex", "w-[95%]", "h-[80px]", "justify-between", "border-2", "rounded-[5px]");
        nameName.classList.add("text-14", "text-black", "m-0", "self-center", "h-full");
        RemoveBtn.classList.add("text-14", "border-2", "p-1", "self-center", "h-full", "text-red-700");

        expenseRemoveBtn.addEventListener('click', () => {
            DeleteNameFromLocalStorage(name);
            nameDiv.remove();
        });

        namesContainer.appendChild(nameDiv);
        nameDiv.appendChild(nameName);
        nameDiv.appendChild(RemoveBtn);
    }
}