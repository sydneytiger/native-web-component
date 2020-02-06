class RwPoll extends HTMLElement {
  constructor() {
    super();

    this._data = {
      'question': 'Question #1',
      'answers': ['answer one', 'answer two', 'answer three']
    }
    this._selected = null;

    this._$quesiton = null;
    this._$answers = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .rw-poll-container {
          width:500px
          margin: auto;
          padding: 10px;
          border: dotted 1px back;
        }

        .rw-poll-container h3 {
          background-color: black;
          color: white;
        }

        .rw-poll-container ul {
          background-color: grey;
        }

        .selected {
          background-color: green;
        }

        #answers {
          cursor: pointer;
        }
      </style>
      <div class="rw-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;

    this._$quesiton = this.querySelector('#question');
    this._$answers = this.querySelector('#answers');
    this._$answers.addEventListener('click', e => {
      this._$answers.querySelectorAll('li').forEach(($li, index) => {
        if (e.target === $li) {
          // call property
          this.selected = index;
        }
      });
    });

    this._render();
  }

  disconnectedCallback() {

  }

  _render() {
    if(this._data) {
        while(this._$answers.firstChild) {
          this._$answers.firstChild.remove();
        }

        this._$quesiton.innerHTML = this._data.question;
        this._data.answers.forEach( answer => {
        const $li = document.createElement("li");
        $li.innerHTML = answer;
        this._$answers.appendChild($li);
      });
    }
  }

  // customer proeprties
  set data(value) {
    this._data = value;
    this._render();
  } 

  get data() {
    return this._data;
  }

  set selected(index) {
    const $answer = this._$answers.querySelector(`li:nth-child(${index + 1})`);
    if ($answer) {
      this._$answers.querySelectorAll('li').forEach($li => $li.classList.remove('selected'));
      $answer.classList.add('selected');
      this._selected = index;
    }
  }

  get selected() {
    return this._selected;
  }
}

window.customElements.define('rw-poll', RwPoll);