const btn = document.querySelectorAll('form button');
const form = document.querySelector('form');
const inpt = document.querySelectorAll('input');
const amount = document.querySelector('.tip-amount_amount');
const total = document.querySelector('.total-amount');
const reset = document.getElementById('reset');
let finished = false;


const exprN = new RegExp(/^[1-9]$|^[1-9]+[\.]?[0-9]+$/);
const exprC = new RegExp(/([A-ZñÑa-z]+)/);


const validateChar = (input)=>{
    if (exprN.test(input.value) == false) {
        document.querySelector(`#label-${input.name}`).classList.add('zero-label');
        document.querySelector(`#label-${input.name}`).classList.remove('one');
        document.querySelector(`.${input.name}-container`).classList.add('zero-input');
        input.classList.remove('ok');
    }
    else {
        document.querySelector(`#label-${input.name}`).classList.remove('zero-label');
        document.querySelector(`#label-${input.name}`).classList.add('one');
        document.querySelector(`.${input.name}-container`).classList.remove('zero-input')
        input.classList.add('ok');

    }
}
const validateFloat = (input)=>{
    if (exprN.test(input.value) == false || exprC.test(input.value) || input.value == '') {
        document.querySelector(`#label-${input.name}`).classList.add('zero-label');
        document.querySelector(`#label-${input.name}`).classList.remove('one');
        document.querySelector(`.${input.name}-container`).classList.add('zero-input');
        input.classList.remove('ok');
        let newValue = input.value = '0.00';
        input.value = newValue;
    }
    else if(input.value.indexOf('.') === -1){
        document.querySelector(`#label-${input.name}`).classList.remove('zero-label');
        document.querySelector(`#label-${input.name}`).classList.add('one');
        document.querySelector(`.${input.name}-container`).classList.remove('zero-input')
        input.classList.add('ok');

        let newValue = input.value.concat('.00');
        input.value = newValue;
    }
    else{
        document.querySelector(`#label-${input.name}`).classList.remove('zero-label');
        document.querySelector(`#label-${input.name}`).classList.add('one');
        document.querySelector(`.${input.name}-container`).classList.remove('zero-input')
        input.classList.add('ok');

    }
}
const validateInt = (input) =>{
    if (exprN.test(input.value) == false || exprC.test(input.value) || input.value == '') {
        document.querySelector(`#label-${input.name}`).classList.add('zero-label');
        document.querySelector(`#label-${input.name}`).classList.remove('one');
        document.querySelector(`.${input.name}-container`).classList.add('zero-input');
        input.classList.remove('ok');
        let newValue = input.value = '0';
        input.value = newValue;
    }
}
const calculate = (buttom)=>{
    if (inpt[0].classList.contains('ok') && inpt[1].classList.contains('ok')) {
        let bill = parseFloat(inpt[0].value);
        let people = parseInt(inpt[1].value);
        let percentage = parseInt(buttom.value)
        
        let tip = ((percentage * bill) / 100) / people;
        let billPerson = bill / people;

        amount.textContent = parseFloat(tip).toFixed(2);
        total.textContent = parseFloat(billPerson).toFixed(2)

        document.getElementById('reset').classList.remove('disabled');
        document.getElementById('reset').classList.add('activated');

        finished = true;
    }
    else{
        validateChar(inpt[0])
        validateFloat(inpt[0])
        validateChar(inpt[1]);
        finished = false;
    }

}

inpt.forEach(input => {
    if (input.name == 'bill') {
        input.addEventListener('keyup', ()=>{
            validateChar(input);    
        });
        input.addEventListener('focusout', ()=>{
            validateFloat(input);
        });
        input.addEventListener('click', ()=>{
            if(input.value = '0.00') input.value = ''
        });   
    }
    else{
        input.addEventListener('keyup', ()=>{
            validateChar(input);
        })
        input.addEventListener('focusout', ()=>{
            validateInt(input)
        })
    }
})
btn.forEach(btn =>{
    if (exprN.test(btn.value)) {
        btn.addEventListener('click', (e)=>{
            e.preventDefault()
            calculate(btn)
        })
    }
    else{
        btn.addEventListener('click', (e)=>{
            e.preventDefault()
            btn.contentEditable = true;
            btn.value = btn.textContent;
            if (exprN.test(btn.value)) {
                calculate(btn)    
            }
        })
    }
})
reset.addEventListener('click', ()=>{
    if(finished){
        form.reset()
        amount.textContent = '0.00';
        total.textContent = '0.00';
        reset.classList.replace('activated', 'disabled');
    }
})