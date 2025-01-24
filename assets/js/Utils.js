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

    static lerDadosForm(form) {
        const dadosRecuperados = Object.fromEntries(new FormData(form).entries())

        for(let key in dadosRecuperados) {
            if (dadosRecuperados.hasOwnProperty(key)) {
                dadosRecuperados[key] = dadosRecuperados[key].trim()
            }
        }

        return dadosRecuperados
    }

    static adicionarParametroURL(parametro, valor) {
        const urlAtual = new URL(window.location.href)
        urlAtual.searchParams.set(parametro, valor)
        window.history.pushState({}, '', urlAtual)
    }
    
    static removerParametroURL(parametro) {
        buscarParametro.delete(parametro)
        window.history.replaceState({}, '', window.location.pathname + '?' + buscarParametro.toString())
    }

    static gerenciarVisibilidade(campos, display = 'none') {
        campos.forEach(campo => campo.style.display = display)
    }
}