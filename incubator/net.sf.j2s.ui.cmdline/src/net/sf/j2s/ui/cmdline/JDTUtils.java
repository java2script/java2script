package net.sf.j2s.ui.cmdline;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import net.sf.j2s.ui.launching.IJ2SLauchingConfiguration;
import net.sf.j2s.ui.launching.template.J2SAppLauncherTemplateContributor;
import net.sf.j2s.ui.launching.template.J2STemplateContext;
import net.sf.j2s.ui.launching.template.TemplateContributionUtil;

import org.eclipse.core.resources.ICommand;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.debug.core.DebugPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationType;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.core.ILaunchManager;
import org.eclipse.jdt.core.IClasspathContainer;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IProblemRequestor;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.WorkingCopyOwner;
import org.eclipse.jdt.core.compiler.IProblem;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jdt.ui.wizards.JavaCapabilityConfigurationPage;
/**
 * general utilities for programatically invoking important j2s project actions like building, 
 * importing, cleaning, miscelaneuos utilities, etc 
 * @author sgurin
 *
 */
public class JDTUtils {
	
	static final String J2S_BUILDER_ID =  "net.sf.j2s.core.java2scriptbuilder";//"net.sf.j2s.core.builder.Java2ScriptBuilder";
		
	
//	private static List<String> transformedProjectPaths=new LinkedList<String>();
	
	
	/**
	 * creates a new empty eclipse java project. Note: if 'projectpath' points to an existing eclispe project, 
	 * then that project will be imported. If not, a new project will be created pointing to 'projectPath'
	 * @param projectPath - the project's root path, normally the root folder of your sources. Generated javascript and html will normally go here.
	 * @param name - desired name for new project
	 * @return 
	 * @throws CoreException
	 * @throws IOException 
	 */
	public static IProject newProject(String projectPath, String name) 
	throws CoreException, IOException {
		
		boolean isAnEclipseProject = isEclipseProject(projectPath);
		if(!isAnEclipseProject) 
			transformToEclipseProject(projectPath, name);				
		
		IProject project = importProject(projectPath, name);
//		projectDelete(project);
		
		if(!isAnEclipseProject)  {
			addJavaClassPathContainer(project);
			IJavaProject javaProject = JavaCore.create(project);
		}
		return project;			
	}

	/**
	 * import an existing eclipse project located at projectPath with the eclipse rpoject name 'name' in the workspace.
	 * if no name is given, current eclipse project name will be used.
	 * @param projectPath
	 * @param name - 
	 * @return
	 * @throws CoreException
	 */
	public static IProject importProject(String projectPath, String name) 
	throws CoreException {

		IPath dotProjectFile = new Path(projectPath+ "/.project");			
		
        IProjectDescription projectDescription =
        	ResourcesPlugin.getWorkspace().loadProjectDescription(dotProjectFile);
        
        if( !Utils.isNull(name)) {
        	projectDescription.setName(name);
        }
        
        IProject project = ResourcesPlugin.getWorkspace().getRoot().
            getProject(projectDescription.getName());
        
        JavaCapabilityConfigurationPage.createProject(project, projectDescription
            .getLocationURI(), null);
        
		return project;
	}

	public static void appendJ2SBuilderTo(IProject project) throws CoreException {
		// find j2s builder		
		IProjectDescription desc = project.getDescription();
		ICommand[] commands = desc.getBuildSpec();
		boolean found = false;
	
		for (int j = 0; j < commands.length; ++j) {
			if (commands[j].getBuilderName().equals(J2S_BUILDER_ID)) {
				found = true;
				break;
			}
		}
		if (!found) {
			// add builder to project
			ICommand command = desc.newCommand();
			command.setBuilderName(J2S_BUILDER_ID);
			ICommand[] newCommands = new ICommand[commands.length + 1];
	
			// Add it before other builders.
			System.arraycopy(commands, 0, newCommands, 1, commands.length);
			newCommands[0] = command;
			desc.setBuildSpec(newCommands);
			project.setDescription(desc, null);
			
			//TODO: remove other registered builders?
		}
	}
	

