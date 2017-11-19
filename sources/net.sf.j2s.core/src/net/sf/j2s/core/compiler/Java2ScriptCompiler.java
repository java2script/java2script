package net.sf.j2s.core.compiler;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

import net.sf.j2s.core.astvisitors.ASTKeywordVisitor;
import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.builder.SourceFile;
import net.sf.j2s.core.builder.SourceFileProxy;
import net.sf.j2s.core.hotspot.InnerHotspotServer;

/**
 * The main (and currently only operational) Java2Script compiler. 
 * 
 * @author Bob Hanson
 *
 */
@SuppressWarnings("restriction")
public class Java2ScriptCompiler implements IExtendedCompiler {

	// BH: added "true".equals(getProperty(props, "j2s.compiler.allow.compression")) to ensure compression only occurs when desired
    static final int JSL_LEVEL = AST.JLS8; // BH can we go to JSL 8? 
	private static boolean showJ2SSettings = true; // BH adding this
	private static Properties props;
	private static String htmlTemplate = null;

	public void process(ICompilationUnit sourceUnit, IContainer binaryFolder) {
		final IProject project = binaryFolder.getProject();
		
		
		bhTest(project);
		
		/*
		 * 
		 * synchronized (project) { if
		 * (Java2ScriptProjectNature.hasJavaBuilder(project)) { if
		 * (Java2ScriptProjectNature.removeJavaBuilder(project)) { new
		 * Thread(new Runnable() { public void run() { try { Thread.sleep(50); }
		 * catch (InterruptedException e1) { e1.printStackTrace(); } try {
		 * project.build(IncrementalProjectBuilder.CLEAN_BUILD, null); } catch
		 * (CoreException e) { e.printStackTrace(); } } }).start(); return; } }
		 * } //
		 */
		String prjFolder = project.getLocation().toOSString();
		File file = new File(prjFolder, ".j2s"); //$NON-NLS-1$
		if (!file.exists()) {
			/*
			 * w The file .j2s is a marker for Java2Script to compile JavaScript
			 */
			return;
		}
		props = new Properties();
		try {
			props.load(new FileInputStream(file));
			String status = getProperty("j2s.compiler.status");
			if (!"enable".equals(status)) {
				/*
				 * Not enabled!
				 */
				return;
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		// BH: j2s.resources.list and j2s.abandoned.resources.list do not allow
		// for reflection

		// String binFolder = binaryFolder.getLocation().toOSString();
		String siteFolder = prjFolder + "/site";
		if ("true".equals(getProperty("j2s.save.resource.lists"))) {
			saveResourceLists(sourceUnit, binaryFolder);
		}

		// get the HTML template

		if (htmlTemplate == null) {
			String htmlTemplateFile = getProperty("template.html");
			if (htmlTemplateFile == null)
				htmlTemplateFile = "template.html";
			file = new File(siteFolder, htmlTemplateFile);
			if (!file.exists())
				writeToFile(file, getDefaultHTMLTemplate());
			htmlTemplate = getFileContents(file);
		}

		CompilationUnit root;
		ASTParser astParser = ASTParser.newParser(JSL_LEVEL);
		if (!(sourceUnit instanceof SourceFile))
			return;
		SourceFile unitSource = (SourceFile) sourceUnit;
		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore
				.createCompilationUnitFrom(new SourceFileProxy(unitSource).getResource());
		astParser.setResolveBindings(true);
		astParser.setSource(createdUnit);
		root = (CompilationUnit) astParser.createAST(null);

		// get all the package names

		// DependencyASTVisitor dvisitor = null;
		// String visitorID = getProperty("j2s.compiler.visitor");
		// IExtendedVisitor extVisitor = null;
		// if ("ASTScriptVisitor".equals(visitorID)) {
		// dvisitor = new DependencyASTVisitor();
		// } else if ("SWTScriptVisitor".equals(visitorID)) {
		// dvisitor = new SWTDependencyASTVisitor();
		// } else {
		// if (visitorID != null && visitorID.length() != 0) {
		// extVisitor = ExtendedVisitors.getExistedVisitor(visitorID);
		// if (extVisitor != null) {
		// dvisitor = extVisitor.getDependencyVisitor();
		// }
		// }
		// if (dvisitor == null) {
		//// BH - we are done with SWT dvisitor = new
		// SWTDependencyASTVisitor();
		// dvisitor = new DependencyASTVisitor();
		// }
		// }
		// try {
		// root.accept(dvisitor);
		// } catch (Throwable e) {
		// e.printStackTrace();
		// errorOccurred = true;
		// }
		// if (errorOccurred) {
		// String folderPath = binFolder;
		// String elementName = root.getJavaElement().getElementName();
		// // if (elementName.endsWith(".class") ||
		// // elementName.endsWith(".java")) {
		// // //$NON-NLS-1$//$NON-NLS-2$
		// elementName = elementName.substring(0,
		// elementName.lastIndexOf('.'));
		// // } /* maybe ended with other customized extension
		// String packageName = dvisitor.getPackageName();
		// if (packageName != null) {
		// File folder = new File(folderPath, packageName.replace('.',
		// File.separatorChar));
		// folderPath = folder.getAbsolutePath();
		// File jsFile = new File(folderPath, elementName + ".js");
		// //$NON-NLS-1$
		// if (jsFile.exists()) {
		// jsFile.delete();
		// }
		// }
		// return;
		// }
		// outputs a .jz file???
		// J2SDependencyCompiler.outputJavaScript(dvisitor, root,
		// binFolder);

		// SWTScriptVisitor is deprecated until it can be integrated into
		// the new system.
		ASTScriptVisitor visitor = null;
		// if ("ASTScriptVisitor".equals(visitorID)) {
		visitor = new ASTScriptVisitor();
		// } else if ("SWTScriptVisitor".equals(visitorID)) {
		// visitor = new SWTScriptVisitor();
		// } else {
		// if (extVisitor != null) {
		// visitor = extVisitor.getScriptVisitor();
		// }
		// if (visitor == null) {
		// visitor = new ASTScriptVisitor();
		// // BH default to ASTScriptVisitor, not SWTScriptVisitor
		// // visitor = new SWTScriptVisitor();
		// }
		// }
		// visitor.setPackageNames(dvisitor.getDefinedBasePackages());
		// *.js*;swingjs; etc.
		ASTKeywordVisitor.setNoQualifiedNamePackages(getProperty("j2s.compiler.nonqualified.classes"));
		boolean ignoreMethodOverloading = !("enable".equals(getProperty("j2s.compiler.method.overloading")));
		visitor.setSupportsMethodOverloading(!ignoreMethodOverloading);
		boolean supportsInterfaceCasting = "enable".equals(getProperty("j2s.compiler.interface.casting"));
		visitor.setSupportsInterfaceCasting(supportsInterfaceCasting);
		// boolean objectStaticFields = "enable".equals(getProperty(props,
		// "j2s.compiler.static.quirks"));
		// visitor.setSupportsObjectStaticFields(objectStaticFields);
		boolean isDebugging = "debug".equals(getProperty("j2s.compiler.mode"));
		visitor.setDebugging(isDebugging);
		// dvisitor.setDebugging(isDebugging);
		// BH: compression has been deprecated. Use Google Closure Compiler
		// boolean toCompress = false; //"enable".equals(getProperty(props,
		// "j2s.compiler.allow.compression"))); // BH
		// visitor.setToCompileVariableName(false);
		// dvisitor.toCompileVariableName = false;
		// if (toCompress) {
		// updateJ2SMap(prjFolder);
		// }

		String j2sPath = siteFolder + "/swingjs/j2s";
		try {

			// transpile the code
			
			root.accept(visitor);
			
			// generate the .js file(s) in the site directory
			
			outputJavaScript(visitor, j2sPath);
			
			// add the HTML files in the site directory
			
			addHTML(visitor.getAppList(true), siteFolder, htmlTemplate, true);
			addHTML(visitor.getAppList(false), siteFolder, htmlTemplate, false);
		} catch (Throwable e) {
			e.printStackTrace();
			// find the file and delete it.  
			String filePath = j2sPath;
			String rootName = root.getJavaElement().getElementName();
			rootName = rootName.substring(0, rootName.lastIndexOf('.'));
			String packageName = visitor.getPackageName();
			if (packageName != null) {
				File folder = new File(filePath, packageName.replace('.', File.separatorChar));
				filePath = folder.getAbsolutePath();
				File jsFile = new File(filePath, rootName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					jsFile.delete();
				}
			}
		}
	}

	private void bhTest(IProject project) {
//		IJavaProject jp = JavaCore.create(project);
//		try {
//			IType t = jp.findType("test.Test_Compare", (IProgressMonitor) null);
//			IType tc = jp.findType("test.TCompare", (IProgressMonitor) null);
//			IType t2 = jp.findType("test.Test_CompareTo", (IProgressMonitor) null);
//			IType t2b = jp.findType("test.Test_CompareB", (IProgressMonitor) null);
//			IType t2c = jp.findType("test.Test_CompareToC", (IProgressMonitor) null);
//			System.err.println(">>>t>>>" + t);
//			System.err.println(">>>tc>>>" + tc);
//			System.err.println(">>>t2>>>" + t2);
//			System.err.println(">>>t2b>>>" + t2b);
//			System.err.println(">>>t2c>>>" + t2c);
//			showClass(tc);
//			showClass(t2c);
//			
//		} catch (JavaModelException e2) {
//			// TODO Auto-generated catch block
//			e2.printStackTrace();
//		}
//		
	}

	private void showClass(IType t2c) throws JavaModelException {
		IMethod[] im = t2c.getMethods();
		if (im != null)
		for (int i = 0; i < im.length; i++) {
			IMethod m = im[i];
			System.err.print(m.getElementName() + " " + m.getSignature() + " ");
			String[] mt = m.getParameterTypes();
			if (mt != null)
			for (int j = 0; j < mt.length; j++)
				System.err.print("para " + mt[j]);
			System.err.println("\n\n");
		}
	}

	/**
	 *  untested
	 *   
	 * @param sourceUnit
	 * @param binaryFolder
	 */
	@Deprecated
	private void saveResourceLists(ICompilationUnit sourceUnit, IContainer binaryFolder) {
	
		String resPaths = getProperty("j2s.resources.list");
		String abandonedPaths = getProperty("j2s.abandoned.resources.list");
	
		List<String> abandonedList = new ArrayList<String>();
		List<String> list = new ArrayList<String>();
		if (resPaths != null && resPaths.trim().length() > 0) {
			String[] splits = resPaths.split(",");
			for (int i = 0; i < splits.length; i++) {
				list.add(splits[i]);
			}
		}
		if (abandonedPaths != null && abandonedPaths.trim().length() > 0) {
			String[] splits = abandonedPaths.split(",");
			// list = Arrays.asList(splits);
			for (int i = 0; i < splits.length; i++) {
				abandonedList.add(splits[i]);
			}
		}
		if (sourceUnit instanceof SourceFile) {
			SourceFile unitSource = (SourceFile) sourceUnit;
			String fileName = new String(unitSource.getFileName());
			int idx = fileName.lastIndexOf('/');
			String className = fileName.substring(idx + 1, fileName.lastIndexOf('.'));
			StringBuffer path = new StringBuffer();
			char[][] pkgs = unitSource.getPackageName();
			for (int j = 0; j < pkgs.length; j++) {
				path.append(new String(pkgs[j]));
				path.append("/");
			}
			path.append(className);
			path.append(".js");
			String jsPath = binaryFolder.getProjectRelativePath().toPortableString() + "/" + path.toString();
			if (!list.contains(jsPath) && !abandonedList.contains(jsPath)) {
				list.add(jsPath);
			}
		}
		StringBuffer buf = new StringBuffer();
		for (Iterator<String> iter = list.iterator(); iter.hasNext();) {
			String path = iter.next();
			buf.append(path);
			if (iter.hasNext()) {
				buf.append(",");
			}
		}
		//	try {
		//		props.store(new FileOutputStream(file), "Java2Script Configuration");
		//	} catch (IOException e) {
		//		e.printStackTrace();
		//	}
		//
	}


//	public static void updateJ2SMap(String prjFolder) {
//		File j2sMap = new File(prjFolder, ".j2smap");
//		if (j2sMap.exists()) {
//			String mapStr = FileUtil.readSource(j2sMap);
//			if (mapStr != null) {
//				String lastClassName = null;
//				Map<String, NameConvertItem> varList = new HashMap<String, NameConvertItem>();
//				String[] lines = mapStr.split("\r\n|\r|\n");
//				for (int j = 0; j < lines.length; j++) {
//					String line = lines[j].trim();
//					if (line.length() > 0) {
//						if (!line.startsWith("#")) {
//							int index = line.indexOf("=");
//							if (index != -1) {
//								String key = line.substring(0, index).trim();
//								String toVarName = line.substring(index + 1).trim();
//								boolean isMethod = true;
//								int idx = key.lastIndexOf('#');
//								if (idx == -1) {
//									isMethod = false;
//									idx = key.lastIndexOf('.');
//									if (idx == -1) {
//										continue;
//									}
//								}
//								String className = key.substring(0, idx);
//								if (className.startsWith("$")) {
//									if (lastClassName != null) {
//										className = className.replaceAll("\\$", lastClassName);
////													System.out.println(className + "..." + lastClassName);
//									} else {
//										className = className.replaceAll("\\$", "");
//										lastClassName = className;
//									}
//								} else {
//									lastClassName = className;
//								}
//								String varName = key.substring(idx + 1);
////								System.out.println(className + "." + varName + "->" + toVarName);
//								if (isMethod) {
//									key = className + "#" + varName;
//								} else {
//									key = className + "." + varName;
//								}
//								varList.put(key, new NameConvertItem(className, varName, toVarName, isMethod));
//							}
//						}
//					}
//				}
//				ASTJ2SMapVisitor.setJ2SMap(varList);
//				return ;
//			}
//		}
//		ASTJ2SMapVisitor.setJ2SMap(null);
//	}

	private static String getProperty(String key) {
		String val = props.getProperty(key);
		if (showJ2SSettings)
			System.err.println(key + " = " + val);
		return val;
	}

	public static void outputJavaScript(ASTScriptVisitor visitor, 
			//DependencyASTVisitor dvisitor, CompilationUnit fRoot,
			String j2sPath) {

		// fragments[0] is package]
		List<String> elements = visitor.getElementList();//dvisitor.getDependencyScript(visitor.getBuffer());

		// BH all compression is deprecated --- use Google Closure Compiler

		// js = js + "\n//SwingJS test " + System.currentTimeMillis() + "\n";
//		String lineBreak = getProperty("j2s.compiler.linebreak");
//		String whiteSpace = getProperty("j2s.compiler.whitespace");
		
//		String utf8Header = getProperty("j2s.compiler.utf8bom");
//		boolean addUTF8Header = false;
//		if (utf8Header != null && utf8Header.equals("true")) {
//			addUTF8Header = true;
//		}
//		if (lineBreak != null && whiteSpace != null && lineBreak.length() == 0 && whiteSpace.equals("false")) {
//			js = RegExCompress.regexCompress(js);
//		} else {
//			if (lineBreak != null) {
//				if (!lineBreak.equals("\r\n")) {
//					if ("\r".equals(lineBreak)) {
//						js = js.replaceAll("\\r\\n", "\r");
//					} else if ("\n".equals(lineBreak)) {
//						js = js.replaceAll("\\r\\n", "\n");
//					} else if (lineBreak.length() == 0) {
//						js = js.replaceAll("\\r\\n", "");
//					}
//				}
//			}
//			if (whiteSpace != null) {
//				if (whiteSpace.equals("false")) {
//					js = RegExCompress.regexCompress2(js);
//				}
//			}
//		}
//
//		String abbr = getProperty("j2s.compiler.abbreviation");
//		if ("true".equals(abbr)) {
//			System.out.println("j2s.compiler.appreviation ignored -- use Google closure compiler");
//			String abbrPrefix = getProperty(props, "j2s.compiler.abbreviation.prefix");
//			if (abbrPrefix == null) {
//				abbrPrefix = "$_";
//			}
//			abbrPrefix = abbrPrefix.replaceAll("\\$", "\\\\\\$");
//			String[] clazzAll = getClazzAbbrMap();
//			StringBuffer buf = new StringBuffer();
//			for (int i = 0; i < clazzAll.length / 2; i++) {
//				String method = clazzAll[i + i].substring(6);
//				if ("pu$h".equals(method)) {
//					method = "pu\\$h";
//				}
//				buf.append("(Clazz\\." + method + ")");
//				if (i < clazzAll.length / 2 - 1) {
//					buf.append("|");
//				}
//			}
//			Matcher matcher = Pattern.compile(buf.toString()).matcher(js);
//			matcher.reset();
//			boolean result = matcher.find();
//			if (result) {
//				StringBuffer sb = new StringBuffer();
//				do {
//					int groupCount = matcher.groupCount();
//					for (int i = 0; i < groupCount; i++) {
//						String group = matcher.group(i);
//						if (group != null && group.length() != 0) {
//							for (int j = 0; j < clazzAll.length / 2; j++) {
//								if (group.equals(clazzAll[j + j])) {
//									matcher.appendReplacement(sb, abbrPrefix + clazzAll[j + j + 1]);
//									break;
//								}
//							}
//							break;
//						}
//					}
//					result = matcher.find();
//				} while (result);
//				matcher.appendTail(sb);
//				js = sb.toString();
//			}
//		}

		//String elementName = fRoot.getJavaElement().getElementName();
		// if (elementName.endsWith(".class") || elementName.endsWith(".java"))
		// { //$NON-NLS-1$//$NON-NLS-2$
		//elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		
		
		// Separate all top-level elements into their own JS files
		
		// No package.js! :)
		
		String packageName = visitor.getPackageName();
		for (int i = 0; i < elements.size();) {
			String elementName = elements.get(i++);
			String element = elements.get(i++);
			createJSFile(j2sPath, packageName, elementName, element);			
		}
		
		
		// writePackageJS(dvisitor, folderPath, packageName, elementName);
		showJ2SSettings = false; // just once per compilation run
		// if (visitor instanceof SWTScriptVisitor) {
		// SWTScriptVisitor swtVisitor = (SWTScriptVisitor) visitor;
		// String removedJS = swtVisitor.getBufferRemoved().toString();
		// if (removedJS.trim().length() > 0) {
		// jsFile = new File(folderPath, elementName + ".remmoved.js");
		// //$NON-NLS-1$
		// fileWriter = null;
		// try {
		// fileWriter = new FileWriter(jsFile);
		// fileWriter.write(removedJS);
		// } catch (IOException e) {
		// e.printStackTrace();
		// } finally {
		// if (fileWriter != null) {
		// try {
		// fileWriter.close();
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
		// }
		// }
		// }
		// }
	}

	private static void createJSFile(String j2sPath, String packageName, String elementName, String js) {
		if (packageName != null) {
			File folder = new File(j2sPath, packageName.replace('.', File.separatorChar));
			j2sPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					throw new RuntimeException("Failed to create folder " + j2sPath); //$NON-NLS-1$
				}
			}
			InnerHotspotServer.addCompiledItem(packageName + "." + elementName);
		} else {
			InnerHotspotServer.addCompiledItem(elementName);
		}
		writeToFile(new File(j2sPath, elementName + ".js"), js);
	}

