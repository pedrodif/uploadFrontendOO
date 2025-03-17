import { Utils } from '../../utils/Utils.js'
import { Notificador } from '../../utils/Notificador.js'

export class FileUploader {
    #container
    #listaArquivos
    #arquivos = []
    #tiposArquivos
    #TAMANHO_MAXIMO = 5 * 1024 * 1024

    constructor(container, tiposArquivos = '*/*') {
        this.#container = container
        this.#tiposArquivos = tiposArquivos
        this.#montarFileUploader()
    }

    #montarFileUploader() {
        this.#container.classList.add('upload-container')

        const iconeUpload = Utils.criarElemento('i')
        iconeUpload.classList.add('fas', 'fa-cloud-upload-alt', 'upload-icon')

        const input = Utils.criarElemento('input')
        input.type = 'file'
        input.multiple = true
        input.accept = this.#tiposArquivos
        input.classList.add('upload-input')
        input.addEventListener('change', (evento) => this.#handleArquivoSelecionado(evento))

        const botaoUpload = Utils.criarElementoComTexto('button', 'Selecionar arquivos')
        botaoUpload.classList.add('upload-botao')
        botaoUpload.addEventListener('click', () => input.click())

        this.#listaArquivos = Utils.criarElemento('ul')
        this.#listaArquivos.classList.add('upload-lista')

        this.#container.appendChild(iconeUpload)
        this.#container.appendChild(input)
        this.#container.appendChild(botaoUpload)
        this.#container.appendChild(this.#listaArquivos)
    }

    async #handleArquivoSelecionado(evento) {
        const arquivos = Array.from(evento.target.files)

        for(let arquivo of arquivos) {
            const { item, progresso } = this.#montarBarraProgresso(arquivo)
            this.#listaArquivos.appendChild(item)

            await this.#animarBarraDeProgresso(progresso, arquivo)
                .then(() => {
                    this.#arquivos.push(arquivo)
                    item.replaceWith(this.#montarUploadedItem(arquivo))
                }
            ).catch((erro) => {
                Notificador.erro(erro.message)
                item.remove()
            })
        }
    }

    #animarBarraDeProgresso(progresso, arquivo) {
        return new Promise((resolve, reject) => {
            let progressoAtual = 0
            const intervalo = setInterval(() => {
                progressoAtual += 10
                progresso.value = progressoAtual

                if (progressoAtual >= 100) {
                    clearInterval(intervalo)

                    if (arquivo.size <= this.#TAMANHO_MAXIMO) {
                        resolve('Upload concluído')
                    } else {
                        reject(new Error(`Arquivo ${arquivo.name} excede o tamanho máximo.`))
                    }
                }
            }, 200)
        })
    }

    #montarBarraProgresso(arquivo) {
        const item = Utils.criarElemento('li')
        item.classList.add('uploading-item')

        const progresso = Utils.criarElemento('progress')
        progresso.classList.add('upload-progresso')
        progresso.max = 100
        progresso.value = 0

        const nomeArquivo = Utils.criarElementoComTexto('span', arquivo.name)

        item.appendChild(nomeArquivo)
        item.appendChild(progresso)

        return { item, progresso }
    }

    #montarUploadedItem(arquivo) {
        const item = Utils.criarElemento('li')
        item.classList.add('uploaded-item')

        const iconeArquivo = Utils.criarElemento('i')
        iconeArquivo.classList.add('fas', 'fa-file')

        const nomeArquivo = Utils.criarElementoComTexto('span', arquivo.name)

        const iconeRemover = Utils.criarElemento('i')
        iconeRemover.classList.add('fa-solid', 'fa-xmark')
        iconeRemover.dataset.toggle = 'tooltip'
        iconeRemover.title = 'Remover'

        const botaoRemover = Utils.criarElemento('button')
        botaoRemover.classList.add('uploaded-remover')
        botaoRemover.appendChild(iconeRemover)

        botaoRemover.addEventListener('click', () => {
            item.remove()
            this.#arquivos = this.#arquivos.filter(f => f !== arquivo)
        })

        item.appendChild(iconeArquivo)
        item.appendChild(nomeArquivo)
        item.appendChild(botaoRemover)

        return item
    }

    obterArquivos() {
        return this.#arquivos
    }
}
