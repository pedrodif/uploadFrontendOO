export class Url {
    static consultarParametros() {
        const urlParams = new URLSearchParams(window.location.search)
        return {
            modo: urlParams.get("modo"),
            gestorId: urlParams.get("gestorId"),
            monitorId: urlParams.get("monitorId"),
            feedbackId: urlParams.get("feedbackId"),
            colaboradorId: urlParams.get("colaboradorId")
        }
    }

    static adicionarParametroURL(parametro, valor) {
        const urlAtual = new URL(window.location.href)
        urlAtual.searchParams.set(parametro, valor)
        window.history.pushState({}, '', urlAtual)
    }
    
    static removerParametroURL(parametro) {
        const buscarParametro = new URLSearchParams(window.location.search)
        buscarParametro.delete(parametro)
        window.history.replaceState({}, '', window.location.pathname + '?' + buscarParametro.toString())
    }
}