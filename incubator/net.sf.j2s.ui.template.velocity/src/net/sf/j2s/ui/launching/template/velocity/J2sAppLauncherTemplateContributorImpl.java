package net.sf.j2s.ui.launching.template.velocity;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.swt.widgets.Display;

import net.sf.j2s.ui.launching.J2SApplicationRunnable;
import net.sf.j2s.ui.launching.J2SLaunchingUtil;
import net.sf.j2s.ui.launching.J2STemplateOptionsTab;
import net.sf.j2s.ui.launching.template.J2SAppLauncherTemplateContributor;
import net.sf.j2s.ui.launching.template.J2STemplateContext;
import net.sf.j2s.ui.launching.template.TemplateContributionUtil;
import net.sf.j2s.ui.launching.template.TemplateInfo;
/**
 * responsabilities build a output file that renders a j2s application 
 * according to the given J2STemplateContext
 * @author sgurin
 *
 */
public class J2sAppLauncherTemplateContributorImpl implements
		J2SAppLauncherTemplateContributor {

	

	
	static final String MAIN_TEMPLATES_BASE = "/net/sf/j2s/ui/launching/template/velocity/templates/";
	static final String BUILT_IN_TEMPLATES_PROPERTIES = MAIN_TEMPLATES_BASE+"builtInTemplates.properties";
	
	public static List builtInTemplates = null;	
	public List getBuiltInTemplates() throws Exception {
		if(builtInTemplates==null) {			
			Properties props = TemplateContributionUtil.readProperties(
					this.getClass(), BUILT_IN_TEMPLATES_PROPERTIES);			
			Enumeration<Object> propNames = props.keys();
			
			builtInTemplates=new LinkedList<TemplateInfo>();
			while(propNames.hasMoreElements()) {
				String name = (String) propNames.nextElement();
				String[]arr = ((String)props.get(name)).split(",");		
				TemplateInfo ti = new TemplateInfo(name, "", arr[0]);
				ti.setFilePath(arr[1]);
				builtInTemplates.add(ti);
			}
		}
		return builtInTemplates;
	}
	
	@Override
	public void launchJ2SApp(J2STemplateContext ct) throws Exception {	
		
		StringWriter titleWriter = new StringWriter(), 
			outputWriter = new StringWriter();
		
		Velocity.init();
		
		Map ctx = J2SLaunchingUtil.toMap(new Object[]{				
			J2STemplateContext.NAME_USEXHMLHEADER, new Boolean(ct.useXHMLHeader),
			J2STemplateContext.NAME_MOZILLAADDONCOMPATIBLE, new Boolean(ct.mozillaAddonCompatible),
			J2STemplateContext.NAME_J2SMOZILLAADDONCOMPATIBLE, new Boolean(ct.j2sMozillaAddonCompatible),
	        
			J2STemplateContext.NAME_DEFAULTJ2SLIBURL, ct.defaultJ2slibUrl,        
			J2STemplateContext.NAME_USEGLOBALJ2SLIBURL, new Boolean(ct.useGlobalJ2slibUrl),
			J2STemplateContext.NAME_GLOBALJ2SLIBURL, ct.globalJ2slibUrl,
			J2STemplateContext.NAME_J2SLIBURL, ct.j2slibUrl,
	        
			J2STemplateContext.NAME_J2SCLASSPATH, ct.j2sClassPath,
			J2STemplateContext.NAME_J2SABANDONCLASSPATH, ct.j2sAbandonClassPath,
			J2STemplateContext.NAME_OUTPUTFILECODE, ct.outputFileCode,
	        
			J2STemplateContext.NAME_PROJECTNAME, ct.projectName,
			J2STemplateContext.NAME_MAINTYPE, ct.mainType,
			J2STemplateContext.NAME_WORKINGDIR, ct.workingDir,
			J2STemplateContext.NAME_BINURL, ct.binUrl,
			J2STemplateContext.NAME_ARGUMENTS, ct.arguments,
			J2STemplateContext.NAME_HTMLHEADOFHEADER, ct.htmlHeadOfHeader,
			J2STemplateContext.NAME_HTMLTAILOFHEADER, ct.htmlTailOfHeader,
			J2STemplateContext.NAME_HTMLHEADOFBODY, ct.htmlHeadOfBody,
			J2STemplateContext.NAME_HTMLTAILOFBODY, ct.htmlTailOfBody,		
	        
	        "J2SClasspathHTML", ct.J2SClasspathHTML,
	        "J2SClasspathExistingClasses",ct.J2SClasspathExistingClasses,
	        "J2SClasspathIgnoredClasses",ct.J2SClasspathIgnoredClasses,
	        "J2SClasspathJ2X",ct.J2SClasspathJ2X,
	        "J2sMainClassLoadCode", ct.J2sMainClassLoadCode,
	        "J2SSetPrimaryFolder", ct.J2SSetPrimaryFolder
		});
		
//		System.out.println(toString(ctx));
		
        VelocityContext context = new VelocityContext();        
        Set varNames = ctx.keySet();
        for (Iterator iterator = varNames.iterator(); iterator.hasNext();) {
			String varName = (String) iterator.next();
			context.put(varName, ctx.get(varName));
		}
        context.put("ctx", ctx);
        
        //evaluate output filename template first:
        Velocity.evaluate(context, titleWriter, "TITLE", ct.outputFileCode);
        String outputFileName=titleWriter.toString();        
        
        //get the actual output file path
        File workingDirF = J2SLaunchingUtil.getWorkingDirectory(ct.conf);
		String rootPath = workingDirF.getAbsolutePath();
		String outputFileAbsolutePath = rootPath+File.separator+outputFileName;		
        
        //expose the outputFilename and outputFileAbsolutePath to velocity templates
		ctx.put(J2STemplateContext.NAME_OUTPUT_FILE_NAME, outputFileName);
        context.put(J2STemplateContext.NAME_OUTPUT_FILE_NAME, outputFileName);
		ctx.put(J2STemplateContext.NAME_OUTPUT_FILE_ABSOLUTE_PATH, outputFileAbsolutePath);
        context.put(J2STemplateContext.NAME_OUTPUT_FILE_ABSOLUTE_PATH, outputFileAbsolutePath);   
                
        Velocity.evaluate(context, outputWriter, "MAIN", ct.templateCode);
        String html = outputWriter.toString();
        
        //write to output file (based on net.sf.j2s.ui.launching.J2SLaunchingUtil.writeBufferToFile(StringBuffer, String, File, String)) 
		File file = new File(outputFileAbsolutePath);
		J2SLaunchingUtil.writeMainHTML(file, html);
		String url = null;
		try {
			url = file.toURL().toExternalForm();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
    	Display.getDefault().asyncExec(new J2SApplicationRunnable(ct.conf, url));		
	}
	
	//debug

	public static String toString(Map c) {
		String s = "{";
		for(Object o : c.keySet()) {
			s+=(o+"->"+c.get(o)+", ");
		}
		return s+"}";
	}
}
