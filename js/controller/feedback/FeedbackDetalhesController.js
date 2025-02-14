import { Url } from "../../utils/Url.js"

import { FeedbackController } from "./FeedbackController.js"
import { FeedbackService } from "../../service/FeedbackService.js"
import { FeedbackDetalhesView } from '../../view/feedback/FeedbackDetalhesView.js'

export class FeedbackDetalhesController extends FeedbackController {
    constructor() {
        super(new FeedbackService(), new FeedbackDetalhesView())
        this.#iniciarForm()
    }

    #iniciarForm() {
        this.feedbackView.form.onSubmit(this.#lidarComSubmit.bind(this))
        this.#configurarForm()
    }

    #configurarForm(modo = 'criar') {
        requestAnimationFrame(() => this.feedbackView.form.configurar(modo))
    }

    async listarFeedbacks() {
        const resposta = await super.listarFeedbacks()
        if (resposta) {
            this.feedbackView.listarFeedbacks(resposta, this.#recuperarFeedbackPorId.bind(this))
        }
    }

    async #recuperarFeedbackPorId() {
        const resposta = await super.recuperarFeedbackPorId()
        if (resposta) {
            this.#configurarForm('detalhes')
            requestAnimationFrame(() => this.feedbackView.form.definirValoresIniciais(resposta))
        }
    }

    async #lidarComSubmit(feedback) {
        const { modo } = Url.consultarParametros()
        const resposta =
            modo === 'detalhes' ? await super.atualizar(feedback) : await super.criar(feedback)

        this.#finalizarFluxoSubmit(resposta, modo)
    }

    #finalizarFluxoSubmit(resposta, modo) {
        if (modo === 'detalhes') {
            Url.removerParametroURL('feedbackId')
            Url.adicionarParametroURL('modo', 'criar')
            this.listarFeedbacks()
        }

        if (modo === 'criar' && Object.keys(resposta).length > 0) {
            this.feedbackView.atualizarListaFeedbacks(resposta, this.#recuperarFeedbackPorId.bind(this))
        }

        this.#configurarForm()
    }
}