	/**
	 * build the eclipse project. Note: use appendJ2sBuilderTo before for giving j2s builder 
	 * support for the project
	 * @param params 
	 */
	public static void build(IProject project, Map<String, String> params) throws CoreException {
		project.touch(null);
		project.refreshLocal(IResource.DEPTH_INFINITE, null);
//		project.build(IncrementalProjectBuilder.CLEAN_BUILD, null);			
		project.build(IncrementalProjectBuilder.FULL_BUILD, null);
		
		//build problem report.
		String problemsLog = params.get(Command.PROBLEMS_LOG);
		File problemsLogF = null;
		if(!Utils.isNull(problemsLog)) 
			problemsLogF = new File(problemsLog);		
		reportProjectErrors(project, problemsLogF);
	}

//	public static void projectDelete(IProject project) throws CoreException {
//		project.delete(false, true, null);		
//	}
//	public static void projectDelete(String nonJavaProjectName) throws CoreException {
//		projectDelete(ResourcesPlugin.getWorkspace().getRoot().getProject(nonJavaProjectName));
//		
//	}
	public static void renderJ2SApp(IProject project, String mainType,
			String j2slibUrl, String templatePath, String outputName) throws Exception {		
		
		if(!j2slibUrl.endsWith("/"))
			j2slibUrl+="/";
		
		ILaunchManager manager = DebugPlugin.getDefault().getLaunchManager();
		ILaunchConfigurationType type = manager.getLaunchConfigurationType("net.sf.j2s.ui.launching.j2sApplication");//IJavaLaunchConfigurationConstants.ID_JAVA_APPLICATION);
		ILaunchConfigurationWorkingCopy wc = type.newInstance(null, "j2sCmdLineApiLaunchConfig"+Utils.getUnique());
		
		//set config attrs 		
		wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, project.getName());
		wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, mainType);
		
		wc.setAttribute(IJ2SLauchingConfiguration.APPLY_TEMPLATE, true);
		String templateCode = Utils.inputStreamAsString(new FileInputStream(templatePath));
		wc.setAttribute(IJ2SLauchingConfiguration.VELOCITY_CODE, templateCode);		
		wc.setAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, true);
		wc.setAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2slibUrl);		
		wc.setAttribute(IJ2SLauchingConfiguration.OUTPUT_FILE_NAME, outputName);		
		
		ILaunchConfiguration config = wc.doSave();
