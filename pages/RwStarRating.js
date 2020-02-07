class RwStarRating extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({mode: 'open'});

    this._$top = null;
    this._$bottom = null;

    this._disabled = false;
    this._value = 0;
  }

  connectedCallback() {
    this._root.innerHTML = `
      <style>
        :host {
          display: inline-block;
          overflow: hidden;
          width: 6em;
          height: 1em;
          user-select: none;
          vertical-align: middle;
          box-sizing: border-box;
        }

        .container {
          color: #c5c5c5;
          margin: 0 auto;
          font-size: 1em;
          line-height: 1em;
          padding: 0;
          position: relative;
          cursor: pointer;
        }

        .container .top {
          color: #e7bd06;
          padding: 0;
          position: absolute;
          z-index: 1;
          display: block;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 0;
        }

        .container:hover .top {
          display:none;
        }

        .container .bottom {
          padding: 0;
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          unicode-bidi: bidi-override;
          direction: rtl;
        }

        .container .bottom > span:hover,
        .container .bottom > span:hover ~ span {
          color: #e7bd06;
        }

        :host([disabled]) .container {
          cursor: inherit;
        }

        :host([disabled]) .container .top {
          display: block;
        }

        :host([disabled]) .container .bottom > span:hover,
        :host([disabled]) .container .bottom > span:hover ~ span {
          color: inherit;
        }

      </style>

      <div class="container">
        <div class="top">
          <span>&#x2605</span>
          <span>&#x2605</span>
          <span>&#x2605</span>
          <span>&#x2605</span>
          <span>&#x2605</span>
        </div>
        <div class="bottom">
          <span data-value="5">&#x2605</span>
          <span data-value="4">&#x2605</span>
          <span data-value="3">&#x2605</span>
          <span data-value="2">&#x2605</span>
          <span data-value="1">&#x2605</span>
        </div>
      </div>
    `;

    this._disabled = (this.getAttribute('disabled') !== null);
    this._$top = this._root.querySelector('.top');
    this._$bottom = this._root.querySelector('.bottom');

    this._$bottom.addEventListener('click', event => {
      const selectedValue = event.target.dataset.value;
      if (!this._disabled && selectedValue && this._value !== selectedValue) {
        this.value = selectedValue;
        this.dispatchEvent(new Event('change'));
      }
    });

    const initValue = this.getAttribute('value');
    if (initValue) {
      this.value = initValue;
      this._render();
    }
  }

  disconnectedCallback() {

  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value !== this._value) {
      this._value = value;
      this._render();
    }
  }

  static get observedAttributes() {
    return ['disabled', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      switch (name) {
        case 'disabled':
          this._disabled = (newValue !== null);
          break;
        case 'value':
          this.value = newValue;
          break;
      }
    }
  }

  _render() {
    if (this._$top) {
      this._$top.style.width = (this._value * 20) + '%';
    }
  }
}

window.customElements.define('rw-star-rating', RwStarRating);