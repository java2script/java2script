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
	public static String VERSION = "3.2.2.02";
	
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
