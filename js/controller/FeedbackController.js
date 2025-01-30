import { Url } from '../utils/Url.js'
import { Utils } from '../utils/Utils.js'
import { Notificador } from '../utils/Notificador.js'
import { RequestHelper } from '../utils/RequestHelper.js'

import { Toast } from '../view/components/Toast.js'
import { Loader } from '../view/components/Loader.js'

import { FeedbackView } from '../view/feedback/FeedbackView.js'
import { FeedbackService } from '../service/FeedbackService.js'

export class FeedbackController {
    constructor(feedbackView) {
        this.feedbackView = new FeedbackView()
        this.feedbackService = new FeedbackService()
        this.feedbackRecuperado = null
    }

    gerenciarForm(variante = 'perfil') {
        const { modo } = Url.consultarParametros()

        switch (modo) {
            case 'detalhes':
                this.recuperarFeedbackPorId()
                if (variante == 'detalhes') this.feedbackView.getForm().submit(this.atualizar.bind(this))
                break
            default:
                this.feedbackView.getForm().definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                this.feedbackView.getForm().submit(this.criar.bind(this))
                break
        }
    }

    async listarFeedbacks() {
        const { colaboradorId, gestorId } = Url.consultarParametros()

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.listarPorGestorEColaborador(gestorId, colaboradorId)
        )

        Notificador.resposta(resposta, 'listar')
        if (resposta) {
            this.feedbackView.listarFeedbacks(resposta, this.gerenciarForm.bind(this))
        }
    }

    async criar(feedback) {
        Loader.getLoader().show()
        const { colaboradorId, gestorId, monitorId } = Url.consultarParametros()

        const resposta = await this.feedbackService.criar({
            ...feedback,
            colaboradorId,
            gestorId: gestorId ?? monitorId
        })

        Loader.getLoader().hide()

        if (resposta?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }

        if (!resposta) {
            Toast.getToast().show('Erro ao criar feedback.', 'erro')
            return
        }

        Toast.getToast().show('Feedback criado com sucesso!', 'sucesso')

        Notificador
        this.feedbackView.atualizarListaFeedbacks(resposta, this.gerenciarForm.bind(this))
        this.gerenciarForm('detalhes')
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

        if (resposta?.erro) {
            Toast.getToast().show(resposta.erro, 'erro')
            return
        }

        if (!resposta) {
            Toast.getToast().show('Erro ao atualizar feedback.', 'erro')
            return
        }

        Toast.getToast().show('Feedback atualizado com sucesso!', 'sucesso')

        Url.adicionarParametroURL('modo', 'criar')
        Url.removerParametroURL('feedbackId')

        this.listarFeedbacks('detalhes')
        this.gerenciarForm('detalhes')
    }

    async recuperarFeedbackPorId() {
        Loader.getLoader().show()
        const { feedbackId } = Url.consultarParametros()

        this.feedbackRecuperado = await this.feedbackService.recuperarPorId(feedbackId)
        Loader.getLoader().hide()

        if (this.feedbackRecuperado?.erro) {
            Toast.getToast().show(this.feedbackRecuperado.erro, 'erro')
            return
        }

        if (!this.feedbackRecuperado) {
            Toast.getToast().show('Feedback não encontrado.', 'erro')
            return
        }

        this.feedbackView.getForm().definirValoresIniciais(this.feedbackRecuperado)
    }
}
