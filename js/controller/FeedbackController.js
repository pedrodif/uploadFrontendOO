import { Url } from '../utils/Url.js'
import { Notificador } from '../utils/Notificador.js'
import { RequestHelper } from '../utils/RequestHelper.js'

import { FeedbackView } from '../view/feedback/FeedbackView.js'
import { FeedbackService } from '../service/FeedbackService.js'

export class FeedbackController {
    constructor(feedbackView) {
        this.feedbackView = new FeedbackView()
        this.feedbackService = new FeedbackService()
        this.feedbackRecuperado = null
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
        const { colaboradorId, gestorId, monitorId } = Url.consultarParametros()

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.criar({ ...feedback, colaboradorId, gestorId: gestorId ?? monitorId })
        )

        Notificador.resposta(resposta, 'criar')
        if(resposta) {
            this.feedbackView.atualizarListaFeedbacks(resposta, this.gerenciarForm.bind(this))
            this.gerenciarForm('detalhes')
        }
    }

    async atualizar(feedbackAtualizado) {
        const { id } = this.feedbackRecuperado

        const resposta = await RequestHelper.executar(
            () => this.feedbackService.atualizar(id, this.feedbackRecuperado, feedbackAtualizado)
        )

        Notificador.resposta(resposta, 'atualizar')
        if (resposta) {
            Url.adicionarParametroURL('modo', 'criar')
            Url.removerParametroURL('feedbackId')
            this.listarFeedbacks('detalhes')
            this.gerenciarForm('detalhes')
        }
    }

    async recuperarFeedbackPorId() {
        const { feedbackId } = Url.consultarParametros()

        this.feedbackRecuperado = await RequestHelper.executar(
            () => this.feedbackService.recuperarPorId(feedbackId)
        )

        Notificador.resposta(this.feedbackRecuperado, 'recuperar')
        if(this.feedbackRecuperado) {
            this.feedbackView.getForm().definirValoresIniciais(this.feedbackRecuperado)
        }
    }
}
