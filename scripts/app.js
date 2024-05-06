const buttons = document.querySelectorAll('button');
const inputTipPercentage = document.getElementById('tip');
const inputBillCost = document.getElementById('bill');
const inputPersonAmout = document.getElementById('people');

const tipElement = document.getElementById('tipPerPerson');
const totalElement = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('resetButton');

const errText = document.getElementById('err');

let percentage = 0;
let billCost = 0;
let personAmout = 0;

let inputBillActive = false;
let btnActive = false;
let inputTipActive = false;
let inputPeopleActive = false;

const check_cal = () => {

    var tip = billCost * percentage;
    var tipPer = tip/personAmout;
    var total = (parseFloat(billCost) + parseFloat(tip))/personAmout;

    if (typeof tipPer === 'number' && !isNaN(tipPer) && isFinite(tipPer) &&
        typeof total  === 'number' && !isNaN(total)  && isFinite(total)) {
        tipElement.innerHTML = '$' + tipPer.toFixed(2);
        totalElement.innerHTML = '$' + total.toFixed(2);
    } else {
        tipElement.innerHTML = '$0.00';
        totalElement.innerHTML = '$0.00';
    }

    if (inputBillActive || btnActive || inputTipActive || inputPeopleActive) {
        resetBtn.classList.add('active');
        resetBtn.removeAttribute('disabled');
        resetBtn.addEventListener('click' , ()=>{location.reload();});
    } else {
        resetBtn.setAttribute('disabled' , true);
    }
};

buttons.forEach(button => {
    button.addEventListener('click' , () => {
        buttons.forEach(unselectedButton => {
            unselectedButton.classList.remove('active');
            inputTipPercentage.value = '';
        });
        percentage = button.value / 100; 
        btnActive = percentage !== '' ? true : false;
        inputTipActive = false
        button.classList.add('active');
        check_cal();

        inputTipPercentage.addEventListener('focus',()=>{
            button.classList.remove('active');
            btnActive = false;
        });
    })
});

inputTipPercentage.addEventListener('input',() => {
    percentage = inputTipPercentage.value  / 100;
    inputTipActive = percentage !== '' ? true : false;
    check_cal();

});

inputPersonAmout.addEventListener('input' , () => {
    personAmout = inputPersonAmout.value;
    if (personAmout == 0) {
        inputPersonAmout.classList.add('invalid');
        errText.style.display = 'flex';
    } else {
        inputPersonAmout.classList.remove('invalid');
        errText.style.display = 'none';
    }
    inputPeopleActive = personAmout !== '' ? true : false;
    check_cal();

});

inputBillCost.addEventListener('input' , () => {
    billCost = inputBillCost.value;
    inputBillActive = billCost !== '' ? true : false;
    check_cal();

});

