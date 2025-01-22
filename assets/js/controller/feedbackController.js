import { Utils } from '../utils/main.js'

export class FeedbackController {
    constructor(feedbackModel, feedbackView) {
        this.feedbackView = feedbackView 
        this.feedbackModel = feedbackModel
        this.feedbackRecuperado = null
    }

    async listarFeedbacks() {
        let feedbacks = []
        const { colaboradorId, gestorId } = this.consultarParametros()

        if(!this.gestorId) {
            feedbacks = await this.feedbackModel.listarPorColaborador(colaboradorId)
        } else {
            feedbacks = await this.feedbackModel.listarPorGestorEColaborador(gestorId, colaboradorId)
        }
        
        this.feedbackView.listarFeedbacks(feedbacks)
    }

    async criar(feedback) {
        const { colaboradorId, gestorId, monitorId } = this.consultarParametros()

        const feedbackCriado = await this.feedbackModel.criar({
            ...feedback, 
            dataCriacao: Utils.gerenciarData(),
            colaboradorId: +colaboradorId,
            gestorId: gestorId ? +gestorId : +monitorId
        })

        if(!feedbackCriado) {
            alert('Erro ao criar feedback')
            return 
        } 
        
        alert('Feedback criado com sucesso')
        this.feedbackView.atualizarListaFeedbacks(feedbackCriado)
    }

   
    async recuperarFeedbackPorId() {
        const { feedbackId } = this.consultarParametros()

        this.feedbackRecuperado = await this.feedbackModel.recuperarPorId(feedbackId)
        
        if (!this.feedbackRecuperado) {
            alert('Feedback não encontrado')
            return
        }

        this.feedbackView.getForm().definirValoresIniciais(this.feedbackRecuperado)
    }

    async atualizar(feedback) {
        const feedbackAtualizado = await this.feedbackModel.atualizar(this.feedbackRecuperado.id, {
            ...this.feedbackRecuperado,
            ...feedback,
            dataEdicao: Utils.gerenciarData()
        })
        
        if(!feedbackAtualizado) {
            alert('Erro ao atualizar feedback')
            return 
        }

        alert('Feedback atualizado com sucesso')
        // Utils.adicionarParametroURL('modo', 'criar')
        this.listarFeedbacks()
    }

    gerenciarForm() {    
        const { modo } = this.consultarParametros()

        switch (modo) {
            case 'detalhes':
                this.recuperarFeedbackPorId()
                this.feedbackView.getForm().submit(this.atualizar.bind(this))
                break
            default:
                this.feedbackView.getForm().definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                this.feedbackView.getForm().submit(this.criar.bind(this))
                break
        }
    }

    consultarParametros() {
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