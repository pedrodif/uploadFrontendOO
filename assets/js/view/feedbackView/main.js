import { Utils } from '../../utils/main.js'
import { FeedbackCard } from './feedbackCard.js'
import { FeedbackForm } from './feedbackForm.js'

export class FeedbackView {
    constructor() {
        this.feedbackContainer = Utils.consultarSeletor('#feedback-container')
        this.form = new FeedbackForm(Utils.consultarSeletor('#feedback-form'))
    }

    getForm() {
        return this.form
    }

    listarFeedbacks(feedbacks) {
        this.feedbackContainer.innerHTML = ''

        if(feedbacks.length > 0) {
            feedbacks.reverse().forEach(feedback => {
                this.feedbackContainer.appendChild(new FeedbackCard(feedback).montarFeedback())
            })
        }
    }

    atualizarListaFeedbacks(feedback) {
        this.feedbackContainer.prepend(new FeedbackCard(feedback).montarFeedback())
    }
}