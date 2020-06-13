package swingjs;

import java.util.Hashtable;
import java.util.Locale;
import java.util.Map.Entry;

import swingjs.api.js.HTML5Applet;

@SuppressWarnings("rawtypes")
public class JSApp {

	public JSApp() {
		// Frame entry point
	}

	public JSApp(Hashtable<String, Object> params) {
		// JApplet entry point
		setAppParams(params);
	}

	/**
	 * Only called from setAppParams
	 * @param name
	 * @return
	 */
	public String getParameter(String name) {
		String s = (String) params.get(name.toLowerCase());
		return (s == null ? null : "" + s); // because it may not be a string in JavaScript if inherited from Info
	}
	
	protected Hashtable<String, Object> params;

	public String appletCodeBase;
	public String appletIdiomaBase;
	public String appletDocumentBase;

	public String appletName;
	public String htmlName;

	protected String main;

	public String syncId;
	public boolean testAsync;
	public boolean async;
	public String strJavaVersion;
	public Object strJavaVendor;
	
	
	public boolean isApplet, isFrame;	
	public HTML5Applet html5Applet;

	public String fullName = "Main";


	
	/**
	 * @param params
	 */
	protected void setAppParams(Hashtable<String, Object> params0) {
		// Although we allow params to hold mixed-case keys, 
		// we need to ensure that it has the lower-case version
		// It was an early design flaw, unfortunately.
		// At least for now, this is the solution.
		params = new Hashtable<String, Object>();
		for (Entry<String, Object> e: params0.entrySet()) {
			String key = e.getKey();
			String lc = key.toLowerCase();
			Object v = e.getValue();
			params.put(lc, v);
			if (lc != key)
				params.put(key, v);
		}
		String language = getParameter("language");
		if (language == null)
			language = JSUtil.J2S.getDefaultLanguage(false);
		Locale.setDefault(JSUtil.getDefaultLocale(language));
		htmlName = extract("" + getParameter("name"), "_object");
		appletName = extract(htmlName + "_", "_");
		// should be the same as htmlName; probably should point out that applet
		// names cannot have _ in them.

		syncId = getParameter("syncId");
		fullName = htmlName + "__" + syncId + "__";
		params.put("fullname", fullName);
		Object o = params.get("codepath");
		if (o == null)
			o = "../java/";
		appletCodeBase = o.toString();
		appletIdiomaBase = appletCodeBase.substring(0,
				appletCodeBase.lastIndexOf("/", appletCodeBase.length() - 2) + 1)
				+ "idioma";
		o = params.get("documentbase");
		appletDocumentBase = (o == null ? "" : o.toString());
		if (params.containsKey("maximumsize"))
			Math.max(((Integer) params.get("maximumsize")).intValue(), 100);
		async = (testAsync || params.containsKey("async"));
		HTML5Applet applet = JSUtil.J2S.findApplet(htmlName); 
		String javaver = JSUtil.J2S.getJavaVersion();
		html5Applet = applet;
		strJavaVersion = javaver;
		strJavaVendor = "Java2Script/Java 1.6 (HTML5)";
		// String platform = (String) params.get("platform");
		// if (platform != null && platform.length() > 0)
		// apiPlatform = (GenericPlatform) Interface.getInterface(platform);
		
		o = params.get("assets");
		if (o != null)
			JSUtil.loadJavaResourcesFromZip(getClass().getClassLoader(), (String) o, null);
		System.out.println("JSApp initialized");
	}

	private String extract(String string, String key) {
		/**
		 * @j2sNative
		 * 
		 * return string.split(key)[0];
		 * 
		 */
		{
		}
		return null;
	}


	
	
}
