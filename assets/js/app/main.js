import { FeedbackController } from '../controller/feedbackController.js'

const feedbackController = new FeedbackController()

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.gerenciarForm()
    feedbackController.listarFeedbacks()
})