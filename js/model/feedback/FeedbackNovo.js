import { Utils } from '../../utils/Utils.js'
import { FeedbackModel } from './FeedbackModel.js'

export class FeedbackNovo extends FeedbackModel {
    constructor(feedback) {
        super({ ...feedback, dataCriacao: Utils.gerenciarData() })
    }
}