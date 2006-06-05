Clazz.declarePackage ("net.sf.j2s.ajax");
c$ = Clazz.decorateAsClass (function () {
	this.transport = null;
	if (window.XMLHttpRequest) {
		this.transport = new XMLHttpRequest();
	} else {
		try {
			this.transport = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			this.transport = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	this.getReadyState = function () {
		return this.transport.readyState;
	};
	this.getResponseText = function () {
		return this.transport.responseText;
	};
	this.getResponseXML = function () {
		return this.transport.responseXML;
	};
	this.getResponseCode = function () {
		return this.transport.status;
	};
	this.registerOnReadyStateChange = function (handler) {
		this.transport.onreadystatechange = (function (transport) {
			return function () {
				var state = transport.readyState;
				if (handler != null) {
					if (state == 1) {
						handler.onLoading ();
					} else if (state == 2) {
						handler.onLoaded ();
					} else if (state == 3) {
						handler.onLoaded ();
					} else if (state == 4) {
						handler.onComplete ();
						transport.onreadystatechange = function () {};
					}
				}
			};
		}) (this.transport);
	};
	this.setRequestHeader = function (key, value) {
		this.transport.setRequestHeader(key, value);
	};
	this.getResponseHeader = function (key) {
		return this.transport.getResponseHeader(key);
	};
	this.open = function (method, url) {
		this.open(method, url, false);
	};
	this.open = function (method, url, async) {
		this.transport.open (method, url, async);
		this.transport.setRequestHeader ("User-Agent",
				"Java2Script-Pacemaker/1.0 (+http://j2s.sourceforge.net)");
		if (method != null && method.toLowerCase () == "post") {
			this.transport.setRequestHeader ("Content-type", 
					"application/x-www-form-urlencoded");

			/* Force "Connection: close" for Mozilla browsers to work around
			 * a bug where XMLHttpReqeuest sends an incorrect Content-length
			 * header. See Mozilla Bugzilla #246651. 
			 */
			if (this.transport.overrideMimeType) {
				this.transport.setRequestHeader ("Connection", "close");
			}
		}
	};
	this.send = function () {
		this.send(null);
	};
	this.send = function (str) {
		this.transport.send (str);
	};
}, net.sf.j2s.ajax, "HttpRequest", null, Runnable);
