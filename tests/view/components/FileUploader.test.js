import { Utils } from '../../../js/utils/Utils.js'
import { FileUploader } from "../../../js/view/components/FileUploader.js"

describe('FileUploader', () => {
    let container
    let fileUploader

    beforeEach(() => {
        container = Utils.criarElemento('div')
        document.body.appendChild(container)

        fileUploader = new FileUploader(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        jest.useRealTimers()
    })

    describe('Estrutura do componente', () => {
        test('Deve incluir classe no container', () => {
            expect(container.classList.contains('upload-container')).toBe(true)
        })

        test('Deve ter criado input type file', () => {
            expect(container.querySelector('input.upload-input')).not.toBeNull()
        })

        test('Deve ter criado ícone de upload', () => {
            expect(container.querySelector('i.upload-icon')).not.toBeNull()
        })

        test('Deve ter criado botão de upload', () => {
            expect(container.querySelector('button.upload-botao')).not.toBeNull();
        })

        test('Deve ter criado lista para elementos de upload', () => {
            expect(container.querySelector('ul.upload-lista')).not.toBeNull();
        })
    })

    test('Deve adicionar arquivo quando o tamanho é válido', async () => {
        jest.useFakeTimers()

        const arquivoMock = new File(['conteúdo'], 'teste.txt', { type: 'text/plain', lastModified: Date.now() })
        Object.defineProperty(arquivoMock, 'size', { value: 1024, writable: false })

        const input = container.querySelector('input.upload-input')
        Object.defineProperty(input, 'files', {
            value: [arquivoMock],
            writable: false,
        })

        input.dispatchEvent(new Event('change'))
        jest.advanceTimersByTime(2000)
        await Promise.resolve()

        expect(fileUploader.obterArquivos()).toContain(arquivoMock)
        const uploadedItem = container.querySelector('li.uploaded-item')
        expect(uploadedItem).not.toBeNull()
    })

    test('Não deve adicionar arquivo quando o tamanho excede o máximo', async () => {
        jest.useFakeTimers()

        const arquivoGrande = new File(['conteúdo'.repeat(1024)], 'grande.txt', { type: 'text/plain', lastModified: Date.now() })
        Object.defineProperty(arquivoGrande, 'size', { value: 6 * 1024 * 1024, writable: false })

        const input = container.querySelector('input.upload-input')
        Object.defineProperty(input, 'files', {
            value: [arquivoGrande],
            writable: false,
        })

        input.dispatchEvent(new Event('change'))
        jest.advanceTimersByTime(2000)

        try {
            await Promise.resolve()
        } catch (error) {
            expect(error.message).toBe('Tamanho de arquivo inválido')
        }

        await Promise.resolve()
        expect(fileUploader.obterArquivos()).not.toContain(arquivoGrande)
        const uploadingItem = container.querySelector('li.uploading-item')
        expect(uploadingItem).toBeNull()
    })
})
    
      