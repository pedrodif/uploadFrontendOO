import { Url } from '../utils/Url.js'
import { Notificador } from '../utils/Notificador.js'
import { RequestHelper } from '../utils/RequestHelper.js'
export class FeedbackController {
    constructor(feedbackView, feedbackService) {
        this.feedbackView = feedbackView
        this.feedbackService = feedbackService
        this.feedbackRecuperado = null
    }

    getFeedbackView() {
        return this.feedbackView
    }

    async listarFeedbacks() {
        const { colaboradorId, gestorId } = Url.consultarParametros()

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.listarPorGestorEColaborador(gestorId, colaboradorId)
        )

        Notificador.resposta(resposta, 'listar')
        return resposta
    }

    async recuperarFeedbackPorId() {
        const { feedbackId } = Url.consultarParametros()

        this.feedbackRecuperado = await RequestHelper.executar(
            () => this.feedbackService.recuperarPorId(feedbackId)
        )

        Notificador.resposta(this.feedbackRecuperado, 'recuperar')
        return this.feedbackRecuperado
    }

    async criar(feedback) {
        const { colaboradorId, gestorId, monitorId } = Url.consultarParametros()

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.criar({ ...feedback, colaboradorId, gestorId: gestorId ?? monitorId })
        )

        Notificador.resposta(resposta, 'criar')
        return resposta
    }

    async atualizar(feedbackAtualizado) {
        const { id } = this.feedbackRecuperado

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.atualizar(id, this.feedbackRecuperado, feedbackAtualizado)
        )

        Notificador.resposta(resposta, 'atualizar')
        return resposta
    }
}
