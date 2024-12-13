import { Modal } from './Modal';

describe('Modal', () => {
    let modal: Modal;
    let modalElement: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="myModal" class="modal"></div>
        `;
        modalElement = document.getElementById('myModal')!;
        modal = new Modal('myModal', {
            closeOnOverlayClick: true,
            autoCloseAfter: 1000,
            animationDuration: 200,
        });
    });

    test('should open the modal', () => {
        modal.open();
        expect(modalElement.classList.contains('open')).toBe(true);
    });

    test('should close the modal', () => {
        modal.open();
        modal.close();
        expect(modalElement.classList.contains('open')).toBe(false);
    });

    test('should auto-close the modal after a specified time', (done) => {
        modal.open();
        setTimeout(() => {
            expect(modalElement.classList.contains('open')).toBe(false);
            done();
        }, 1100);
    });

    test('should toggle the modal', () => {
        modal.toggle();
        expect(modalElement.classList.contains('open')).toBe(true);
        modal.toggle();
        expect(modalElement.classList.contains('open')).toBe(false);
    });
});
