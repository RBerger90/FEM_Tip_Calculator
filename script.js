const btn5 = document.getElementById("btn-5");
const btn10 = document.getElementById("btn-10");
const btn15 = document.getElementById("btn-15");
const btn25 = document.getElementById("btn-25");
const btn50 = document.getElementById("btn-50");
const btnCtm = document.getElementById("btn-ctm");
const resetBtn = document.getElementById("btn-reset");
let billVal = document.getElementById("bill-input").value;
let billInput = document.getElementById("bill-input");
let billLabel = document.getElementById("bill-label");
let peopVal = document.getElementById("nb-ppl-input").value;
let peopInput = document.getElementById("nb-ppl-input");
let pplLabel = document.getElementById("ppl-label");
let persVal = 0;
let billEnter = false;
let peopEnter = false;
let persSelec = false;
let customUse = false;
let tip = document.getElementById("tip");
let total = document.getElementById("total");



function percSelec(perc){
    persSelec = true;
    clearPerc("active-perc");
    switch(perc){
        case 5:
            addClass(btn5, "active-perc");
            persVal = 5;
            break;
        case 10:
            addClass(btn10, "active-perc");
            persVal = 10;
            break;
        case 15:
            addClass(btn15, "active-perc");
            persVal = 15;
            break;
        case 25:
            addClass(btn25, "active-perc");
            persVal = 25;
            break;
        case 50:
            addClass(btn50, "active-perc");
            persVal = 50;
            break;
        default:
            customUse = true;
            btnCtm.placeholder = "0";
            addClass(btnCtm, "newValue");
            if(perc > 100){
                btnCtm.value = 100;
            }
            persVal = btnCtm.value;
    }
    whatCost();
}

function selectCustom(){
    if(customUse){
        clearPerc("active-perc");
        addClass(btnCtm, "newValue");
        whatCost();
    }
}

function clearPerc(remCl){
    let els = document.getElementsByClassName(remCl);
    for(i =0; i< els.length; i ++){
        removeClass(els[i], remCl);
    }
    removeClass(btnCtm, "newValue");
}

function newBill(v){
    billVal = v;
    if(billVal > 0){
        billEnter = true;
        addClass(billInput, "newValue");
        removeClass(billInput, "wrongInput");
        removeClass(billLabel, "wrongInput");
    }else{
        billEnter = false;
        addClass(billInput, "wrongInput");
        addClass(billLabel, "wrongInput");
    }
    whatCost();
}

function newPplNb(v){
    peopVal = v;
    if(peopVal > 0){
        peopEnter = true;
        addClass(peopInput, "newValue");
        removeClass(peopInput, "wrongInput");
        removeClass(pplLabel, "wrongInput");
    }else{
        peopEnter = false;
        addClass(peopInput, "wrongInput");
        addClass(pplLabel, "wrongInput");
    }
    whatCost();
}

function whatCost(){
    if((peopEnter === true)&&(billEnter === true)&&(persSelec === true)){
        addClass(resetBtn, "reset-possible");
        let totTip = (persVal * billVal) / 100;
        let tipPP = totTip / peopVal;
        let tot = totTip + Number(billVal);
        console.log(totTip);
        console.log(billVal);
        console.log(tot);
        let totPP = tot / Number(peopVal);
        console.log(totPP);
        tip.innerText = "$" + tipPP.toFixed(2);
        total.innerText = "$" + totPP.toFixed(2);
    }else{
        removeClass(resetBtn, "reset-possible");
        tip.innerText = "$0.00";
        total.innerText = "$0.00";
    }
}

function reset(){
    removeClass(resetBtn, "reset-possible");
    peopVal = 0;
    billVal = 0;
    persVal = 0;
    clearPerc("active-perc");
    removeClass(peopInput, "newValue");
    peopInput.value = "";
    peopEnter = false;
    removeClass(billInput, "newValue");
    billInput.value = "";
    billEnter = false;
    btnCtm.value = "";
    btnCtm.placeholder = "Custom";
    tip.innerText = "$0.00";
    total.innerText = "$0.00";
}




//Useful functions from plainjs.com to manipulate class
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

function toggleClass(el, className) {
    if(hasClass(el, className)){
        removeClass(el, className);
    }else{
        addClass(el, className);
    }
}