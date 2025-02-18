export class Breadcrumb {
    static #INSTANCIA = null
    #container
    #trilha = []

    constructor() {
        if (Breadcrumb.#INSTANCIA) {
            throw new Error("Use Breadcrumb.getBreadcrumb() para acessar a instância.")
        }

        this.#container = this.#montarContainer()
    }

    #montarContainer() {
        const container = document.createElement("nav")
        container.className = "breadcrumb-container"
        document.body.prepend(container)
        return container
    }

    // removerUltimo() {
    //     if (this.#trilha.length > 0) {
    //         this.#trilha.pop()
    //         this.#renderizar()
    //     }
    // }

    // limpar() {
    //     this.#trilha = []
    //     this.#renderizar()
    // }

    add(items) {
        this.#trilha = [...items]
        this.#renderizar()
    }

    #renderizar() {
        this.#container.innerHTML = ""
    
        this.#trilha.forEach((item, index) => {
            const breadcrumbItem = document.createElement("a")
            breadcrumbItem.href = item.link
            breadcrumbItem.classList.add("breadcrumb-item")
    
            if (index === 0 && item.label.toLowerCase() === "home") {
                breadcrumbItem.innerHTML = `<i class="fas fa-home"></i>`
            } else {
                breadcrumbItem.textContent = item.label
            }
    
            this.#container.appendChild(breadcrumbItem)
    
            if (index < this.#trilha.length - 1) {
                const separador = document.createElement("span")
                separador.textContent = " / "
                separador.classList.add("breadcrumb-separador")
                this.#container.appendChild(separador)
            }
        })
    }

    static getBreadcrumb() {
        if (!Breadcrumb.#INSTANCIA) {
            Breadcrumb.#INSTANCIA = new Breadcrumb()
        }
        return Breadcrumb.#INSTANCIA
    }
}
