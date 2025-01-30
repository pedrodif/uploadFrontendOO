import { Url } from "../utils/Url.js"

import { FeedbackController } from "./FeedbackController"
import { FeedbackView } from "../view/FeedbackView.js"
import { FeedbackService } from "../service/FeedbackService.js"

export class FeedbackDetalhesController extends FeedbackController {
    constructor() {
        super(new FeedbackView(), new FeedbackService())
    }

    gerenciarForm() {
        const { modo } = Url.consultarParametros()

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

    async listarFeedbacks() {
        const resposta = await super.listarFeedbacks()
        if (resposta) {
            this.getFeedbackView().listarFeedbacks(resposta, this.gerenciarForm.bind(this))
        }
    }

    async criar(feedback) {
        const resposta = await super.criar(feedback)
        if (resposta) {
            this.getFeedbackView().atualizarListaFeedbacks(resposta, this.gerenciarForm.bind(this))
            this.gerenciarForm()
        }
    }

    async atualizar(feedbackAtualizado) {
        const resposta = await super.atualizar(feedbackAtualizado)
        if (resposta) {
            Url.adicionarParametroURL('modo', 'criar')
            Url.removerParametroURL('feedbackId')
            this.listarFeedbacks()
            this.gerenciarForm()
        }
    }

    async recuperarFeedbackPorId() {
        const resposta = await super.recuperarFeedbackPorId()
        if (resposta) {
            this.getFeedbackView().getForm().definirValoresIniciais(resposta)
        }
    }
}