package j2s.core;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.compiler.BuildContext;
import org.eclipse.jdt.core.dom.ASTParser;

import j2s.CorePlugin;
import j2s.jmol.Java2ScriptLegacyCompiler;
import j2s.swingjs.Java2ScriptSwingJSCompiler;

/**
 * The main (and currently only operational) Java2Script compiler.
 * 
 * @author Bob Hanson
 *
 */
public abstract class Java2ScriptCompiler {

	protected static final String VERSION = CorePlugin.VERSION;

	protected final static String J2S_CONFIG_SWINGJS = ".j2s";
	protected final static String J2S_CONFIG_JMOL = ".j2sjmol";

	private final static String J2S_COMPILER_STATUS = "j2s.compiler.status";
	private final static String J2S_COMPILER_STATUS_ENABLE = "enable";
	private final static String J2S_COMPILER_STATUS_ENABLED = "enabled";
	private final static String J2S_COMPILER_STATUS_DEFAULT = "enabled";

	private final static String J2S_COMPILER_JAVA_VERSION = "j2s.compiler.java.version";

//	private final static String J2S_OUTPUT_PATH = "j2s.output.path";
//	private final static String J2S_OUTPUT_PATH_DEFAULT = "bin";
//
	protected static final String J2S_SITE_DIRECTORY = "j2s.site.directory";
	protected static final String J2S_SITE_DIRECTORY_DEFAULT = "site";

	/**
	 * stop processing files if any file throws an exception, probably because it is
	 * a
	 * 
	 */
	protected static final String J2S_BREAK_ON_ERROR = "j2s.break.on.error";
	protected static final String J2S_BREAK_ON_ERROR_DEFAULT = "false";

	protected static final String J2S_EXCLUDED_PATHS = "j2s.excluded.paths";
	protected static final String J2S_EXCLUDED_PATHS_DEFAULT = "<none>";

	protected static final String J2S_COMPILER_MODE = "j2s.compiler.mode";
	protected static final String J2S_COMPILER_MODE_DEFAULT = "nodebug";
	protected static final String J2S_COMPILER_MODE_DEBUG = "debug";

	private static final String J2S_TESTING = "j2s.testing";

	private static final String J2S_TESTING_DEFAULT = "false";

	/**
	 * from Java2ScriptCompilationParticipant.java
	 * 
	 * process the source file into JavaScript using the JDT abstract syntax tree
	 * parser and visitor
	 * @param isCleanBuild2 
	 * 
	 * @param javaSource
	 */
	abstract public boolean initializeProject(IJavaProject project, boolean isCleanBuild2);

	abstract public boolean compileToJavaScript(IFile javaSource, String trailer);

	abstract protected String getDefaultJ2SFile();

	abstract public void finalizeProject();

	/**
	 * The name of the J2S options file, aka as the "Dot-j2s" file. Please do not
	 * change this value.
	 */
	protected final String j2sConfigFileName; // will be .j2sjmol for legacy or .j2s for SwingJS

	protected boolean isSwingJS;

	protected Properties props;

	protected String projectFolder;
//	protected String outputPath;
	protected String siteFolder;
	protected String j2sPath;
	protected String excludedPaths;

	protected String[] packageFixes;
	
	protected List<String> lstExcludedPaths;

	protected boolean isCleanBuild;

	protected ASTParser astParser;

	protected IJavaProject project;

	/**
	 * This will activate @j2sDebug blocks, at least in SwingJS
	 */
	protected boolean isDebugging;

	/**
	 * j2s file currently in use, possibly relayed from the original .j2s file
	 */
	protected File activeJ2SFile;

	protected boolean testing;

	protected boolean breakOnError;

	public boolean doBreakOnError() {
		return breakOnError;
	}

	// We copy all non .java files from any directory from which we loaded a
	// java file into the site directory
	private final HashSet<String> copiedResourcePackages = new HashSet<String>();


	static File checkJ2SDir(String dir) {
		File f;
		return ((f = new File(dir, J2S_CONFIG_JMOL)).exists() ? f
				: (f = new File(dir, J2S_CONFIG_SWINGJS)).exists() ? f
					: null);
	}

