const textboxBill = document.querySelector('#bill');
const divBill = document.querySelector('.bill-container');
const textboxPeople = document.querySelector('#people');
const divPeople = document.querySelector('.people-container');

textboxBill.addEventListener('focusin', ()=>{
    divBill.classList.add('focuseado')
})
textboxBill.addEventListener('focusout', ()=>{
    divBill.classList.remove('focuseado')
})
textboxPeople.addEventListener('focusin', ()=>{
    divPeople.classList.add('focuseado')
})
textboxPeople.addEventListener('focusout', ()=>{
    divPeople.classList.remove('focuseado')
})