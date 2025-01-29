import { Url } from '../../utils/Url.js'
import { Utils } from '../../utils/Utils.js'

export class FeedbackCard {
    constructor(feedback) {
        this.feedback = feedback
    }

    montarFeedback(callback, variante) {
        const h2 = Utils.criarElemento('h2')
        h2.textContent = Utils.formatarDataBR(this.feedback.dataEdicao ?? this.feedback.dataCriacao)
        
        const header = Utils.criarElemento('header')
        header.appendChild(h2)

        const h4 = Utils.criarElemento('h4')
        h4.dataset.toggle = 'tooltip'
        h4.dataset.title = this.feedback.titulo
        h4.textContent = `${this.feedback.titulo.slice(0, 16)}...`

        const p = Utils.criarElemento('p')
        p.textContent = `${this.feedback.descricao.slice(0, 100)}...`

        const main = Utils.criarElemento('main')
        main.appendChild(h4)
        main.appendChild(p)

        const i = Utils.criarElemento('i')
        i.classList.add('fa-solid', 'fa-arrow-right')

        const button = Utils.criarElemento('button')
        button.type = 'button'
        button.textContent = 'Ver mais'
        button.addEventListener('click', () => {
            Url.adicionarParametroURL('modo', 'detalhes')
            Url.adicionarParametroURL('feedbackId', this.feedback.id)
            callback(variante)
        })

        button.appendChild(i)

        const footer = Utils.criarElemento('footer')
        footer.appendChild(button)

        const article = Utils.criarElemento('article')
        article.id = this.feedback.id 
        article.classList.add('feedback-card')

        article.appendChild(header)
        article.appendChild(main)
        article.appendChild(footer)

        return article
    }
}