	/**
	 * Entry point from compilation participant when Java build is complete and it is our turn.
	 * e
	 * @param project
	 * @param files
	 * @return
	 */
	public static Java2ScriptCompiler newCompiler(IJavaProject project, BuildContext[] files) {
		if (files.length == 0)
			return null;
		String j2stype;
		File f = getJ2SConfigName(project, files[0]);
		return ( f == null ? null 
				: J2S_CONFIG_JMOL.equals(j2stype = f.getName()) ? 
				new Java2ScriptLegacyCompiler(f)
				: J2S_CONFIG_SWINGJS.equals(j2stype) ?
						new Java2ScriptSwingJSCompiler(f) : null);
	}

	/**
	 * Called by newCompiler only. Checks in the root of the classpath for this file
	 * first, then in the project root directory.
	 *  
	 * Check to see if this project is what we need for the FIRST file being 
	 * activated. Note that this means that if there are multiple classpath entries,
	 * EACH should have this .j2smol file in it. 
	 * 
	 * @param project
	 * @param files
	 * @param retFile 
	 * @return ".j2s" or ".j2sjmol" or null
	 */
	private static File getJ2SConfigName(IJavaProject project, BuildContext files) {
		
		File f = null;
		try {
			if (files == null)
				return null;
			String projectDir = project.getProject().getLocation().toOSString();
			IPath path = getFirstSourceClassPathEntry(project.getResolvedClasspath(true));
			String dir = new File(projectDir).getParent() + path; // is relative to workspace, I guess.					
			System.out.println("checking entry for " + dir);
			f = checkJ2SDir(dir);
			if (f == null) {
				f = checkJ2SDir(projectDir);
			}
		} catch (@SuppressWarnings("unused") JavaModelException e1) {
			// no matter;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return f;
	}

	private static IPath getFirstSourceClassPathEntry(IClasspathEntry[] path) {
		for (int i = 0; i < path.length; i++) {
			IClasspathEntry e = path[i];
			if (e.getEntryKind() == IClasspathEntry.CPE_SOURCE) {
				System.out.println(i + " " + e + "\n" + e.getPath());
				return e.getPath();
			}
		}
		return null;
	}

	protected Java2ScriptCompiler(boolean isSwingJS, File f) {
		this.isSwingJS = isSwingJS;
		activeJ2SFile = f;
		j2sConfigFileName = f.getName();
		System.out.println("Java2ScriptCompiler " + this + " isSwingJS=" + f + " " + j2sConfigFileName);
		// initialized only once for SwingJS and once for legacy version
	}

	/**
	 * only for CompilationParticipant
	 * 
	 * @param isClean
	 */
	protected void startBuild(boolean isClean) {
		// at the beginning of a clean build, clear data
		isCleanBuild = isClean;
		copiedResourcePackages.clear();
	}

	/**
	 * Iteratively look for a .j2s file to use for configuration information. Up to
	 * five iterations are allowed.
	 * 
	 * @param j2sFile
	 * @param altLevel
	 */
	protected Properties getPropsForDir(String dir, String j2sConfigName, int altLevel) {
		File j2sFile = new File(dir, j2sConfigName);
		Properties props = new Properties();	
		try (FileInputStream os = new FileInputStream(j2sFile)) {
			props.load(os);
			os.close();
			activeJ2SFile = j2sFile;
		} catch (Exception e) {
			System.out.println("J2S Exception opening " + j2sFile + " " + e.getMessage());
			props = this.props;
		}
		System.out.println("J2S properties in " + activeJ2SFile + " are " + props);
		return props;
	}

	/**
	 * from Java2ScriptCompilationParticipant.java
	 * 
	 * get all necessary .j2s params for a build
	 * 
	 * @param project
	 * @param isCleanBuild
	 * @param jls4
	 * @return true if this is a j2s project and is enabled
	 * 
	 */
	protected boolean initializeProject(IJavaProject project, boolean isCleanBuild, int javaLanguageLevel) {
		this.project = project;
		projectFolder = project.getProject().getLocation().toOSString();
		startBuild(isCleanBuild);
		props = getPropsForDir(activeJ2SFile.getParent(), j2sConfigFileName, 0);
		System.out.println(this.getClass().getName() + " " + activeJ2SFile + " " + props);
		if (!isEnabled()) {
			return false;
		}
		if (getFileContents(activeJ2SFile).trim().length() == 0) {
			writeToFile(activeJ2SFile, getDefaultJ2SFile());
		}
		int jslLevel = javaLanguageLevel;
		if (isSwingJS) {
			// SwingJS allows 8 or 11
			try {
				String ver = getProperty(J2S_COMPILER_JAVA_VERSION, "" + jslLevel);
				jslLevel = Integer.parseInt(ver);
			} catch (@SuppressWarnings("unused") Exception e) {
				System.out.println("j2s.compiler.java.version should be one of 4, 8, or 11");
				// ignore
			}
		}
		try {
			astParser = ASTParser.newParser(jslLevel);
			System.out.println("J2S compiler version set to " + jslLevel);
		} catch (@SuppressWarnings("unused") Exception e) {
			System.out.println("J2S compiler version " + jslLevel + " could not be set; using 8");
			astParser = ASTParser.newParser(jslLevel);
		}

		testing = "true".equalsIgnoreCase(getProperty(J2S_TESTING, J2S_TESTING_DEFAULT));

		breakOnError = !"false".equalsIgnoreCase(getProperty(J2S_BREAK_ON_ERROR, J2S_BREAK_ON_ERROR_DEFAULT));

		siteFolder = getProperty(J2S_SITE_DIRECTORY, J2S_SITE_DIRECTORY_DEFAULT);
		siteFolder = projectFolder + "/" + siteFolder;

//		outputPath = getProperty(J2S_OUTPUT_PATH, null);
//		if (outputPath == null) {
//			outputPath = J2S_OUTPUT_PATH_DEFAULT; // bin
//			try {
//				IPath loc = project.getOutputLocation();
//				outputPath = loc.toString().substring(loc.toString().lastIndexOf('/') + 1);
//			} catch (JavaModelException e1) {
//				// TODO Auto-generated catch block
//				e1.printStackTrace();
//			}
//		}
//
		if (isDebugging) {
			System.out.println("J2S siteFolder=" + siteFolder);// + " outputPath=" + outputPath);
		}
		excludedPaths = getProperty(J2S_EXCLUDED_PATHS, J2S_EXCLUDED_PATHS_DEFAULT);
		lstExcludedPaths = null;
		if (excludedPaths != null) {
			lstExcludedPaths = new ArrayList<String>();
			String[] paths = excludedPaths.split(excludedPaths.indexOf(";") >= 0 ? ";" : ",");
			for (int i = 0; i < paths.length; i++) {
				String p = paths[i].trim();
				if (p.length() > 0) {
					lstExcludedPaths.add(p);
				}
			}
			if (lstExcludedPaths.size() == 0)
				lstExcludedPaths = null;
		}
		if (isDebugging && lstExcludedPaths != null) {
			int n = lstExcludedPaths.size();
			System.out.println("J2S found " + n + " excludedPath" + Java2ScriptCompilationParticipant.plural(n));
		}
		return true;
	}

	private boolean isEnabled() {
		String status = getProperty(J2S_COMPILER_STATUS, J2S_COMPILER_STATUS_DEFAULT);
		return (J2S_COMPILER_STATUS_ENABLE.equalsIgnoreCase(status)
				 || J2S_COMPILER_STATUS_ENABLED.equalsIgnoreCase(status));
	}

	boolean excludeFile(IFile javaSource) {
		return excludeFile(javaSource.getFullPath().toString());
	}

	public boolean excludeFile(String filePath) {
		if (lstExcludedPaths != null) {
			if (filePath == null)
				return true;
			if (filePath.indexOf('\\') >= 0)
				filePath = filePath.replace('\\', '/');
			for (int i = lstExcludedPaths.size(); --i >= 0;) {
				if (filePath.indexOf(lstExcludedPaths.get(i)) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

	protected String getProperty(String key, String def) {
		if (props == null) {
			System.out.println("getting " + key  + " props is null");			
			return null;
		}		
		String val = props.getProperty(key);
		if (val == null)
			val = def;
		if (val != null && val.indexOf("<") == 0)
			val = null;
		System.out.println("getting " + key + " = " + val);
		return val;
	}

	protected void createJSFile(String j2sPath, String packageName, String elementName, String js) {
		if (packageName != null) {
			File folder = new File(j2sPath, packageName.replace('.', File.separatorChar));
			j2sPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					throw new RuntimeException("J2S failed to create folder " + j2sPath); //$NON-NLS-1$
				}
			}
		}
		File f = new File(j2sPath, elementName + ".js");
		if (isDebugging)
			System.out.println("J2S Compiler creating " + js.length() + " " + f);
		writeToFile(f, js);
	}

	protected static String getFileContents(File file) {
		try {
			StringBuilder sb = new StringBuilder();
			FileInputStream is = new FileInputStream(file);
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			String line = null;
			while ((line = reader.readLine()) != null) {
				sb.append(line).append("\n");
			}
			reader.close();
			return sb.toString();
		} catch (@SuppressWarnings("unused") IOException e) {
			//
		}
		return null;
	}

	public static void writeToFile(File file, String data) {
		if (data == null)
			return;
		try {
			FileOutputStream os = new FileOutputStream(file);
			os.write(data.getBytes("UTF-8"));
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	protected FileFilter filter = new FileFilter() {

		@Override
		public boolean accept(File pathname) {
			return pathname.isDirectory() || !pathname.getName().endsWith(".java");
		}

	};

	protected int copySiteResources(File from, File dest) {
		System.out.println("j2s copying resources from " + from + " to " + dest);
		return copyNonclassFiles(from, dest, 0);
	}

	private int copyNonclassFiles(File dir, File target, int n) {
		if (dir.equals(target))
			return n;
		if (excludeFile(dir.getAbsolutePath().replace('\\', '/') + "/"))
			return n;
		File[] files = dir.listFiles(filter);
		File f = null;
		if (files != null)
			try {
				File p;
				if (packageFixes != null) {
					p = new File(fixPackageName(target.toString().replace('\\','/')));
				} else {
					p = target;
				}

				if (!p.exists())
					Files.createDirectories(p.toPath());
				for (int i = 0; i < files.length; i++) {
					f = files[i];
					if (f == null) {
						//
					} else if (f.isDirectory()) {
						n = copyNonclassFiles(f, new File(target, f.getName()), n);
					} else {
						String path = f.toPath().toString();
						if (!copiedResourcePackages.contains(path)) {
							//
							copiedResourcePackages.add(path);
							n++;
							File fnew = new File(p, f.getName());
							Files.copy(f.toPath(), fnew.toPath(),
									StandardCopyOption.REPLACE_EXISTING);
							if (isDebugging)
								System.out.println("J2S copied to site: " + path + " as " + fnew.toPath());
						}
					}
				}
			} catch (IOException e1) {
				System.out.println("J2S error copying " + f + " to " + target);
				e1.printStackTrace();
			}
		return n;
	}

	protected int checkCopiedResources(String packageName, String sourceLocation, String outputDir) {
		int pt = packageName.indexOf(".");
		if (pt >= 0)
			packageName = packageName.substring(0, pt);
		if (copiedResourcePackages.contains(packageName))
			return 0;
		copiedResourcePackages.add(packageName);
		pt = sourceLocation.lastIndexOf("/" + packageName + "/");
		if (pt <= 0) {
			// also don't allow "" root directory
			if (!"_".equals(packageName))
				System.out.println(
						"J2S ignoring bad sourceLocation for package \"" + packageName + "\": " + sourceLocation);
			return 0;
		}
		String sourceDir = sourceLocation.substring(0, pt);
		File src = new File(sourceDir, packageName);
		File dest = new File(outputDir, packageName);
		return copySiteResources(src, dest);
	}

	protected String fixPackageName(String name) {
		if (packageFixes == null)
			return name;
		for (int i = 0; i < packageFixes.length; i++) {
			name = rep(name, packageFixes[i++], packageFixes[i]);
		}
		return name;
	}

	
	  /**
	   * Does a clean ITERATIVE replace of strFrom in str with strTo. 
	   * Thus, rep("Testttt", "tt","t") becomes "Test".
	   * 
	   * @param str
	   * @param strFrom
	   * @param strTo
	   * @return replaced string
	   */
	  protected static String rep(String str, String strFrom, String strTo) {
	    if (str == null || strFrom.length() == 0 || str.indexOf(strFrom) < 0)
	      return str;
	    boolean isOnce = (strTo.indexOf(strFrom) >= 0);
	    do {
	      str = str.replace(strFrom, strTo);
	    } while (!isOnce && str.indexOf(strFrom) >= 0);
	    return str;
	  }


	
			
}
