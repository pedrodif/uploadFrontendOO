import { FileUploader } from "../../../js/view/components/FileUploader.js"

describe('FileUploader', () => {
    let container
    let fileUploader

    beforeAll(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        fileUploader = new FileUploader(container)
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
        jest.useFakeTimers();

        const arquivoMock = new File(['conteúdo'], 'teste.txt', { type: 'text/plain', lastModified: Date.now() });
        Object.defineProperty(arquivoMock, 'size', { value: 1024, writable: false });

        const input = container.querySelector('input.upload-input');
        Object.defineProperty(input, 'files', {
            value: [arquivoMock],
            writable: false,
        });

        input.dispatchEvent(new Event('change'));

        jest.runAllTimers();
        await Promise.resolve(); 

        expect(fileUploader.obterArquivos()).toContain(arquivoMock);
        const uploadedItem = container.querySelector('li.uploaded-item');
        expect(uploadedItem).not.toBeNull();

        jest.useRealTimers();
    }, 10000);


    

});
    
      