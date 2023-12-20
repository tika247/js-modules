((win, doc) => {
  /**
   * Dialog
   * @param {HTMLDialogElement} root
   * @param {number} i
   * @param {object} options
   * @note button element must come just before the dialog
   */
  class Dialog {
    constructor(root, i, options = {}) {
      this.closeBtnClass = options.closeBtnClass || 'fn-dialog-close';

      this.root = root;
      this.btn = this.root.previousElementSibling;
      this.closeBtn = this.root.querySelector(`.${this.closeBtnClass}`);

      this.id = `dialog-${i + 1}`;
      this.isDialogOpen = false;
    }

    /**
     * Initialize
     * @public
     * @returns {Void}
    */
    init() {
      this.setting();
      this.addEvent();
    }

    /**
     * Setting
     * @private
     * @returns {Void}
     */
    setting() {
      this.root.id = this.id;
      this.btn.setAttribute('aria-haspopup', 'dialog');
      this.btn.setAttribute('aria-expanded', 'false');
      this.btn.setAttribute('aria-controls', this.root.id);
    }

    /**
     * Add Event
     * @private
     * @returns {void}
     */
    addEvent() {
      this.btn.addEventListener('click', this.openDialog.bind(this));
      this.closeBtn.addEventListener('click', this.closeDialog.bind(this));
      this.root.addEventListener('click', this.detectOverlayClicked.bind(this));
      document.addEventListener('keydown', this.keyDownHandler.bind(this));
    }

    /**
     * Open
     * @private
     * @returns {void}
     */
    openDialog() {
      if (this.isDialogOpen) return;

      this.isDialogOpen = true;
      this.root.showModal();
      this.btn.setAttribute('aria-expanded', String(this.isDialogOpen));
      document.documentElement.style.overflow = 'hidden';
    }

    /**
     * Close
     * @private
     * @returns {void}
     */
    closeDialog() {
      if (!this.isDialogOpen) return;

      this.isDialogOpen = false;
      this.root.close();
      this.btn.setAttribute('aria-expanded', String(this.isDialogOpen));
      document.documentElement.removeAttribute('style')
    }

    /**
     * detect if clicked area is overlay
     * @private
     * @returns {void}
     */
    detectOverlayClicked(e) {
      if (e.target === this.root) this.closeDialog();
    }

    /**
     * Close by keyboard
     * @private
     * @param {keyboardEvent} e
     * @returns {void}
     */
    keyDownHandler(e) {
      if (this.isDialogOpen && e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        this.closeDialog();
      }
    }
  }

  /**
   * Instantiation & Execution
   */
  (() => {
    const dialogEl = doc.querySelectorAll('.js-dialog');
    if (!dialogEl.length) return;

    dialogEl.forEach((el, i) => {
      const dialog = new Dialog(el, i);
      dialog.init();
    });
  })();
})(window, document);