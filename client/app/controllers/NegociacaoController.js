// client/app/controllers/NegociacaoController.js
class NegociacaoController{
    constructor(){
        const $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');        
        
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
    }
    adiciona(event){
        
        try{
            event.preventDefault();
            this._negociacoes.adiciona(this._CriaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limparFormulario();
        } catch(err){
            console.log(err);
            console.log(err.stack);
            if(err instanceof DataInvalidaException){
                this._mensagem.texto = err.message;
            }else{
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte.'
            }
        }


        // cancelando a submissão do formulário
        event.preventDefault();
        this._negociacoes.adiciona(this._CriaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
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
    // Chamada do botão "Apagar"
    apaga(){
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
}