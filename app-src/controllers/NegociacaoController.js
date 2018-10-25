// client/app/controllers/NegociacaoController.js
import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index.js';
import {NegociacoesView, MensagemView, Mensagem, DateConverter} from '../ui/index.js';
import {getNegociacaoDao, Bind, getExceptionMessage, debounce, controller, bindEvent } from '../util/index.js'; 


@controller('#data', '#quantidade', '#valor')
export class NegociacaoController{
    constructor(_inputData, _inputQuantidade, _inputValor){
        
        Object.assign(this, {_inputData, _inputQuantidade, _inputValor})     
        
        // não passa mais "adiciona" e "esvazia" dentro de um aray

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );

        // não passa mais "texto" dentro de um array

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );
        this._service = new NegociacaoService();

        this._init();

    }

    async _init(){
	    try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
            
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
        }

    }
    @bindEvent('submit', '.form')
    @debounce()
    async adiciona(event){
        
        try{
            event.preventDefault();
            const negociacao = this._CriaNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limparFormulario();

        }catch(err){
            
            this._mensagem.texto = getExceptionMessage(err);
        }
        

        /*
        // cancelando a submissão do formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._CriaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        // limpando formulário
        this._limparFormulario();
        */
    }

    _limparFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }
    _CriaNegociacao(){
        //retorna uma instância de negociação
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
    // Chamada do botão "Apagar"
    @bindEvent('click', '#botao-apaga')
    async apaga(){
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso.';

        }catch (err){
            this._mensagem.texto = getExceptionMessage(err);
        }
    }
    @bindEvent('click', '#botao-importa')
    @debounce()
    async importaNegociacoes() {

        try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo();
            console.log(negociacoes);
            negociacoes.filter(novaNegociacao => 
                !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))

            .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        } catch (err){
            this._mensagem.texto = getExceptionMessage(err);
        }
       
    }

}