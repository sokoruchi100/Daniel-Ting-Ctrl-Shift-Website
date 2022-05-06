menu = document.getElementById("menu");
menu.classList.toggle("change");

//when you click on menu button -- loop through tab content to get display == block element and get element by classname active
function change(x) {
    const tabContent = document.getElementsByClassName("tabContent");
    const tab = document.getElementById("tab");

    //If in x state, disappearing
    if (x.classList.contains("change")) {
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tab.style.display = "none";
        
        x.classList.toggle("change");

        
    //If in menu state, reappearing
    } else {
        tab.style.display = "block";
        element.style.display = "block"
        x.classList.toggle("change");
    }
}