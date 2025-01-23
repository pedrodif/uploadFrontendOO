import { FeedbackModel } from '../model/feedbackModel.js'
import { FeedbackView } from '../view/feedbackView/main.js'
import { FeedbackController } from '../controller/feedbackController.js'
import { FeedbackRepository } from '../repository/feedbackRepository.js'

const feedbackRepository = new FeedbackRepository()
const feedbackModel = new FeedbackModel(feedbackRepository)
const feedbackView = new FeedbackView()
const feedbackController = new FeedbackController(feedbackModel, feedbackView)

document.addEventListener('DOMContentLoaded', () => {
    feedbackController.gerenciarForm()
    feedbackController.listarFeedbacks()
})