import { Url } from "../../utils/Url.js"

import { FeedbackController } from "./FeedbackController.js"
import { FeedbackService } from "../../service/FeedbackService.js"
import { FeedbackDetalhesView } from '../../view/feedback/FeedbackDetalhesView.js'

export class FeedbackDetalhesController extends FeedbackController {
    constructor() {
        super(new FeedbackService(), new FeedbackDetalhesView())
    }

    gerenciarForm() {
        const { modo } = Url.consultarParametros()
        const form = this.feedbackView.getForm()

        switch (modo) {
            case 'detalhes':
                this.recuperarFeedbackPorId()
                form.submit(this.atualizar.bind(this))
                break
            default:
                // form.definirValoresIniciais({ dataCriacao: Utils.gerenciarData() })
                form.submit(this.criar.bind(this))
                break
        }
    }

    async listarFeedbacks() {
        const resposta = await super.listarFeedbacks()
        if (resposta) {
            this.getFeedbackView().listarFeedbacks(resposta, this.gerenciarForm.bind(this))
        }
    }

    async recuperarFeedbackPorId() {
        const resposta = await super.recuperarFeedbackPorId()
        if (resposta) {
            this.getFeedbackView().getForm().definirValoresIniciais(resposta)
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

    async criar(feedback) {
        const resposta = await super.criar(feedback)
        if (resposta) {
            this.getFeedbackView().atualizarListaFeedbacks(resposta, this.gerenciarForm.bind(this))
            this.gerenciarForm()
        }
    }
}