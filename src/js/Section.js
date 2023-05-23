export default class Section {
    constructor(data, containerSelector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }
    renderAll = () => {
        this._items.forEach((item) => {
            const cardElement = this._renderer(item);
            this._container.append(cardElement);
          });
    }
    addItem = (inputValues) => {
        this._items.push({
            name: inputValues.cardName,
            link: inputValues.cardUrl
          });
          const newCard = this._renderer(this._items[this._items.length - 1]);
          const firstElement = this._container.firstChild.nextSibling;
          this._container.insertBefore(newCard, firstElement); 
    }
}