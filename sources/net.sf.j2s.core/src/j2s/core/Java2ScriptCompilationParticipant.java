package j2s.core;

import j2s.CorePlugin;
import java.util.ArrayList;
import java.util.Date;

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.compiler.BuildContext;
import org.eclipse.jdt.core.compiler.ReconcileContext;

/**
 * New Java2Script compiler uses org.eclipse.jdt.core.compiler.CompilationParticipant instead of builder
 * 
 * source: https://github.com/eclipse/org.aspectj.shadows/blob/master/org.eclipse.jdt.core/model/org/eclipse/jdt/core/compiler/CompilationParticipant.java
 * 
 * @author hansonr
 *
 */
public class Java2ScriptCompilationParticipant extends org.eclipse.jdt.core.compiler.CompilationParticipant {

	static final String VERSION = CorePlugin.VERSION;

	private ArrayList<BuildContext[]>contexts;
	private boolean isCleanBuild;
	private static String isActiveNotified = ""; 

	public Java2ScriptCompilationParticipant() {
		System.out.println("J2S CompilationParticipant " + VERSION + " started");
	}

	/**
	 * Returns whether this participant is active for a given project.
	 * <p>
	 * Default is to return <code>false</code>.
	 * </p>
	 * <p>
	 * For efficiency, participants that are not interested in the given project
	 * should return <code>false</code> for that project.
	 * </p>
	 * 
	 * @param project
	 *            the project to participate in
	 * @return whether this participant is active for a given project
	 */
	@Override
	public boolean isActive(IJavaProject project) {
		if (project.getProject().getLocation() == null) {
			// happens when comparing to team...show history item
			return false;
		}
		String j2sFileName = Java2ScriptCompiler.getJ2SConfigName(project);
		boolean isj2s = (j2sFileName != null);
 		String loc = " " + project.getProject().getLocation() + " ";
 		// notify only if changed
 		String key = j2sFileName + "," + isj2s + "," + loc + ";";
 		if (isActiveNotified.indexOf(key) < 0) {
 			System.out.println("J2S isActive " + (isj2s ? j2sFileName : "false") + loc);
 			isActiveNotified = isActiveNotified.replace(j2sFileName + (!isj2s) + loc, "");
 			isActiveNotified += key;
 		}
		return isj2s;
	}

	/**
	 * Notifies this participant that a build is about to start and provides it
	 * the opportunity to create missing source folders for generated source
	 * files. Additional source folders should be marked as optional so the
	 * project can be built when the folders do not exist. Only sent to
	 * participants interested in the project.
	 * <p>
	 * Default is to return <code>READY_FOR_BUILD</code>.
	 * </p>
	 * 
	 * @see #buildFinished(IJavaProject project)
	 * @param project
	 *            the project about to build
	 * @return READY_FOR_BUILD or NEEDS_FULL_BUILD
	 */
	@Override
	public int aboutToBuild(IJavaProject project) {
		if (contexts == null)
			contexts = new ArrayList<>();
		return READY_FOR_BUILD;
	}

	/**
	 * Notifies this participant that a clean is about to start and provides it
	 * the opportunity to delete generated source files. Only sent to
	 * participants interested in the project.
	 * 
	 * @param project
	 *            the project about to be cleaned
	 */
	@Override
	public void cleanStarting(IJavaProject project) {
		//System.out.println("J2S cleanStarting " + project.getProject().getLocation());
		isCleanBuild = true;
	}

	/**
	 * Notifies this participant that a compile operation is about to start and
	 * provides it the opportunity to generate source files based on the source
	 * files about to be compiled. When isBatchBuild is true, then files
	 * contains all source files in the project. Only sent to participants
	 * interested in the current build project.
	 *
	 * @param files
	 *            is an array of BuildContext
	 * @param isBatch
	 *            identifies when the build is a batch build
	 */
	@Override
	public void buildStarting(BuildContext[] files, boolean isBatch) {
		if (files.length == 0)
			return;
		contexts.add(files);
		System.out.println("J2S buildStarting "  
				+ " " + files.length + " files, contexts.size() = " + contexts.size() + ", isBatch=" + isBatch);
	}

