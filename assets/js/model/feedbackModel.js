import { Utils } from '../utils/main.js'

export class FeedbackModel {
    #titulo
    #descricao
    #dataCriacao
    #gestorId
    #colaboradorId

    constructor(feedback) {
        this.titulo = feedback.titulo
        this.descricao = feedback.descricao
        this.gestorId = feedback.gestorId
        this.colaboradorId = feedback.colaboradorId
        this.#dataCriacao = Utils.gerenciarData()
    }

    get titulo() {
        return this.#titulo
    }

    set titulo(titulo) {
        if (titulo.length < 5) {
            throw new Error('O título deve ter no mínimo 5 caracteres.')
        }

        this.#titulo = titulo
    }

    get descricao() {
        return this.#descricao
    }

    set descricao(descricao) {
        if (descricao.length < 10) {
            throw new Error('A descrição deve ter no mínimo 10 caracteres.')
        }

        this.#descricao = descricao
    }

    get gestorId() {
        return this.#gestorId
    }

    set gestorId(gestorId) {
        if (!gestorId) {
            throw new Error('O gestor deve ser informado.')
        }
        
        this.#gestorId = +gestorId
    }

    get colaboradorId() {
        return this.#colaboradorId
    }

    set colaboradorId(colaboradorId) {
        if (!colaboradorId) {
            throw new Error('O colaborador deve ser informado.')
        }

        this.#colaboradorId = +colaboradorId
    }

    get dataCriacao() {
        return this.#dataCriacao
    }
}

