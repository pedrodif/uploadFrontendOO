import { Utils } from '../../utils/main.js'

export class Form {
    constructor(form) {
        this.form = form
    }

    limparForm() {
        this.form.reset()
    }

    submit(callback) {
        this.form.addEventListener('submit', evento => {
            evento.preventDefault()
            const dadosRecuperados = Utils.lerDadosForm(evento.target)
            
            if(this.validarForm(dadosRecuperados)) {
                callback(dadosRecuperados)
                this.limparForm()
            }  
        })
    }

    montarMensagemErro() {
        const p = Utils.criarElemento('p')
        p.textContent = 'Este campo é obrigatório *'
        p.classList.add('mensagem-erro-campo-obrigatorio')
        return p
    }

    gerenciarCampoObrigatorio(seletor, variante) {
        if (!variante) {
            if(seletor.classList.contains('input-erro-campo-obrigatorio')) {
                return 
            }
             
            seletor.classList.add('input-erro-campo-obrigatorio')
            seletor.insertAdjacentElement('afterend', this.montarMensagemErro())
        } else if(seletor.nextElementSibling.tagName === 'P') {
            seletor.classList.remove('input-erro-campo-obrigatorio')
            seletor.nextElementSibling.remove()
        }   
    }

    // genrenciarVisibilidadeCampos({ campos, display = 'none' }) {
    //     const camposArray = campos.split(',')
    //     // const camposRecuperados = camposArray.reduce((acc, campo) => 
    //     //     [ ...acc, 
    //     //         this.form.querySelector(`#${campo.trim()}`)
    //     //     ], 
    //     // [])

    //     camposArray.forEach(campo => this.form.querySelector(`#${campo.trim()}`).style.display = display )
    //     console.table(camposArray)

    //     Utils.gerenciarVisibilidade(camposRecuperados, display)
    // }

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
        throw new Error('O método validarForm deve ser implementado nas classes filhas.');
    }
}