import { NovoFeedback } from '../model/feedback/NovoFeedback.js'
import { FeedbackAPIClient } from '../api-client/FeedbackAPIClient.js'

export class FeedbackService {
    constructor() {
        this.feedbackAPIClient = new FeedbackAPIClient()
    }

    async criar(feedback) {
        try {
            const feedbackValidado = new NovoFeedback(feedback)
            const feedbackCriado = await this.feedbackAPIClient.createFeedback(feedbackValidado)
            return feedbackCriado
        } catch (error) {
            return error.message
        }
    }

    async atualizar(id, feedback) {
        const feedbackAtualizado = await this.feedbackAPIClient.updateFeedback(id, feedback)
        return feedbackAtualizado
    }

    async listarPorGestorEColaborador(gestorId, colaboradorId) {
        const feedbacksRecuperados =
            await this.feedbackAPIClient.getFeedbacksByGestorIdAndColaboradorId(gestorId, colaboradorId)

        return feedbacksRecuperados
    }

    async listarPorColaborador(colaboradorId) {
        const feedbacksRecuperados = await this.feedbackAPIClient.getFeedbacksByColaboradorId(colaboradorId)
        return feedbacksRecuperados
    }

    async recuperarPorId(id) {
        const feedbackRecuperado = await this.feedbackAPIClient.getFeedbackById(id)
        return feedbackRecuperado
    }


    deletar(id) {
        return 'deletado com sucesso'
    }
}