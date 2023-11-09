package j2s.common;

import net.sf.j2s.core.hotspot.InnerHotspotServer;

import org.eclipse.core.runtime.Plugin;
import org.osgi.framework.BundleContext;

/**
 * The main plugin class to be used in the desktop.
 */
public class CorePlugin extends Plugin {

	public static final String VERSION = "J2S legacy 4.2_20231108";
	//The shared instance.
	private static CorePlugin plugin;
	
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
		System.out.println(VERSION + " started");
		super.start(context);
		if (!InnerHotspotServer.isServerStarted()) {
			InnerHotspotServer.getSingletonServer().startServer();
		}
	}

	/**
	 * This method is called when the plug-in is stopped
	 */
	public void stop(BundleContext context) throws Exception {
		System.out.println("J2S 4.2 stopped");
		super.stop(context);
		plugin = null;
		if (InnerHotspotServer.isServerStarted()) {
			InnerHotspotServer.getSingletonServer().stopServer();
		}
	}

	/**
	 * Returns the shared instance.
	 */
	public static CorePlugin getDefault() {
		return plugin;
	}

}
