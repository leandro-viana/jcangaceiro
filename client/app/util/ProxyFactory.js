// client/app/util/ProxyFactory.js
class ProxyFactory{
    static create(objeto, props, armadilha){
            //recebe um objeto como parâmetro
        return new Proxy(objeto,{
            get(target, prop, receiver){
                
                if(ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)){

                        return function(){
                            console.log(`"${prop}" disparou a armadilha`);
                            target[prop].apply(target, arguments);
                            // executa a armadilha que recebe o objeto original
                            armadilha(target);
                        }
                    }else{
                        return target[prop];
                    }
            },
                       
            set(target, prop, value, receiver){
                const updated = Reflect.set(target, prop, value);
                // A armadilha só deve ser executado se fizer parte da lista de Props
                if(props.includes(prop)) armadilha(target);
                return updated;
            }
        });        
    }
    static _ehFuncao(fn){
        return typeof(fn) == typeof(Function);
    }
}