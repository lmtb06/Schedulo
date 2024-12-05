class Modal {
    /**
     * @type {HTMLDialogElement}
     * @protected
     */
    _element;
    constructor(element) {
        this._element = element;
    }

    addEventListeners() {
        this._element.querySelectorAll("[cancel]").forEach((element) => {
            element.addEventListener("click", () => {
                this._element.dispatchEvent(new Event("cancel"));
            });
        });

        this._element.addEventListener("cancel", () => {
            this.close();
        });

        this._element.addEventListener("submit", () => {
            this.submit();
        });
    }

    removeEventListeners() {
        const newElement = this._element.cloneNode(true);
        this._element.parentNode.replaceChild(newElement, this._element);
        this._element = newElement;
    }

    init() {
        this.addEventListeners();
    }

    show() {
        this._element.showModal();
    }

    close() {
        this.reset();
        this._element.close();
    }

    reset() {
        this.removeEventListeners();
        this._element.querySelectorAll("form").forEach((form) => {
            form.reset();
        });
    }

    prefill(data) {}

    submit() {}
}

export { Modal };
