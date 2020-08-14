// declarations
const in1 = document.getElementById('in1');
const in2 = document.getElementById('in2');
const newCur = document.getElementById('new-cur');
const newRate = document.getElementById('new-rate');

const addBtn = document.getElementById('add-btn');
const themeBtn = document.getElementById('toggle');

const select1 = document.getElementById('sel1');
const select2 = document.getElementById('sel2');

// event listeners
in1.addEventListener('input', function() {convert(in1, in2)});
in2.addEventListener('input', function() {convert(in2, in1)});

// disable e key
[in1, in2, newRate].forEach(inField => {
    inField.addEventListener('keydown', function () {
        if (event.keyCode == 69 || event.keyCode == 187 || event.keyCode == 189) {
            event.preventDefault();
        }
    });
});

// edit later for enter keydown
// in1.addEventListener('keydown', function() {convert(in1, in2)});
// in2.addEventListener('keydown', function() {convert(in2, in1)});

themeBtn.addEventListener('click', switchTheme);
addBtn.addEventListener('click', function() {isNewCurValid(newCur)});
select2.addEventListener('input', function() {convert(in1, in2)});
select1.addEventListener('input', function() {convert(in2, in1)});

// converts between the two input fields
function convert(base, quote) {
    let disRate = document.getElementById('rate-value');
    let baseRate = 0;
    let quoteRate = 0;
    let accuRate = 0;

    if (base === in1) {
        // I didn't know how beter to do this than with two loops
        for (const note of currencies) {
            if (select1.value === note.name) {
                baseRate = note.dolRate;
            }
        }
        for (const note of currencies) {
            if (select2.value === note.name) {
                quoteRate = note.dolRate;
            }
        }

        accuRate = quoteRate/baseRate;
        quote.value = Number(base.value * accuRate).toFixed(2);
        disRate.innerHTML = accuRate.toFixed(4);
    }

    else if (base === in2) {
        for (const note of currencies) {
            if (select1.value === note.name) {
                quoteRate = note.dolRate;
            }
        }
        for (const note of currencies) {
            if (select2.value === note.name) {
                baseRate = note.dolRate;
            }
        }

        accuRate = quoteRate/baseRate;
        quote.value = Number(base.value * accuRate).toFixed(2);
        disRate.innerHTML = accuRate.toFixed(4);
    }
}

// creates and adds a new currency to the database and the select's options
function addNewCur(symbol, dRate) {
    let toPush = {};
    let cur = document.createElement('option');

    if (newCur.value && newRate.value) {
        cur.setAttribute('class', 'curr');
        cur.setAttribute('value', symbol.value);
        cur.innerHTML = symbol.value.toUpperCase();
        let curClone = cur.cloneNode(true);
    
        toPush['name'] = symbol.value;
        toPush['dolRate'] = Number(dRate.value);
        currencies.push(toPush);
        select1.appendChild(cur);
        select2.appendChild(curClone);
        newCur.value = '';
        newRate.value = '';
    }
    else {
        alert('Please fill both fields');
    }
}

// checks if the new currency already exists to avoid reassignment
function isNewCurValid(sym) {
    let valid = true;
    for (let note of currencies) {
        if (sym.value !== note.name) {}
        else {
            valid = false;
        }
    }

    if (valid) {
        addNewCur(sym, newRate);
    }
    else {
        alert('Currency already exists');
        sym.value = '';
        newRate.value = '';
    }
}

function switchTheme() {
    let theme = document.getElementById('theme');
    if (theme.getAttribute('href') == 'dark.css') {
        theme.href = 'light.css';
    }
    else {
        theme.href = 'dark.css';
    }
}

const currencies = [
    {
        name: 'usd',
        dolRate: 1,
    },
    {
        name: 'eur',
        dolRate: 0.85,
    },
    {
        name: 'gbp',
        dolRate: 0.76,
    },
    {
        name: 'nar',
        dolRate: 383.5,
    },
    {
        name: 'btc',
        dolRate: 0.000085,
    },
];

