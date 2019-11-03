package net.sf.j2s.ui.launching.template;

import java.util.List;
/**
 * a j2s applicaiton launcher template contribution is responsible of 2 things:
 * 1) given a template context be able to launch the J2S application
 * 2) provide information about built-in templates
 * @author sgurin
 */
public interface J2SAppLauncherTemplateContributor {
	
	void launchJ2SApp(J2STemplateContext ct) throws Exception;
	
	/**
	 * @return List<TemplateInfo>
	 */
	List getBuiltInTemplates() throws Exception;
}
