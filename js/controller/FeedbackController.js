import { Utils } from '../utils/Utils.js'
import { Toast } from '../view/components/Toast.js'
import { Loader } from '../view/components/Loader.js'

import { FeedbackView } from '../view/feedback/FeedbackView.js'
import { FeedbackService } from '../service/FeedbackService.js'

export class FeedbackController {
    constructor() {
        this.feedbackView = new FeedbackView() 
        this.feedbackService = new FeedbackService()
        this.feedbackRecuperado = null
    }

    async listarFeedbacks(variante = 'perfil') {
        Loader.getLoader().show()
        const { colaboradorId, gestorId } = this.consultarParametros()
    
        const resposta = variante === 'perfil' ? await this.feedbackService.listarPorColaborador(colaboradorId)
            : await this.feedbackService.listarPorGestorEColaborador(gestorId, colaboradorId)
    
        Loader.getLoader().hide()

        if(resposta?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }

        if(!resposta) {
            Toast.getToast().show('Erro ao listar feedbacks.', 'erro')
            return
        }
        
        this.feedbackView.listarFeedbacks(resposta)
    }

    async criar(feedback) {
        Loader.getLoader().show()
        const { colaboradorId, gestorId, monitorId } = this.consultarParametros()

        const resposta = await this.feedbackService.criar({
            ...feedback, 
            colaboradorId,
            gestorId: gestorId ?? monitorId
        })

        Loader.getLoader().hide()

        if(resposta?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }

        if(!resposta) {
            Toast.getToast().show('Erro ao criar feedback.', 'erro')
            return 
        } 
        
        Toast.getToast().show('Feedback criado com sucesso!', 'sucesso')
        this.feedbackView.atualizarListaFeedbacks(resposta)
    }

    async atualizar(feedbackAtualizado) {
        Loader.getLoader().show()
        const { id } = this.feedbackRecuperado

        const resposta = 
            await this.feedbackService.atualizar(
                id, 
                this.feedbackRecuperado,
                feedbackAtualizado
            )

        Loader.getLoader().hide()

        if(resposta?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }
        
        if(!resposta) {
            Toast.getToast().show('Erro ao atualizar feedback.', 'erro')
            return 
        }

        Toast.getToast().show('eedback atualizado com sucesso!', 'sucesso')
        // Utils.adicionarParametroURL('modo', 'criar')
        this.listarFeedbacks()
    }

    async recuperarFeedbackPorId() {
        Loader.getLoader().show()
        const { feedbackId } = this.consultarParametros()

        this.feedbackRecuperado = await this.feedbackService.recuperarPorId(feedbackId)
        Loader.getLoader().hide()

        if(this.feedbackRecuperado?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }

        if (!this.feedbackRecuperado) {
            Toast.getToast().show('Feedback não encontrado.', 'erro')
            return
        }

        this.feedbackView.getForm().definirValoresIniciais(this.feedbackRecuperado)
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