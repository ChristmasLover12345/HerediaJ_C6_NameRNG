function GetNameFromLocalStorage() {
    let name = localStorage.getItem("Names");

    if (name == null) 
    {
        return [];
    }

    console.log(name);

    return JSON.parse(name);
}

function SetNameToLocalStorage(name)
{
    let savedNames = GetNameFromLocalStorage();
    if (savedNames.map(n => n.toLowerCase()).includes(name.toLowerCase())) 
    {
        return;
    }

    savedNames.push(name);
    localStorage.setItem("Names", JSON.stringify(savedNames));

}

function DeleteNameFromLocalStorage(name)
{

    let savedNames = GetNameFromLocalStorage();
    if (!savedNames.map(n => n.toLowerCase()).includes(name.toLowerCase())) 
    {
        return;
    }

    savedNames = savedNames.filter(item => item !== name);
    localStorage.setItem("Names", JSON.stringify(savedNames));

}


export { GetNameFromLocalStorage, SetNameToLocalStorage, DeleteNameFromLocalStorage };