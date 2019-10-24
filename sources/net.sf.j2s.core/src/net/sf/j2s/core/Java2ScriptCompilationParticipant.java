package net.sf.j2s.core;

import java.util.ArrayList;

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
	private ArrayList<BuildContext[]>contexts;
	private boolean isCleanBuild;
	private static String isActiveNotified = ""; 

	public Java2ScriptCompilationParticipant() {
		System.out.println("CompilationParticipant started");
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
 		boolean isj2s = Java2ScriptCompiler.isActive(project);
 		String loc = " " + project.getProject().getLocation().toString() + " ";
 		if (isActiveNotified.indexOf(loc) < 0) {
 			System.out.println("j2s isActive " + isj2s + loc);
 			isActiveNotified += loc;
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
		System.out.println("j2s aboutToBuild " + project.getProject().getName() + " " + project.getProject().getLocation());
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
		System.out.println("j2s cleanStarting " + project.getProject().getLocation());
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
		System.out.println("j2s buildStarting " + files.length + " files, contexts.size() = " + contexts.size() + ", isBatch=" + isBatch);
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
		if (contexts != null) {
			Java2ScriptCompiler j2sCompiler = new Java2ScriptCompiler();
			boolean breakOnError = j2sCompiler.doBreakOnError();
			j2sCompiler.startBuild(isCleanBuild);
			if (!j2sCompiler.initializeProject(project, true)) {
				System.out.println(".j2s disabled");
				return;
			}
			System.out.println("j2s building JavaScript " + project.getProject().getName() + " "
					+ project.getProject().getLocation());
			int ntotal = 0, nerror = 0;
			for (int j = 0; j < contexts.size(); j++) {
				BuildContext[] files = contexts.get(j);
				System.out.println("j2s building JavaScript for " + files.length + " file"+plural(files.length));

				for (int i = 0, n = files.length; i < n; i++) {
// trying to keep the progess monitor running - didn't work
//				try {
//					Thread.currentThread().sleep(1);
//				} catch (InterruptedException e) {
//					// ignore
//				}
//					System.out.println("j2s file"
//							+ " name=" + files[i].getFile().getName() 
//							+ " fullpath=" + files[i].getFile().getFullPath() 
//							+ " location=" + files[i].getFile().getLocation());
//					
					IFile f = files[i].getFile();
					String filePath = f.getLocation().toString();
					if (j2sCompiler.excludeFile(f)) {
						System.out.println("j2s excluded " + filePath);
					} else {
						System.out.println("j2s transpiling (" + (i + 1) + "/" + n + ") " + filePath);
						if (j2sCompiler.compileToJavaScript(f)) {
							ntotal++;
						} else {
							nerror++;
							System.out.println("j2s Error processing " + filePath);
							if (breakOnError)
								break;
						}
					}
				}
			}
			contexts = null;
			System.out.println(
					"j2s buildFinished " + ntotal + " file"+plural(ntotal) + " transpiled for " + project.getProject().getLocation());
			System.out.println("j2s buildFinished nerror = " + nerror);
		}	
		isCleanBuild = false;
	}

	private static String plural(int n) {
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