package net.sf.j2s.ui.launching.template;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

import net.sf.j2s.ui.Java2ScriptUIPlugin;
import net.sf.j2s.ui.launching.J2SLaunchingUtil;

import org.eclipse.jface.preference.IPreferenceStore;

/**
* an abstract template manager implementation using eclipse workspace preferences for
* storing user templates. each template contributor should load this manager with a
* J2STemplateWorkingSet
* 
* @author sgurin
*
*/
public class J2STemplateManager /*implements TemplateManager*/ {	

	public static final String PREFERENCE_PREFIX="sf.net.j2s.ui.launching.templates.", 
		PREFS_KEYFILE="sf.net.j2s.ui.launching.templatesKeyFile",
		PREFS_OUTPUTFILE=".outputFile.", PREFS_TEMPLATECODE = ".code.";
	private J2SAppLauncherTemplateContributor templateContributor;
		
	public J2STemplateManager(J2SAppLauncherTemplateContributor templateSet) throws Exception {
		this.templateContributor=templateSet;
		initializeStore();		
	}

	private void initializeStore() throws Exception {		
//		resetStore();//debug		
		String kf = getStore().getString(PREFS_KEYFILE);
		if(kf==null||kf.equals("")) {
			for (Iterator iterator = templateContributor.getBuiltInTemplates().iterator(); iterator.hasNext();) {
				TemplateInfo ti = (TemplateInfo) iterator.next();
				InputStream is = templateContributor.getClass().getClassLoader().getResourceAsStream(ti.getFilePath());
				String templateCode = J2SLaunchingUtil.inputStreamAsString(is);
				TemplateInfo template = new TemplateInfo(ti.getTemplateName(), templateCode, ti.getFileOutputName());
				_putTemplate(template, false);
			}			
		}	
	}

	
	private TemplateInfo template(String name) throws Exception {
		for (Iterator iterator = templateContributor.getBuiltInTemplates().iterator(); iterator.hasNext();) {
			TemplateInfo t = (TemplateInfo) iterator.next();
			if(t.getTemplateName().equals(name))
				return t;
		}
		return null;
	}

//	@Override
	public TemplateInfo getTemplate(String name) throws Exception {
		String templateName = getStore().getString(PREFERENCE_PREFIX+name);
		if(templateName==null||templateName.equals(""))
			return null;
		String templateCode = getStore().getString(PREFERENCE_PREFIX+templateName+PREFS_TEMPLATECODE);
		String templateOutputFile = getStore().getString(PREFERENCE_PREFIX+templateName+PREFS_OUTPUTFILE);		
		return new TemplateInfo(templateName, templateCode, templateOutputFile);
	}

//	@Override
	public boolean putTemplate(TemplateInfo t) throws Exception {
		return _putTemplate(t, true);
	}
	
	private boolean _putTemplate(TemplateInfo t, boolean checkMainTemplates) throws Exception {
		String name = t.getTemplateName();
		TemplateInfo ti = template(name);
		if(!(checkMainTemplates && ti!=null)){
			
			getStore().setValue(PREFERENCE_PREFIX+name, t.getTemplateName());
			getStore().setValue(PREFERENCE_PREFIX+name+PREFS_TEMPLATECODE, t.getTemplateCode());
			getStore().setValue(PREFERENCE_PREFIX+name+PREFS_OUTPUTFILE, t.getFileOutputName());
			
			Properties keys = getKeysFile();
			keys.put(name, "true");
			saveKeysFile(keys);
			return true;
		}
		return false;
	}
	
//	@Override
	public void removeTemplate(String name) throws Exception {
		if(template(name)!=null){
			Properties keys = getKeysFile();
			keys.remove(name);
			saveKeysFile(keys);
		}
	}

//	@Override
	public TemplateInfo[] listTemplates() throws Exception {
		Properties props = getKeysFile();
		Set ks = props.keySet();
		TemplateInfo[]templs = new TemplateInfo[ks.size()];
		int i=0;
		for (Iterator iterator = ks.iterator(); iterator.hasNext();) {
			templs[i]=getTemplate((String) iterator.next());
			i++;
		}
		return templs;
	}

	//helpers	
	private IPreferenceStore getStore() {
		return Java2ScriptUIPlugin.getDefault().getPreferenceStore();
	}
	private Properties getKeysFile() throws IOException {
		Properties props = new java.util.Properties();
		String keyFile = getStore().getString(PREFS_KEYFILE);
		props.load(new StringReader(keyFile));
		return props;
	}
	private void saveKeysFile(Properties keys) throws IOException {
		StringWriter sw = new StringWriter();
		keys.store(sw, "");
		getStore().setValue(PREFS_KEYFILE, sw.toString());
	}

	public String[] listTemplateNames() throws Exception {
		TemplateInfo[] tmpls = listTemplates();
		String[] tnames = new String[tmpls.length];
		for (int i = 0; i < tmpls.length; i++) {
			tnames[i]=tmpls[i].getTemplateName();
		}
		return tnames;
	}
	
	/** only for debug porpuses
	 * @throws IOException */ 
	private void resetStore() throws IOException {
		getStore().setValue(PREFS_KEYFILE, "");		
	}
	
}