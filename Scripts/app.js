import { GetNameFromLocalStorage, SetNameToLocalStorage, DeleteNameFromLocalStorage } from "./LocalStorage.js";

const namesContainer = document.getElementById("namesContainer");
const groupContainer = document.getElementById("groupContainer");
const nameInput = document.getElementById("nameInput");
const addNameButton = document.getElementById("addNameButton");
const groupSizeInput = document.getElementById("groupSizeInput");
const groupInput = document.getElementById("groupInput");
const peoplePerGroupDisplay = document.getElementById("peoplePerGroupDisplay");
const groupNumDisplay = document.getElementById("groupNumDisplay");
const groupsBtn = document.getElementById("groupsBtn");

const rngBtn = document.getElementById("rngBtn");
const rngGuy = document.getElementById("rngGuy");

let groupBool1 = false;
let groupBool2 = false;


function DisplayNames() {
    namesContainer.innerHTML = "";

    let names = GetNameFromLocalStorage();
   
    for (let name of names) {
        const nameDiv = document.createElement('div');
        const nameName = document.createElement('p');
        const RemoveBtn = document.createElement('p');

        nameName.innerText = name;
        RemoveBtn.innerText = "X";

        nameDiv.classList.add("bg-green-100", "flex", "w-[95%]", "h-[80px]", "justify-between", "border-2", "rounded-[5px]");
        nameName.classList.add("text-2xl", "text-black", "m-0", "self-center", "h-full", "place-self-center");
        RemoveBtn.classList.add("text-2xl", "border-2", "p-1", "self-center", "h-full", "text-red-700", "place-self-center");

        RemoveBtn.addEventListener('click', () => {
            DeleteNameFromLocalStorage(name);
            nameDiv.remove();
        });

        namesContainer.appendChild(nameDiv);
        nameDiv.appendChild(nameName);
        nameDiv.appendChild(RemoveBtn);
    }
}

function addName(name)
{
    console.log(name)
    SetNameToLocalStorage(name);
    DisplayNames();

}

addNameButton.addEventListener('click', (e) => {
    const name = nameInput.value.trim();

    if (name !== "" && isNaN(name)) {
        addName(name);
    }
});




function assignGroups(peoplePerGroup, numberOfGroups) {
    let names = GetNameFromLocalStorage();
    let groups = Array.from({ length: numberOfGroups }, () => []);

    // Shuffle the names array
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Assign people to groups
    let groupIndex = 0;
    for (let name of names) {
        if (groups[groupIndex].length < peoplePerGroup) {
            groups[groupIndex].push(name);
        } else {
            groupIndex = (groupIndex + 1) % numberOfGroups;
            groups[groupIndex].push(name);
        }
    }

    // Handle odd man out
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].length > peoplePerGroup) {
            let extraPerson = groups[i].pop();
            groups[(i + 1) % numberOfGroups].push(extraPerson);
        }
    }

    // Display groups
    groupContainer.innerHTML = "";
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add("group", "w-full");

        const groupTitle = document.createElement('h3');
        groupTitle.innerText = `Group ${index + 1}`;
        groupTitle.classList.add("text-2xl", "text-black", "m-0", "self-center", "w-full", "text-center", "font-bold");
        groupDiv.appendChild(groupTitle);

        const namesP = document.createElement('p');
        namesP.classList.add("text-xl", "text-black", "m-0", "self-center", "w-full", "text-center");
        namesP.innerText = group.join(', ');
        groupDiv.appendChild(namesP);

        groupContainer.appendChild(groupDiv);
    });
}

rngBtn.addEventListener('click', () => {
    let names = GetNameFromLocalStorage();
    let randomName = names[Math.floor(Math.random() * names.length)];
    rngGuy.innerText = randomName;
})

groupsBtn.addEventListener('click', (e) => {

    if (!isNaN(groupSizeInput.value))
        {
            groupBool1 = true;
            peoplePerGroupDisplay.innerText = groupSizeInput.value;
        }
        else
        {
            groupBool1 = false
        }


        if (!isNaN(groupInput.value))
            {
                groupBool2 = true;
                groupNumDisplay.innerText = groupInput.value;
            }
            else
            {
                groupBool2 = false
            }

            if (groupBool1 && groupBool2)
                {
                    
                    assignGroups(parseInt(groupSizeInput.value), parseInt(groupInput.value));
                }

})


DisplayNames() 