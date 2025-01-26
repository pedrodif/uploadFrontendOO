import { FeedbackAPIClient } from '../api-client/FeedbackAPIClient.js'

import { FeedbackNovo } from '../model/feedback/FeedbackNovo.js'
import { FeedbackAtualizado } from '../model/feedback/FeedbackAtualizado.js'

export class FeedbackService {
    constructor() {
        this.feedbackAPIClient = new FeedbackAPIClient()
    }

    async criar(feedback) {
        try {
            const feedbackValidado = new FeedbackNovo(feedback)
            const resposta = await this.feedbackAPIClient.post(feedbackValidado)
            return resposta
        } catch (error) {
            return { erro: error.message }
        }
    }

    async atualizar(id, feedbackRecuperado, feedbackAtualizado) {
        try {
            const feedbackValidado = new FeedbackAtualizado(feedbackRecuperado, feedbackAtualizado)
            const resposta = await this.feedbackAPIClient.put(id, feedbackValidado)
            return resposta
        } catch (error) {
            return { erro: error.message }
        }
    }

    async listarPorGestorEColaborador(gestorId, colaboradorId) {
        try {
            const resposta = await this.feedbackAPIClient.getByGestorAndColaboradorId(gestorId, colaboradorId)
            return resposta
        } catch (error) {
            return { erro: error.message }
        }
    }

    async listarPorColaborador(colaboradorId) {
        try {
            const resposta = await this.feedbackAPIClient.getByColaboradorId(colaboradorId)
            return resposta
        } catch (error) {
            return { erro: error.message }
        }
    }

    async recuperarPorId(id) {
        try {
            const resposta = await this.feedbackAPIClient.getById(id)
            return resposta
        } catch (error) {
            return { erro: error.message }
        }    
    }

    async deletar(id) {
        try {
            const resposta = await this.feedbackAPIClient.delete(id)
            return resposta 
        } catch (error) {
            return { erro: error.message }
        }
    }
}