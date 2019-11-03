package net.sf.j2s.ui.cmdline;

import java.io.IOException;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;

public class Tests {
	public static void UtilsTest1() throws CoreException, IOException {
		String nonJavaProjectPath = "/home/sebastian/desarrollo/test", 
			nonJavaProjectName = "test";
		IProject project = null;

		// System.out.println(Utils.toString(System.getProperties()));
		
//		try {
//			JDTUtils.projectDelete(nonJavaProjectName);
//			System.out.println("LOG: Utils.projectDelete(p);");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		try {
			project = JDTUtils.newProject(nonJavaProjectPath, nonJavaProjectName);
			System.out.println("LOG: newProject(nonJavaProjectPath, nonJavaProjectName)");
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			JDTUtils.addJavaClassPathContainer(project);
			System.out.println("LOG: addJavaClassPathContainer");
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			JDTUtils.setOuputFolder(project, "bin2");
			System.out.println("LOG: setOuputFolder");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			JDTUtils.setSourceFolders(project, new String[] { "src" });
			System.out.println("LOG: setSourceFolders(project, new String[]{src});");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			JDTUtils.appendJ2SBuilderTo(project);
			System.out.println("LOG: appendJ2SBuilderTo");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {			
			JDTUtils.build(project, Utils.toMap());
			System.out.println("LOG: build(project, Utils.toMap()");
		} catch (Exception e) {
			e.printStackTrace();
		}
//		try {
//			JDTUtils.projectDelete(nonJavaProjectName);
//			System.out.println("LOG: Utils.projectDelete(p);");
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
	}
}
