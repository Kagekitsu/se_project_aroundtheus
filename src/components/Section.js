class Section {
    constructor({ items, renderer }, containerSelector ) {
        this._renderItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this.items.forEach(item => {
            this.renderer(item)
        });
    }

    addItem(element) {
        this.container.append(element)
    }
}