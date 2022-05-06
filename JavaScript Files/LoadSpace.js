//when you click on right side button
let element;
function loadSpace(event, section) {
    //hides tab content on left side
    
    const tabContent = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    //removes the "active" effect from all buttons
    const tabButton = document.getElementsByClassName("tabButton");
    for (let i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "");
    }

    //separately shows the specific leftside content and sets corresponding button to active
    document.getElementById(section).style.display = "block";
    event.currentTarget.className += " active";
    element = document.getElementById(section);
}