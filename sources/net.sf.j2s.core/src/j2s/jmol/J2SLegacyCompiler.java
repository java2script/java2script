package j2s.jmol;

import java.io.File;
import java.util.Date;

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.CompilationUnit;

import j2s.CorePlugin;
import j2s.core.Java2ScriptCompiler;

/**
 * This transpiler takes the place of the original Java Builder created in 2006-2012 by Zhou Renjian
 * and others. It uses instead an Eclipse CompiliationParticipant to track Java compiling and
 * produce JavaScript versions of the class files. 
 * 
 * It has been tuned for Jmol, with many of the original features removed. 
 * Only remaining are @j2sNative, @j2sIgnore, and @j2sIgnoreSuperConstructor. 
 * 
 * @author Bob Hanson 
 *
 */
public class J2SLegacyCompiler extends Java2ScriptCompiler {

	private final static String J2S_PACKAGE_FIXES = "j2s.package.fixes";

	private final static String J2S_STRING_FIXES = "j2s.string.fixes";

	private String[] stringFixes;

	private static String[] myStringFixes = { //
			"cla$$", "c$" //
			,"innerThis", "i$" //
			,"finalVars", "v$" //
			,".callbacks", ".b$" //
			,".$finals", ".f$" //
			,"Class.forName", "Clazz._4Name"//
	};

	public J2SLegacyCompiler(File f) {
		super(false, f);
	}

	@SuppressWarnings("deprecation")
	public boolean initializeProject(IJavaProject project, boolean isCleanBuild) {
		if (!super.initializeProject(project, isCleanBuild, AST.JLS8)) {
			return false;
		}		
		String s = getProperty(J2S_STRING_FIXES, null);
		stringFixes = getFixes(s, myStringFixes);
		System.out.println(stringFixes.length + " string fixes");
		s = getProperty(J2S_PACKAGE_FIXES, null);
		if (s != null) {
			packageFixes = getFixes(s, null);
			System.out.println(packageFixes.length + " package fixes");
		}
		nResources = 0;
		j2sPath = siteFolder + "/jsmol/j2s";
		System.out.println("J2S site folder is " + j2sPath);
		return true;
	}

	@SuppressWarnings("null")
	private String[] getFixes(String s, String[] myFixes) {
		String[] a = (s == null || s.length() == 0 ? new String[0] : rep(s, "\\,", "\1").split(","));
		int pt = (myFixes == null ? 0 : myFixes.length);
		if (pt == 0 && a.length == 0)
			return null;
		String[] b = new String[pt + a.length];
		for (int i = 0; i < pt; i++) {
			b[i] = myFixes[i]; // no escaped commas here
			System.out.print((i%2) == 0 ? b[i] : " -> " + b[i] + "\n");
		}
		for (int i = 0; i < a.length; i++) {
			System.out.print((i%2) == 0 ? a[i] : " -> " + a[i] + "\n");
			b[pt++] = a[i].replace('\1', ',');
		}
		return b;
	}

	public void startBuild(boolean isClean) {
		super.startBuild(isClean);
	}

	/**
	 * From the CompilationParticipant, not the old builder
	 * 
	 * @param javaSource
	 * @return true if no errors
	 */
	
	public boolean compileToJavaScript(IFile javaSource, String trailer) {
		
		// 1. set up AbstractSyntaxTree CompilationUnit
		
		ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		String sourceLocation = javaSource.getLocation().toString();
		String outputPath = j2sPath;
		astParser.setResolveBindings(true);
		astParser.setSource(createdUnit);
		CompilationUnit root = (CompilationUnit) astParser.createAST(null);
		
		// 2. run J2SLegacyVisitor to produce preliminary JavaScript
		
		J2SLegacyVisitor visitor = new J2SLegacyVisitor();
		isDebugging = "debug".equals(props.getProperty("j2s.compiler.mode"));
		try {
			root.accept(visitor);
		} catch (Throwable e) {
			e.printStackTrace();
			deleteJSFileFromError(root, visitor, outputPath);
			return false;
		}
		String js = visitor.buffer.toString();
		visitor = null;
		
		// 3. catalog all of the class dependencies
		
		J2SDependencyVisitor dvisitor = new J2SDependencyVisitor(this);
		try {
			root.accept(dvisitor);
		} catch (Throwable e) {
			e.printStackTrace();
			deleteJSFileFromError(root, dvisitor, outputPath);
			return false;
		}

		// 4. post-process the JavaScript from the legacy visitor and write it to disk
		
		js = dvisitor.cleanLoadCalls(js);
		if (js == null) {
			// nothing but a package statement
			return true;
		}
		for (int i = 0; i < stringFixes.length; i++) {
			js = rep(js, stringFixes[i++], stringFixes[i]);
		}
		js += ";//" + trailer + "\n";
		String packageName = dvisitor.getPackageName();
		String elementName = root.getJavaElement().getElementName();
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		if (packageName != null) {
			String dir = packageName.replace('.', '/');
			dir = fixPackageName(dir);
			File folder = new File(outputPath, dir);
			outputPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					System.out.println("J2SC.outputJavaScript " + outputPath + " failed to write");
					throw new RuntimeException("Failed to create folder " + outputPath); //$NON-NLS-1$
				}
			}
		}
		elementName = fixPackageName(elementName);
		File jsFile = new File(outputPath, elementName + ".js"); // $NON-NLS-1
		writeToFile(jsFile, js);		
		
		// 5. copy all resources to the package directory (if not already copied)
		
		if (packageName != null) {
			copyAllResources(packageName, sourceLocation);
		}
		return true;
	}

	private void deleteJSFileFromError(CompilationUnit root, J2SASTVisitor dvisitor, String outputPath) {
		// This should never happen.
		String elementName = root.getJavaElement().getElementName();
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		String packageName = dvisitor.getPackageName();
		if (packageName != null) {
			File folder = new File(outputPath, packageName.replace('.', File.separatorChar));
			File jsFile = new File(folder, elementName + ".js"); //$NON-NLS-1$
			if (jsFile.exists()) {
				jsFile.delete();
			}
		}
	}

	@Override
	protected String getDefaultJ2SFileContents() {
		return "#j2sjmol default configuration file created by j2s.core plugin " + CorePlugin.VERSION + " " + new Date()
				+ "\n\n" + "#enable the Java2Script transpiler -- set to \"disabled\" to disable\n"
				+ "# default is \"enabled\".\n" + "j2s.compiler.status=enabled\n\n"
				+ "# destination directory for all JavaScript\n" + "j2s.site.directory=site\n\n"
				+ "# uncomment j2s.* lines to process:\n\n"
				+ "# a semicolon-separated list of package-level file paths to be excluded "
				+ "# by matching anywhere in the string (default \"<none>\")\n" + "#j2s.excluded.paths=test;testng\n\n"
				+ "# uncomment to add debugging output. Start eclipse with the -consoleLog option to see output.\n"
				+ "#j2s.compiler.mode=debug\n";
	}

	@Override
	public void finalizeProject() {
		System.out.println("J2S Jmol finalized for " + projectFolder + " " + nResources + " resources copied");
	}

}
