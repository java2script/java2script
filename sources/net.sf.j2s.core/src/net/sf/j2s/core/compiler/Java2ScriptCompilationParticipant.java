package net.sf.j2s.core.compiler;

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
	private BuildContext[] javaFiles;
	private boolean isCleanBuild;

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
	public boolean isActive(IJavaProject project) {
		boolean isj2s = Java2ScriptCompiler.isActive(project.getProject());
		System.out.println("isActive " + isj2s + " " + project.getProject().getLocation());
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
	public int aboutToBuild(IJavaProject project) {
		System.out.println("aboutToBuild " + project.getProject().getLocation());
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
	public void cleanStarting(IJavaProject project) {
		System.out.println("cleanStarting " + project.getProject().getLocation());
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
	public void buildStarting(BuildContext[] files, boolean isBatch) {
		javaFiles = files;
		System.out.println("buildStarting " + files.length + " files, isBatch=" + isBatch);
	}

	/**
	 * Notifies this participant that a build has finished for the project. This
	 * will be sent, even if buildStarting() was not sent when no source files
	 * needed to be compiled or the build failed. Only sent to participants
	 * interested in the project.
	 * 
	 * @param project
	 *            the project about to build
	 * @since 3.4
	 */
	public void buildFinished(IJavaProject project) {
		if (javaFiles != null) {
			System.out.println("building JavaScript " + project.getProject().getLocation());
			Java2ScriptCompiler j2sCompiler = new Java2ScriptCompiler();
			j2sCompiler.startBuild(isCleanBuild);
			j2sCompiler.initializeProject(project.getProject(), true);
			for (int i = 0; i < javaFiles.length; i++) {
				System.out.println("transpiling " + javaFiles[i]);
				if (!j2sCompiler.compileToJavaScript(javaFiles[i].getFile())) {
					System.out.println("Error processing " + javaFiles[i].getFile());
					break;
				}
			}
			javaFiles = null;
			System.out.println("build finished " + project.getProject().getLocation());
		}
		isCleanBuild = false;
	}

	/**
	 * Returns whether this participant is interested in only Annotations.
	 * <p>
	 * Default is to return <code>false</code>.
	 * </p>
	 * 
	 * @return whether this participant is interested in only Annotations.
	 */
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
	public void reconcile(ReconcileContext context) {
		// fired whenever a source file is changed -- before it is saved
	}
}