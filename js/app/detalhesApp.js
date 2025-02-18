import { Breadcrumb } from '../view/components/Breadcrumb.js'   
import { FeedbackDetalhesController } from '../controller/feedback/FeedbackDetalhesController.js'

const feedbackController = new FeedbackDetalhesController()

document.addEventListener('DOMContentLoaded', () => {
    Breadcrumb.getBreadcrumb().add([
        { label: 'Home', link: '/index.html' },
        { label: 'Feedbacks', link: '/feedbacks.html' },
        { label: 'Detalhes', link: '#' }
    ])


    feedbackController.listarFeedbacks()
})