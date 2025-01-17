export class FeedbackRepository {
    constructor() {
        this.urlBase = 'http://localhost:8080/feedbacks'
    }

    async getFeedbacksByGestorIdAndColaboradorId(gestorId, colaboradorId) {
        try {
            const resposta = await fetch(`${this.urlBase}/gestor/${gestorId}/colaborador/${colaboradorId}`, {
                headers: {
                    'Accept': 'application/json',
                },
            })

            return resposta.ok ? resposta.json() : []
        } catch (error) {
            console.error(error)
        }
    }

    async getFeedbacksByColaboradorId(colaboradorId) {
        try {
            const resposta = await fetch(`${this.urlBase}/colaborador/${colaboradorId}`,  {
                headers: {
                    'Accept': 'application/json',
                },
            })
            
            return resposta.ok ? resposta.json() : []
        } catch (error) {
            console.error(error)
        }
    }

    async getFeedbackById(id) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`,  {
                headers: {
                    'Accept': 'application/json',
                },
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async createFeedback(feedback) {
        try {
            const resposta = await fetch(this.urlBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(feedback)
            })
            
           return resposta.json() 
        } catch (error) {
            console.error(error)
        }
    }

    async updateFeedback(id, feedback) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(feedback)
            })

            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }
}