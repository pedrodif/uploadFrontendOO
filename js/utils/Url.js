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
}