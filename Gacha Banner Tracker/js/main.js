/*const para = document.createElement("p");
const text = document.createTextNode("New Banner Tracker");

para.appendChild(text);
const element = document.getElementById("body");
element.appendChild(para);*/

/*
JSON Structure:
tile: [name, mainCounter, smallCounter]
*/

/* THINGS TO IMPLEMENT

    [X] DELETE BUTTON
    [X] EDIT BUTTON
        - [X] Input areas
        - [X] Display and hide
        - [X] Edit functionalities

    [] Move tiles (up or down || dragging and switch || dragging and move rest up)

    [X] CSS Grid
        - [X] For Tiles
        - [X] For content of tiles
        - [X] SVG Icons
        - [X] Neumorphism
        - [] Linear gradient for button pop

    [X] Basic css look

    [] Different tile templates (Genshin / HSR / Hi3 -  Default / Event / Weapon Banner AccountName)
    [] Upload Button
        - [] tileData
        - [] colorScheme
    [] Download storageData Button
        - [] copy to clipboard etc.
    [X] Custom colors (localStorage) "colorScheme"
        - [X] Color picker design

    [] Functionality:
        - [] Guarantee button and light indicator.
        - As above, need to change 5 star functions to update the guarantee once reaching 90.

*/
window.onload = (event) => {
    loadLocalStorage();
    addColorPickerEventListeners();
    loadThemeButtons();
};

const fourStarLimit = 9;
const fiveStarLimit = 89;
var deleteToggle = false;

function loadLocalStorage(){
    // Retrieve localStorage and put tiles on screen accordingly
    let storageData = JSON.parse(localStorage.getItem("tileData"));
    for(i = 0; i < storageData.length; i++){
        addNewTile();
        let newTile = document.getElementById("mainTiles").children[i];
        newTile.children[0].textContent = storageData[i][0];
        newTile.children[1].textContent = storageData[i][1];
        newTile.children[2].textContent = storageData[i][2];
        //console.log(storage);
        if(storageData[i][3] == "true"){
            newTile.children[10].classList.add("guaranteed");
        }
        /*console.log(storageData[i][0]);
        console.log(newTile.children[0]); */
    }
    loadCurrentTheme();
    console.log(arguments.callee.name + ": Finished loading.");
}

function loadCurrentTheme(){
    let currentTheme = JSON.parse(localStorage.getItem("currentTheme"));
    document.querySelector(":root").style.setProperty("--textColor", currentTheme[0]);
    document.querySelector(":root").style.setProperty("--backgroundColor", currentTheme[1]);
    document.querySelector(":root").style.setProperty("--boxShadowColor1", currentTheme[2]);
    document.querySelector(":root").style.setProperty("--boxShadowColor2", currentTheme[3]);
    document.querySelector(":root").style.setProperty("--customFont", currentTheme[4]);
}

function loadThemeButtons(){
    let styleThemes = JSON.parse(localStorage.getItem("styleThemes"));
    for(i = 0; i < styleThemes.length; i++){
        addThemeButton();
        document.getElementById("styleThemes").children[i].style.setProperty("--color1", styleThemes[i][0]);
        document.getElementById("styleThemes").children[i].style.setProperty("--color2", styleThemes[i][1]);
        document.getElementById("styleThemes").children[i].style.setProperty("--color3", styleThemes[i][2]);
        document.getElementById("styleThemes").children[i].style.setProperty("--color4", styleThemes[i][3]);
        document.getElementById("styleThemes").children[i].style.setProperty("--font", styleThemes[i][4]);
    }
}

function toggleFont(){
    let currentFont = document.querySelector(":root").style.getPropertyValue("--customFont");
    if(currentFont == "genshinFont"){
        document.querySelector(":root").style.setProperty("--customFont", "honkaiFont");
    }
    if(currentFont == "honkaiFont"){
        document.querySelector(":root").style.setProperty("--customFont", "genshinFont");
    }
    else{
      console.log("Current Font is not set properly.");
    }
    updateCurrentTheme();
}

function userAddNewTile(){
    addNewTile();
    updateJSON();
    console.log(arguments.callee.name + ": User added new tile and updated.");
}

function uploadTileData(){
    // Prompt user to enter tileData and use confirm button -
}

function downloadTileData(){
    // Copy tileData to clipboard - and / or download to JSON file
}