	// private static void writePackageJS(DependencyASTVisitor dvisitor, String
	// folderPath, String packageName, String elementName) {
	// String[] classNameSet = dvisitor.getClassNames();
	// if (classNameSet.length > 1) {
	// StringBuffer buffer = new StringBuffer();
	// String key = "ClazzLoader.jarClasspath (path + \""
	// + /* packageName.replace('.', '/') + "/" + */elementName + ".js\", [";
	// buffer.append(key + "\r\n");
	// /*
	// * for (int i = 0; i < classNameSet.length; i++) {
	// * buffer.append("\""); buffer.append(classNameSet[i]);
	// * buffer.append("\""); if (i != classNameSet.length - 1) {
	// * buffer.append(",\r\n"); } else { buffer.append(",\r\n"); } }
	// */
	// DependencyASTVisitor.joinArrayClasses(buffer, classNameSet, null,
	// ",\r\n");
	//
	// buffer.append("]);\r\n");
	// String s = getProperty("package.js");
	// if (s == null || s.length() == 0) {
	// s = "package.js";
	// }
	// File f = new File(folderPath, s);
	// String source = null;
	// if (f.exists()) {
	// source = FileUtil.readSource(f);
	// int index = source.indexOf(key);
	// boolean updated = false;
	// if (index != -1) {
	// int index2 = source.indexOf("]);", index + key.length());
	// if (index2 != -1) {
	// source = source.substring(0, index) + buffer.toString() +
	// source.substring(index2 + 5);
	// updated = true;
	// }
	// }
	// if (!updated) {
	// source += buffer.toString();
	// }
	// }
	// if (source == null) {
	// String pkgName = null;
	// if (packageName == null || packageName.length() == 0) {
	// pkgName = "package";
	// } else {
	// pkgName = packageName + ".package";
	// }
	// source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName +
	// "\");\r\n"
	// + "path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
	// source += buffer.toString();
	// }
	// try {
	// FileOutputStream fos = new FileOutputStream(f);
	// System.err.println(f.getAbsolutePath());
	// System.err.println(source);
	// fos.write(source.getBytes());
	// fos.close();
	// } catch (IOException e) {
	// e.printStackTrace();
	// }
	// }
	// }

