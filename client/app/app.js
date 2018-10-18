// client/app/app.js
// criou a instância do controller
const controller = new NegociacaoController();
// associa o evento de submissão do formulário à chamada do método "adiciona"
document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));
// buscando o elemento pelo seu ID
document
    .querySelector('#botao-apaga')
    .addEventListener('click', controller.apaga.bind(controller));