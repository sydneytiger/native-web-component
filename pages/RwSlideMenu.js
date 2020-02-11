class RwSlideMenu extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({mode: 'open'});

    this._$frame = null;
    this._$close = null;

    this._open = false;
  }

  set open(value) {
    this._open = !!value;
    this._render();
  }

  get open() {
    return this._open;
  }

  connectedCallback() {
    this._root.innerHTML = `
    <style>
    :host([theme="red"]) .title {
      background-color:#e23f24;
      color: #fff;
    }

    :host([theme="blue"]) .title {
      background-color:#0d152d;
      color: #fff;
    }

    :host([theme="red"]) .content-slot::slotted(a:hover) {
      color: #e23f24;
    }

    :host([theme="blue"]) .content-slot::slotted(a:hover) {
      color: #0d152d;
    }

    .frame {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1000;
      transition: background-color 300ms ease-in;
    }

    .container {
      width: var(--menu-width, 80%);
      background: #fff;
      height: 100%;
      transform: translateX(-100%);
      will-change: transform;
      transition: transform 300ms ease-in;
      box-shadow: 1px 0 3px rgba(51, 51, 51,0.25);
    }

    .title {
      display: flex;
      flex-direction: row;
      min-height: 3.2em;
      font-size: 1.5em;
      background-color: #f1f1f1;
      color: #666;

      @apply --title-styles;
    }

    .title .title-content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      padding-left: 1em;
    }

    .close {
      flex-basis: 100px;
      flex-grow: 0;
      flex-shrink: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }

    .frame.open {
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.25);
    }

    .frame.open .container {
      transform: none;
    }

    .content-slot {
      display: flex;
      flex-direction: column;
    }

    .content-slot::slotted(a) {
      color: #666;
      border-bottom: solid 1px #f1f1f1
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
      text-decoration: none;
    }

    .content-slot::slotted(a:hover) {
      color: #000;
    }

    .content-slot::slotted(.item) {
      
    }
    </style>
    <div class="frame">
      <nav class="container">
        <div class="title">
          <div class="title-content">
            <slot name="title">Menu</slot>
          </div>
          <a class="close">&#10006;</a>
        </div>
        <div class="content">
          <slot class="content-slot"></slot>
        </div>
      </nav>
    </div>
    `;

    this._$frame = this._root.querySelector('.frame');
    this._$close = this._root.querySelector('.close');
    this._$close.addEventListener('click', e => {
      if(this.open) {
        this.open = false;
      }
    })
  }

  _render() {
    if(this._$frame){
      
      if(this._open) {
        this._$frame.classList.add('open');
        this.dispatchEvent(new CustomEvent('menu-opened'));
      } else {
        this._$frame.classList.remove('open');
        this.dispatchEvent(new CustomEvent('menu-closed'));
      }
    }
  }
}

window.customElements.define('rw-slide-menu', RwSlideMenu);