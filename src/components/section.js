export class Section {
    constructor({items, renderer}, selector) {
        this._container = document.querySelector(selector);
        this._items = items;
        this._renderer = renderer;
    }
    
    addItem(item) {
        this._container.prepend(this._renderer(item));
    }

    renderItems() {
        this._items.forEach((item) => this._renderer(item));
    }
}