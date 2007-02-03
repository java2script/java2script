package net.sf.j2s.ui.classpath;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class PathUtil {
	public static final String J2S_RESOURCES_LIST = "j2s.resources.list";
	public static final String J2S_ABANDOMED_RESOURCES_LIST = "j2s.abandoned.resources.list";
	public static final String J2S_OUTPUT_PATH = "j2s.output.path";

	public static void hello() {
		String prjFolder = "S:\\eclipse-3.1.1\\eclipse\\workspace\\my.self\\";
		File file = new File(prjFolder, ".j2s");
		Properties props = new Properties();
		if (file.exists()) {
			try {
				props.load(new FileInputStream(file));
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		String[] list = new String[] {
				"console.css",
				"j2score/navtiveconsole.js",
				"lib/j2s.core-common.z.js", //jz",
				"/swt.jface/.j2s",
				"lib/hello.j2s",
				"bin/net/sf/j2s/hello/HelloWorld.js",
				"bin/net/sf/j2s/hello/HelloJ2S.js"
		};
		props.setProperty(J2S_OUTPUT_PATH, "bin");
		props.setProperty(J2S_RESOURCES_LIST, joinArray(list, ","));
		String[] classes = getClasses(props);
		for (int i = 0; i < classes.length; i++) {
			System.out.println(classes[i]);
		}
		try {
			props.store(new FileOutputStream(file), "Java2Script Configuration");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static String[] getResources(Properties props) {
		String listStr = props.getProperty(J2S_RESOURCES_LIST);
		if (listStr != null) {
			String[] splits = listStr.split(",");
			return splits;
		}
		return new String[0];
	}
	public static String[] getAbandonedResources(Properties props) {
		String listStr = props.getProperty(J2S_ABANDOMED_RESOURCES_LIST);
		if (listStr != null) {
			String[] splits = listStr.split(",");
			return splits;
		}
		return new String[0];
	}
	public static String convertClassName(String path, String binPath) {
		if (binPath != null) {
			if (!binPath.endsWith("/")) {
				binPath += "/";
			}
		}
		if (path != null && path.endsWith(".js")) {
			if (binPath != null && path.startsWith(binPath)) {
				path = path.substring(binPath.length());
			}
			path = path.substring(0, path.length() - 3);
			return path.replace('/', '.');
		}
		return null;
	}
	public static String[] getClasses(Properties props) {
		List list = new ArrayList();
		String listStr = props.getProperty(J2S_RESOURCES_LIST);
		if (listStr != null) {
			String[] splits = listStr.split(",");
			String binPath = props.getProperty(J2S_OUTPUT_PATH);
			if (binPath != null) {
				if (!binPath.endsWith("/")) {
					binPath += "/";
				}
			}
			for (int i = 0; i < splits.length; i++) {
				if (splits[i] != null && splits[i].endsWith(".js")) {
					if (binPath != null && splits[i].startsWith(binPath)) {
						splits[i] = splits[i].substring(binPath.length());
					}
					splits[i] = splits[i].substring(0, splits[i].length() - 3);
					list.add(splits[i].replace('/', '.'));
				}
			}
		}		
		return (String[]) list.toArray(new String[0]);
	}
	public static void addClass(Properties props, String className) {
		String binPath = props.getProperty(J2S_OUTPUT_PATH);
		if (binPath == null) {
			binPath = "";
		} else {
			if (!binPath.endsWith("/")) {
				binPath += "/";
			}
		}
		String listStr = props.getProperty(J2S_RESOURCES_LIST);
		if (listStr == null) {
			props.setProperty(J2S_RESOURCES_LIST, binPath + className.replace('.', '/') + ".js");
		} else {
			String[] list = listStr.split(",");
			boolean existed = false;
			for (int i = 0; i < list.length; i++) {
				if (className.equals(list[i])) {
					existed = true;
					break;
				}
			}
			if (!existed) {
				props.setProperty(J2S_RESOURCES_LIST, listStr + "," + binPath + className.replace('.', '/') + ".js");
			}
		}
	}
	public static String joinArray(String[] list, String seperator) {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < list.length; i++) {
			buf.append(list[i]);
			if (i != list.length - 1) {
				buf.append(seperator);
			}
		}
		String listStr = buf.toString();
		return listStr;
	}

	public static Properties loadJZ(File file) {
		Properties props = new Properties();
		if (file.exists()) {
			try {
				FileReader reader = new FileReader(file);
				char[] buf = new char[1024];
				StringBuffer buffer = new StringBuffer();
				int read = 0;
				boolean isStarted = false;
				while ((read = reader.read(buf)) != -1) {
					buffer.append(buf, 0, read);
					if (buffer.length() > 10) {
						if (buffer.toString().startsWith("/*=j2s=")) {
							isStarted = true; 
						} else {
							return props;
						}
					}
					if (isStarted) {
						if (buffer.indexOf("=*/") != -1) {
							break;
						}
					}
				}
				reader.close();
				if (isStarted) {
					String str = buffer.toString();
					int idx1 = str.indexOf('\n', 7);
					if (idx1 != -1) {
						int idx2 = str.indexOf("=*/", idx1);
						if (idx2 != -1) {
							str = str.substring(idx1 + 1, idx2);
							props.load(new ByteArrayInputStream(str.getBytes()));
						}
					}
				}
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return props;
	}
	public static void main(String[] args) {
		//hello();
		String prjFolder = "S:\\eclipse-3.1.1\\eclipse\\workspace\\my.self\\";
		File file = new File(prjFolder, ".j2s");
		CompositeResources res = new CompositeResources();
		res.setFolder(file.getParentFile());
		res.setRelativePath(file.getName());
		res.load();
		Resource[] list = res.getChildren();
		for (int i = 0; i < list.length; i++) {
			Resource item = list[i];
			System.out.println(item.getName());
			boolean exists = item.exists();
			System.out.println(exists);
			if (exists) {
				if (item instanceof IClasspathContainer) {
					IClasspathContainer pc = (IClasspathContainer) item;
					pc.load();
					Resource[] children = pc.getChildren();
					for (int j = 0; j < children.length; j++) {
						System.out.println("--" + children[j].getName());
					}
				}
			}
		}
		System.out.println(res.toHTMLString());
		Properties prop2 = new Properties();
		res.store(prop2);
		try {
			prop2.store(new FileOutputStream(new File("x.j2s")), "Hello");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
