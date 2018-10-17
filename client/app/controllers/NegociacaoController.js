// client/app/controllers/NegociacaoController.js
class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoes = new Negociacoes();
        // passamos para o construtor o seletor CSS  de ID
        this._negociacoesView = new NegociacoesView('#negociacoes');
        //atualizando a view, recebe inicialmente o modelo que encapsula uma lista vazia
        this._negociacoesView.update(this._negociacoes);
    }
    adiciona(event){
        // cancelando a submissão do formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._CriaNegociacao());
        this._negociacoesView.update(this._negociacoes);
        // limpando formulário
        this._limparFormulario();
        
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
}