// RADIO BUTTON ------------------------------------------------------
console.log('hello world');
let radioButton = document.querySelectorAll('.radio-button');

radioButton.forEach(function(elemento) {
  elemento.onclick = function() {
    radioButton.forEach(function(elemento) {
      elemento.classList.remove('radio-button--checked');
    })
    this.classList.toggle('radio-button--checked');
  }
})

// DROPDOWN -----------------------------------------------------------
let containerItensDropdown = document.querySelector('.container-itens-dropdown--closed');
let headerDropdown = document.querySelector('.header-dropdown');
let icon = document.querySelector('.fa-angle-down');

headerDropdown.onclick = function() {
  containerItensDropdown.classList.toggle('container-itens-dropdown--opened');
  icon.classList.toggle('fa-angle-up');
}

// ESCOLHER ITEM DROPDOWN ---------------------------------------------

let itensDropdown = document.querySelectorAll('.item-dropdown');

function selecionarItem() {
  let itemSelecionado = this.textContent;
  headerDropdown.innerHTML = `${itemSelecionado} <i class="fa-solid fa-angle-down"></i>`;
  containerItensDropdown.classList.replace('container-itens-dropdown--opened', 'container-itens-dropdown--closed');
  icon.classList.replace('fa-angle-up', 'fa-minus');
}

for (let i = 1; i <= itensDropdown.length; i++) {
  if (itensDropdown[i]) {
    itensDropdown[i].addEventListener('click', selecionarItem);
  }
}

// CHECKBOXES --------------------------------------------------------------------

let checkboxes = document.querySelectorAll('.checkbox');
const checkboxEmail = document.querySelector("#checkboxEmail");
const checkboxSMS = document.querySelector("#checkboxSMS");
const checkboxMarcarDesmarcar = document.querySelector('#marcar-desmarcar');
let check = document.querySelector('#marcar-desmarcar i');

// MARCAR E DESMARCAR TODOS OS CHECKBOXES ----------------------------------------
checkboxMarcarDesmarcar.onclick = () => {
  const isChecked = checkboxMarcarDesmarcar.classList.contains('checkbox--checked');

  if (isChecked) {
    check.classList.replace('fa-minus', 'fa-check');
    checkboxMarcarDesmarcar.classList.replace('checkbox--checked', 'checkbox');
    checkboxEmail.classList.replace('checkbox--checked', 'checkbox');
    checkboxSMS.classList.replace('checkbox--checked', 'checkbox');
  } else {
    checkboxMarcarDesmarcar.classList.replace('checkbox', 'checkbox--checked');
    checkboxEmail.classList.replace('checkbox', 'checkbox--checked');
    checkboxSMS.classList.replace('checkbox', 'checkbox--checked');
  }
}

// MARCAR APENAS UM ----------------------------------------------------------------
checkboxEmail.addEventListener('click', () => {
  const isCheckedEmail = checkboxEmail.classList.contains('checkbox--checked');

  if (isCheckedEmail) {
    checkboxEmail.classList.remove('checkbox--checked');
    checkboxEmail.classList.add('checkbox');
  } else {
    checkboxEmail.classList.add('checkbox--checked');
    checkboxEmail.classList.remove('checkbox');
  }

  marcarCheckbox();
})

checkboxSMS.addEventListener('click', () => {
  const isCheckedSMS = checkboxSMS.classList.contains('checkbox--checked');
  
  if (isCheckedSMS) {
    checkboxSMS.classList.remove('checkbox--checked');
    checkboxSMS.classList.add('checkbox');
  } else {
    checkboxSMS.classList.add('checkbox--checked');
    checkboxSMS.classList.remove('checkbox');
  }
  marcarCheckbox();
})

// ----------------------------------------------------------------------------
function marcarCheckbox() {
  const isCheckedEmail = checkboxEmail.classList.contains('checkbox--checked');
  const isCheckedSMS = checkboxSMS.classList.contains('checkbox--checked');

  if (isCheckedEmail && isCheckedSMS) {
    check.classList.replace('fa-minus', 'fa-check');
    checkboxMarcarDesmarcar.classList.replace('checkbox', 'checkbox--checked');
  } else if (isCheckedEmail) {
    check.classList.replace('fa-check', 'fa-minus');
    checkboxMarcarDesmarcar.classList.replace('checkbox', 'checkbox--checked');
  } else if (isCheckedSMS) {
    check.classList.replace('fa-check', 'fa-minus');
    checkboxMarcarDesmarcar.classList.replace('checkbox', 'checkbox--checked');
  } else {
    check.classList.replace('fa-minus', 'fa-check');
    checkboxMarcarDesmarcar.classList.replace('checkbox--checked', 'checkbox');
  }
}

// JANELA DE ERRO ---------------------------------------------------
const modal = document.getElementById('modal');
const conteudoErro = document.getElementById('conteudo-erro');
const x = document.getElementById('x')
// VALIDAÇÃO DOS CAMPOS ---------------------------------------------
const form = document.querySelector('form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
let telefone = document.querySelector('#telefone');
const mensagem = document.querySelector('#mensagem');
const submit = document.querySelector('#botao-submit');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const erros = [];

  // VALIDANDO O NOME ----------------------------------------------
  const nomes = nome.value.trim().split(" ");
  if (nomes.length < 2) {
    erros.push('Digite um nome válido com pelo menos dois nomes.');
  }

  // VALIDANDO O EMAIL ---------------------------------------------
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (email.value.length === 0 || regexEmail.test(email.value)) {
    erros.push('Digite um email válido.');
  }

  // VALIDANDO O TELEFONE -------------------------------------------
  if (telefone.value !== '') {
    const telefoneLimpo = telefone.value.replace(/[-() A-z]/g, '');

    if (telefoneLimpo.length !== 11) {
      erros.push('Digite um número de telefone válido.');
    }
  } else {
    erros.push('O campo do telefone está vazio. Digite um número de telefone válido.');
  }

  // VALIDANDO A MENSAGEM --------------------------------------------
  if (mensagem.value.length < 5) {
    erros.push('Insira uma mensagem com pelo menos cinco caracteres.');
  }

  // VALIDANDO AS PREFERÊNCIAS ---------------------------------------
  let radioButtonChecked = false;
  radioButton.forEach((elemento) => {
    if (elemento.classList.contains('radio-button--checked')) {
      radioButtonChecked = true;
    }
  });

  if (!radioButtonChecked) {
    erros.push('Escolha uma preferência.');
  }

  // VALIDANDO A CARNE FAVORITA --------------------------------------
  if (headerDropdown.innerText === 'Selecione uma carne...') {
    erros.push('Escolha uma carne favorita.');
  }

  // EXIBIR ERRO OU ENVIAR O FORM -----------------------------------
  const h4Modal = document.getElementById('h4-modal');
  if (erros.length > 0) {
    // EXIBIR ERROS -------------------------------------------------
    h4Modal.innerHTML = 'Erro no Formulário';
    conteudoErro.innerHTML = '<ul>' + erros.map(erro => `<li>${erro}</li>`).join('') + '</ul>';
    modal.classList.replace('modal--closed', 'modal--opened');
  } else {
    // ENVIAR 
    h4Modal.innerHTML = 'Mensagem enviada';
    conteudoErro.innerHTML = 'Agradecemos pela sua preferência!';
    modal.classList.replace('modal--closed', 'modal--opened');
  }
});

x.onclick = () => {
  modal.classList.replace('modal--opened', 'modal--closed');
}


