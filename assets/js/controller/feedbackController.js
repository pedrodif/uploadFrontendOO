import { Utils } from '../utils/main.js'

import { Toast } from '../view/components/toast.js'
import { Loader } from '../view/components/loader.js'

import { FeedbackView } from '../view/feedbackView/main.js'
import { FeedbackService } from '../service/feedbackService.js'

export class FeedbackController {
    constructor() {
        this.feedbackView = new FeedbackView() 
        this.feedbackService = new FeedbackService()
        this.feedbackRecuperado = null
    }

    async listarFeedbacks() {
        Loader.getLoader().show()

        let feedbacks = []
        const { colaboradorId, gestorId } = this.consultarParametros()

        if(!this.gestorId) {
            feedbacks = await this.feedbackService.listarPorColaborador(colaboradorId)
        } else {
            feedbacks = await this.feedbackService.listarPorGestorEColaborador(gestorId, colaboradorId)
        }

        Loader.getLoader().hide()

        if(!feedbacks) {
            Toast.getToast().show('Erro ao listar feedbacks.', 'erro')
            return
        }
        
        this.feedbackView.listarFeedbacks(feedbacks)
    }

    async criar(feedback) {
        Loader.getLoader().show()
        const { colaboradorId, gestorId, monitorId } = this.consultarParametros()

        const feedbackCriado = await this.feedbackService.criar({
            ...feedback, 
            colaboradorId,
            gestorId: gestorId ?? monitorId
        })

        Loader.getLoader().hide()

        if(!feedbackCriado) {
            Toast.getToast().show('Erro ao criar feedback.', 'erro')
            return 
        } 
        
        Toast.getToast().show('Feedback criado com sucesso!', 'sucesso')
        this.feedbackView.atualizarListaFeedbacks(feedbackCriado)
    }

   
    async recuperarFeedbackPorId() {
        Loader.getLoader().show()
        const { feedbackId } = this.consultarParametros()

        this.feedbackRecuperado = await this.feedbackService.recuperarPorId(feedbackId)
        Loader.getLoader().hide()

        if (!this.feedbackRecuperado) {
            Toast.getToast().show('Feedback não encontrado.', 'erro')
            return
        }

        this.feedbackView.getForm().definirValoresIniciais(this.feedbackRecuperado)
    }

    async atualizar(feedback) {
        Loader.getLoader().show()

        const feedbackAtualizado = await this.feedbackService.atualizar(this.feedbackRecuperado.id, {
            ...this.feedbackRecuperado,
            ...feedback,
            dataEdicao: Utils.gerenciarData()
        })

        Loader.getLoader().hide()
        
        if(!feedbackAtualizado) {
            Toast.getToast().show('Erro ao atualizar feedback.', 'erro')
            return 
        }

        Toast.getToast().show('eedback atualizado com sucesso!', 'sucesso')
        // Utils.adicionarParametroURL('modo', 'criar')
        this.listarFeedbacks()
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

    gerenciarForm() {    
        const { modo } = this.consultarParametros()

        switch (modo) {
            case 'detalhes':
                this.recuperarFeedbackPorId()
                this.feedbackView.getForm().submit(this.atualizar.bind(this))
                break
            default:
                this.feedbackView.getForm().definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                // this.feedbackView.getForm().genrenciarVisibilidadeCampos({ campos: 'dataEdicao' })
                this.feedbackView.getForm().submit(this.criar.bind(this))
                break
        }
    }
}