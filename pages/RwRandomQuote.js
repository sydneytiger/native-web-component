class RwRandomQuote extends HTMLElement {
    constructor() {
        super();

        this._quote = ['quote 1', 'quote 2', 'quote 3'];
        this._interval = null;
        this._$quote = null;
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .rw-container {
                    width:500px;
                    border: dotted 1px grey;
                    margin: auto;
                    padding: 20px;
                }
                .rw-container h1 {
                    font-size: 20px;
                    margin: 0;
                }
            </style>

            <div class="rw-container">
                <h1>Random Quote</h1>
                <p>"<span id="quote"></span>"</p>
            </div>
        `;

        this._$quote = this.querySelector('#quote');
        // getAttribute
        this._setInterval(this.getAttribute('interval'));
        this._render();
    }

    disconnectedCallback() {
        clearInterval(this._interval);
    }

    // observedAttribute
    static get observedAttributes() {
        return ['interval'];
    }

    // attributeChangedCallback
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'interval' && !isNaN(newValue)) {
            this._setInterval(newValue);
        }
    }

    _render() {
        if (this._$quote && this._quote) {
            const index = Math.floor(Math.random() * this._quote.length);
            // setAttribute
            this.setAttribute('current-index', index);
            this._$quote.innerHTML = this._quote[index];
        }
    }

    _setInterval(value) {
        if (this._interval) {
            clearInterval(this._interval);
        }

        if (value > 0) {
            this._interval = setInterval(() => this._render(), value);
        }
    }
}

window.customElements.define('rw-random-quote', RwRandomQuote);