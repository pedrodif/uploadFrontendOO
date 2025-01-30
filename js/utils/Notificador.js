import { Toast } from '../view/components/Toast.js'
import { MENSAGENS_FEEDBACK } from './constantes.js'

export class Notificador  {
    static sucesso(mensagem) {
        Toast.getToast().show(mensagem, 'sucesso')
    }

    static erro(mensagem) {
        Toast.getToast().show(mensagem, 'erro')
    }

    static aviso(mensagem) {
        Toast.getToast().show(mensagem, 'aviso')
    }

    static info(mensagem) {
        Toast.getToast().show(mensagem, 'info')
    }

    static resposta(resposta, variante) {
        if(resposta?.erro) {
            Notificador.erro(resposta.erro)
            return
        }

        if(!resposta) {
            Notificador.erro(MENSAGENS_FEEDBACK[variante].erro)
            return
        }

        if(variante != 'listar' && variante != 'recuperar') {
            Notificador.sucesso(MENSAGENS_FEEDBACK[variante].sucesso)
        }
    }
}