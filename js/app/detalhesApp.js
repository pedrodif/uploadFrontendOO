import { Sidebar } from '../view/components/Sidebar.js'
import { Breadcrumb } from '../view/components/Breadcrumb.js'   
import { FeedbackDetalhesController } from '../controller/feedback/FeedbackDetalhesController.js'

const usuario = {
    nome: 'Pedro Ferreira',
    avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=pedro', 
    tipo: 'adm'
}

const sidebar = new Sidebar(usuario)
const feedbackController = new FeedbackDetalhesController()

document.addEventListener('DOMContentLoaded', () => {
    Breadcrumb.getBreadcrumb().add([
        { label: 'home', link: '/index.html' },
        { label: 'Teste', link: '/feedbacks.html' },
        { label: 'Teste', link: '#' }
    ])
    
    sidebar.renderizar()
    feedbackController.listarFeedbacks()
})