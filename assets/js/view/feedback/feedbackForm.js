import { Utils } from "../../utils/main.js"

export class FeedbackForm {
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

    validarForm(dados) {
        let msg = ''
         
        if(!dados.titulo) {
            msg += 'Informe o título do feedback \n'
        }

        if(!dados.descricao) {
            msg += 'Informe a descrição do feedback \n'
        }

        if(msg !== '') {
            alert(msg)
            return false
        }

        return true
    }
}