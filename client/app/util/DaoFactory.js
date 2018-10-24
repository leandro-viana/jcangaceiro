// client/app/util/DaoFactory.js
function getNegociacaoDao(){
    return ConnectionFactory
        .getConnection()
        .then(conn => new NegociacaoDao(conn));
}