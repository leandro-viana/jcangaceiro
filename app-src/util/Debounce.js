// client/app-src/util/Debounce.ts
export function debounce(fn, milissegundos){
    // guarda o ID de um timer, 0 indica que não há nenhum
    let timer = 0;
    return () => {
        // par ao último timer definido
        clearTimeout(timer);
        // afeta a variável no escopo da função debounce
        timer = setTimeout(() => fn(), milissegundos);
    }
}