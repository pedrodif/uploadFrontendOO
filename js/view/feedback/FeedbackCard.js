import { Url } from '../../utils/Url.js'
import { Utils } from '../../utils/Utils.js'

export class FeedbackCard {
    constructor(feedback) {
        this.feedback = feedback
    }

    montarFeedback(callback) {
        const h2 = Utils.criarElementoComTexto('h2',
            Utils.formatarDataBR(this.feedback.dataEdicao ?? this.feedback.dataCriacao)
        )

        const header = Utils.criarElemento('header')
        header.appendChild(h2)

        const h4 = Utils.criarElementoComTexto('h4', 
         `${this.feedback.titulo.slice(0, 16)}...`
        )
        h4.dataset.toggle = 'tooltip'
        h4.dataset.title = this.feedback.titulo

        const p = Utils.criarElementoComTexto('p', 
            `${this.feedback.descricao.slice(0, 100)}...`
        )

        const main = Utils.criarElemento('main')
        main.appendChild(h4)
        main.appendChild(p)

        const i = Utils.criarElemento('i')
        i.classList.add('fa-solid', 'fa-arrow-right')

        const button = Utils.criarElementoComTexto('button', 'Ver mais')
        button.type = 'button'
        button.addEventListener('click', () => {
            Url.adicionarParametroURL('modo', 'detalhes')
            Url.adicionarParametroURL('feedbackId', this.feedback.id)
            callback()
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
