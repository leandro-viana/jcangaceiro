// client/app/app.js
import{NegociacaoController} from './controllers/NegociacaoController.js';
import{ debounce } from './util/index.js';
// criou a instância do controller
const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);
$('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));
$('#botao-apaga')
    .addEventListener('click', controller.apaga.bind(controller));
//associando o evento à chamada do método
$('#botao-importa')
    .addEventListener('click', debounce(() => {
        console.log('EXECUTOU A OPERAÇÃO DO DEBOUNCE');
        controller.importaNegociacoes();
    },1000));
