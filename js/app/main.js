import { FeedbackController } from '../controller/FeedbackController.js'

const feedbackController = new FeedbackController()

const detalhes = 'detalhes'

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.gerenciarForm(detalhes)
    feedbackController.listarFeedbacks(detalhes)
})