//		config.launch(ILaunchManager.RUN_MODE, null);		
		
		Utils.debug("j2s app "+project.getLocation()+" - maintype: "+mainType+" - rendered!");
		
		J2STemplateContext ct = new J2STemplateContext(config);
		
		ct.useGlobalJ2slibUrl=true;
		ct.globalJ2slibUrl=j2slibUrl;
		ct.outputFileCode=outputName;
		ct.templateCode=Utils.inputStreamAsString(new FileInputStream(templatePath));		
	
		J2SAppLauncherTemplateContributor templateContributor = TemplateContributionUtil.getInstance().getCurrentTemplateContribution();
		templateContributor.launchJ2SApp(ct);		
	}	
	
	/**
	 * add all libraries and binary folders to project's classpath.
	 */
	public static void addToClassPath(IProject project, String [] classPath) throws CoreException{
		
		IClasspathEntry[] newCP = new IClasspathEntry[classPath.length];
		for (int i = 0; i < newCP.length; i++) {
			newCP[i]=JavaCore.newLibraryEntry(new Path(classPath[i]), null, null, false);
		}		
		addToClassPath(project, newCP);		
	}	
		
	/**
	 * will remove current sourcefolders CP entries.
	 * @param project
	 * @param srcFolders - array with project source folder names., for example, new String[]{"src"}
	 * @throws JavaModelException 
	 */
	public static void setSourceFolders(IProject project, String []srcFolders) throws JavaModelException {
		IClasspathEntry[] srcEntries = new IClasspathEntry[srcFolders.length];
		IJavaProject jp = JavaCore.create(project);
		
		for (int i = 0; i < srcFolders.length; i++) 
			srcEntries[i] = JavaCore.newSourceEntry(new Path("/"+project.getName()+"/"+srcFolders[i]));
		
		IClasspathEntry[] currentCP = jp.getRawClasspath();
		IClasspathEntry[] currentCPButSrc = Utils.select(currentCP, new Utils.Predicate<IClasspathEntry>(){
			@Override
			public boolean select(IClasspathEntry t) {
				return t!=null && t.getEntryKind()!=IClasspathEntry.CPE_SOURCE;
			}
		});		
		jp.setRawClasspath(currentCPButSrc, null);		
		addToClassPath(project, srcEntries);	
	}
	

	/**
	 * add the java container to a project
	 * @param project
	 * @throws JavaModelException
	 */
	public static void addJavaClassPathContainer(IProject project) throws JavaModelException {
		IJavaProject jproject = JavaCore.create(project);

		IClasspathContainer cpContainer = JavaCore.getClasspathContainer(new Path("JDKLIB/default"), jproject);
		if(cpContainer!=null)
			return;
		
		IClasspathEntry varEntry = JavaCore.newContainerEntry(new Path("JDKLIB/default"), false); 
		cpContainer = new IClasspathContainer() {
			public IClasspathEntry[] getClasspathEntries() {
				String subBootCP = System.getProperty("sun.boot.class.path");
				String[] sunBootCPs = subBootCP.split(File.pathSeparator);
				
				List<String> validCPPaths = new Vector<String>();
				
				for (int i = 0; i < sunBootCPs.length; i++) {
					if(new File(sunBootCPs[i]).exists())
						validCPPaths.add(sunBootCPs[i]);					
				}			

				IClasspathEntry[] cpes = new IClasspathEntry[validCPPaths.size()];
				for (int i = 0; i < cpes.length; i++) {
					cpes[i] = JavaCore.newLibraryEntry(new Path(validCPPaths.get(i)), null, null, false);
				}
				return cpes;
			}
			public String getDescription() {
				return "Basic JDK library container";
			}
			public int getKind() {
				return IClasspathContainer.K_SYSTEM;
			}
			public IPath getPath() {
				return new Path("JDKLIB/basic");
			}
		};
		JavaCore.setClasspathContainer(new Path("JDKLIB/default"),
			new IJavaProject[] { jproject },
			new IClasspathContainer[] { cpContainer }, null);        
        
        addToClassPath(project, new IClasspathEntry[]{varEntry});
        
	}

	public static void setOuputFolder(IProject project, String outputFolderName) throws CoreException {
		IJavaProject jp = JavaCore.create(project);
		
		IPath ofP1 = project.getLocation().append(outputFolderName);
		File f = new File(ofP1.toOSString());
		if(!f.exists())
			f.mkdirs();
		
		if(!project.getFolder(outputFolderName).exists())
			project.getFolder(outputFolderName).create(true, true, null);
		if(!outputFolderName.startsWith("/"))
			outputFolderName="/"+project.getName()+"/"+outputFolderName;
		jp.setOutputLocation(new Path(outputFolderName), null);
	}

