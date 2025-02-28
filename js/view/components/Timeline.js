import  { Utils } from "../../utils/Utils.js"

export class Timeline {
    #itens
    #container

    constructor(container) {
        this.#container = container
        this.#itens = []
    }

    renderizar(itens) {
        this.#itens = [...itens]

        this.#container.innerHTML = ""
        this.#container.classList.add("timeline")

        const fragmento = document.createDocumentFragment()
        this.#itens.forEach(item => fragmento.appendChild(this.#montarTimelineItem(item)))

        this.#container.appendChild(fragmento)
    }

    #montarTimelineItem(item) {
        const timeLineItem = Utils.criarElemento("div")
        timeLineItem.classList.add("timeline-item")

        if (item.status !== "ativo") {
            timeLineItem.classList.add("timeline-item-inativo")
        } 

        const icone = Utils.criarElemento("i")
        icone.className = item.icone

        const marco = Utils.criarElemento("div")
        marco.classList.add("timeline-marco")
        marco.appendChild(icone)

        const usuario = Utils.criarElementoComTexto("span", item.usuario)
        usuario.classList.add("timeline-info-usuario")

        const data = Utils.criarElementoComTexto("span", Utils.formatarDataHora(item.data))
        data.classList.add("timeline-info-data")

        const info = Utils.criarElemento("div")
        info.classList.add("timeline-info")
        info.appendChild(usuario)
        info.appendChild(data)
        
        timeLineItem.appendChild(marco)
        timeLineItem.appendChild(info)
        timeLineItem.appendChild(item.HTMLElement)

        return timeLineItem
    }
}