package net.sf.j2s.core;

//import net.sf.j2s.core.hotspot.InnerHotspotServer;

import org.eclipse.core.runtime.Plugin;
import org.osgi.framework.BundleContext;

/**
 * The main plugin class to be used in the desktop.
 * 
 */
public class CorePlugin extends Plugin {

	//The shared instance.
	private static CorePlugin plugin;
	
	/**
	 * Note that Eclipse must be started with the -clean flag if it is to 
	 * register the bundle version properly. So we use VERSION here instead.
	 * 
	 */
	public static String VERSION = "3.2.3.00";
	// BH 9/23/2018 -- 3.2.3.00 new transpiler + SwingJS-site.zip - support for java.applet.Applet and java.awt.* controls without use of a2s.*
	// BH 9/16/2018 -- 3.2.2.06 removes "$" in JApplet public method alternative name
	// 3.2.2.04 2018.08.15 fixing Java->JavaScript "getFinal" code for class names.
	// 3.2.2.04 adds support for window-level applets, such as JmolApplet
	// 3.2.2.03 adds Java 8 function and stream
	// 3.2.2.02 adds $-qualified names for all methods
	// 3.2.1.01 original SwingJS version through 2017 adds $-signatures for methods
	// 3.1.1 last Zhou Renjian unqualified name version
	/**
	 * The constructor.
	 */
	public CorePlugin() {
		plugin = this;
	}

	/**
	 * This method is called upon plug-in activation
	 */
	public void start(BundleContext context) throws Exception {
		super.start(context);
		System.out.println("net.sf.j2s.core." + context.getBundle().getVersion() + "/" + VERSION + " started");
//		if (!InnerHotspotServer.isServerStarted()) {
//			InnerHotspotServer.getSingletonServer().startServer();
//		}
	}

	/**
	 * This method is called when the plug-in is stopped
	 */
	public void stop(BundleContext context) throws Exception {
		super.stop(context);
		plugin = null;
//		if (InnerHotspotServer.isServerStarted()) {
//			InnerHotspotServer.getSingletonServer().stopServer();
//		}
	}

	/**
	 * Returns the shared instance.
	 */
	public static CorePlugin getDefault() {
		return plugin;
	}

}