function openColorPicker(){
    // Animate color picker
    if(document.getElementById("navBar").classList.contains("openColorPicker")){
        document.getElementById("navBar").classList.remove("openColorPicker");
        document.getElementById("colorPicker").classList.remove("openColorPicker");
        document.getElementById("colorPicker").classList.remove("openColorPickerButton");
        document.getElementById("colorPicker").children[0].classList.remove("animateColorPickerSVG");
        document.getElementById("colorPicker").children[1].classList.remove("showColorPickers");
        document.getElementById("colorPicker").children[2].classList.remove("showColorPickers");
        document.getElementById("colorPicker").children[3].classList.remove("showColorPickers");
        document.getElementById("colorPicker").children[4].classList.remove("showColorPickers");
    }else{
        document.getElementById("navBar").classList.add("openColorPicker");
        document.getElementById("colorPicker").classList.add("openColorPicker");
        document.getElementById("colorPicker").classList.add("openColorPickerButton");
        document.getElementById("colorPicker").children[0].classList.add("animateColorPickerSVG");
        document.getElementById("colorPicker").children[1].classList.add("showColorPickers");
        document.getElementById("colorPicker").children[2].classList.add("showColorPickers");
        document.getElementById("colorPicker").children[3].classList.add("showColorPickers");
        document.getElementById("colorPicker").children[4].classList.add("showColorPickers");

    }
    initColorPickers();
}

function initColorPickers(){
    document.getElementById("textColorPicker").value = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--textColor");
    document.getElementById("backgroundColorPicker").value = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--backgroundColor");
    document.getElementById("boxShadowColorPicker1").value = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor1");
    document.getElementById("boxShadowColorPicker2").value = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor2");
}

function addColorPickerEventListeners(){
  document.getElementById("textColorPicker").addEventListener("input", updateColorPicker1, false);
  document.getElementById("textColorPicker").addEventListener("change", updateCurrentTheme, false);
  document.getElementById("textColorPicker").addEventListener("mousedown", disableColorPicker, false);
  document.getElementById("backgroundColorPicker").addEventListener("input", updateColorPicker2, false);
  document.getElementById("backgroundColorPicker").addEventListener("change", updateCurrentTheme, false);
  document.getElementById("backgroundColorPicker").addEventListener("mousedown", disableColorPicker, false);
  document.getElementById("boxShadowColorPicker1").addEventListener("input", updateColorPicker3, false);
  document.getElementById("boxShadowColorPicker1").addEventListener("change", updateCurrentTheme, false);
  document.getElementById("boxShadowColorPicker1").addEventListener("mousedown", disableColorPicker, false);
  document.getElementById("boxShadowColorPicker2").addEventListener("input", updateColorPicker4, false);
  document.getElementById("boxShadowColorPicker2").addEventListener("change", updateCurrentTheme, false);
  document.getElementById("boxShadowColorPicker2").addEventListener("mousedown", disableColorPicker, false);
}

function disableColorPicker(event){
    document.getElementById("colorPicker").setAttribute("disabled", true);
    console.log("Disabled");
    setTimeout(() => {
      document.getElementById("colorPicker").removeAttribute("disabled");
      console.log("Enabled");
    },1000)
}
function enableColorPicker(event){
    document.getElementById("colorPicker").removeAttribute("disabled");
}

function updateColorPicker1(event){
    document.querySelector(":root").style.setProperty("--textColor", event.target.value);
}
function updateColorPicker2(event){
    document.querySelector(":root").style.setProperty("--backgroundColor", event.target.value);
}
function updateColorPicker3(event){
    document.querySelector(":root").style.setProperty("--boxShadowColor1", event.target.value);
}
function updateColorPicker4(event){
    document.querySelector(":root").style.setProperty("--boxShadowColor2", event.target.value);
}

