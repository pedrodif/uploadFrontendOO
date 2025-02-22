export class FeedbackAPIClient {
    constructor() {
        this.HEADERS_DEFAULT = {
            headers: {
                'Accept': 'application/json',
            }
        }
        this.HEADERS_JSON = {
            headers: {
                ...this.HEADERS_DEFAULT.headers,
                'Content-Type': 'application/json',
            }
        }
        this.URL_BASE = 'http://localhost:8080/feedbacks'
    }

    getByGestorAndColaboradorId(gestorId, colaboradorId) {
        if (!gestorId || !colaboradorId) {
            throw new Error('Gestor ID e Colaborador ID são obrigatórios.')
        }

        return fetch(`${this.URL_BASE}/gestor/${gestorId}/colaborador/${colaboradorId}`, this.HEADERS_DEFAULT)
            .then(resposta => resposta.ok ? resposta.json() : false)
            .catch(error => console.error('getByGestorAndColaboradorId: ', error))

    }

    getByColaboradorId(colaboradorId) {
        if (!colaboradorId) {
            throw new Error('Colaborador ID obrigatório.')
        }

        return fetch(`${this.URL_BASE}/colaborador/${colaboradorId}`, this.HEADERS_DEFAULT)
            .then(resposta => resposta.ok ? resposta.json() : false)
            .catch(error => console.error('getByColaboradorId: ', error))
    }

    getById(id) {
        if (!id) {
            throw new Error('O Feeback ID é obrigatório.')
        }

        return fetch(`${this.URL_BASE}/${id}`, this.HEADERS_DEFAULT)
            .then(resposta => resposta.ok ? resposta.json() : false)
            .catch(error => console.error('getById: ', error))
    }

    post(feedback) {
        if (!feedback) {
            throw new Error('O Feeback é obrigatório.')
        }

        return fetch(this.URL_BASE, { method: 'POST', ...this.HEADERS_JSON, body: JSON.stringify(feedback) })
            .then(resposta => resposta.ok ? resposta.json() : false)
            .catch(error => console.error('post: ', error))

    }

    put(id, feedback) {
        if (!id) {
            throw new Error('O Feeback ID é obrigatório.')
        }

        return fetch(`${this.URL_BASE}/${id}`, { method: 'PUT', ...this.HEADERS_JSON, body: JSON.stringify(feedback) })
            .then(resposta => resposta.ok ? resposta.json() : false)
            .catch(error => console.error('put: ', error))
    }

    delete(id) {
        if (!id) {
            throw new Error('O Feeback ID é obrigatório.')
        }

        return fetch(`${this.URL_BASE}/${id}`, { method: 'DELETE', ...this.HEADERS_DEFAULT })
            .then(resposta => resposta.ok ? resposta.text() : false)
            .catch(error => console.error('delete: ', error))
    }
}