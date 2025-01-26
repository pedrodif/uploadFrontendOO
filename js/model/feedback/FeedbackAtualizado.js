import { Utils } from '../../utils/Utils.js'
import { FeedbackModel } from './FeedbackModel.js'

export class FeedbackAtualizado extends FeedbackModel {
    #dataEdicao

    constructor(feedbackRecuperado, feedbackAtualizado) {
        super(feedbackAtualizado)
        this.#validarAlteracao(feedbackRecuperado)
        this.dataEdicao = Utils.gerenciarData()
    }

    get dataEdicao() {
        return this.#dataEdicao
    }
    
    #validarAlteracao(feedbackRecuperado){
        let campos = ['titulo', 'descricao']
        
        if(campos.every(campo => feedbackRecuperado[campo] === this[campo])) {
            throw new Error('Nenhum dos campos foi alterado.')
        }
    }

    toJSON() {
        return {
            ...super.toJSON(),
            dataCriacao: this.dataEdicao,
        }
    }
}