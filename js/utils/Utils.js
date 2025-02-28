export class Utils {
    static consultarSeletor(variante) {
        return document.querySelector(variante)
    }  

    static consultarSeletores(variante) {
        return document.querySelectorAll(variante)
    }  

    static criarElemento(variante) {
        return document.createElement(variante)
    }

    static criarElementoComTexto(variante, texto) {
        const elemento = Utils.criarElemento(variante)
        elemento.textContent = texto
        return elemento
    }

    static gerenciarData() {
        const dataAtual = new Date()
        dataAtual.setMinutes(dataAtual.getMinutes() - dataAtual.getTimezoneOffset())
        return dataAtual.toISOString().split('T')[0]
    }

    static formatarDataBR(variante) {
        const [ano, mes, dia] = variante.split('-').map(Number)
        const dataFormatada = new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR')
        return dataFormatada
    }

    static formatarDataHora(variante) {
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        const dataFormatada = new Date(variante).toLocaleDateString(undefined, dateOptions)
        return dataFormatada
    }

    static formatarData(variante) {
        return new Date(variante).toISOString().split('T')[0]
    }

    static posicionarFocus(seletor) {
        seletor.focus()
    }

    static posicionarCursor(seletor) {
        seletor.setSelectionRange(0, 0)
        posicionarFocus(seletor)
    }

    static posicionarCursorVarianteTexto(seletor) {
        seletor.selectionStart = seletor.value.length
        seletor.selectionEnd = seletor.value.length
        Utils.posicionarFocus(seletor)
    }

    static redimensionarAltura(seletor) {
        seletor.style.height = 'auto'
        seletor.style.height = seletor.scrollHeight + 'px'
    }

    static gerenciarVisibilidade(campos, display = 'none') {
        campos.forEach(campo => campo.style.display = display)
    }
}