function saveNewTheme(){
    // Make list of themes into localStorage. [theme1, theme2, ..]
    let styleThemes = [];

    let currentTheme = [];
    currentTheme[0] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--textColor");
    currentTheme[1] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--backgroundColor");
    currentTheme[2] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor1");
    currentTheme[3] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor2");
    currentTheme[4] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--customFont");
    console.log("atink" + currentTheme);
    for(i = 0; i < document.getElementById("styleThemes").children.length; i++){
        let themeData = [];
        themeData[0] = document.getElementById("styleThemes").children[i].style.getPropertyValue("--color1");
        themeData[1] = document.getElementById("styleThemes").children[i].style.getPropertyValue("--color2");
        themeData[2] = document.getElementById("styleThemes").children[i].style.getPropertyValue("--color3");
        themeData[3] = document.getElementById("styleThemes").children[i].style.getPropertyValue("--color4");
        themeData[4] = document.getElementById("styleThemes").children[i].style.getPropertyValue("--font");
        styleThemes.push(themeData);
        console.log("bink" + themeData);
    }

    styleThemes.push(currentTheme);
    localStorage.setItem("styleThemes", JSON.stringify(styleThemes));

    addThemeButton()
    let length = document.getElementById("styleThemes").children.length;
    document.getElementById("styleThemes").children[length-1].style.setProperty("--color1", currentTheme[0]);
    document.getElementById("styleThemes").children[length-1].style.setProperty("--color2", currentTheme[1]);
    document.getElementById("styleThemes").children[length-1].style.setProperty("--color3", currentTheme[2]);
    document.getElementById("styleThemes").children[length-1].style.setProperty("--color4", currentTheme[3]);
    document.getElementById("styleThemes").children[length-1].style.setProperty("--font", currentTheme[4]);;
}

function deleteThemeToggle(){
    if(deleteToggle == true){
        deleteToggle = false;
        bgColorRed("off");
        console.log("Was True, now False.");
    }else {
        deleteToggle = true;
        bgColorRed("on");
        console.log("Was False, now True.");
    }
}

function setTheme(element){
    if(deleteToggle == true){
        let childIndex = Array.prototype.indexOf.call(document.getElementById("styleThemes").children, element);
        document.getElementById("styleThemes").children[childIndex].remove();
        let styleThemes = JSON.parse(localStorage.getItem("styleThemes"));
        styleThemes.splice(childIndex, 1);
        console.log(styleThemes);
        localStorage.setItem("styleThemes", JSON.stringify(styleThemes));
    }
    if(deleteToggle == false){
        document.querySelector(":root").style.setProperty("--textColor", element.style.getPropertyValue("--color1"));
        document.querySelector(":root").style.setProperty("--backgroundColor", element.style.getPropertyValue("--color2"));
        document.querySelector(":root").style.setProperty("--boxShadowColor1", element.style.getPropertyValue("--color3"));
        document.querySelector(":root").style.setProperty("--boxShadowColor2", element.style.getPropertyValue("--color4"));
        document.querySelector(":root").style.setProperty("--customFont", element.style.getPropertyValue("--font"));
        updateCurrentTheme();
    }
}

function bgColorRed(toggle){
    if(toggle == "on"){
        for(i = 0; i < document.getElementById("styleThemes").children.length; i++){
            document.getElementById("styleThemes").children[i].style.setProperty("background-color", "var(--hoverDeleteColor)");
        }
        document.getElementById("deleteThemeToggle").style.setProperty("background-color", "var(--hoverDeleteColor)");
    }
    if(toggle == "off"){
        for(i = 0; i < document.getElementById("styleThemes").children.length; i++){
            document.getElementById("styleThemes").children[i].style.setProperty("background-color", "");
        }
        document.getElementById("deleteThemeToggle").style.setProperty("background-color", "");
    }
}

function addThemeButton(){
    let button = document.createElement("button");
    button.setAttribute("onclick", "setTheme(this)");
    let span = document.createElement("span");
    button.appendChild(span);
    document.getElementById("styleThemes").appendChild(button);
}

