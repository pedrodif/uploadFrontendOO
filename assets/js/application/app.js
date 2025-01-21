import { FeedbackView } from '../view/feedback/main.js'
import { FeedbackModel } from '../model/feedbackModel.js'
import { FeedbackController } from '../controller/feedbackController.js'
import { FeedbackRepository } from '../repository/feedbackRepository.js'

const feedbackView = new FeedbackView()
const feedbackRepository = new FeedbackRepository()
const feedbackModel = new FeedbackModel(feedbackRepository)
const feedbackController = new FeedbackController(feedbackModel, feedbackView)

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.gerenciarForm()
    feedbackController.listarFeedbacks()
})