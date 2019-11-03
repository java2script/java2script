package net.sf.j2s.ui.cmdline;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.equinox.app.IApplication;
import org.eclipse.equinox.app.IApplicationContext;
import org.eclipse.jdt.core.JavaModelException;
/**
 * command line format definition for j2s cmdline api.
 * 
 * ./eclipse -nosplash -application net.sf.j2s.ui.cmdlineApi GENERAL_PARAMETERS COMMAND_LIST_PARAMETER
 * 
 * please read doc/j2s-cmdline-api.pdf for information about this eclipse application
 * 
 * @author sgurin
 *TODO: support for reading command list options from file with an especial parameter 
 *--read-from-file=/pàth/to/options/file
 */
public class Application implements IApplication {	
	
	private static final int STATUS_ERROR = 1, STATUS_OK=IApplication.EXIT_OK;
	
	Map<String, String> generalParam;	
	List<Command> commands;	
	IApplicationContext appContext;	
	private String[] args;	
	private int firstCmdIdx;
	Map<String, IProject> projectNames;
	List<IProject> importedProjects;
	List<IProject> buildedProjects;
	
	@Override
	public Object start(IApplicationContext context) throws Exception {
		this.appContext=context;
		projectNames=new HashMap<String, IProject>();
		importedProjects = new LinkedList<IProject>();
		buildedProjects = new LinkedList<IProject>();
		args = (String[])appContext.getArguments().get("application.args");	
		
		//test only
		doDebugInitArgs();
		
		try {
			doTheJobWith();
			return STATUS_OK;
		} catch (Exception e) {
			System.out.println("net.sf.j2s.ui.cmdline Main Exception");
			e.printStackTrace();
			return STATUS_ERROR;
		}
	}

	

	@Override
	public void stop() {
	}
	
	
	private void doTheJobWith() throws Exception {
		firstCmdIdx = Utils.indexOfFirstOccurence(args, Command.CMD);

		initGeneralOptions();
		initCommandListOptions();
		
		Utils.debug(dumpParams());
		
		dispatchCommands();
		
//		removeAllProjects();
	}

//	private void removeAllProjects() throws CoreException {
//		for (Iterator<IProject> iterator = importedProjects.iterator(); iterator.hasNext();) {
//			IProject proj = iterator.next();
//			JDTUtils.projectDelete(proj);
//		}
//	}

	private void dispatchCommands() throws Exception {
		for (Iterator<Command> iterator = commands.iterator(); iterator.hasNext();) {
			Command c = iterator.next();
			try {
				dispatch(c);
			} catch (Exception e) {
				Utils.logError("Error: "+e.getMessage()+" while dispatching command "+c);
				e.printStackTrace();
			}
			
		}
	}		
	private void dispatch(Command c) throws Exception {
		Map<String, String> params = c.getParams();
		String cmd = params.get(Command.CMD);
		if(cmd==null) {
			Utils.logError("malformed command: "+c);
			return ;
		}
		else if(cmd.equals(Command.CMD_BUILD)) {
			doBuild(params);
		}
		else if(cmd.equals(Command.CMD_NEW_PROJECT)) {
			doSetSourceFolders(getProject(params.get(Command.PATH), params.get(Command.PROJECT_NAME)), params);
		}
		else if(cmd.equals(Command.CMD_RENDER)) {
			doRender(params);
		}		
		else if(cmd.equals(Command.CMD_SET_CLASSPATH)) {
			doSetClasspath(getProject(params.get(Command.PATH), params.get(Command.PROJECT_NAME)), params);
		}
		else if(cmd.equals(Command.CMD_SET_SOURCE_FOLDERS)) {
			doSetSourceFolders(getProject(params.get(Command.PATH), params.get(Command.PROJECT_NAME)), params);			
		}
		else if(cmd.equals(Command.CMD_SET_OUTPUT_FOLDER)) {
			IProject proj = getProject(params.get(Command.PATH), params.get(Command.PROJECT_NAME));
			JDTUtils.setOuputFolder(proj, params.get(Command.OUTPUT_FOLDER));
		}
	}

	private void doSetClasspath(IProject project, Map<String, String> params) throws CoreException {
		String classPath = params.get(Command.CLASSPATH);
		//TODO: relative paths?
		//TODO: set != add
		JDTUtils.addToClassPath(project, classPath.split(Command.FILEPATH_SEPARATOR));		
	}
	
	private void doSetSourceFolders(IProject proj, Map<String, String> params) throws JavaModelException {
		String srcFolders1 = params.get(Command.SOURCE_FOLDERS);
		if(srcFolders1!=null) 
			JDTUtils.setSourceFolders(proj, srcFolders1.split(Command.FILEPATH_SEPARATOR));
	}
	
	private void doRender(Map<String, String> params) throws Exception {
		String path = params.get(Command.PATH), 
			name = params.get(Command.PROJECT_NAME), 
			mainFile = params.get(Command.MAIN_TYPE), 
			outputName = params.get(Command.OUTPUT_NAME), 
			templatePath = params.get(Command.TEMPLATE), 
			j2slibUrl = params.get(Command.J2SLIBURL);		

		IProject project = getProject(path, name);
		if(!Utils.contains(buildedProjects, project))
			doBuild(params);
			
		try {
			JDTUtils.renderJ2SApp(project, mainFile, j2slibUrl, templatePath, outputName);
		} catch (Exception e) {
			System.out.println("main render exception");
			e.printStackTrace();
			throw e;
		}
		
	}
	

