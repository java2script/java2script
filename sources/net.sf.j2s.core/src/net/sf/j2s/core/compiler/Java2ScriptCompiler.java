package net.sf.j2s.core.compiler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.j2s.core.Java2ScriptProjectNature;
import net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor;
import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.astvisitors.ASTVariableVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.astvisitors.NameConvertItem;
import net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTScriptVisitor;
import net.sf.j2s.core.builder.SourceFile;
import net.sf.j2s.core.builder.SourceFileProxy;
import net.sf.j2s.core.hotspot.InnerHotspotServer;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;
import org.eclipse.jdt.internal.core.JavaProject;

public class Java2ScriptCompiler implements IExtendedCompiler {

	public void process(ICompilationUnit sourceUnit, IContainer binaryFolder) {
		final IProject project = binaryFolder.getProject();
		/*
		synchronized (project) {
			if (Java2ScriptProjectNature.hasJavaBuilder(project)) {
				if (Java2ScriptProjectNature.removeJavaBuilder(project)) {
					new Thread(new Runnable() {
						public void run() {
							try {
								Thread.sleep(50);
							} catch (InterruptedException e1) {
								e1.printStackTrace();
							}
							try {
								project.build(IncrementalProjectBuilder.CLEAN_BUILD, null);
							} catch (CoreException e) {
								e.printStackTrace();
							}
						}
					}).start();
					return;
				}
			}
		}
		// */
		String prjFolder = project.getLocation().toOSString();
		File file = new File(prjFolder, ".j2s"); //$NON-NLS-1$
		if (!file.exists()) {
			/*
			 * The file .j2s is a marker for Java2Script to compile JavaScript
			 */
			return ;
		}
		System.out.println("J2S loading file " + file);
		Properties props = new Properties();
		try {
			props.load(new FileInputStream(file));
			String status = props.getProperty("j2s.compiler.status");
			if (!"enable".equals(status)) {
				/*
				 * Not enabled!
				 */
				return ;
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		String binFolder = binaryFolder.getLocation().toOSString();
		
		List list = null;
		String resPaths = props.getProperty("j2s.resources.list");
		if (resPaths == null || resPaths.trim().length() == 0) {
			list = new ArrayList();
		} else {
			String[] splits = resPaths.split(",");
			//list = Arrays.asList(splits);
			list = new ArrayList();
			for (int i = 0; i < splits.length; i++) {
				list.add(splits[i]);
			}
		}
		List abandonedList = null;
		String abandonedPaths = props.getProperty("j2s.abandoned.resources.list");
		if (abandonedPaths == null || abandonedPaths.trim().length() == 0) {
			abandonedList = new ArrayList();
		} else {
			String[] splits = abandonedPaths.split(",");
			//list = Arrays.asList(splits);
			abandonedList = new ArrayList();
			for (int i = 0; i < splits.length; i++) {
				abandonedList.add(splits[i]);
			}
		}
			if (sourceUnit instanceof SourceFile) {
				SourceFile unitSource = (SourceFile) sourceUnit;
				String fileName = new String(unitSource.getFileName());
				
				System.out.println("J2S processing file " + fileName);

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
				//System.out.println(jsPath);
			}
		StringBuffer buf = new StringBuffer();
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			String path = (String) iter.next();
			buf.append(path);
			if (iter.hasNext()) {
				buf.append(",");
			}
		}
		props.setProperty("j2s.resources.list", buf.toString());
		props.setProperty("j2s.output.path", binaryFolder.getProjectRelativePath().toPortableString());
		try {
			props.store(new FileOutputStream(file), "Java2Script Configuration");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		CompilationUnit root;
		ASTParser astParser= ASTParser.newParser(AST.JLS3);
			if (sourceUnit instanceof SourceFile) {
				//System.out.println(sourceUnits[i]);
				SourceFile unitSource = (SourceFile) sourceUnit;
				org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(new SourceFileProxy(unitSource).getResource());
				astParser.setResolveBindings(true);
				astParser.setSource(createdUnit);
				root = (CompilationUnit) astParser.createAST(null);
				
				DependencyASTVisitor dvisitor = null;
				String visitorID = props.getProperty("j2s.compiler.visitor");
				IExtendedVisitor extVisitor = null;
				if ("ASTScriptVisitor".equals(visitorID)) {
					dvisitor = new DependencyASTVisitor();
				} else if ("SWTScriptVisitor".equals(visitorID)) {
					dvisitor = new SWTDependencyASTVisitor();
				} else {
					if (visitorID != null && visitorID.length() != 0) {
						extVisitor = ExtendedVisitors.getExistedVisitor(visitorID);
						if (extVisitor != null) {
							dvisitor = extVisitor.getDependencyVisitor();
						}
					}
					if (dvisitor == null) {
						dvisitor = new SWTDependencyASTVisitor();
					}
				}
				boolean errorOccurs = false;
				try {
					root.accept(dvisitor);
				} catch (Throwable e) {
					e.printStackTrace();
					errorOccurs = true;
				}
				if (!errorOccurs) {
					//J2SDependencyCompiler.outputJavaScript(dvisitor, root, binFolder);
				} else {
					String folderPath = binFolder;
					String elementName = root.getJavaElement().getElementName();
					//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
						elementName = elementName.substring(0, elementName.lastIndexOf('.'));
					//} /* maybe ended with other customized extension
					String packageName = dvisitor.getPackageName();
					if (packageName != null) {
						File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
						folderPath = folder.getAbsolutePath();
						File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
						if (jsFile.exists()) {
							jsFile.delete();
						}
					}
					return ;
				}

				ASTScriptVisitor visitor = null;
				if ("ASTScriptVisitor".equals(visitorID)) {
					visitor = new ASTScriptVisitor();
				} else if ("SWTScriptVisitor".equals(visitorID)) {
					visitor = new SWTScriptVisitor();
				} else {
					if (extVisitor != null) {
						visitor = extVisitor.getScriptVisitor();
					}
					if (visitor == null) {
						visitor = new SWTScriptVisitor();
					}
				}
				boolean objectStaticFields = "enable".equals(props.getProperty("j2s.compiler.static.quirks"));
				visitor.setSupportsObjectStaticFields(objectStaticFields);
				boolean isDebugging = "debug".equals(props.getProperty("j2s.compiler.mode"));
				visitor.setDebugging(isDebugging);
				dvisitor.setDebugging(isDebugging);
				boolean toCompress = "release".equals(props.getProperty("j2s.compiler.mode"));
				//visitor.setToCompileVariableName(toCompress);
				((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(toCompress);
				dvisitor.setToCompileVariableName(toCompress);
				if (toCompress) {
					updateJ2SMap(prjFolder);
				}
				//boolean errorOccurs = false;
				errorOccurs = false;
				try {
					root.accept(visitor);
				} catch (Throwable e) {
					e.printStackTrace();
					errorOccurs = true;
				}
				if (!errorOccurs) {
					Java2ScriptCompiler.outputJavaScript(visitor, dvisitor, root, binFolder, props);
				} else {
					String folderPath = binFolder;
					String elementName = root.getJavaElement().getElementName();
					//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
						elementName = elementName.substring(0, elementName.lastIndexOf('.'));
					//} /* maybe ended with other customized extension
					String packageName = visitor.getPackageName();
					if (packageName != null) {
						File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
						folderPath = folder.getAbsolutePath();
						File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
						if (jsFile.exists()) {
							jsFile.delete();
						}
					}
				}
			}
	}

	public static void updateJ2SMap(String prjFolder) {
		File j2sMap = new File(prjFolder, ".j2smap");
		if (j2sMap.exists()) {
			String mapStr = FileUtil.readSource(j2sMap);
			if (mapStr != null) {
				String lastClassName = null;
				Map varList = new HashMap();
				String[] lines = mapStr.split("\r\n|\r|\n");
				for (int j = 0; j < lines.length; j++) {
					String line = lines[j].trim();
					if (line.length() > 0) {
						if (!line.startsWith("#")) {
							int index = line.indexOf("=");
							if (index != -1) {
								String key = line.substring(0, index).trim();
								String toVarName = line.substring(index + 1).trim();
								boolean isMethod = true;
								int idx = key.lastIndexOf('#');
								if (idx == -1) {
									isMethod = false;
									idx = key.lastIndexOf('.');
									if (idx == -1) {
										continue;
									}
								}
								String className = key.substring(0, idx);
								if (className.startsWith("$")) {
									if (lastClassName != null) {
										className = className.replaceAll("\\$", lastClassName);
//													System.out.println(className + "..." + lastClassName);
									} else {
										className = className.replaceAll("\\$", "");
										lastClassName = className;
									}
								} else {
									lastClassName = className;
								}
								String varName = key.substring(idx + 1);
//								System.out.println(className + "." + varName + "->" + toVarName);
								if (isMethod) {
									key = className + "#" + varName;
								} else {
									key = className + "." + varName;
								}
								varList.put(key, new NameConvertItem(className, varName, toVarName, isMethod));
							}
						}
					}
				}
				ASTJ2SMapVisitor.setJ2SMap(varList);
				return ;
			}
		}
		ASTJ2SMapVisitor.setJ2SMap(null);
	}

	public static void outputJavaScript(ASTScriptVisitor visitor, DependencyASTVisitor dvisitor, CompilationUnit fRoot, String folderPath, Properties props) {
		String js = dvisitor.getDependencyScript(visitor.getBuffer());
		String lineBreak = props.getProperty("j2s.compiler.linebreak");
		String whiteSpace = props.getProperty("j2s.compiler.whitespace");
		String utf8Header = props.getProperty("j2s.compiler.utf8bom");
		boolean addUTF8Header = false;
		if (utf8Header != null && utf8Header.equals("true")) {
			addUTF8Header = true;
		}
		if (lineBreak != null && whiteSpace != null
				&& lineBreak.length() == 0 && whiteSpace.equals("false")) {
			js = RegExCompress.regexCompress(js);
		} else {
			if (lineBreak != null) {
				if (!lineBreak.equals("\r\n")) {
					if ("\r".equals(lineBreak)) {
						js = js.replaceAll("\\r\\n", "\r");
					} else if ("\n".equals(lineBreak)) {
						js = js.replaceAll("\\r\\n", "\n");
					} else if (lineBreak.length() == 0) {
						js = js.replaceAll("\\r\\n", "");
					}
				}
			}
			if (whiteSpace != null) {
				if (whiteSpace.equals("false")) {
					js = RegExCompress.regexCompress2(js);
				}
			}
		}
		/**
		 * FIXME: The following variable name replacement should be done in *Visitor
		 */
		js = js.replaceAll("cla\\$\\$", "c\\$")
				.replaceAll("innerThis", "i\\$")
				.replaceAll("finalVars", "v\\$")
				.replaceAll("\\.callbacks", "\\.b\\$")
				.replaceAll("\\.\\$finals", "\\.f\\$");
		String abbr = props.getProperty("j2s.compiler.abbreviation");
		if (abbr != null) {
			if (abbr.equals("true")) {
				String abbrPrefix = props.getProperty("j2s.compiler.abbreviation.prefix");
				if (abbrPrefix == null) {
					abbrPrefix = "$_";
				}
				abbrPrefix = abbrPrefix.replaceAll("\\$", "\\\\\\$");
				String[] clazzAll = getClazzAbbrMap();
				StringBuffer buf = new StringBuffer();
				for (int i = 0; i < clazzAll.length / 2; i++) {
					String method = clazzAll[i + i].substring(6);
					if ("pu$h".equals(method)) {
						method = "pu\\$h";
					}
					buf.append("(Clazz\\." + method + ")");
					if (i < clazzAll.length / 2 - 1) {
						buf.append("|");
					}
				}
				Matcher matcher = Pattern.compile(buf.toString()).matcher(js);
				matcher.reset();
		        boolean result = matcher.find();
		        if (result) {
		            StringBuffer sb = new StringBuffer();
		            do {
		            	int groupCount = matcher.groupCount();
						for (int i = 0; i < groupCount; i++) {
							String group = matcher.group(i);
							if (group != null && group.length() != 0) {
								for (int j = 0; j < clazzAll.length / 2; j++) {
									if (group.equals(clazzAll[j + j])) {
					            		matcher.appendReplacement(sb, abbrPrefix + clazzAll[j + j + 1]);
					            		break;
									}
								}
//								System.out.println(group);
//								System.out.println(i);
//								System.out.println(abbrPrefix + clazzAll[i + i + 1]);
			            		break;
							}
						}
		                result = matcher.find();
		            } while (result);
		            matcher.appendTail(sb);
		            js = sb.toString();
		        }
			}
		}

		String elementName = fRoot.getJavaElement().getElementName();
		//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
			elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		//} /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
			folderPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					throw new RuntimeException("Failed to create folder " + folderPath); //$NON-NLS-1$
				}
			}
			InnerHotspotServer.addCompiledItem(packageName + "." + elementName);
		} else {
			InnerHotspotServer.addCompiledItem(elementName);
		}
		File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
		try {
			FileOutputStream fos = new FileOutputStream(jsFile);
			System.out.println("J2S creating " + jsFile);
			if (addUTF8Header) {
				fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
			}
			fos.write(js.getBytes("UTF-8"));
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		String[] classNameSet = dvisitor.getClassNames();
		if (classNameSet.length > 1) {
			StringBuffer buffer = new StringBuffer();
			String key = "ClazzLoader.jarClasspath (path + \"" + /*packageName.replace('.', '/') + "/" + */elementName + ".js\", [";
			buffer.append(key + "\r\n");
			/*
			for (int i = 0; i < classNameSet.length; i++) {
				buffer.append("\"");
				buffer.append(classNameSet[i]);
				buffer.append("\"");
				if (i != classNameSet.length - 1) {
					buffer.append(",\r\n");
				} else {
					buffer.append(",\r\n");
				}
			}
			*/
			DependencyASTVisitor.joinArrayClasses(buffer, classNameSet, null, ",\r\n");
			
			buffer.append("]);\r\n");
			String s = props.getProperty("package.js");
			if (s == null || s.length() == 0) {
				s = "package.js";
			}
			File f = new File(folderPath, s);
			String source = null;
			if (f.exists()) {
				source = FileUtil.readSource(f);
				int index = source.indexOf(key);
				boolean updated = false;
				if (index != -1) {
					int index2 = source.indexOf("]);", index + key.length());
					if (index2 != -1) {
						source = source.substring(0, index) + buffer.toString() + source.substring(index2 + 5);
						updated = true;
					}
				}
				if (!updated) {
					source += buffer.toString();
				}
			}
			if (source == null) {
				String pkgName = null;
				if (packageName == null || packageName.length() == 0) {
					pkgName = "package";
				} else {
					pkgName = packageName + ".package";
				}
				source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName + "\");\r\n" +
					"path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
				source += buffer.toString();
			}
			try {
				FileOutputStream fos = new FileOutputStream(f);
				fos.write(source.getBytes());
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

//		if (visitor instanceof SWTScriptVisitor) {
//			SWTScriptVisitor swtVisitor = (SWTScriptVisitor) visitor;
//			String removedJS = swtVisitor.getBufferRemoved().toString();
//			if (removedJS.trim().length() > 0) {
//				jsFile = new File(folderPath, elementName + ".remmoved.js"); //$NON-NLS-1$
//				fileWriter = null;
//				try {
//					fileWriter = new FileWriter(jsFile);
//					fileWriter.write(removedJS);
//				} catch (IOException e) {
//					e.printStackTrace();
//				} finally {
//					if (fileWriter != null) {
//						try {
//							fileWriter.close();
//						} catch (IOException e) {
//							e.printStackTrace();
//						}
//					}
//				}
//			}
//		}
	}

	public static String[] getClazzAbbrMap() {
		String[] clazzAll = new String[] {
				"Clazz.load", "L", //
				"Clazz.declareAnonymous", "W", //
				"Clazz.declareType", "T", //
				"Clazz.declarePackage", "J", //
				"Clazz.decorateAsClass", "C", //
				"Clazz.instantialize", "Z", //
				"Clazz.declareInterface", "I", //
				"Clazz.isClassDefined", "D", //
				"Clazz.pu$h", "H", //
				"Clazz.p0p", "P", //
				"Clazz.prepareCallback", "B", //
				"Clazz.innerTypeInstance", "N", //
				"Clazz.makeConstructor", "K", //
				"Clazz.overrideConstructor", "k", //
				"Clazz.superCall", "U", //
				"Clazz.superConstructor", "R", //
				"Clazz.defineMethod", "M", //
				"Clazz.overrideMethod", "V", //
				"Clazz.defineStatics", "S", //
				"Clazz.defineEnumConstant", "E", //
				"Clazz.cloneFinals", "F", //
				"Clazz.prepareFields", "Y", //
				"Clazz.newArray", "A", //
				"Clazz.newIntArray", "AI", //
				"Clazz.newFloatArray", "AF", //
				"Clazz.newDoubleArray", "AD", //
				"Clazz.newByteArray", "AB", //
				"Clazz.newLongArray", "AL", //
				"Clazz.newShortArray", "AS", //
				"Clazz.newCharArray", "AC", //
				"Clazz.newBooleanArray", "Ab", //
				//"Clazz.newStringArray", "AX", //
				"Clazz.floatToInt", "fI", //
				"Clazz.floatToByte", "fB", //
				"Clazz.floatToShort", "fS", //
				"Clazz.floatToLong", "fL", //
				"Clazz.floatToChar", "fC", //
				"Clazz.doubleToInt", "dI", //
				"Clazz.doubleToByte", "dB", //
				"Clazz.doubleToShort", "dS", //
				"Clazz.doubleToLong", "dL", //
				"Clazz.doubleToChar", "dC", //
				"Clazz.instanceOf", "O", //
				"Clazz.exceptionOf", "e", //sgurin
				"Clazz.inheritArgs", "G", //
				"Clazz.checkPrivateMethod", "X", //
				"Clazz.makeFunction", "Q", //
				
				"Clazz.registerSerializableFields", "s", //
		};
		return clazzAll;
	}

}
