package net.sf.j2s.core.compiler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

import net.sf.j2s.core.astvisitors.ASTKeywordVisitor;
import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.astvisitors.ASTVariableVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTScriptVisitor;
import net.sf.j2s.core.builder.SourceFile;
import net.sf.j2s.core.builder.SourceFileProxy;
import net.sf.j2s.core.hotspot.InnerHotspotServer;

@SuppressWarnings("restriction")
public class Java2ScriptCompiler implements IExtendedCompiler {

	// BH: added "true".equals(getProperty(props, "j2s.compiler.allow.compression")) to ensure compression only occurs when desired
    static final int JSL_LEVEL = AST.JLS8; // BH can we go to JSL 8? 
	private static boolean showJ2SSettings = true; // BH adding this

	public void process(ICompilationUnit sourceUnit, IContainer binaryFolder) {
		final IProject project = binaryFolder.getProject();
		/*
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
			 * The file .j2s is a marker for Java2Script to compile JavaScript
			 */
			return;
		}
		Properties props = new Properties();
		try {
			props.load(new FileInputStream(file));
			String status = getProperty(props, "j2s.compiler.status");
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

		String binFolder = binaryFolder.getLocation().toOSString();
		boolean errorOccurred = false;
		if ("true".equals(getProperty(props, "j2s.save.resource.lists"))) {

			String resPaths = getProperty(props, "j2s.resources.list");
			String abandonedPaths = getProperty(props, "j2s.abandoned.resources.list");

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
			try {
				props.store(new FileOutputStream(file), "Java2Script Configuration");
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		CompilationUnit root;
		ASTParser astParser = ASTParser.newParser(JSL_LEVEL);
		if (sourceUnit instanceof SourceFile) {
			// System.out.println(sourceUnits[i]);
			SourceFile unitSource = (SourceFile) sourceUnit;
			org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore
					.createCompilationUnitFrom(new SourceFileProxy(unitSource).getResource());
			astParser.setResolveBindings(true);
			astParser.setSource(createdUnit);
			root = (CompilationUnit) astParser.createAST(null);

			DependencyASTVisitor dvisitor = null;
			String visitorID = getProperty(props, "j2s.compiler.visitor");
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
// BH - we are done with SWT					dvisitor = new SWTDependencyASTVisitor();
					dvisitor = new DependencyASTVisitor();
				}
			}
			try {
				root.accept(dvisitor);
			} catch (Throwable e) {
				e.printStackTrace();
				errorOccurred = true;
			}
			if (errorOccurred) {
				String folderPath = binFolder;
				String elementName = root.getJavaElement().getElementName();
				// if (elementName.endsWith(".class") ||
				// elementName.endsWith(".java")) {
				// //$NON-NLS-1$//$NON-NLS-2$
				elementName = elementName.substring(0, elementName.lastIndexOf('.'));
				// } /* maybe ended with other customized extension
				String packageName = dvisitor.getPackageName();
				if (packageName != null) {
					File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
					folderPath = folder.getAbsolutePath();
					File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
					if (jsFile.exists()) {
						jsFile.delete();
					}
				}
				return;
			}
			// J2SDependencyCompiler.outputJavaScript(dvisitor, root, binFolder);

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
					visitor = new ASTScriptVisitor();
					// BH default to ASTScriptVisitor, not SWTScriptVisitor 
					// visitor = new SWTScriptVisitor();
				}
			}
			visitor.setPackageNames(dvisitor.getDefinedBasePackages());
			// *.js*;swingjs; etc.
			ASTKeywordVisitor.setNoQualifiedNamePackages(getProperty(props, "j2s.compiler.nonqualified.classes"));
			boolean ignoreMethodOverloading = !("enable".equals(getProperty(props, "j2s.compiler.method.overloading")));
			visitor.setSupportsMethodOverloading(!ignoreMethodOverloading);
			boolean supportsInterfaceCasting = "enable".equals(getProperty(props, "j2s.compiler.interface.casting"));
			visitor.setSupportsInterfaceCasting(supportsInterfaceCasting);
			//boolean objectStaticFields = "enable".equals(getProperty(props, "j2s.compiler.static.quirks"));
			//visitor.setSupportsObjectStaticFields(objectStaticFields);
			boolean isDebugging = "debug".equals(getProperty(props, "j2s.compiler.mode"));
			visitor.setDebugging(isDebugging);
			dvisitor.setDebugging(isDebugging);
			boolean toCompress = false; //"enable".equals(getProperty(props, "j2s.compiler.allow.compression"))); // BH
			((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(toCompress);
			dvisitor.setToCompileVariableName(toCompress);
//			if (toCompress) {
//				updateJ2SMap(prjFolder);
//			}
			errorOccurred = false;
			try {
				root.accept(visitor);
			} catch (Throwable e) {
				e.printStackTrace();
				errorOccurred = true;
			}
			if (errorOccurred) {
				String folderPath = binFolder;
				String elementName = root.getJavaElement().getElementName();
				elementName = elementName.substring(0, elementName.lastIndexOf('.'));
				String packageName = visitor.getPackageName();
				if (packageName != null) {
					File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
					folderPath = folder.getAbsolutePath();
					File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
					if (jsFile.exists()) {
						jsFile.delete();
					}
				}
			} else {
				Java2ScriptCompiler.outputJavaScript(visitor, dvisitor, root, binFolder, props);
			}
		}
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

	private static String getProperty(Properties props, String key) {
		String val = props.getProperty(key);
		if (showJ2SSettings)
			System.err.println(key + " = " + val);
		return val;
	}

	public static void outputJavaScript(ASTScriptVisitor visitor, DependencyASTVisitor dvisitor, CompilationUnit fRoot,
			String folderPath, Properties props) {
		String js = dvisitor.getDependencyScript(visitor.getBuffer());
		// js = js + "\n//SwingJS test " + System.currentTimeMillis() + "\n";
		String lineBreak = getProperty(props, "j2s.compiler.linebreak");
		String whiteSpace = getProperty(props, "j2s.compiler.whitespace");
		String utf8Header = getProperty(props, "j2s.compiler.utf8bom");
		boolean addUTF8Header = false;
		if (utf8Header != null && utf8Header.equals("true")) {
			addUTF8Header = true;
		}
		if (lineBreak != null && whiteSpace != null && lineBreak.length() == 0 && whiteSpace.equals("false")) {
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
		js = js + "\n//Created " + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "\n";

		String abbr = getProperty(props, "j2s.compiler.abbreviation");
		if (abbr != null) {
			if (abbr.equals("true")) {
				String abbrPrefix = getProperty(props, "j2s.compiler.abbreviation.prefix");
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
		// if (elementName.endsWith(".class") || elementName.endsWith(".java"))
		// { //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
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
			if (addUTF8Header) {
				fos.write(new byte[] { (byte) 0xef, (byte) 0xbb, (byte) 0xbf }); // UTF-8
																					// header!
			}
			fos.write(js.getBytes("UTF-8"));
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String[] classNameSet = dvisitor.getClassNames();
		if (classNameSet.length > 1) {
			StringBuffer buffer = new StringBuffer();
			String key = "ClazzLoader.jarClasspath (path + \""
					+ /* packageName.replace('.', '/') + "/" + */elementName + ".js\", [";
			buffer.append(key + "\r\n");
			/*
			 * for (int i = 0; i < classNameSet.length; i++) {
			 * buffer.append("\""); buffer.append(classNameSet[i]);
			 * buffer.append("\""); if (i != classNameSet.length - 1) {
			 * buffer.append(",\r\n"); } else { buffer.append(",\r\n"); } }
			 */
			DependencyASTVisitor.joinArrayClasses(buffer, classNameSet, null, ",\r\n");

			buffer.append("]);\r\n");
			String s = getProperty(props, "package.js");
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
				source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName + "\");\r\n"
						+ "path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
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

		showJ2SSettings = false;
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
