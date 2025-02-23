let is12Hour = false; 

const hrFormat = document.getElementById('hrFormat');

function formatHours(hours) {
    if (is12Hour) {
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return { hours: hours.toString().padStart(2, '0'), ampm };
    }
    return { hours: hours.toString().padStart(2, '0'), ampm: '' };
}

function updateClock() {
    let now = new Date();
    let { hours, ampm } = formatHours(now.getHours());
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('hrs').textContent = hours;
    document.getElementById('min').textContent = minutes;
    document.getElementById('sec').textContent = seconds;
    
    const ampmElement = document.getElementById('ampm');
    if (ampmElement) {
        ampmElement.textContent = ampm;
    }
}

function btnSpin(){
    const toggle = document.getElementById('toggle-element');
    const hr = document.getElementById('hr');

    is12Hour = !is12Hour; 
    if(is12Hour){
        toggle.style.transform = 'translate(30px)';
        toggle.textContent = '12';
        hr.style.left = '-18px';
    } else {
        toggle.style.transform = 'translate(0)';
        toggle.textContent = '24';
        hr.style.left = '5px';
    }
    updateClock(); 
}

updateClock();  
setInterval(updateClock, 1000);