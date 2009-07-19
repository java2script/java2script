Clazz.declarePackage ("net.sf.j2s.ajax");
c$ = Clazz.decorateAsClass (function () {
	this.transport = null;
	this.xssErrorHandler = null;
	if (window.XMLHttpRequest) {
		this.transport = new XMLHttpRequest();
	} else {
		try {
			this.transport = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			this.transport = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
}, net.sf.j2s.ajax, "HttpRequest");
c$.prototype.getReadyState = function () {
	return this.transport.readyState;
};
c$.prototype.getResponseText = function () {
	return this.transport.responseText;
};
c$.prototype.getResponseXML = function () {
	return this.transport.responseXML;
};
c$.prototype.getStatus = function () {
	return this.transport.status;
};
c$.prototype.getStatusText = function () {
	return this.transport.statusText;
};
c$.prototype.registerOnReadyStateChange = function (handler) {
	this.xssErrorHandler = handler;
	this.transport.onreadystatechange = (function (transport, handler) {
		return function () {
			var state = transport.readyState;
			if (handler != null) {
				if (state == 1) {
					handler.onOpen ();
				} else if (state == 2) {
					handler.onSent ();
				} else if (state == 3) {
					handler.onReceiving ();
				} else if (state == 4) {
					handler.onLoaded ();
					transport.onreadystatechange = function () {};
				}
			}
		};
	}) (this.transport, handler);
};
c$.prototype.setRequestHeader = function (key, value) {
	this.transport.setRequestHeader (key, value);
};
c$.prototype.getAllResponseHeaders = function() {
	return this.transport.getAllResponseHeaders ();
};
c$.prototype.getResponseHeader = function (key) {
	return this.transport.getResponseHeader (key);
};
/*
c$.prototype.open = function (method, url) {
	this.open (method, url, false, null, null);
};
c$.prototype.open = function (method, url, async) {
	this.open (method, url, async, null, null);
};
c$.prototype.open = function (method, url, async, user) {
	this.open (method, url, async, user, null);
};
*/
c$.prototype.open = function (method, url, async, user, password) {
	this.transport.open (method, url, async, user, password);
	try {
		if (ClassLoader != null && ClassLoader.isGecko) {
			this.transport.setRequestHeader ("User-Agent", "Java2Script/2.0.0");
		}
	} catch (e) {
	}
	try {
		var l = window.location;
		this.transport.setRequestHeader ("Referer",
				l.protocol + "//" + l.host + (l.port != "" ? ":" + l.port : "") + "/");
	} catch (e) {
	}
	if (method != null && method.toLowerCase () == "post") {
		try {
			this.transport.setRequestHeader ("Content-type", 
					"application/x-www-form-urlencoded");
		} catch (e) {
		}
	}
};
c$.prototype.abort = function () {
	this.transport.abort ();
};
/*
c$.prototype.send = function () {
	this.send (null);
};
*/
c$.prototype.send = function (str) {
	try {
		this.transport.send (str);
	} catch (e) {
		// may be cross-domains exceptions
		this.transport.onreadystatechange = function () {};
		if (this.xssErrorHandler != null) {
			this.xssErrorHandler.onLoaded ();
		}
		this.xssErrorHandler = null;
	}
};
