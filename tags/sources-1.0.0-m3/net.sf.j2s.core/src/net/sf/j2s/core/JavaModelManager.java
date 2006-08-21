/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import net.sf.j2s.core.builder.JavaBuilder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ISaveContext;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.preferences.IEclipsePreferences;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.core.DeltaProcessingState;
import org.eclipse.jdt.internal.core.DeltaProcessor;
import org.eclipse.jdt.internal.core.JavaModel;
import org.eclipse.jdt.internal.core.util.Messages;

/**
 * The <code>JavaModelManager</code> manages instances of <code>IJavaModel</code>.
 * <code>IElementChangedListener</code>s register with the <code>JavaModelManager</code>,
 * and receive <code>ElementChangedEvent</code>s for all <code>IJavaModel</code>s.
 * <p>
 * The single instance of <code>JavaModelManager</code> is available from
 * the static method <code>JavaModelManager.getJavaModelManager()</code>.
 */
public class JavaModelManager { 	
	/**
	 * The singleton manager
	 */
	private static JavaModelManager MANAGER= new JavaModelManager();

	/**
	 * Holds the state used for delta processing.
	 */
	public DeltaProcessingState deltaState = new DeltaProcessingState();

	/**
	 * Table from IProject to PerProjectInfo.
	 * NOTE: this object itself is used as a lock to synchronize creation/removal of per project infos
	 */
	protected Map perProjectInfos = new HashMap(5);
	
	public static class PerProjectInfo {
		
		public IProject project;
		public Object savedState;
		public boolean triedRead;
		public IClasspathEntry[] rawClasspath;
		public IClasspathEntry[] resolvedClasspath;
		public Map resolvedPathToRawEntries; // reverse map from resolved path to raw entries
		public IPath outputLocation;
		
		public IEclipsePreferences preferences;
		public Hashtable options;
		
		public PerProjectInfo(IProject project) {

			this.triedRead = false;
			this.savedState = null;
			this.project = project;
		}
		
		public void rememberExternalLibTimestamps() {
			IClasspathEntry[] classpath = this.resolvedClasspath;
			if (classpath == null) return;
			IWorkspaceRoot wRoot = ResourcesPlugin.getWorkspace().getRoot();
			Map externalTimeStamps = JavaModelManager.getJavaModelManager().deltaState.getExternalLibTimeStamps();
			for (int i = 0, length = classpath.length; i < length; i++) {
				IClasspathEntry entry = classpath[i];
				if (entry.getEntryKind() == IClasspathEntry.CPE_LIBRARY) {
					IPath path = entry.getPath();
					if (externalTimeStamps.get(path) == null) {
						Object target = JavaModel.getTarget(wRoot, path, true);
						if (target instanceof java.io.File) {
							long timestamp = DeltaProcessor.getTimeStamp((java.io.File)target);
							externalTimeStamps.put(path, new Long(timestamp));							
						}
					}
				}
			}
		}
		
		// updating raw classpath need to flush obsoleted cached information about resolved entries
		public synchronized void updateClasspathInformation(IClasspathEntry[] newRawClasspath) {

			this.rawClasspath = newRawClasspath;
			this.resolvedClasspath = null;
			this.resolvedPathToRawEntries = null;
		}
		public String toString() {
			StringBuffer buffer = new StringBuffer();
			buffer.append("Info for "); //$NON-NLS-1$
			buffer.append(this.project.getFullPath());
			buffer.append("\nRaw classpath:\n"); //$NON-NLS-1$
			if (this.rawClasspath == null) {
				buffer.append("  <null>\n"); //$NON-NLS-1$
			} else {
				for (int i = 0, length = this.rawClasspath.length; i < length; i++) {
					buffer.append("  "); //$NON-NLS-1$
					buffer.append(this.rawClasspath[i]);
					buffer.append('\n');
				}
			}
			buffer.append("Resolved classpath:\n"); //$NON-NLS-1$
			IClasspathEntry[] resolvedCP = this.resolvedClasspath;
			if (resolvedCP == null) {
				buffer.append("  <null>\n"); //$NON-NLS-1$
			} else {
				for (int i = 0, length = resolvedCP.length; i < length; i++) {
					buffer.append("  "); //$NON-NLS-1$
					buffer.append(resolvedCP[i]);
					buffer.append('\n');
				}
			}
			buffer.append("Output location:\n  "); //$NON-NLS-1$
			if (this.outputLocation == null) {
				buffer.append("<null>"); //$NON-NLS-1$
			} else {
				buffer.append(this.outputLocation);
			}
			return buffer.toString();
		}
	}
	
	/**
	 * Constructs a new JavaModelManager
	 */
	private JavaModelManager() {
		// singleton: prevent others from creating a new instance
	}

	/**
	 * Returns the singleton JavaModelManager
	 */
	public final static JavaModelManager getJavaModelManager() {
		return MANAGER;
	}

	/**
	 * Returns the last built state for the given project, or null if there is none.
	 * Deserializes the state if necessary.
	 *
	 * For use by image builder and evaluation support only
	 */
	public Object getLastBuiltState(IProject project, IProgressMonitor monitor) {
		if (!Java2ScriptProject.hasJava2ScriptNature(project)) {
			if (JavaBuilder.DEBUG)
				System.out.println(project + " is not a Java project"); //$NON-NLS-1$
			return null; // should never be requested on non-Java projects
		}
		PerProjectInfo info = getPerProjectInfo(project, true/*create if missing*/);
		if (!info.triedRead) {
			info.triedRead = true;
			try {
				if (monitor != null)
					monitor.subTask(Messages.bind(Messages.build_readStateProgress, project.getName())); 
				info.savedState = readState(project);
			} catch (CoreException e) {
				e.printStackTrace();
			}
		}
		return info.savedState;
	}