//	public static void cleanTransformedProjects() {
//		for (Iterator<String>iterator = transformedProjectPaths.iterator(); iterator.hasNext();) {
//			String path = iterator.next();
//			new File(path+File.separator+".project").delete();
//			new File(path+File.separator+".project").delete();
//		}
//	}
	
	private static boolean isEclipseProject(String projectPath) {
		if(new File(projectPath+File.separator+".project").exists()) {
			try {
			IPath dotProjectFile = new Path(projectPath+ "/.project");
			ResourcesPlugin.getWorkspace().loadProjectDescription(dotProjectFile);
			return true;
			}catch (Exception e) {
				return false;
			}
		}
		return false;
	}
	
	
	private static void transformToEclipseProject(String projectPath, String name) throws IOException {
		//create a .project file
		File f = new File(projectPath+File.separator+".project");
		FileOutputStream fos = new FileOutputStream(f);
		String projDescCode = getDotProjectContent(name, true);
		fos.write(projDescCode.getBytes());
		fos.close();
		
		//create a .j2s file
		f = new File(projectPath+File.separator+".j2s");
		fos = new FileOutputStream(f);
		fos.write(getDotJ2SContent().getBytes());
		fos.close();
		
//		transformedProjectPaths.add(projectPath);
		new File(projectPath+File.separator+".project").deleteOnExit();
		new File(projectPath+File.separator+".classpath").deleteOnExit();
		new File(projectPath+File.separator+".j2s").deleteOnExit();
	}
			
	private static String toString(IProblem problem) {				
		return 
			"BUILD ERROR: message: "+problem.getMessage()+
			", arguments: " +Utils.toString(problem.getArguments())+
			", filename: "+new String(problem.getOriginatingFileName())+			
			"\n";
	}

	private static void addToClassPath(IProject project, IClasspathEntry[] newCP) throws JavaModelException {
		IJavaProject javaProject = JavaCore.create(project);	
		javaProject.open(null);
		IClasspathEntry[] oldCP = javaProject.getRawClasspath();
		IClasspathEntry[] cp = (IClasspathEntry[]) Utils.concat(oldCP, newCP);	
		javaProject.setRawClasspath(cp, null);
	}
	
	private static void reportProjectErrors(IProject project, final File logFile)
	throws JavaModelException {
		IJavaProject javaProject = JavaCore.create(project);
		// create requestor for accumulating discovered problems
		final IProblemRequestor problemRequestor = new IProblemRequestor() {
			public void acceptProblem(IProblem problem) {				
				String problemStr = JDTUtils.toString(problem);
				boolean dumpToConsole=false;
				if(logFile!=null) {
					try {
						Utils.fileOutputStream(logFile.getAbsolutePath(), true, problemStr);
					} catch (IOException e) {
						//problems writing to log file
						dumpToConsole=true;
					}
				}
				if(logFile==null || dumpToConsole || Utils.debug)
					System.out.println(problemStr);
			}
			
			public void beginReporting() {}
			public void endReporting() {}
			public boolean isActive() {
				return true;
			}
		};
		//set problem requestor to a WorkingCopyOwner
		WorkingCopyOwner wCopyOwner = new WorkingCopyOwner() {
			public IProblemRequestor getProblemRequestor(ICompilationUnit workingCopy) {
				return problemRequestor;
			};
		};
		IPackageFragment[] frags = javaProject.getPackageFragments();
		for (int i = 0; i < frags.length; i++) {
			IPackageFragment frag = frags[i];
			ICompilationUnit[] units = frag.getCompilationUnits();
			for (int j = 0; j < units.length; j++) {
				ICompilationUnit unit = units[j];
				//getting a working copy passing the WorkingCopyOwner will feed the requestor with problems
				unit.getWorkingCopy(wCopyOwner, null);				
			}
		}
	}
	

	private static String getDotJ2SContent() {
		return "#Java2Script Configuration\n"+
		"#Thu Sep 23 20:02:11 UYT 2010\n"+
//		"j2s.compiler.abbreviation=true\n"+
		"j2s.resources.list=\n"+
//		"j2s.compiler.abbreviation.prefix=$_\n"+
		"j2s.output.path=bin\n"+
		"j2s.abandoned.resources.list=\n"+
		"j2s.compiler.status=enable\n"+
//		"j2s.compiler.mode=debug\n"+
		"";
	}
	private static String getDotProjectContent(String name, boolean addJ2SBuilder) {
		
		return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
		"<projectDescription>\n"+
		"	<name>"+name+"</name>\n"+
		"	<comment></comment>\n"+
		"	<projects>\n"+
		"	</projects>\n"+
		"	<buildSpec>\n"+
		"		<buildCommand>\n"+
		"			<name>net.sf.j2s.core.java2scriptbuilder</name>\n"+
		"			<arguments>\n"+
		"			</arguments>\n"+
		"		</buildCommand>\n"+
		"	</buildSpec>\n"+
		"	<natures>\n"+
		"		<nature>org.eclipse.jdt.core.javanature</nature>\n"+
		"	</natures>\n"+
		"</projectDescription>";
	}

	


}
