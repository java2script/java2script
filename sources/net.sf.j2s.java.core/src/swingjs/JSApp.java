package swingjs;

import java.util.Hashtable;
import java.util.Locale;

import swingjs.api.js.HTML5Applet;

@SuppressWarnings("rawtypes")
public class JSApp {

	public JSApp() {
		// Frame only; not applet
	}

	public JSApp(Hashtable<String, Object> params) {
		setAppParams(params);
	}
	
	public String getParameter(String name) {
		String s = (String) params.get(name);
		System.out.println("get parameter: " + name + " = " + s);
		return (s == null ? null : "" + s); // because it may not be a string in JavaScript if inherited from Info
	}
	
	protected Hashtable params;

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
	protected void setAppParams(Hashtable<String, Object> params) {
		this.params = params;
		String language = getParameter("language");
		if (language == null)
			language = JSUtil.J2S._getDefaultLanguage(false);
		Locale.setDefault(JSUtil.getDefaultLocale(language));
		htmlName = extract("" + getParameter("name"), "_object");
		appletName = extract(htmlName + "_", "_");
		// should be the same as htmlName; probably should point out that applet
		// names cannot have _ in them.

		syncId = getParameter("syncId");
		fullName = htmlName + "__" + syncId + "__";
		params.put("fullName", fullName);
		Object o = params.get("codePath");
		if (o == null)
			o = "../java/";
		appletCodeBase = o.toString();
		appletIdiomaBase = appletCodeBase.substring(0,
				appletCodeBase.lastIndexOf("/", appletCodeBase.length() - 2) + 1)
				+ "idioma";
		o = params.get("documentBase");
		appletDocumentBase = (o == null ? "" : o.toString());
		if (params.containsKey("maximumSize"))
			Math.max(((Integer) params.get("maximumSize")).intValue(), 100);
		async = (testAsync || params.containsKey("async"));
		HTML5Applet applet = JSUtil.J2S._findApplet(htmlName); 
		String javaver = JSUtil.J2S._getJavaVersion();
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
