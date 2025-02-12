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

    static gerenciarData() {
        const dataAtual = new Date()
        dataAtual.setMinutes(dataAtual.getMinutes() - dataAtual.getTimezoneOffset())
        return dataAtual.toISOString().split('T')[0]
    }

    static formatarDataBR(variante) {
        let [ano, mes, dia] = variante.split('-').map(Number)
        let dataFormatada = new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR')
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
        posicionarFocus(seletor)
    }

    static redimensionarAltura(seletor) {
        seletor.style.height = 'auto'
        seletor.style.height = seletor.scrollHeight + 'px'
    }

    static gerenciarVisibilidade(campos, display = 'none') {
        campos.forEach(campo => campo.style.display = display)
    }
}