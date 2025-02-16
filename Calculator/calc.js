const display = document.getElementById('display');
function append(element){
    if (element === '*'){
        display.value += 'x';
    }

    else{
        display.value += element;
    }

    display.scrollLeft = display.scrollWidth;
}

function clearDisplay(){
    display.value = '';
}

function calculate(){
    display.value = display.value.replaceAll('x', '*');
    try{
        display.value = eval(display.value);
    } catch {
        display.value = "Error:";
    }
}

function deleteElement(){
    display.value = display.value.slice(0, -1);
}
