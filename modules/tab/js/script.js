((win, doc) => {
  /**
   * Tab
   * @param {HTMLDivElement} root
   * @param {Object} options
   * @todo ←, →, Home, End
   * @todo open panel by Enter Space
   */
  class Tab {
    constructor(root, options = {}) {
      this.btnClass = options.btnClass || 'fn-tab-btn';
      this.panelClass = options.panelClass || 'fn-tab-panel';
      this.titleClass = options.titleClass || 'fn-tab-title';
      this.listClass = options.listClass || 'fn-tab-list';
      this.showClass = options.showClass || 'is-show';
      this.starterNum = options.starterNum || 0;
      this.attrText = options.attrText || {
        'btnId': 'tab-btn-',
        'btnRole': 'tab',
        'panelId': 'tab-panel-',
        'panelRole': 'panel',
        'title': 'tab-title',
      };

      this.root = root;
      this.btn = this.root.querySelectorAll(`.${this.btnClass}`);
      this.panel = this.root.querySelectorAll(`.${this.panelClass}`);
      this.title = this.root.querySelector(`.${this.titleClass}`);
      this.list = this.root.querySelector(`.${this.listClass}`);
    }

    /**
     * Initialize
     * @public
     * @returns {void}
     */
    init() {
      this.setting();
      this.setStarterPanel();
      this.addEvent();
    }

    /**
     * Setting
     * @private
     * @returns {void}
     */
    setting() {
      for (let i = 0; i < this.btn.length; i++) {
        this.btn[i].id = `${this.attrText.btnId}${i}`;
        this.btn[i].role = this.attrText.btnRole
        this.btn[i].setAttribute('aria-controls', `${this.attrText.panelId}${i}`);

        this.panel[i].id = `${this.attrText.panelId}${i}`;
        this.panel[i].role = this.attrText.panelRole;
        this.panel[i].setAttribute('aria-labelledby', `${this.attrText.btnId}${i}`);
      }

      if (this.title) {
        this.title.id = this.attrText.title;
        this.list.setAttribute('aria-labelledby', this.attrText.title);
      }
    }

    /**
     * Set Starter Tab Panel
     * @private
     * @returns {void}
     */
    setStarterPanel() {
      this.switchPanel(this.starterNum)
    }

    /**
     * Add Event
     * @private
     * @returns {void}
     */
    addEvent() {
      this.btn.forEach((el, index) => {
        el.addEventListener('click', this.switchPanel.bind(this, index));
      })
    }

    /**
     * Switch Panel
     * @private
     * @param {number} index
     * @param {MouseEvent} e
     * @returns {void}
     */
    switchPanel(index, e = null) {
      if (e instanceof MouseEvent) {
        const ariaSelected = e.currentTarget.getAttribute('aria-selected') === 'true';
        if (ariaSelected) return;
      }

      this.btn.forEach((el, i) => {
        if (index === i) {
          el.setAttribute('aria-selected', 'true');
          el.removeAttribute('tabindex');
        } else {
          el.setAttribute('aria-selected', 'false');
          el.setAttribute('tabindex', '-1');
        }
      })

      this.panel.forEach((el, i) => {
        index === i ? el.classList.add(this.showClass) : el.classList.remove(this.showClass);
      })
    }
  }

  /**
   * Instantiation & Execution
   */
  (() => {
    const tabEl = doc.querySelector('.js-tab');
    if (!tabEl) return;

    const tab = new Tab(tabEl);
    tab.init();
  })();
})(window, document);
