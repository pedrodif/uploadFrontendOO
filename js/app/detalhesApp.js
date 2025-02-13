import { FeedbackDetalhesController } from '../controller/feedback/FeedbackDetalhesController.js'

const feedbackController = new FeedbackDetalhesController()

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.listarFeedbacks()
})