// client/app/domain/negociacao/Negociacoes.js

class Negociacoes{
    constructor(){
        this._negociacoes = [];
        // estratégia de atualização para ser chamada toda vez que algum método alterar o estado interno
        //this._armadilha = armadilha;
        // Congela a instância para impedir novas atribuições às propriedades da instância de um objeto
        Object.freeze(this);
    }
    adiciona(negociacao){
        // Não funciona se o object.freeze foi usado no construtor - >this._negociacoes.push(negociacao);
        // Nesse caso deve se utilizar -> this._negociacoes.length = 0;
        this._negociacoes.push(negociacao);
    }
    paraArray(){
        // retorna uma nova referência criada com os itens de this._negociacoes
        return [].concat(this._negociacoes);
    }
    get volumeTotal(){
        return this._negociacoes
            .reduce((total, negociacao)=>
                total + negociacao.volume, 0);
            
    
            
        let total = 0;
        for(let i=0; i<this._negociacoes.length;i++){
            total+=this._negociacoes[i].volume;
        }
        return total;
    }
    // Atribui um novo array sem elementos(vazio) à propriedade this._negociacoes quando o usuário clicar em "Apagar"
    esvazia(){
        this._negociacoes.length = 0;
    }
}