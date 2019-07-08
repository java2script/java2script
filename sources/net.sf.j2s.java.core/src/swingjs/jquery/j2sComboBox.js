/**
 * @authore Bob Hanson 2019.07.06
 * 
 * A relatively simple ComboBox that supports actual objects, not just strings
 * 
 */
$( function() {
    $('head').append('<style>.j2scb-sel {background-color:#B8CFE5;}'
    		+'\n.j2scb-unsel {background-color:white;}'
    		+'\n.j2scb-hov {background-color:lightblue;}'
    		+'\n.j2scbcont {position:absolute; left:0px;top:0px;border:black solid 1px;}'
    		+'\n.j2scbhead {position:absolute; left:0px;top:0px;padding:.1em .2em 0em .2em;text-align:left;overflow:hidden;}'
    		+'\n.j2scbbtn {position:absolute; left:100px;top:0px; width:20px;text-align:center;cursor:pointer;background-color:lightblue;padding:0px}'
    		+'\n.j2scbpopup {position:absolute;}'
    		+'\n.j2scblist {position:absolute; left:0px;top:0px;margin:0;border:black solid 1px;cursor:pointer;text-align:left;padding:0em;scrollbar-width:thin;cursor:pointer;}</style>'
    );
    
    var t;
    var CLOSE_DELAY = 50;
    var stopT = function() {clearTimeout(t); t = 0;}
        
    // the widget definition, where 'custom' is the namespace,
    // 'j2sCB' the widget name

    $.widget( 'custom.j2sCB', {
    	
      options: {
    	mode: 's', // or 'm'
 		height: 0,
 		items: null,
 		disabled: false,
 		popupVisible: false,
 		selectedIndex: -1,
 		backgroundColor: "white",
 		// z-index
 		zIndex:999999,
        // Callbacks
        change: null
      },
      setZIndex: function(z) {
    	this.options.zIndex = z;
      },
      updateList: function(items) {
    	  this.list.children().detach();
    	  this.add(items);
	  },
	  setHeight: function(h) {
		  this.options.height = h;
	  },
      updateCSS: function() {
          var w = this.element.width();
          var h = this.element.height() + 'px';
          this.cont.css({
          	width: w + 'px',
          	height: h,
          	backgroundColor: this.options.backgroundColor
          });
          this.head.css({
          	width: (w - 20) + 'px',
          	height: h
          });
          this.btn.css({
          	left: (w - 20) + 'px',
          	height: h
          });
          h = (this.options.height ? this.options.height + 'px' : null);
          this.popup.css({
            width: w + 'px',
        	height: h
          });  
          this.list.css({
            width: w + 'px',
          	height: h,
          	overflowY: (h ? null : 'auto')
          });  
      },
      getSelectedItem: function() { return this._selected() },
      getSelectedIndex: function() { return this._selected()[0] ? this._selected()[0].j2scbIndex : -1 },
      setSelectedIndex: function(n) { return this._clickOpt({target: $('#' + this.id() + '_opt' + n)}, false) },
      setText: function(s) { this.head.text(s) },
      _selected: function() { return this.list && this.list.find('.j2scb-sel')},
      
      _leave: function() {
          if (t)return;
          var me = this;
      	  t = setTimeout(function() {  
      		  me.hidePopup();
      	  	  stopT();
      	  },CLOSE_DELAY);
      },
  	  hidePopup: function() {
  		 this.options.popupVisible = false;
  		 this.popup.hide();
  	  },
  	  popupVisible: function() { return this.options.popupVisible; }, 
  	  showPopup: function() {
  		this.cont.focus();
  		if (this.options.disabled)
  			return;
		stopT();
		var loc = this.element.offset();
		this.options.popupVisible = true;
	 	this.popup.css({
	 		'display':'block',
	 		left: loc.left + 'px',
        	top: (loc.top + this.element.height() + 1) + 'px',
        	width:this.element.css('width'),
	 		'z-index': this.options.zIndex
	 	});
	  	this.list.scrollTop(0);
	  	this.element.focus();
	  },
      update: function(andTrigger) {
  		 var sel = this._selected();
  		 var all;
  		 this.options.selectedIndex = this.getSelectedIndex();
  		 this.head.text(sel.length ==0 ? '' : 
  			this.options.mode == 's' ? sel.text() : sel.length + ' of ' 
  					+ (all = this.list.find('.j2scbopt').length) + ' selected option' + (all > 1 ? 's' :''));
  		 if (andTrigger)
	      	this._trigger( 'change' , null, [this, "selected", sel[0].j2scbIndex]);
	     else
	    	 stopT();
      },  
      itemCount: 0,
      id: function() {return this.element[0].id},
      find: function(x) {return this.element.find(x)},
      on: function(a, x) {for(var i = a.length; --i >= 0;)this._on(a[i],x)},
      add: function(items) {
    	  if (Array.isArray(items)) {
        	this.itemCount = 0;    		
    	  } else {
    		items = [items];  
    	  }
    	  for (var i = 0; i < items.length; i++) {
    		var item = items[i];
    		if (!item)continue;
    		var opt = $('<li>', {'class':'j2scbopt j2scb-unsel', 'id': this.id() + '_opt' + this.itemCount});
    		opt[0].j2scbIndex = this.itemCount++;    		
    		this.list.append(opt);
			if (typeof item == 'string') {
				opt.text(item);
    		} else {
    			opt.append(item);
    		}
	        this._on(opt, {mouseleave: '_leave', mouseover: '_overOpt', click : '_clickOpt'});
    	  }
      },
      hoverIndex: function(i) {
    	this._overOpt(this.list[0].children[i]);  
      },
      _overOpt: function(e) {
    	  stopT();
    	  this.list.find('.j2scbopt').removeClass('j2scb-hov j2scb-sel');
    	  var opt = $(e.target || e).closest('.j2scbopt');
    	  opt.addClass('j2scb-hov');
    	  this._trigger("change", e, [this, "mouseover", opt[0].j2scbIndex])
    	  return opt;
      },
      _clickOpt: function(e, andTrigger) {
    	    andTrigger |= (arguments.length == 1);
    	    var opt = $(e.target || e).closest('.j2scbopt');
    	  	var opts = this.list.find('.j2scbopt');
    	  	opts.removeClass('j2scb-hov');
	    	if (this.options.mode=='s') {
	    		opts.removeClass('j2scb-sel');
	    	    opts.addClass('j2scb-unsel');
	    	    opt.removeClass('j2scb-unsel');
	    	    opt.addClass('j2scb-sel');
	    	    if (andTrigger)
	    	    	this._leave();
	    	} else if (mode == 'm') {  
	    		  if (opt.is('.j2scb-sel')) {
	    			opt.addClass('j2scb-unsel');
	    			opt.removeClass('j2scb-sel');
	    	      } else {
	    			opt.addClass('j2scb-sel');
	    			opt.removeClass('j2scb-unsel');
	    	      }  
	    	}  
	    	this.update(andTrigger);
	    	return opt;
      },
      // The constructor
      _create: function() {
    	var id = this.id();
        this.element.addClass( 'custom-j2sCB' );
        this.cont = $( '<div>', {'class': 'j2scbcont', 'id':id+'_cont' });
        this.cont.append(this.head = $( '<div>', {'class': 'j2scbhead', 'id':id+'_head' }));
        this.cont.append(this.btn = $( '<button>', {'class': 'j2scbbtn', 'id':id+'_btn' , text:'\u25bc'}));
        this.popup = $( '<div>', {'class': 'j2scbpopup', 'id':id+'_popup' });
        this.popup.css({
        	display:'none',
        });
        this.list = $( '<ul>', {'class': 'j2scblist', 'id':id+'_list' });
        this.popup.append(this.list);        
        this.element.append(this.cont);
        // important to add popup to body, because it is 
        $('body').append(this.popup);
        this.updateCSS();    	
        this.on( [this.head, this.btn, this.cont], { click: 'showPopup' });
        this.on( [this.popup, this.list], {mouseover: stopT });
        this.on( [this.cont, this.head, this.btn, this.popup, this.list], {
        	mouseleave: '_leave'//,
        	//keydown: '_keyEvent'
        		});
        
        if (this.options.items)
        	this.add(this.options.items);
        
        this.setSelectedIndex(this.options.selectedIndex)
        this._refresh();
      },
      _keyEvent: function(e) {
    	  this._trigger('change', e, [this, 'keyevent', e]);
      },
 
      // Called when created, and later when changing options
      _refresh: function() {
 
        // Trigger a callback/event
        this._trigger( 'change' , null, [this, "refreshed"] );
      },
 
      // Events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
        this.cont.remove();
 		this.popup.remove();
        this.element
          .removeClass( 'custom-j2sCB' )
          .enableSelection()
          .css( 'background-color', 'transparent' );
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
    	  if (key == "disabled") {
    		  this.options.disabled = true;
    	  }
    	//  if (false)return;
        //[prevent invalid value here with test and return]
        this._super( key, value );
      }
    });
 
} );