	/**
	 * Notifies this participant that a build has finished for the project. This
	 * will be sent, even if buildStarting() was not sent when no source files
	 * needed to be compiled or the build failed. Only sent to participants
	 * interested in the project.
	 * 
	 * @param project the project about to build
	 * @since 3.4
	 */
	@Override
	public void buildFinished(IJavaProject project) {
		String projectName = project.getProject().getName();
		
		if (contexts != null && contexts.size() > 0) {
			Java2ScriptCompiler j2sCompiler = Java2ScriptCompiler.newCompiler(project);
			if (j2sCompiler == null) {
				System.out.println("No .j2s or .j2sjmol file in project found for " + projectName);
				return;
			}
			System.out.println("J2S using transpiler " + j2sCompiler.getClass().getName());
			j2sCompiler.startBuild(isCleanBuild);			
			if (!j2sCompiler.initializeProject(project)) {
				System.out.println("J2S .j2s disabled");
				return;
			}
			boolean breakOnError = j2sCompiler.doBreakOnError();
			System.out.println("J2S building JavaScript " + projectName + " "
					+ project.getProject().getLocation() + " " + new Date());
			int ntotal = 0, nerror = 0, nExcluded = 0;
			for (int j = 0; j < contexts.size(); j++) {
				BuildContext[] files = contexts.get(j);
				System.out.println("J2S building JavaScript for " + files.length + " file" + plural(files.length));
				String trailer = CorePlugin.VERSION + " " + new Date();
				for (int i = 0, n = files.length; i < n; i++) {
					IFile f = files[i].getFile();
					String filePath = f.getLocation().toString();
					if (j2sCompiler.excludeFile(f)) {
						if (j2sCompiler.isDebugging)
						System.out.println("J2S excluded " + filePath);
						nExcluded++;
					} else {
						if (j2sCompiler.isDebugging)
						System.out.println("J2S transpiling (" + (i + 1) + "/" + n + ") " + filePath);
						try {
							if (j2sCompiler.compileToJavaScript(f, trailer)) {
								ntotal++;
							} else {
								nerror++;
								System.out.println("J2S Error processing " + filePath);
								if (breakOnError)
									break;
							}
						} catch (Exception e) {
							System.out.println("J2S Exception " + e);
							e.printStackTrace(System.out);
							e.printStackTrace(System.err);
						}
					}
				}
			}
			j2sCompiler.finalizeProject();
			contexts = null;
			System.out.println("J2S buildFinished " + ntotal + " file" + plural(ntotal) + " transpiled for "
					+ project.getProject().getLocation());
			System.out.println("J2S buildFinished nerror=" + nerror + " nExcluded=" + nExcluded + " " + new Date());
		}
		isCleanBuild = false;
	}

	public static String plural(int n) {
		return (n == 1 ? "" : "s");
	}

	/**
	 * Returns whether this participant is interested in only Annotations.
	 * <p>
	 * Default is to return <code>false</code>.
	 * </p>
	 * 
	 * @return whether this participant is interested in only Annotations.
	 */
	@Override
	public boolean isAnnotationProcessor() {
		return false;
	}

	/**
	 * Notifies this participant that a compile operation has found source files
	 * using Annotations. Only sent to participants interested in the current
	 * build project that answer true to isAnnotationProcessor(). Each
	 * BuildContext was informed whether its source file currently
	 * hasAnnotations().
	 *
	 * @param files
	 *            is an array of BuildContext
	 */
	@Override
	public void processAnnotations(BuildContext[] files) {
		// nothing to do
	}

	/**
	 * Notifies this participant that a reconcile operation is happening. The
	 * participant can act on this reconcile operation by using the given
	 * context. Other participant can then see the result of this participation
	 * on this context.
	 * <p>
	 * Note that a participant should not modify the buffer of the working copy
	 * that is being reconciled.
	 * </p>
	 * <p>
	 * Default is to do nothing.
	 * </p>
	 * 
	 * @param context
	 *            the reconcile context to act on
	 */
	@Override
	public void reconcile(ReconcileContext context) {
		// fired whenever a source file is changed -- before it is saved
	}
}