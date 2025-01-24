import { Utils } from '../../Utils.js'
import { FeedbackModel } from './FeedbackModel.js'

export class FeedbackAtualizado extends FeedbackModel {
    #dataEdicao

    constructor(feedbackRecuperado, feedbackAtualizado) {
        super(feedbackAtualizado)
        this.dataEdicao = Utils.gerenciarData()
        this.#validarAlteracao(feedbackRecuperado, feedbackAtualizado)
    }

    get dataEdicao() {
        return this.#dataEdicao
    }
    
    #validarAlteracao(feedbackRecuperado, feedbackAtualizado) {
        for(let campo in feedbackAtualizado) {
            if(feedbackRecuperado[campo] === feedbackAtualizado[campo]) {
                throw new Error(`O campo ${campo} não foi alterado.`)
            }
        }
    }

    toJSON() {
        return {
            ...super.toJSON(),
            dataCriacao: this.dataEdicao,
        }
    }
}