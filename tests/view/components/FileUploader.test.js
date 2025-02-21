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

        // Dispara o evento change
        input.dispatchEvent(new Event('change'));

        // Avança os timers para garantir a execução completa da animação
        jest.runAllTimers();
        await Promise.resolve(); // Aguarda promessas pendentes

        // Verifica se o arquivo foi adicionado
        expect(fileUploader.obterArquivos()).toContain(arquivoMock);

        // Verifica se o item de carregamento foi substituído pelo item de arquivo enviado
        const uploadedItem = container.querySelector('li.uploaded-item');
        expect(uploadedItem).not.toBeNull();

        jest.useRealTimers();
    }, 10000);


    test('não deve adicionar arquivo quando o tamanho excede o máximo', async () => {
        jest.useFakeTimers();

        // Cria um arquivo simulado com tamanho maior que o máximo
        const arquivoGrande = new File(['conteúdo'.repeat(1024)], 'grande.txt', { type: 'text/plain', lastModified: Date.now() });
        Object.defineProperty(arquivoGrande, 'size', { value: 6 * 1024 * 1024, writable: false });

        const input = container.querySelector('input.upload-input');
        Object.defineProperty(input, 'files', {
            value: [arquivoGrande],
            writable: false,
        });

        const evento = new Event('change');
        input.dispatchEvent(evento);

        jest.runAllTimers();

        await Promise.resolve();

        // Verifica que o arquivo não foi adicionado
        expect(fileUploader.obterArquivos()).not.toContain(arquivoGrande);

        // Verifica que o item de carregamento foi removido
        const uploadingItem = container.querySelector('li.uploading-item');
        expect(uploadingItem).toBeNull();

        jest.useRealTimers();
    });

});
    
      