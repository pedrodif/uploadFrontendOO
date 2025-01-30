import { Utils } from '../../utils/Utils.js'
import { FeedbackCard } from './FeedbackCard.js'
import { FeedbackForm } from './FeedbackForm.js'

export class FeedbackView {
    constructor() {
        this.feedbackContainer = Utils.consultarSeletor('#feedback-container')
        this.form = new FeedbackForm(Utils.consultarSeletor('#feedback-form'))
    }

    getForm() {
        return this.form
    }

    atualizarListaFeedbacks(feedback, callback) {
        this.feedbackContainer.prepend(new FeedbackCard(feedback).montarFeedback(callback))
    }

    listarFeedbacks(feedbacks, callback) {
        this.feedbackContainer.innerHTML = ''

        if(feedbacks.length > 0) {
            feedbacks.reverse().forEach(feedback => {
                this.feedbackContainer.appendChild(new FeedbackCard(feedback).montarFeedback(callback))
            })
        }
    }

}