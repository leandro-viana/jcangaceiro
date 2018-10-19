// client/app/domain/negociacao/NegociacaoService.js
class NegociacaoService{
    obterNegociacoesDaSemana(cb){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            /* Utilizar o estado 4 que é o estado que a requisição ao servidor está concluída
             e a resposta está pronta. Também verificar se o status é 200 para garantir que
             a operação teve sucesso e não houve erro.
            */
            if(xhr.readyState == 4){
                if(xhr.status ==200){
                    
                    // Converte cada objeto para uma instância de Negociacao
                    const negociacoes = JSON
                        .parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    // Operação concluída sem erro
                        cb(null,negociacoes);
                } else{
                    console.log(xhr.responseText);
                    // Erro na operação
                    cb('Não foi possível obter nas negociações da semana', null);
                }
            }
        };
        // executa a requisição configurada
        xhr.send(); 
    }
}
