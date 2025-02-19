import { Breadcrumb } from '../view/components/Breadcrumb.js'   
import { FeedbackDetalhesController } from '../controller/feedback/FeedbackDetalhesController.js'

const feedbackController = new FeedbackDetalhesController()

document.addEventListener('DOMContentLoaded', () => {
    Breadcrumb.getBreadcrumb().add([
        { label: 'home', link: '/index.html' },
        { label: 'Teste', link: '/feedbacks.html' },
        { label: 'Teste', link: '#' }
    ])


    feedbackController.listarFeedbacks()
})