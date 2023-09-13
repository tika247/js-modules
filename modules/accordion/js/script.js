((win, doc) => {
  /**
   * Acd
   * @param {HTMLDivElement} root
   * @param {number} i
   */
  class Acd {
    constructor(root, i, options = {}) {
      this.btnClass = options.btnClass || 'fn-acd__btn';
      this.contentClass = options.contentClass || 'fn-acd__content';
      this.altClass = options.altClass || 'fn-acd__alt';
      this.openClass = options.openClass || 'is-open';
      this.isOpen = options.isOpen || false;
      this.altText = {
        open: options.altOpen || 'Open',
        close: options.altClose || 'Close'
      }

      this.root = root;
      this.btn = this.root.querySelector(`.${this.btnClass}`);
      this.content = this.root.querySelector(`.${this.contentClass}`);
      this.alt = this.root.querySelector(`.${this.altClass}`);

      this.id = {
        'content': `acd-content-${i + 1}`,
        'btn': `acd-btn-${i + 1}`
      }
    }

    /**
     * Initialize
     * @public
     * @returns {void}
     */
    init() {
      this.setting();
      this.addEvent();
    }

    /**
     * Setting
     * @private
     * @returns {void}
     */
    setting() {
      this.content.id = this.id.content;
      this.btn.id = this.id.btn;
      this.btn.setAttribute('aria-controls', this.id.content);
      this.btn.setAttribute('aria-expanded', String(this.isOpen));
      this.content.setAttribute('aria-labelledby', this.id.btn);

      if (this.isOpen) {
        this.root.classList.add(this.openClass);
      }
    }

    /**
     * Add Event
     * @private
     * @returns {void}
     */
    addEvent() {
      this.btn.addEventListener('click', this.acd.bind(this));
    }

    /**
     * Acd
     * @private
     * @returns {void}
     */
    acd() {
      this.isOpen = !this.isOpen;
      this.alt.textContent = this.isOpen ? this.altText.close : this.altText.open;
      this.btn.setAttribute('aria-expanded', String(this.isOpen));
      this.isOpen ? this.root.classList.add(this.openClass) : this.root.classList.remove(this.openClass);
    }
  }

  /**
   * Instantiation & Execution
   */
  (() => {
    const acdEl = doc.querySelectorAll('.js-acd');
    if (!acdEl.length) return;

    acdEl.forEach((el, i) => {
      const acd = new Acd(el, i);
      acd.init();
    });
  })();
})(window, document);