	// @Deprecated
	// public static String[] getClazzAbbrMap() {
	// String[] clazzAll = new String[] {
	// "Clazz.load", "L", //
	// "Clazz.declareAnonymous", "W", //
	// "Clazz.declareType", "T", //
	// "Clazz.declarePackage", "J", //
	// "Clazz.decorateAsClass", "C", //
	// "Clazz.instantialize", "Z", //
	// "Clazz.declareInterface", "I", //
	// "Clazz.isClassDefined", "D", //
	// "Clazz.pu$h", "H", //
	// "Clazz.p0p", "P", //
	// "Clazz.prepareCallback", "B", //
	// "Clazz.innerTypeInstance", "N", //
	// "Clazz.makeConstructor", "K", //
	// "Clazz.overrideConstructor", "k", //
	// "Clazz.superCall", "U", //
	// "Clazz.superConstructor", "R", //
	// "Clazz.defineMethod", "M", //
	// "Clazz.overrideMethod", "V", //
	// "Clazz.defineStatics", "S", //
	// "Clazz.defineEnumConstant", "E", //
	// "Clazz.cloneFinals", "F", //
	// "Clazz.prepareFields", "Y", //
	// "Clazz.newArray", "A", //
	// "Clazz.newIntArray", "AI", //
	// "Clazz.newFloatArray", "AF", //
	// "Clazz.newDoubleArray", "AD", //
	// "Clazz.newByteArray", "AB", //
	// "Clazz.newLongArray", "AL", //
	// "Clazz.newShortArray", "AS", //
	// "Clazz.newCharArray", "AC", //
	// "Clazz.newBooleanArray", "Ab", //
	// //"Clazz.newStringArray", "AX", //
	// "Clazz.instanceOf", "O", //
	// "Clazz.exceptionOf", "e", //sgurin
	// "Clazz.inheritArgs", "G", //
	// "Clazz.checkPrivateMethod", "X", //
	// "Clazz.makeFunction", "Q", //
	//
	// "Clazz.registerSerializableFields", "s", //
	// };
	// return clazzAll;
	// }

