import { Utils } from '../../utils/Utils.js'
import { FeedbackCard } from './FeedbackCard.js'
import { FeedbackForm } from './FeedbackForm.js'
import { FileUploader } from '../components/FileUploader.js'

export class FeedbackDetalhesView {
    constructor() {
        this.feedbackContainer = Utils.consultarSeletor('#feedback-container')
        this.form = new FeedbackForm(Utils.consultarSeletor('#feedback-form'))
        this.fileUploader = new FileUploader(Utils.consultarSeletor('#file-uploader'))
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