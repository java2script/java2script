package net.sf.j2s.ui.launching.template;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.Platform;

/**
 * misc utilities for templates
 * 
 * TODO: this can be moved to some other existing j2s utilities class.
 * @author sgurin
 *
 */
public class TemplateContributionUtil {

	private static TemplateContributionUtil instance;

	private TemplateContributionUtil() {
	}

	public static TemplateContributionUtil getInstance() {
		if (null == instance) {
			instance = new TemplateContributionUtil();
		}
		return instance;
	}
	
	J2SAppLauncherTemplateContributor currentTC=null;
	public J2SAppLauncherTemplateContributor getCurrentTemplateContribution() throws Exception {
		if(currentTC==null) {
			IConfigurationElement[] config = Platform.getExtensionRegistry()
				.getConfigurationElementsFor("net.sf.j2s.ui.j2sAppLauncherTemplateSupport");
			for (int i = 0; i < config.length; i++) {
				IConfigurationElement cEl = config[i];
				try {
					currentTC = (J2SAppLauncherTemplateContributor)cEl.createExecutableExtension("class");
					break;
				} catch (Exception e) {}				
			}
			if(currentTC==null)
				throw new Exception("can't find or instantiate J2SAppLauncherTemplateContributor");		
		}
		return currentTC;
	}
	
	public static Properties readProperties(Class c, String path) throws IOException {
		Properties props = new java.util.Properties();
		props.load(c.getClassLoader().getResourceAsStream(path));
		return props;
	}
	public static String readResourceAsStream(Class c, String path) throws IOException {
		return inputStreamAsString(c.getClassLoader().getResourceAsStream(path));
	}
	public static String inputStreamAsString(InputStream in)
	    throws IOException {
		    BufferedReader br = new BufferedReader(new InputStreamReader(in));
		    StringBuilder sb = new StringBuilder();
		    String line = null;	
		    while ((line = br.readLine()) != null) {
		    	sb.append(line + "\n");
		    }	
		    br.close();
		    return sb.toString();
    }
}