function addNewTile(){
    const mainTiles = document.getElementById("mainTiles");

    const div = document.createElement("div");
    let tileCount = mainTiles.children.length;
    let tileId = tileCount + 1;
    div.setAttribute("id", tileId);

    const tileName = "Game Default/Event/Weapon Banner Username";

    const tileAccountName = document.createElement("p");
    tileAccountName.appendChild(document.createTextNode(tileName));
    tileAccountName.setAttribute("class", "name");
    tileAccountName.style.visibility = "visible";

    const mainCounterText = document.createElement("p");
    mainCounterText.appendChild(document.createTextNode("0"));
    mainCounterText.setAttribute("class", "mainCounter");
    mainCounterText.style.visibility = "visible";

    const smallCounterText = document.createElement("p");
    smallCounterText.appendChild(document.createTextNode("0"));
    smallCounterText.setAttribute("class", "smallCounter");
    smallCounterText.style.visibility = "visible";

    const inputTileAccountName = document.createElement("textarea");
    inputTileAccountName.appendChild(document.createTextNode(tileName));
    inputTileAccountName.setAttribute("class", "inputName");
    inputTileAccountName.setAttribute("maxlength", 55);
    inputTileAccountName.style.visibility = "hidden";

    const inputMainCounterText = document.createElement("input");
    inputMainCounterText.setAttribute("class", "inputMainCounterText");
    inputMainCounterText.setAttribute("type", "number");
    inputMainCounterText.setAttribute("min", 0);
    inputMainCounterText.setAttribute("max", 89);
    inputMainCounterText.style.visibility = "hidden";

    const inputSmallCounterText = document.createElement("input");
    inputSmallCounterText.setAttribute("class", "inputSmallCounterText");
    inputSmallCounterText.setAttribute("type", "number");
    inputSmallCounterText.setAttribute("min", 0);
    inputSmallCounterText.setAttribute("max", 9);
    inputSmallCounterText.style.visibility = "hidden";

    const countDown = document.createElement("button");
    const svgCountDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgCountDown.setAttribute("viewBox", "0 0 448 512");
    const pathCountDown = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathCountDown.setAttributeNS(null, "d", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z");
    svgCountDown.appendChild(pathCountDown);
    countDown.appendChild(svgCountDown);
    countDown.setAttribute("class", "countDown");
    countDown.setAttribute("onclick", "countDown(this)");

    const countUp = document.createElement("button");
    const svgCountUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgCountUp.setAttribute("viewBox", "0 0 448 512");
    const pathCountUp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathCountUp.setAttributeNS(null, "d", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z");
    svgCountUp.appendChild(pathCountUp);
    countUp.appendChild(svgCountUp);
    countUp.setAttribute("class", "countUp");
    countUp.setAttribute("onclick", "countUp(this)");

    const gotFiveStar = document.createElement("button");
    const svgGotFiveStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgGotFiveStarFive = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgGotFiveStar.setAttribute("viewBox", "0 0 576 512");
    svgGotFiveStarFive.setAttribute("viewBox", "0 0 320 512");
    const pathGotFiveStar = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const pathGotFiveStarFive = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathGotFiveStar.setAttributeNS(null, "d", "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z");
    pathGotFiveStarFive.setAttributeNS(null, "d", "M32.5 58.3C35.3 43.1 48.5 32 64 32H256c17.7 0 32 14.3 32 32s-14.3 32-32 32H90.7L70.3 208H184c75.1 0 136 60.9 136 136s-60.9 136-136 136H100.5c-39.4 0-75.4-22.3-93-57.5l-4.1-8.2c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l4.1 8.2c6.8 13.6 20.6 22.1 35.8 22.1H184c39.8 0 72-32.2 72-72s-32.2-72-72-72H32c-9.5 0-18.5-4.2-24.6-11.5s-8.6-16.9-6.9-26.2l32-176z");
    svgGotFiveStar.appendChild(pathGotFiveStar);
    svgGotFiveStarFive.appendChild(pathGotFiveStarFive);
    const spanGotFiveStar = document.createElement("span");
    spanGotFiveStar.appendChild(document.createTextNode("GOT"));
    gotFiveStar.appendChild(spanGotFiveStar);
    gotFiveStar.appendChild(svgGotFiveStar);
    gotFiveStar.appendChild(svgGotFiveStarFive);
    gotFiveStar.setAttribute("class", "gotFiveStar");
    gotFiveStar.setAttribute("onclick", "gotFiveStar(this)");

    const gotFourStar = document.createElement("button");
    const svgGotFourStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgGotFourStarFour = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgGotFourStar.setAttribute("viewBox", "0 0 576 512");
    svgGotFourStarFour.setAttribute("viewBox", "0 0 384 512");
    const pathGotFourStar = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const pathGotFourStarFour = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathGotFourStar.setAttributeNS(null, "d", "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z");
    pathGotFourStarFour.setAttributeNS(null, "d", "M189 77.6c7.5-16 .7-35.1-15.3-42.6s-35.1-.7-42.6 15.3L3 322.4c-4.7 9.9-3.9 21.5 1.9 30.8S21 368 32 368H256v80c0 17.7 14.3 32 32 32s32-14.3 32-32V368h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320V160c0-17.7-14.3-32-32-32s-32 14.3-32 32V304H82.4L189 77.6z");
    svgGotFourStar.appendChild(pathGotFourStar);
    svgGotFourStarFour.appendChild(pathGotFourStarFour);
    const spanGotFourStar = document.createElement("span");
    spanGotFourStar.appendChild(document.createTextNode("GOT"));
    gotFourStar.appendChild(spanGotFourStar);
    gotFourStar.appendChild(svgGotFourStar);
    gotFourStar.appendChild(svgGotFourStarFour);
    gotFourStar.setAttribute("class", "gotFourStar");
    gotFourStar.setAttribute("onclick", "gotFourStar(this)");

    const guaranteeIndicator = document.createElement("button");
    guaranteeIndicator.setAttribute("class", "guaranteeIndicator");
    guaranteeIndicator.setAttribute("onclick", "toggleGuarantee(this)");

    const deleteTile = document.createElement("button");
    const svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDelete.setAttribute("viewBox", "0 0 448 512");
    const pathDelete = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathDelete.setAttributeNS(null, "d", "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z");
    svgDelete.appendChild(pathDelete);
    deleteTile.appendChild(svgDelete);
    deleteTile.setAttribute("class", "deleteTile");
    deleteTile.setAttribute("onclick", "deleteTile(this)");
    deleteTile.style.visibility = "hidden";

    const editTile = document.createElement("button");
    const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEdit.setAttribute("viewBox", "0 0 512 512");
    const pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEdit.setAttributeNS(null, "d", "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z");
    svgEdit.appendChild(pathEdit);
    editTile.appendChild(svgEdit);
    editTile.setAttribute("class", "editTile");
    editTile.setAttribute("onclick", "editTile(this)");

    div.appendChild(tileAccountName);
    div.appendChild(mainCounterText);
    div.appendChild(smallCounterText);
    div.appendChild(inputTileAccountName);
    div.appendChild(inputMainCounterText);
    div.appendChild(inputSmallCounterText);
    div.appendChild(countDown);
    div.appendChild(countUp);
    div.appendChild(gotFiveStar);
    div.appendChild(gotFourStar);
    div.appendChild(guaranteeIndicator);
    div.appendChild(deleteTile);
    div.appendChild(editTile);

    mainTiles.appendChild(div);
}

function editTile(data){
    //console.log(data);
    let nameDisplay = data.parentNode.children[0];
    let mainCounterDisplay = data.parentNode.children[1];
    let smallCounterDisplay = data.parentNode.children[2];
    let inputNameDisplay = data.parentNode.children[3];
    let inputMainCounterDisplay = data.parentNode.children[4];
    let inputSmallCounterDisplay = data.parentNode.children[5];
    let countDownButton = data.parentNode.children[6];
    let countUpButton = data.parentNode.children[7];
    let gotFiveStarButton = data.parentNode.children[8];
    let gotFourStarButton = data.parentNode.children[9];
    let deleteTileButton = data.parentNode.children[10];
    if(nameDisplay.style.visibility == "visible"){
        // Hide labels
        nameDisplay.style.visibility = "hidden";
        mainCounterDisplay.style.visibility = "hidden";
        smallCounterDisplay.style.visibility = "hidden";

        // Hide buttons
        countDownButton.style.visibility = "hidden";
        countUpButton.style.visibility = "hidden";
        gotFiveStarButton.style.visibility = "hidden";
        gotFourStarButton.style.visibility = "hidden";

        // Update inputs
        data.parentNode.children[3].value = data.parentNode.children[0].innerHTML;
        data.parentNode.children[4].valueAsNumber = data.parentNode.children[1].innerHTML;
        data.parentNode.children[5].valueAsNumber = data.parentNode.children[2].innerHTML;
        data.children[0].classList.add("toggleButton");

        // Show inputs
        inputNameDisplay.style.visibility = "visible";
        inputMainCounterDisplay.style.visibility = "visible";
        inputSmallCounterDisplay.style.visibility = "visible";
        deleteTileButton.style.visibility = "visible";
        console.log(arguments.callee.name + ": User started editting.");
    }else{
        // Show labels
        nameDisplay.style.visibility = "visible";
        mainCounterDisplay.style.visibility = "visible";
        smallCounterDisplay.style.visibility = "visible";

        // Hide buttons
        countDownButton.style.visibility = "visible";
        countUpButton.style.visibility = "visible";
        gotFiveStarButton.style.visibility = "visible";
        gotFourStarButton.style.visibility = "visible";

        // Update labels
        data.parentNode.children[0].innerHTML = data.parentNode.children[3].value;
        data.parentNode.children[1].innerHTML = data.parentNode.children[4].valueAsNumber;
        data.parentNode.children[2].innerHTML = data.parentNode.children[5].valueAsNumber;
        data.children[0].classList.remove("toggleButton");

        // Hide inputs
        inputNameDisplay.style.visibility = "hidden";
        inputMainCounterDisplay.style.visibility = "hidden";
        inputSmallCounterDisplay.style.visibility = "hidden";
        deleteTileButton.style.visibility = "hidden";
        console.log(arguments.callee.name + ": User stopped editting.");
    }
    updateJSON();
}

function deleteTile(data){
    //console.log(data);

    let indexId = data.parentNode.getAttribute("id");
    let storageData = JSON.parse(localStorage.getItem("tileData"));
    //console.log(storageData);

    data.parentNode.remove();
    storageData.splice(indexId - 1, 1);
    updateJSON();
    console.log(arguments.callee.name + ": User deleted tile and updated JSON.");
    //console.log("StorageData: " + storageData);
}

function countUp(data){
    //console.log(data);
    if(data.parentNode.children[1].textContent >= fiveStarLimit){
        data.parentNode.children[1].textContent = 0;
    }else{
        data.parentNode.children[1].textContent = parseInt(data.parentNode.children[1].textContent) + 1;
    }

    if(data.parentNode.children[2].textContent >= fourStarLimit){
        data.parentNode.children[2].textContent = 0;
    }else{
        data.parentNode.children[2].textContent = parseInt(data.parentNode.children[2].textContent) + 1;
    }
    updateJSON();
}

function countDown(data){
    //console.log(data);
    if(data.parentNode.children[1].textContent <= 0){
        data.parentNode.children[1].textContent = fiveStarLimit;
    }else{
        data.parentNode.children[1].textContent = parseInt(data.parentNode.children[1].textContent) - 1;
    }

    if(data.parentNode.children[2].textContent <= 0){
        data.parentNode.children[2].textContent = fourStarLimit;
    }else{
        data.parentNode.children[2].textContent = parseInt(data.parentNode.children[2].textContent) - 1;
    }
    updateJSON();
}

function gotFiveStar(data){
    //console.log(data);
    data.parentNode.children[1].textContent = 0;
    updateJSON();
}

function gotFourStar(data){
    //console.log(data);
    data.parentNode.children[2].textContent = 0;
    updateJSON();
}

function toggleGuarantee(data){
    if(data.classList.contains("guaranteed")){
        data.classList.remove("guaranteed");
    }else{
      data.classList.add("guaranteed");
    }
    updateJSON();
}

function updateJSON(){
    // Update the localStorage JSON Object
    let tileData = [];
    for(i = 0; i < document.getElementById("mainTiles").children.length; i++){
        let children = document.getElementById("mainTiles").children;
        //console.log(children[i]);
        let tileArray = [];
        //console.log(children[i].children[0].textContent)
        tileArray.push(children[i].children[0].textContent)
        tileArray.push(children[i].children[1].textContent)
        tileArray.push(children[i].children[2].textContent)
        if(children[i].children[10].classList.contains("guaranteed")){
            tileArray.push("true");
        }else{
            tileArray.push("false");
        }
        tileData.push(tileArray);
    }
    //console.log(tileData);

    localStorage.setItem("tileData", JSON.stringify(tileData));
    console.log(arguments.callee.name + ": Updated JSON.");
}

function updateCurrentTheme(){
    // Update the localStorage JSON Object for currentTheme [color1, color2, color3, color4, font]
    let currentTheme = [];
    currentTheme[0] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--textColor");
    currentTheme[1] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--backgroundColor");
    currentTheme[2] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor1");
    currentTheme[3] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--boxShadowColor2");
    currentTheme[4] = getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--customFont");

    localStorage.setItem("currentTheme", JSON.stringify(currentTheme));
}