	/*
	 * Returns the per-project info for the given project. If specified, create the info if the info doesn't exist.
	 */
	public PerProjectInfo getPerProjectInfo(IProject project, boolean create) {
		synchronized(this.perProjectInfos) { // use the perProjectInfo collection as its own lock
			PerProjectInfo info= (PerProjectInfo) this.perProjectInfos.get(project);
			if (info == null && create) {
				info= new PerProjectInfo(project);
				this.perProjectInfos.put(project, info);
			}
			return info;
		}
	}	
	
	/**
	 * Returns the File to use for saving and restoring the last built state for the given project.
	 */
	private File getSerializationFile(IProject project) {
		if (!project.exists()) return null;
		IPath workingLocation = project.getWorkingLocation(JavaCore.PLUGIN_ID);
		return workingLocation.append("j2s.state.dat").toFile(); //$NON-NLS-1$
	}
	
	/**
	 * Reads the build state for the relevant project.
	 */
	protected Object readState(IProject project) throws CoreException {
		File file = getSerializationFile(project);
		if (file != null && file.exists()) {
			try {
				DataInputStream in= new DataInputStream(new BufferedInputStream(new FileInputStream(file)));
				try {
					String pluginID= in.readUTF();
					if (!pluginID.equals(JavaCore.PLUGIN_ID))
						throw new IOException(Messages.build_wrongFileFormat); 
					String kind= in.readUTF();
					if (!kind.equals("STATE")) //$NON-NLS-1$
						throw new IOException(Messages.build_wrongFileFormat); 
					if (in.readBoolean())
						return JavaBuilder.readState(project, in);
					if (JavaBuilder.DEBUG)
						System.out.println("Saved state thinks last build failed for " + project.getName()); //$NON-NLS-1$
				} finally {
					in.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new CoreException(new Status(IStatus.ERROR, JavaCore.PLUGIN_ID, Platform.PLUGIN_ERROR, "Error reading last build state for project "+ project.getName(), e)); //$NON-NLS-1$
			}
		} else if (JavaBuilder.DEBUG) {
			if (file == null)
				System.out.println("Project does not exist: " + project); //$NON-NLS-1$
			else
				System.out.println("Build state file " + file.getPath() + " does not exist"); //$NON-NLS-1$ //$NON-NLS-2$
		}
		return null;
	}
	
	private void saveState(PerProjectInfo info, ISaveContext context) throws CoreException {

		// passed this point, save actions are non trivial
		if (context.getKind() == ISaveContext.SNAPSHOT) return;
		
		// save built state
		if (info.triedRead) saveBuiltState(info);
	}
	
	/**
	 * Saves the built state for the project.
	 */
	private void saveBuiltState(PerProjectInfo info) throws CoreException {
		if (JavaBuilder.DEBUG)
			System.out.println(Messages.bind(Messages.build_saveStateProgress, info.project.getName())); 
		File file = getSerializationFile(info.project);
		if (file == null) return;
		long t = System.currentTimeMillis();
		try {
			DataOutputStream out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(file)));
			try {
				out.writeUTF(JavaCore.PLUGIN_ID);
				out.writeUTF("STATE"); //$NON-NLS-1$
				if (info.savedState == null) {
					out.writeBoolean(false);
				} else {
					out.writeBoolean(true);
					JavaBuilder.writeState(info.savedState, out);
				}
			} finally {
				out.close();
			}
		} catch (RuntimeException e) {
			try {
				file.delete();
			} catch(SecurityException se) {
				// could not delete file: cannot do much more
			}
			throw new CoreException(
				new Status(IStatus.ERROR, JavaCore.PLUGIN_ID, Platform.PLUGIN_ERROR,
					Messages.bind(Messages.build_cannotSaveState, info.project.getName()), e)); 
		} catch (IOException e) {
			try {
				file.delete();
			} catch(SecurityException se) {
				// could not delete file: cannot do much more
			}
			throw new CoreException(
				new Status(IStatus.ERROR, JavaCore.PLUGIN_ID, Platform.PLUGIN_ERROR,
					Messages.bind(Messages.build_cannotSaveState, info.project.getName()), e)); 
		}
		if (JavaBuilder.DEBUG) {
			t = System.currentTimeMillis() - t;
			System.out.println(Messages.bind(Messages.build_saveStateComplete, String.valueOf(t))); 
		}
	}

	/**
	 * Sets the last built state for the given project, or null to reset it.
	 */
	public void setLastBuiltState(IProject project, Object state) {
		PerProjectInfo info = null;
		if (Java2ScriptProject.hasJava2ScriptNature(project)) {
			// should never be requested on non-Java projects
			//PerProjectInfo info = getPerProjectInfo(project, true /*create if missing*/);
			info = getPerProjectInfo(project, true /*create if missing*/);
			info.triedRead = true; // no point trying to re-read once using setter
			info.savedState = state;
		}
		if (state == null) { // delete state file to ensure a full build happens if the workspace crashes
			try {
				File file = getSerializationFile(project);
				if (file != null && file.exists())
					file.delete();
			} catch(SecurityException se) {
				// could not delete file: cannot do much more
			}
		} else {
			if (info != null) {
				try {
					saveBuiltState(info);
				} catch (CoreException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
}
