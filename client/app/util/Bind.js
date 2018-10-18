// client/app/util/Bind.js
class Bind{
    // usa-se ... antes do props para que não precisa usar array no construtor de NegociacaoController
    constructor(model, view, ...props){
        const proxy = ProxyFactory.create(model, props, model => {
            view.update(model)
        });
        view.update(model);
        return proxy;
    }
}