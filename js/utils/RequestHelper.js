import { Loader } from "../view/components/Loader.js"

export class RequestHelper {
    static async executar(callback) {
        Loader.getLoader().show()
        
        try {
            const resposta = await callback()
            return resposta
        } finally {
            Loader.getLoader().hide()
        }
    }
}