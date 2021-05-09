var CWS = {
  DOCUMENT: $(document),
  NAVBAR_MENU: $('#navbar-menu').first(),
  NAVBAR_TOGGLER: $('#navbar-menu-toggler'),
  SIDEBAR: $('#sidebar').first(),
  SIDEBAR_TOGGLER: $('#sidebar-toggler'),
  SIDEBAR_OFF_CANVAS: $('#sidebar-off-canvas'),
  SPINNER: $('#preload'),
  CKEDITOR_CONFIG: {
    FULL: {
      extraPlugins: ['autogrow', 'codemirror', 'youtube'],
      skin: 'moono',
      toolbar: [
        { name: 'document', items: [ 'Source', '-', 'Preview', 'Print' ] },
        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
        { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Youtube' ] },
        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
      ],
    }
  },

  /**
   * Show/Hide Navbar Menu in mobile mode
   */
  toggleNavbarMenu: function() {
    if (this.isNavbarMenuShow()) {
      this.NAVBAR_MENU.removeClass('show');
      this.NAVBAR_TOGGLER.removeClass('show');
    } else {
      this.NAVBAR_MENU.addClass('show');
      this.NAVBAR_TOGGLER.addClass('show');
    }
  },

  /**
   * Check visible status of Sidebar
   * @returns {boolean}
   */
  isNavbarMenuShow: function() {
    return !!this.NAVBAR_MENU.hasClass('show');
  },

  /**
   * Show/hide Sidebar
   */
  toggleSidebar: function() {
    if (this.isSidebarShow()) {
      this.SIDEBAR.removeClass('show');
    } else {
      this.SIDEBAR.addClass('show');
    }
  },

  /**
   * Check visible status of Sidebar
   * @returns {boolean}
   */
  isSidebarShow: function() {
    return !!this.SIDEBAR.hasClass('show');
  },

  /**
   * Check off canvas status of sidebar
   * @returns {boolean}
   */
  isSidebarOffCanvas: function() {
    return !!this.SIDEBAR.hasClass('off-canvas');
  },

  /**
   * Toggle sidebar off canvas state
   */
  toggleSidebarOffCanvas: function() {
    this.SIDEBAR.toggleClass('off-canvas');
    this.saveSidebarOffCanvasState();
  },

  /**
   * Save Sidebar Off Canvas state to restore state after page reloaded
   */
  saveSidebarOffCanvasState: function() {
    Cookies.set('off-canvas', this.isSidebarOffCanvas());
  },

  /**
   * Restore off canvas state of sidebar
   */
  restoreSidebarOffCanvasState: function() {
    if (Cookies.get('off-canvas') === "true") {
      this.SIDEBAR.addClass('off-canvas');
    }
  },

  /**
   * Handle document click
   */
  documentClick: function(event) {
    var target = $(event.target);

    if (this.isSidebarShow()) {
      if (target.closest(this.SIDEBAR).length === 0 && target.closest(this.SIDEBAR_TOGGLER).length === 0) {
        this.toggleSidebar();
      }
    }

    if (this.isNavbarMenuShow()) {
      if (target.closest(this.NAVBAR_MENU).length === 0 && target.closest(this.NAVBAR_TOGGLER).length === 0) {
        this.toggleNavbarMenu();
      }
    }
  },

  /**
   * Add dropdown effect for dropdown
   */
  addDropdownEffect: function() {
    $('.dropdown')
      .on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
      })
      .on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
      });
  },

  /**
   * Active tooltip for element that has data-tooltip attribute
   * @param jElement
   * @param placement
   */
  activeDataTooltip: function(jElement, placement) {
    var title = jElement.data('tooltip');

    if (title) {
      jElement.tooltip({
        placement: placement,
        title: title,
        trigger: 'hover',
      });
    }
  },

  /**
   * Add tooltip text for sidebar group icon
   */
  activeSidebarTooltip: function() {
    var _this = this;
    this.SIDEBAR.find('[data-tooltip]').each(function(idx) {
      _this.activeDataTooltip($(this), 'right')
    });
  },

  /**
   * Add tooltip text for sidebar group icon
   */
  activeTooltip: function() {
    $('[data-toggle="tooltip"]').tooltip();
  },

  /**
   * Auto active pills and collapses when a link has class .active
   */
  activePillItem: function() {
    var pill;

    $('.tab-pane .nav-link.active').each(function(idx) {
      var el = $(this);

      el.parents('.collapse').each(function(idx) {
        $(this).collapse('show');
      });

      var tab_pane = el.closest('.tab-pane');
      if (!tab_pane) return;

      var pill_id = tab_pane.attr('aria-labelledby');
      if (!pill_id) return;

      var pill_el = $('#' + pill_id);
      if (!pill_el) return;

      pill = pill_el;
    });

    if (!!pill) {
      pill.tab('show');
    }
  },

  /**
   * Active check all function
   */
  activeCheckAll: function() {
    $('[data-toggle="check-all"]').each(function(idx) {
      $(this).change(function() {
        var id = $(this).attr('id');
        if (!id) return;
        $('input[type="checkbox"][aria-labelledby="#' + id + '"]').prop('checked', this.checked);
      });
    });
  },

  /**
   * Setup CKEditor
   * @param selector
   * @param config
   */
  setupEditor: function(selector, config) {
    ClassicEditor
        .create(document.querySelector(selector), config)
        .catch(function (error) {
          console.error('Oops, something gone wrong!');
          console.error('Please, report the following error in the https://github.com/ckeditor/ckeditor5 with the build id and the error stack trace:');
          console.warn('Build id: nam36auas85e-gdc79fyctjhs');
          console.error(error);
        });
  },

  /**
   * Add event to hide spinner after page loaded
   */
  setupSpinner: function() {
    this.SPINNER.removeClass('failover');
  },

  /**
   * Show spinner
   */
  showSpinner: function() {
    this.SPINNER.fadeIn();
  },

  /**
   * Hide spinner
   */
  hideSpinner: function() {
    this.SPINNER.fadeOut();
  },

  /**
   * Init selectize for input have data-toggle is tags
   */
  setupSelectize: function() {
    $('input[data-toggle="tags"]').selectize({
      delimiter: ',',
      persist: false,
      create: function(input) {
        return {
          value: input,
          text: input
        }
      }
    });
  },

  /**
   * Handle DOM Content Loaded event
   */
  domContentLoaded: function() {
    setTimeout((function() {
      this.hideSpinner();
    }).bind(this), 200);
  },

  /**
   * Init code
   */
  initialize: function() {
    this.DOCUMENT.click(this.documentClick.bind(this));
    this.SIDEBAR_TOGGLER.click(this.toggleSidebar.bind(this));
    this.SIDEBAR_OFF_CANVAS.click(this.toggleSidebarOffCanvas.bind(this));
    this.NAVBAR_TOGGLER.click(this.toggleNavbarMenu.bind(this));

    this.restoreSidebarOffCanvasState();
    this.addDropdownEffect();
    this.activeSidebarTooltip();
    this.activePillItem();
    this.activeCheckAll();
    this.setupSelectize();
    this.setupSpinner();

    document.addEventListener("DOMContentLoaded", this.domContentLoaded.bind(this));

    feather.replace();
  },
};

CWS.initialize();

CWS.DOCUMENT.ready(function() {
  CWS.activeTooltip();
});