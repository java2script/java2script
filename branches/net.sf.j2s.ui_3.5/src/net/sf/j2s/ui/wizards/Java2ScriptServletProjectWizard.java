/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ui.wizards;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import net.sf.j2s.ajax.AjaxPlugin;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.launching.J2SLaunchingUtil;
import net.sf.j2s.ui.launching.JavaRuntime;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.property.J2SClasspathModel;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.JavaCore;

/**
 * @author zhou renjian
 *
 * 2007-3-4
 */
public class Java2ScriptServletProjectWizard extends Java2ScriptProjectWizard {
	public Java2ScriptServletProjectWizard() {
		super();
	}
	
	protected void updateJava2ScriptWizardTitle() {
		setWindowTitle(getWindowTitle() + " with Java2Script AJAX and SWT Enabled");
	}

	protected void updateJava2ScriptLibraries(J2SClasspathModel classpathModel, String j2sLibPath) {
		IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(j2sLibPath + "/swt.j2x");
		if (entry != null) {
			((Resource) entry).setAbsolute(true);
			classpathModel.addResource((Resource) entry);
		}
	}
	
	protected IClasspathEntry[] updateJavaLibraries(
			IClasspathEntry[] defaultEntries) {
		List list = new ArrayList();
		for (int i = 0; i < defaultEntries.length; i++) {
			list.add(i, defaultEntries[i]);
		}
		list.add(JavaCore.newVariableEntry(new Path("ECLIPSE_SWT"), null, null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_SWT"), new Path("AJAX_SWT_SRC"), null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_RPC"), new Path("AJAX_RPC_SRC"), null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_PIPE"), new Path("AJAX_PIPE_SRC"), null));
		return super.updateJavaLibraries((IClasspathEntry[]) list.toArray(new IClasspathEntry[list.size()]));
	}

	protected void updateJava2ScriptProject(String prjFolder, String binRelative) {
		try {
			File cpFile = new File(prjFolder, ".classpath");
			FileInputStream fis = new FileInputStream(cpFile);
			String classpath = J2SLaunchingUtil.readAFile(fis);
			if (classpath != null) {
				boolean needUpdate = false;
				if (classpath.indexOf("ECLIPSE_SWT") == -1 && classpath.indexOf("SWT_LIBRARY") == -1 &&  
						classpath.indexOf("eclipse.swt") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
							+ "\t<classpathentry kind=\"var\" path=\"ECLIPSE_SWT\"/>\r\n"
							+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_SWT") == -1 && classpath.indexOf("ajaxswt.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
							+ "\t<classpathentry sourcepath=\"AJAX_SWT_SRC\" kind=\"var\" path=\"AJAX_SWT\"/>\r\n"
							+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_RPC") == -1 && classpath.indexOf("ajaxrpc.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
					+ "\t<classpathentry sourcepath=\"AJAX_RPC_SRC\" kind=\"var\" path=\"AJAX_RPC\"/>\r\n"
					+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_PIPE") == -1 && classpath.indexOf("ajaxpipe.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
					+ "\t<classpathentry sourcepath=\"AJAX_PIPE_SRC\" kind=\"var\" path=\"AJAX_PIPE\"/>\r\n"
					+ classpath.substring(idx);
					needUpdate = true;
				}
				if (needUpdate) {
					try {
						FileOutputStream fos = new FileOutputStream(cpFile);
						//fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
						fos.write(classpath.getBytes("utf-8"));
						fos.close();
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
			File webinf = new File(prjFolder, "WEB-INF");
			webinf.mkdir();
			
			new File(webinf, "classes").mkdir();
			File lib = new File(webinf, "lib");
			lib.mkdir();
			
			IPath newPath= null;
	        URL starterURL = AjaxPlugin.getDefault().getBundle().getEntry(File.separator);
			String root = "."; //$NON-NLS-1$
			try {
				root = Platform.asLocalURL(starterURL).getFile();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			newPath = Path.fromPortableString(root + "/ajaxrpc.jar");
			File rpcFile = new File(newPath.toOSString());
			
			try {
				FileInputStream is = new FileInputStream(rpcFile);
				FileOutputStream os = new FileOutputStream(new File(lib, "ajaxrpc.jar"));
				byte[] buf = new byte[1024];
				int read = -1;
				while ((read = is.read(buf)) != -1) {
					os.write(buf, 0, read);
				}
				os.close();
				is.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}

			newPath = Path.fromPortableString(root + "/ajaxpipe.jar");
			File pipeFile = new File(newPath.toOSString());
			
			try {
				FileInputStream is = new FileInputStream(pipeFile);
				FileOutputStream os = new FileOutputStream(new File(lib, "ajaxpipe.jar"));
				byte[] buf = new byte[1024];
				int read = -1;
				while ((read = is.read(buf)) != -1) {
					os.write(buf, 0, read);
				}
				os.close();
				is.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			StringBuffer buildxml = new StringBuffer();
			buildxml.append("<?xml version=\"1.0\"?>\r\n");
			buildxml.append("<project name=\"java2script.servlet.pack\" default=\"pack.war\" basedir=\".\">\r\n");
			buildxml.append("    <description>Pack Java2Script Servlet Application</description>\r\n");
			buildxml.append("\r\n");
			String name = new File(prjFolder).getName();
			buildxml.append("	<property name=\"java2script.app.name\" value=\"" + name + "\"/>\r\n");
			buildxml.append("	<property name=\"bin.folder\" value=\"${basedir}/../" + binRelative + "\"/>\r\n");
			buildxml.append("\r\n");
			buildxml.append("    <target name=\"pack.war\" depends=\"pack.jar\">\r\n");
			buildxml.append("        <tstamp>\r\n");
			buildxml.append("            <format property=\"now\" pattern=\"yyyy-MM-dd-HH-mm-ss\"/>\r\n");
			buildxml.append("        </tstamp>\r\n");
			buildxml.append("        <delete file=\"${basedir}/../${java2script.app.name}.war\" quiet=\"true\"/>\r\n");
			buildxml.append("        <zip destfile=\"${basedir}/../${java2script.app.name}.${now}.war\">\r\n");
			buildxml.append("            <fileset dir=\"${basedir}/../\">\r\n");
			buildxml.append("                <exclude name=\"src/**\"/>\r\n");
			buildxml.append("                <exclude name=\"META-INF/**\"/>\r\n");
			buildxml.append("                <exclude name=\"WEB-INF/**\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.java\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.class\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.swp\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.swo\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.jar\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.war\"/>\r\n");
			buildxml.append("                <exclude name=\".classpath\"/>\r\n");
			buildxml.append("                <exclude name=\".project\"/>\r\n");
			buildxml.append("                <exclude name=\".j2s\"/>\r\n");
			buildxml.append("                <exclude name=\"web.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"build.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"build.properties\"/>\r\n");
			buildxml.append("                <exclude name=\"plugin.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"plugin.properties\"/>\r\n");
			buildxml.append("            </fileset>\r\n");
			buildxml.append("            <fileset dir=\"${basedir}/..\">\r\n");
			buildxml.append("                <include name=\"WEB-INF/**\"/>\r\n");
			buildxml.append("                <exclude name=\"WEB-INF/build.xml\"/>\r\n");
			buildxml.append("            </fileset>\r\n");
			buildxml.append("        </zip>\r\n");
			buildxml.append("        <copy file=\"${basedir}/../${java2script.app.name}.${now}.war\"\r\n"); 
			buildxml.append("                tofile=\"${basedir}/../${java2script.app.name}.war\"/>\r\n");
			buildxml.append("    </target>\r\n");
			buildxml.append("\r\n");
			buildxml.append("    <target name=\"pack.jar\">\r\n");
			buildxml.append("        <delete file=\"${basedir}/lib/${java2script.app.name}.jar\" quiet=\"true\"/>\r\n");
			buildxml.append("        <zip destfile=\"${basedir}/lib/${java2script.app.name}.jar\">\r\n");
			buildxml.append("            <fileset dir=\"${bin.folder}\">\r\n");
			buildxml.append("                <exclude name=\"WEB-INF/**\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.html\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.js\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.css\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.bmp\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.gif\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.png\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.jpg\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.jpeg\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.swp\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.swo\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.jar\"/>\r\n");
			buildxml.append("                <exclude name=\"**/*.war\"/>\r\n");
			buildxml.append("                <exclude name=\".classpath\"/>\r\n");
			buildxml.append("                <exclude name=\".project\"/>\r\n");
			buildxml.append("                <exclude name=\".j2s\"/>\r\n");
			buildxml.append("                <exclude name=\"web.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"build.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"build.properties\"/>\r\n");
			buildxml.append("                <exclude name=\"plugin.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"plugin.properties\"/>\r\n");
			buildxml.append("            </fileset>\r\n");
			buildxml.append("        </zip>\r\n");
			buildxml.append("    </target>\r\n");
			buildxml.append("\r\n");
	        starterURL = AjaxPlugin.getDefault().getBundle().getEntry(File.separator);
			root = "."; //$NON-NLS-1$
			try {
				root = Platform.asLocalURL(starterURL).getFile();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			newPath = Path.fromPortableString(root);
			String ajaxPath = newPath.toOSString();
			String key = "net.sf.j2s.ajax";
			int idx = ajaxPath.lastIndexOf(key);
			if (idx != -1) {
				ajaxPath = ajaxPath.substring(0, idx) + "net.sf.j2s.lib" + ajaxPath.substring(idx + key.length());
			}
			File libFile = new File(ajaxPath);
			String j2sRelativePath = FileUtil.toRelativePath(libFile.getAbsolutePath(), webinf.getAbsolutePath());
			if (j2sRelativePath.length() > 0 && !j2sRelativePath.endsWith("/")) {
				j2sRelativePath += "/";
			}
			int slashIndex = j2sRelativePath.lastIndexOf('/', j2sRelativePath.length() - 2);
			String pluginPath = j2sRelativePath.substring(0, slashIndex);
			String libPluginPath = j2sRelativePath.substring(slashIndex + 1, j2sRelativePath.length() - 1);

			buildxml.append("    <target name=\"pack.plugins.j2slib.war\">\r\n");
			buildxml.append("        <delete file=\"${basedir}/../plugins.war\" quiet=\"true\"/>\r\n");
			buildxml.append("        <zip destfile=\"${basedir}/../plugins.war\">\r\n");
			buildxml.append("            <fileset dir=\"${basedir}/" + pluginPath + "/\">\r\n");
			buildxml.append("                <include name=\"" + libPluginPath + "/**\"/>\r\n");
			buildxml.append("                <exclude name=\"" + libPluginPath + "/library.jar\"/>\r\n");
			buildxml.append("                <exclude name=\"" + libPluginPath + "/plugin.xml\"/>\r\n");
			buildxml.append("                <exclude name=\"" + libPluginPath + "/META-INF/**\"/>\r\n");
			buildxml.append("            </fileset>\r\n");
			buildxml.append("        </zip>\r\n");
			buildxml.append("    </target>\r\n");
			buildxml.append("\r\n");
			buildxml.append("</project>\r\n");
			try {
				FileOutputStream fos = new FileOutputStream(new File(webinf, "build.xml"));
				fos.write(buildxml.toString().getBytes());
				fos.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			StringBuffer webxml = new StringBuffer();
			webxml.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\r\n");
			webxml.append("<!DOCTYPE web-app\r\n");
			webxml.append("    PUBLIC \"-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN\"\r\n");
			webxml.append("    \"http://java.sun.com/dtd/web-app_2_3.dtd\">\r\n");
			webxml.append("<web-app>\r\n");
			webxml.append("    <display-name>Java2Script</display-name>\r\n");
			webxml.append("    <description>Java2Script application</description>\r\n");

			webxml.append(genereateServlet("simplerpc", "net.sf.j2s.ajax.SimpleRPCHttpServlet"));
			//webxml.append(genereateServlet("simplepiperpc", "net.sf.j2s.ajax.SimplePipeRPCHttpServlet"));
			webxml.append(genereateServlet("piperpc", "net.sf.j2s.ajax.CompoundPipeRPCHttpServlet"));
			
			webxml.append("    <servlet>\r\n");
			webxml.append("        <servlet-name>simplepipe</servlet-name>\r\n");
			webxml.append("        <servlet-class>net.sf.j2s.ajax.SimplePipeHttpServlet</servlet-class>\r\n");
			webxml.append("        <init-param>\r\n");
			webxml.append("            <param-name>simple.pipe.query.timeout</param-name>\r\n");
			webxml.append("            <param-value>20000</param-value>\r\n");
			webxml.append("        </init-param>\r\n");
			webxml.append("        <init-param>\r\n");
			webxml.append("            <param-name>simple.pipe.script.breakout</param-name>\r\n");
			webxml.append("            <param-value>1200000</param-value>\r\n");
			webxml.append("        </init-param>\r\n");
			webxml.append("        <init-param>\r\n");
			webxml.append("            <param-name>simple.pipe.max.items.per.query</param-name>\r\n");
			webxml.append("            <param-value>60</param-value>\r\n");
			webxml.append("        </init-param>\r\n");
			webxml.append("    </servlet>\r\n");

			webxml.append("    <servlet-mapping>\r\n");
			webxml.append("        <servlet-name>simplerpc</servlet-name>\r\n");
			webxml.append("        <url-pattern>/simplerpc</url-pattern>\r\n");
			webxml.append("    </servlet-mapping>\r\n");
			
			webxml.append("    <servlet-mapping>\r\n");
			webxml.append("        <servlet-name>piperpc</servlet-name>\r\n");
			webxml.append("        <url-pattern>/piperpc</url-pattern>\r\n");
			webxml.append("    </servlet-mapping>\r\n");
			
			webxml.append("    <servlet-mapping>\r\n");
			webxml.append("        <servlet-name>simplepipe</servlet-name>\r\n");
			webxml.append("        <url-pattern>/simplepipe</url-pattern>\r\n");
			webxml.append("    </servlet-mapping>\r\n");
			webxml.append("</web-app>\r\n");
			try {
				FileOutputStream fos = new FileOutputStream(new File(webinf, "web.xml"));
				fos.write(webxml.toString().getBytes());
				fos.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
	
	private String genereateServlet(String name, String clazz) {
		StringBuffer webxml = new StringBuffer();
		webxml.append("    <servlet>\r\n");
		webxml.append("        <servlet-name>" + name + "</servlet-name>\r\n");
		webxml.append("        <servlet-class>" + clazz + "</servlet-class>\r\n");
		webxml.append("	       <init-param>\r\n");
		webxml.append("            <param-name>simple.rpc.runnables</param-name>\r\n");
		webxml.append("            <!--\r\n");
		webxml.append("              Qualified names of inherited net.sf.j2s.ajax.SimpleRPCRunnable\r\n");
		webxml.append("              classes, seperated by \";\".\r\n");
		webxml.append("            -->\r\n");
		webxml.append("            <param-value>\r\n");
		webxml.append("            </param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        <init-param>\r\n");
		webxml.append("            <param-name>simple.rpc.xss.support</param-name>\r\n");
		webxml.append("            <param-value>true</param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        <!--\r\n");
		webxml.append("        <init-param>\r\n");
		webxml.append("            <param-name>simple.rpc.post.limit</param-name>\r\n");
		webxml.append("            <param-value>16777216</param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        <init-param>\r\n");
		webxml.append("            <param-name>simple.rpc.xss.max.parts</param-name>\r\n");
		webxml.append("            <param-value>8</param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        <init-param>\r\n");
		webxml.append("            <param-name>simple.rpc.xss.max.latency</param-name>\r\n");
		webxml.append("            <param-value>6000</param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        <init-param>\r\n");
		webxml.append("            <param-name>simple.pipe.managable</param-name>\r\n");
		webxml.append("            <param-value>true</param-value>\r\n");
		webxml.append("        </init-param>\r\n");
		webxml.append("        -->\r\n");
		webxml.append("    </servlet>\r\n");
		return webxml.toString();
	}
}