	/**
	 * if project doens't exists first import it, then build it
	 */
	private void doBuild(Map<String, String> params) throws CoreException, IOException {
		String path = params.get(Command.PATH), 
			name = params.get(Command.PROJECT_NAME);
		IProject project = getProject(path, name);		
		if(project==null)
			Utils.logError("doBuild: project "+name+"/"+path+" - not found");
		try {			
			JDTUtils.appendJ2SBuilderTo(project);
			JDTUtils.build(project, params);
			buildedProjects.add(project);
		} catch (Exception e) {
			Utils.logError("IO exception. are you sure "+path+"/"+name+" is a valid eclipse project path? ");
			e.printStackTrace();
		}
	}

	/**
	 * get a project by name and path. If the project was not already imported, import it
	 */
	private IProject getProject(String path, String name) throws CoreException, IOException {
		IProject project = null;
		
		if(Utils.isNull(path) && !Utils.isNull(name)) { //project already opened?
			project = projectNames.get(name);
		}
		else if(!Utils.isNull(path)){
			project = JDTUtils.newProject(path, name);
			importedProjects.add(project);
			projectNames.put(name, project);
		}
		
		if(project==null) {
			Utils.logError("project "+path+" "+name+" cannot be imported. interrupted");
			return null;
		}
		return project;
	}
	
	
	//command utilities
	private void initCommandListOptions() throws IOException {
		if(firstCmdIdx==-1) {
			Utils.logError("incorrect parameter list. at least one "+Command.CMD+" parameter is needed");
			Utils.exit(STATUS_ERROR);
		}
		commands=new LinkedList<Command>();
		int i = firstCmdIdx, nextCmdIdx=0;
		
		while(nextCmdIdx<args.length && nextCmdIdx>=0) {
			nextCmdIdx = Utils.indexOf(args, Command.CMD, Math.min(i+1, args.length-1), args.length);
			if(nextCmdIdx==i)
				nextCmdIdx=args.length;
			String[] argFragment = (String[]) Utils.subArray(args, i, nextCmdIdx==-1?args.length:nextCmdIdx);
			
			Command cmd = null;
			try {
				cmd=new Command(argFragment);
			} catch (Exception e) {
				Utils.logError("invalid command syntax: "+e.getMessage());
				e.printStackTrace();
				Utils.exit(STATUS_ERROR);
			}
			commands.add(cmd);
			System.out.println("builded command : "+cmd);
			i=nextCmdIdx;
		}		
	}
	private void initGeneralOptions() throws IOException {		
		if(firstCmdIdx==-1) {
			Utils.logError("incorrect parameter list. at least one 'cmd' parameter is needed");
			Utils.exit(STATUS_ERROR);
		}			
		generalParam=new HashMap<String, String>();
		for (int i = 0; i < firstCmdIdx; i++) {
			String arg = args[i];
			String [] a = arg.split("=");
			if(a.length==2) { //if not it is an invalid j2s cmd line api parameter
				String name = a[0], value = a[1];
				generalParam.put(name, value);
			}
			else if(a.length>2)
				Utils.logError("invalid general command syntax. Values cannot contain '=' char like: "+arg);
			else 
				Utils.logError("invalid general command syntax. arguments must be of the for foo=var at:  "+arg);
		}
		
	}
	
	
	
	//debug utilities
	private String dumpParams() {
		String s = "General parameters: "+Utils.toString(generalParam)+"\n" +
				"Command list: \n";
		for (Iterator<Command> iterator = commands.iterator(); iterator.hasNext();) {
			s+="\n\t"+ iterator.next();
		}
		return s+"\nWorkspace: "+ResourcesPlugin.getWorkspace().getRoot().getLocation();
	}
	
	/**
	 * set working initial parameters for launching this application with eclipse plugin launcher instead from user cmd line.
	 * @throws IOException 
	 * @throws CoreException 
	 */
	private void doDebugInitArgs() throws CoreException, IOException {
		if(!Utils.debug)
			return;
		
		//parameter examples:
		
		//importing and building a non eclipse project  
		args = new String[]{
			"-cmd", "newProject", 	"-projectName", "p1", 	"-path", "/home/sebastian/desarrollo/j2scmdlintests/eclipsestandalonetest1",
			"-cmd", "setOutputFolder", "-projectName", "p1", "-outputFolder", "javascriptOutput",
			"-cmd", "setSourceFolders", "-projectName", "p1", "-sourceFolders", "src",
			"-cmd", "build", "-projectName", "p1",
		};
		
		
//		 importing and building a non eclipse project that uses swt
		args = new String[]{
			"-cmd", "newProject", 	"-projectName", "test", 	"-path", "/home/sebastian/desarrollo/j2scmdlintests/nonEclipseSWTProject",
			"-cmd", "setOutputFolder", "-projectName", "test", "-outputFolder", "javascriptOutput",
			"-cmd", "setSourceFolders", "-projectName", "test", "-sourceFolders", "src",
			"-cmd", "setClassPath", "-projectName", "test", "-classPath", "/home/sebastian/Desktop/downloads/swt33/swt-debug.jar",
			"-cmd", "build", "-projectName", "test",
			
			//and finally render
			"-cmd", "render", "-projectName", "test", "-mainType", "foo.test1.NewSWTApp", 
				"-j2slibUrl", "../j2slib", "-template", "/home/sebastian/desarrollo/j2scmdlintests/nonEclipseSWTProject/simpleHtmlDocument.vm", "-outputName","${mainType}.html"
		};
		
		 
		
//		args = new String[]{};
//		Tests.UtilsTest1();
		
//		System.out.println("workspace: "+ResourcesPlugin.getWorkspace().getRoot().getLocation());
//		System.out.println("args: "+Utils.toString(args));
		
	}
}
