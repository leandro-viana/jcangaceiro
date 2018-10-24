// client/ap/ui/models/Mensagem.js
export class Mensagem{
    // se não for passado, será uma string em branco
    constructor(texto=''){
        this._texto = texto;
    }
    get texto(){
        return this._texto;
    }
    set texto(texto){
        this._texto = texto;
    }
}