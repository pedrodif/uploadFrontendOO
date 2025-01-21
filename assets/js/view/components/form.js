import { Utils } from '../../utils/main.js'

export class Form {
    constructor(form) {
        this.form = form
    }

    limparForm() {
        this.form.reset()
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

    validarForm() {
        throw new Error('O método validarForm deve ser implementado nas classes filhas.');
    }
}