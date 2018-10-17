// client/app/domain/negociacao/Negociacoes.js

class Negociacoes{
    constructor(){
        this._negociacoes = [];
    }
    adiciona(negociacao){
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
}