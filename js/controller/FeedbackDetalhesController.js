import { FeedbackController } from "./FeedbackController";

export class FeedbackDetalhesController extends FeedbackController {
    constructor(parameters) {
        super(new FeedbackView())
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
}