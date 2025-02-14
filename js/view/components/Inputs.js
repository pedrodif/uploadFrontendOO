import { Utils } from '../../utils/Utils.js'

export class Inputs {
    static montarInputEdicao() {
        const i = Utils.criarElemento('i')
        i.classList.add('fa-solid', 'fa-pen-to-square')

        const label = Utils.criarElementoComTexto('label', 'Editado em: ')
        label.setAttribute('for', 'dataEdicao')

        const input = Utils.criarElemento('input')
        input.type = 'date'
        input.id = 'dataEdicao'
        input.name = 'dataEdicao'
        input.disabled = true

        const fieldset = Utils.criarElemento('fieldset')
        fieldset.id = 'edicao-container'

        fieldset.appendChild(i)
        fieldset.appendChild(label)
        fieldset.appendChild(input)

        return fieldset
    }
}