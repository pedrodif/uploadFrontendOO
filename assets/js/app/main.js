import { FeedbackController } from '../controller/FeedbackController.js'

const feedbackController = new FeedbackController()

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.gerenciarForm()
    feedbackController.listarFeedbacks()
})