export class FeedbackModel {
    constructor(feedbackRepository) {
        this.feedbackRepository = feedbackRepository
    }

    async criar(feedback) {
       const feedbackCriado = await this.feedbackRepository.createFeedback(feedback)
       return feedbackCriado 
    }

    async atualizar(id, feedback) {
        const feedbackAtualizado = await this.feedbackRepository.updateFeedback(id, feedback)
        return feedbackAtualizado 
    }
    
    async listarPorGestorEColaborador(gestorId, colaboradorId) {
       const feedbacksRecuperados = 
            await this.feedbackRepository.getFeedbacksByGestorIdAndColaboradorId(gestorId, colaboradorId)
            
       return feedbacksRecuperados
    }

    async listarPorColaborador(colaboradorId) {
        const feedbacksRecuperados = await this.feedbackRepository.getFeedbacksByColaboradorId(colaboradorId)
        return feedbacksRecuperados
    }

    async recuperarPorId(id) {
        const feedbackRecuperado = await this.feedbackRepository.getFeedbackById(id)
        return feedbackRecuperado
    }


    deletar(id) {
        return 'deletado com sucesso'
    }
}