	private String getFileContents(File file) {
		try {
			StringBuilder sb = new StringBuilder();
			FileInputStream is = new FileInputStream(file);
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			String line = null;
			while ((line = reader.readLine()) != null) {
				sb.append(line).append("\n");
			}
			reader.close();
			return sb.toString();
		} catch (@SuppressWarnings("unused") IOException e) {
			//
		}
		return null;
	}

	private static void writeToFile(File file, String data) {
		if (data == null)
			return;
		try {
			FileOutputStream os = new FileOutputStream(file);
			os.write(data.getBytes("UTF-8"));			
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * The default template file. The user can specify another in the .j2s file using template.html=.....
	 * 
	 * @return default template with _NAME_, _CODE_, and _MAIN_ to fill in.
	 */
	private String getDefaultHTMLTemplate() {
		String ret = "<!DOCTYPE html>\n<html><title>SwingJS test _NAME_</title>\n"
		+"<head><meta charset=\"utf-8\" />\n"
		+"<script src=\"swingjs/swingjs2.js\"></script>\n"
		+"<script>\n"
		+"if (!self.SwingJS)alert('swingjs2.js was not found. It needs to be in swingjs folder in the same directory as ' + document.location.href)\n"
		+"Info = {\n"
		+"  code: _CODE_,\n"
		+"  main: _MAIN_,\n"
		+"	width: 850,\n"
		+"	height: 550,\n"
		+"	serverURL: 'http://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php',\n"
		+"	j2sPath: 'swingjs/j2s',\n"
		+"	console:'sysoutdiv',\n"
		+"	allowjavascript: true\n"
		+"}\n"
		+"</script>\n</head>\n<body>\n<script>\n"
		+"SwingJS.getApplet('testApplet', Info)\n"
		+"</script>\n"
		+"<div style=\"position:absolute;left:900px;top:30px;width:600px;height:300px;\">\n"
		+"<div id=sysoutdiv style=\"border:1px solid green;width:100%;height:95%;overflow:auto\"></div>\n"
		+"This is System.out. <a href=\"javascript:testApplet._clearConsole()\">clear it</a> \n"
		+"</div>\n"
		+"</body>\n"
		+"</html>\n";
		return ret;
	}
	
	/**
	 * Create a test HTML file for the applet or application. It will go into <project>/site. 
	 * 
	 * @param appList
	 * @param siteFolder
	 * @param template
	 * @param isApplet
	 */
	private static void addHTML(ArrayList<String> appList, String siteFolder, String template, boolean isApplet) {
		if (appList == null || template == null)
			return;
		for (int i = appList.size(); --i >= 0;) {
			String cl = appList.get(i);
			String _NAME_ = cl.substring(cl.lastIndexOf(".") + 1);
			String fname = cl.replaceAll("\\.", "_") + (isApplet ? "_applet" : "") +".html";
			cl = "\"" + cl + "\"";
			String _MAIN_ = (isApplet ? "null" : cl);
			String _CODE_ = (isApplet ? cl : "null");
			template = template.replace("_NAME_", _NAME_).replace("_CODE_", _CODE_).replace("_MAIN_", _MAIN_);
			System.err.println("Java2Script creating " + siteFolder + "/" + fname);
			writeToFile(new File(siteFolder, fname), template);
		}
	}


}
