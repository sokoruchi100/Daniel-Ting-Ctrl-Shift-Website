//when you click on right side button
function displayText(section) {
    //hides tab content on left side
    const paragraph = document.getElementsByClassName("paragraph");
    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.visibility = "hidden";
    }

    //separately shows the specific leftside content and sets corresponding button to active
    document.getElementById(section).style.visibility = "visible";
}

