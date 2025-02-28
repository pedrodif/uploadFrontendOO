import { Utils } from '../../utils/Utils.js'
import { FeedbackCard } from './FeedbackCard.js'
import { FeedbackForm } from './FeedbackForm.js'

import { Timeline } from '../components/TimeLine.js'
import { FileUploader } from '../components/FileUploader.js'

export class FeedbackDetalhesView {
    constructor() {
        this.feedbackContainer = Utils.consultarSeletor('#feedback-container')
        this.form = new FeedbackForm(Utils.consultarSeletor('#feedback-form'))
        this.fileUploader = new FileUploader(Utils.consultarSeletor('#file-uploader'))
        this.timeline = new Timeline(Utils.consultarSeletor('#time-line'))
        this.renderizarTimeline()
    }

    
    renderizarTimeline() {
        const eventos = [
            {
                usuario: "João Silva",
                data: new Date(2024, 0, 10, 10, 30),
                icone: "fas fa-check", // Exemplo de ícone do Font Awesome
                status: "ativo",
                HTMLElement: Utils.criarElementoComTexto("p", "Tarefa concluída")
            },
            {
                usuario: "Maria Oliveira",
                data: new Date(2024, 0, 12, 14, 0),
                icone: "fas fa-exclamation-triangle",
                status: "inativo",
                HTMLElement: Utils.criarElementoComTexto("p", "Tarefa pendente")
            },
            {
                usuario: "Carlos Pereira",
                data: new Date(2024, 0, 15, 16, 45),
                icone: "fas fa-spinner",
                status: "ativo",
                HTMLElement: Utils.criarElementoComTexto("p", "Tarefa em andamento")
            },
            {
                usuario: "Carlos Pereira",
                data: new Date(2024, 0, 15, 16, 45),
                icone: "fas fa-spinner",
                status: "ativo",
                HTMLElement: Utils.criarElementoComTexto("p", "Tarefa em andamento")
            }
        ]
    
        this.timeline.renderizar(eventos)
    }

    atualizarListaFeedbacks(feedback, callback) {
        this.feedbackContainer.prepend(new FeedbackCard(feedback, callback))
    }

    listarFeedbacks(feedbacks, callback) {
        this.feedbackContainer.innerHTML = ''

        if(feedbacks.length > 0) {
            feedbacks.reverse().forEach(feedback => {
                this.feedbackContainer.appendChild(new FeedbackCard(feedback, callback))
            })
        }
    }
}