import { Utils } from '../../utils/Utils.js'

export class Form {
    constructor(form) {
        this.form = form
    }

    #limparForm() {
        this.form.reset()
    }

    #montarMensagemErro() {
        const p = Utils.criarElementoComTexto('p', 'Este campo é obrigatório *')
        p.classList.add('mensagem-erro-campo-obrigatorio')
        return p
    }

    gerenciarCampoObrigatorio(seletor, valor) {
        if (!valor) {
            if(seletor.classList.contains('input-erro-campo-obrigatorio')) {
                return 
            }
             
            seletor.classList.add('input-erro-campo-obrigatorio')
            seletor.insertAdjacentElement('afterend', this.#montarMensagemErro())
        } else if(seletor.nextElementSibling.tagName === 'P') {
            seletor.classList.remove('input-erro-campo-obrigatorio')
            seletor.nextElementSibling.remove()
        }   
    }

    #lerDadosForm() {
        const dadosRecuperados = Object.fromEntries(new FormData(this.form).entries())

        for(let key in dadosRecuperados) {
            if (dadosRecuperados.hasOwnProperty(key)) {
                dadosRecuperados[key] = dadosRecuperados[key].trim()
            }
        }

        return dadosRecuperados
    }

    onSubmit(callback) {     
        this.form.removeEventListener('submit', this.handleSubmit)

        this.handleSubmit = async (evento) => {
            evento.preventDefault()
            const dadosRecuperados = this.#lerDadosForm()
            
            if(this.validarForm(dadosRecuperados)) {
                await callback(dadosRecuperados)
                this.#limparForm()
            }  
        }

        this.form.addEventListener('submit', this.handleSubmit)
    }

    definirValoresIniciais(valoresIniciais) {
        const campos = this.form.querySelectorAll('input, select, textarea')

        campos.forEach(campo => {
            if (valoresIniciais[campo.name]) {
                switch (campo.type) {
                    case 'checkbox':
                        campo.checked = valoresIniciais[campo.name]
                        break
                    case 'radio':
                        if (campo.value === valoresIniciais[campo.name]) {
                            campo.checked = true
                        }
                        break
                    case 'select-one':
                        const option = [...campo.options].find(opt => opt.value === valoresIniciais[campo.name])
                        if (option) {
                            option.selected = true
                        }
                        break
                    default:
                        campo.value = valoresIniciais[campo.name]
                }
            }
        })
    }

    validarForm() {
        throw new Error('O método validarForm deve ser implementado nas classes filhas.')
    }
}