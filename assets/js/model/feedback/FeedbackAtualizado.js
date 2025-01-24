import { Utils } from '../utils/Utils.js'
import { FeedbackModel } from './FeedbackModel.js'

export class FeedbackAtualizado extends FeedbackModel {
    #dataEdicao

    constructor(feedback, feedbackAtualizado) {
        super(feedbackAtualizado)
        this.dataEdicao = Utils.gerenciarData()
        this.#validarAlteracao(feedback, feedbackAtualizado)
    }

    get dataEdicao() {
        return this.#dataEdicao
    }
    
    #validarAlteracao(feedback, feedbackAtualizado) {
        for(let campo in feedbackAtualizado) {
            if(feedback[campo] === feedbackAtualizado[campo]) {
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