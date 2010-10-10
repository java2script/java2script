package net.sf.j2s.ui.cmdline;

import java.util.HashMap;
import java.util.Map;

/**
 * representation of a simple command
 * @author sgurin
 *
 */
public class Command {
	public static final String 
	
		//parameter names
		CMD = "-cmd", PATH = "-path", PROJECT_NAME = "-projectName", MAIN_TYPE = "-mainType", 
		TEMPLATE = "-template", OUTPUT_NAME = "-outputName" ,J2SLIBURL = "-j2slibUrl",
		PROBLEMS_LOG = "-problemsLog", SOURCE_FOLDERS="-sourceFolders", 
		OUTPUT_FOLDER="-outputFolder", CLASSPATH="-classPath",
		
		//and command values
//		CMD_IMPORT="import", 
		CMD_CLEAN="clean", CMD_BUILD="build", CMD_RENDER="render", 
		CMD_NEW_PROJECT="newProject", CMD_LINK_SOURCE="linkSource",
		CMD_SET_CLASSPATH="setClassPath",
		CMD_SET_SOURCE_FOLDERS="setSourceFolders",
		CMD_SET_OUTPUT_FOLDER="setOutputFolder",
		
		//other constants
		FILEPATH_SEPARATOR=":"			
			;


	
	Map<String, String> params;
//	private String name ;

	/**
	 * build a command directly from argument fragment like new String[]{"cmd", "build", "path", "/sh/s", "name", "P1"}
	 * @param args
	 * @throws Exception in case of syntax error
	 */
	public Command(String[]args) throws Exception {
		if(args==null || args.length<2 || !args[0].equals(CMD)) {
			throw new Exception("mal formed argument fragment : "+Utils.toString(args));
		}
		params=new HashMap<String, String>();
		for (int i = 0; i < args.length; i+=2) {
			String name = args[i], val = args[i+1];
			params.put(name, val);
		}
	}

	public Map<String, String> getParams() {
		return params;
	}
	
	public String toString() {
		return "Command"+Utils.toString(params);
	}

}
