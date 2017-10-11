/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.IAnnotationBinding;
import org.eclipse.jdt.core.dom.IMemberValuePairBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;

import net.sf.j2s.core.adapters.Bindings;
import net.sf.j2s.core.adapters.ExtendedAdapter;

/**
 * 
 * @author zhou renjian
 * 
 *         2006-5-2
 */
@SuppressWarnings("rawtypes")
public class DependencyASTVisitor extends ASTEmptyVisitor {

	public static String joinArrayClasses(StringBuffer buf, String[] ss, String last) {
		return joinArrayClasses(buf, ss, last, ", ");
	}

	public static String joinArrayClasses(StringBuffer buf, String[] ss, String last, String seperator) {
		String lastClassName = last;
		for (int i = 0; i < ss.length; i++) {
			buf.append("\"");
			boolean dollared = true;
			if (lastClassName == null) {
				dollared = false;
			} else {
				int idx1 = lastClassName.lastIndexOf('.');
				int idx2 = ss[i].lastIndexOf('.');
				if (idx1 == -1 || idx2 == -1 || idx1 != idx2) {
					dollared = false;
				} else {
					if (lastClassName.subSequence(0, idx1).equals(ss[i].subSequence(0, idx2))) {
						buf.append("$");
						buf.append(ss[i].substring(idx2));
					} else {
						dollared = false;
					}
				}
			}
			if (!dollared) {
				String key = "org.eclipse.swt.";
				if (ss[i].startsWith(key)) {
					buf.append("$wt.");
					buf.append(ss[i].substring(key.length()));
				} else {
					buf.append(ss[i]);
				}
			}
			lastClassName = ss[i];
			buf.append("\"");
			if (i != ss.length - 1) {
				buf.append(seperator);
			}
		}
		return lastClassName;
	}

	public static void main(String[] args) {
		Set<String> set = new HashSet<String>();
		set.add("java.lang.UnsupportedOperationException");
		set.add("java.lang.CloneNotSupportedException");
		set.add("java.io.ObjectOutputStream");
		set.add("java.lang.ClassNotFoundException");
		set.add("java.io.ObjectInputStream");
		set.add("java.lang.IllegalStateException");
		set.add("java.lang.IllegalArgumentException");
		set.add("java.lang.CloneNotSupportedException");
		set.add("java.io.IOException");
		set.add("java.io.PrintWriter");
		set.add("java.util.NoSuchElementException");
		set.add("java.lang.Float");
		set.add("java.util.ConcurrentModificationException");
		set.add("java.lang.ClassCastException");
		set.add("java.lang.NullPointerException");
		set.add("java.lang.StringIndexOutOfBoundsException");
		String[] s = new String[] { "java.lang.Character", "java.lang.InternalError", "java.util.Collections",
				"java.io.FileInputStream", "java.lang.InterruptedException", "java.lang.IndexOutOfBoundsException",
				"java.lang.ArrayIndexOutOfBoundsException" };
		for (int i = 0; i < s.length; i++) {
			set.add(s[i]);
		}
		s = new String[] { "java.io.ObjectOutputStream", "java.text.SimpleDateFormat", "java.util.TimeZone",
				"java.lang.ClassNotFoundException", "java.io.ObjectInputStream", "java.lang.CloneNotSupportedException",
				"java.lang.IllegalArgumentException", "java.util.Locale", "java.io.IOException", "java.text.DateFormat",
				"java.util.GregorianCalendar", "java.util.Calendar", "java.lang.ref.SoftReference" };
		for (int i = 0; i < s.length; i++) {
			set.add(s[i]);
		}
		String[] ss = set.toArray(new String[0]);
		StringBuffer buf = new StringBuffer();
		Arrays.sort(ss);
		joinArrayClasses(buf, ss, null);
		System.out.println(buf.toString().replaceAll(", ", ",\r\n\t"));
	}

	protected Set<String> classNameSet = new HashSet<String>();

	protected Set<ITypeBinding> classBindingSet = new HashSet<ITypeBinding>();

	protected Set<Object> musts = new HashSet<Object>();

//	protected Set<Object> requires = new HashSet<Object>();
//
//	protected Set<Object> optionals = new HashSet<Object>();

	protected Set<Object> ignores = new HashSet<Object>();

	private boolean isDebugging = false;

//	private Javadoc[] nativeJavadoc = null;
//	private ASTNode javadocRoot = null;

	public boolean toCompileVariableName = false;

	private String[] classNames;

	private HashSet<String> definedBasePackageNames;

	private String[] defaultPackageNamesDefined = {"java", "javax", "sun", "jsjava", "jsjavax", "jssun"};

//	private void addDeclClassReference(ASTNode node, ITypeBinding binding) {
//		ITypeBinding declaringClass = binding.getDeclaringClass();
//		QNTypeBinding qn = new QNTypeBinding();		
//		String qualifiedName;
//		if (declaringClass != null) {
//			ITypeBinding dclClass = null;
//			while ((dclClass = declaringClass.getDeclaringClass()) != null) {
//				declaringClass = dclClass;
//			}
//			qualifiedName = declaringClass.getQualifiedName();
//			qn.binding = declaringClass;
//		} else {
//			qualifiedName = binding.getQualifiedName();
//			qn.binding = binding;
//		}
//		addReference(node, qualifiedName, qn);
//	}

	private void addPackage(String name) {
		int pt = name. indexOf(".");
		if (pt >= 0)
			name = name.substring(0, pt);
		if (definedBasePackageNames == null) {
			definedBasePackageNames = new HashSet<String>();
			for (int i = defaultPackageNamesDefined.length; --i >= 0;)
				definedBasePackageNames.add(defaultPackageNamesDefined[i]);
		}
		definedBasePackageNames.add(name);
	}

//	private void addReference(ASTNode node, String qualifiedName, QNTypeBinding qn) {
//		qualifiedName = TypeAdapter.discardGenericType(qualifiedName);
//		if (isQualifiedNameOK(qualifiedName, node) && !musts.contains(qualifiedName)
//				&& !requires.contains(qualifiedName)) {
//			qn.qualifiedName = qualifiedName;
//			if (isNodeInMustPath(node)) {
//				requires.add(qn);
//			} else {
//				optionals.add(qn);
//			}
//		}
//	}

	/**
	 * @param node
	 */
	public boolean isNodeInMustPath(ASTNode node) {
		return false;
	}

	private void checkJ2SClazzMethods(StringBuffer buf) {
		// If only java.lang.reflect.Array.newInstance was referenced,
		// it will have been changed to Clazz.newArray$, and
		// we can remove the dependency on java.lang.reflect.Array
		if (buf.indexOf("java.lang.reflect.Array.") < 0) { 
		  ignores.add("java.lang.reflect.Array");
		}
	}

//	private void checkJavadocs(ASTNode root) {
//		if (root != javadocRoot) {
//			nativeJavadoc = null;
//			javadocRoot = root;
//		}
//		if (nativeJavadoc == null) {
//			nativeJavadoc = new Javadoc[0];
//			if (root instanceof CompilationUnit) {
//				CompilationUnit unit = (CompilationUnit) root;
//				List commentList = unit.getCommentList();
//				ArrayList<Javadoc> list = new ArrayList<Javadoc>();
//				for (Iterator iter = commentList.iterator(); iter.hasNext();) {
//					Comment comment = (Comment) iter.next();
//					if (comment instanceof Javadoc) {
//						Javadoc javadoc = (Javadoc) comment;
//						List<?> tags = javadoc.tags();
//						if (tags.size() != 0) {
//							for (Iterator itr = tags.iterator(); itr.hasNext();) {
//								TagElement tagEl = (TagElement) itr.next();
//								String tagName = tagEl.getTagName();
//								if ("@j2sIgnore".equals(tagName) || "@j2sDebug".equals(tagName)
//										|| "@j2sNative".equals(tagName) || "@j2sNativeSrc".equals(tagName)
//										|| "@j2sXHTML".equals(tagName) || "@j2sXCSS".equals(tagName)) {
//									list.add((Javadoc)comment);
//								}
//							}
//						}
//					}
//				}
//				nativeJavadoc = list.toArray(nativeJavadoc);
//			}
//		}
//	}

//	// sgurin - fix for bug
//	// http://sourceforge.net/tracker/?func=detail&aid=3037341&group_id=155436&atid=795800
//	// with static imports
//	public void endVisit(ImportDeclaration node) {
//		super.endVisit(node);
//		String qnameStr = node.getName().getFullyQualifiedName();
//		if (qnameStr != null && !qnameStr.equals("") && isQualifiedNameOK(qnameStr, node)) {
//		if (node.isStatic() && node.isOnDemand()) {
//				if (!musts.contains(qnameStr)) {
//					musts.add(qnameStr);
//				}
//			}
//		addPackage(qnameStr);
//		}
//		
//	}
	
	/**
	 * @return Returns the thisClassName.
	 */
	public String[] getClassNames() {
		return (classNames == null ? classNames = classNameSet.toArray(new String[0]) : classNames);
	}
	
	public HashSet<String> getDefinedBasePackages() {
		return definedBasePackageNames;
	}

	
	public String getDependencyScript(StringBuffer buf) {
		checkJ2SClazzMethods(buf);
		removeSubClasses(musts);
//		removeSubClasses(requires);
//		removeSubClasses(optionals);

		boolean checkInnerClasses = true;
		getClassNames();
		// BH: I have no idea why this would be checked -- just no inner
		// classes?
		for (int i = 0; i < classNames.length; i++) {
			if ("net.sf.j2s.ajax.ASWTClass".equals(classNames[i])) {
				checkInnerClasses = false;
				break;
			}
		}
		if (checkInnerClasses) {
			removeInnerClasses(musts);
//			removeInnerClasses(requires);
//			removeInnerClasses(optionals);
		}

		musts.remove("");
//		requires.remove("");
//		optionals.remove("");

		for (Iterator iter = ignores.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			musts.remove(s);
//			requires.remove(s);
//			optionals.remove(s);
		}
//		for (Iterator iter = musts.iterator(); iter.hasNext();) {
//			String s = (String) iter.next();
//			requires.remove(s);
//			optionals.remove(s);
//		}
//		for (Iterator iter = requires.iterator(); iter.hasNext();) {
//			String s = (String) iter.next();
//			optionals.remove(s);
//		}

		// save the Clazz.declarePackage for later
		String js = buf.toString();
		String prefix = "";
		String suffix = "";
		if (js.indexOf("p$.") < 0)
			js = js.replace(",p$=C$.prototype","");
		if (js.indexOf("I$") == js.lastIndexOf("I$"))
			js = js.replace(",I$=[]","");
		if (js.indexOf("var P$=") == 0) {
			int index = js.indexOf("\r\n");
			prefix = "(function(){" + js.substring(0, index + 2);
			js = js.substring(index + 2);
			suffix = "})();\r\n";
		}
		if (musts.size() == 0) {// && requires.size() == 0 && optionals.size() == 0) {
			if (prefix == "")
				js = "(function() {\r\n" + js + "})();\r\n";
		} else {
			buf = new StringBuffer();
			
//			buf.append("Clazz.load(");

			// add must/requires

			if (musts.size() > 0) {
				buf.append("Clazz.incl$([");
				String[] ss = musts.toArray(new String[0]);
				Arrays.sort(ss);
				joinArrayClasses(buf, ss, null);
				buf.append("]);\r\n");
			}

			
//			if (musts.size() > 0) {// || requires.size() > 0) {
//				buf.append("[");
//				String[] ss = musts.toArray(new String[0]);
//				Arrays.sort(ss);
//				/*String lastClassName = */ joinArrayClasses(buf, ss, null);
////				if (musts.size() != 0 && requires.size() != 0) {
////					buf.append(", ");
////				}
////				ss = requires.toArray(new String[0]);
////				Arrays.sort(ss);
////				joinArrayClasses(buf, ss, lastClassName);
//				buf.append("], ");
//			} else {
//				buf.append("null, ");
//			}
//
//			// add class names
//
//			boolean isArray = (classNameSet.size() > 1);
//			if (isArray) {
//				buf.append("[");
//			}
//			joinArrayClasses(buf, getClassNames(), null);
//			if (isArray) {
//				buf.append("]");
//			}
//			buf.append(", ");
//
////			// add optionals
////
////			if (optionals.size() > 0) {
////				buf.append("[");
////				String[] ss = optionals.toArray(new String[0]);
////				Arrays.sort(ss);
////				joinArrayClasses(buf, ss, null);
////				buf.append("], ");
////			} else {
//				buf.append("null, ");
////			}
////
//			// check for anonymous wrapper if not multiple classes
//
//			if (isArray || !js.endsWith("})()\r\n") || !js.startsWith("\r\n(function")) {
//				buf.append("function(){\r\n");
//				buf.append(js);
//				buf.append("}");
//			} else {
//				// just make outer function not anonymous
//				buf.append("\r\n").append(js.substring(3, js.length() - 5));
//			}
//			buf.append(");\r\n");
			js = buf.toString() + js;
		}
		return prefix + js + suffix;
	}	
	
//	/**
//	 * Method with "j2s*" tag.
//	 * 
//	 * @param node
//	 * @return
//	 */
//	private Object getJ2STag(BodyDeclaration node, String tagName) {
//		List modifiers = node.modifiers();
//		for (Iterator iter = modifiers.iterator(); iter.hasNext();) {
//			Object obj = iter.next();
//			if (obj instanceof Annotation) {
//				Annotation annotation = (Annotation) obj;
//				String qName = annotation.getTypeName().getFullyQualifiedName();
//				int idx = qName.indexOf("J2S");
//				if (idx != -1) {
//					String annName = qName.substring(idx);
//					annName = annName.replaceFirst("J2S", "@j2s");
//					if (annName.startsWith(tagName)) {
//						return annotation;
//					}
//				}
//			}
//		}
//		Javadoc javadoc = node.getJavadoc();
//		if (javadoc != null) {
//			List tags = javadoc.tags();
//			if (tags.size() != 0) {
//				for (Iterator iter = tags.iterator(); iter.hasNext();) {
//					TagElement tagEl = (TagElement) iter.next();
//					if (tagName.equals(tagEl.getTagName())) {
//						return tagEl;
//					}
//				}
//			}
//		}
//		return null;
//	}
//
//	private int getPreviousStartPosition(Block node) {
//		int previousStart = 0;
//		ASTNode blockParent = node.getParent();
//		if (blockParent != null) {
//			if (blockParent instanceof Statement) {
//				Statement sttmt = (Statement) blockParent;
//				previousStart = sttmt.getStartPosition();
//				if (sttmt instanceof Block) {
//					Block parentBlock = (Block) sttmt;
//					for (Iterator iter = parentBlock.statements().iterator(); iter.hasNext();) {
//						Statement element = (Statement) iter.next();
//						if (element == node) {
//							break;
//						}
//						previousStart = element.getStartPosition() + element.getLength();
//					}
//				} else if (sttmt instanceof IfStatement) {
//					IfStatement ifSttmt = (IfStatement) sttmt;
//					if (ifSttmt.getElseStatement() == node) {
//						Statement thenSttmt = ifSttmt.getThenStatement();
//						previousStart = thenSttmt.getStartPosition() + thenSttmt.getLength();
//					}
//				}
//			} else if (blockParent instanceof MethodDeclaration) {
//				MethodDeclaration method = (MethodDeclaration) blockParent;
//				previousStart = method.getStartPosition();
//			} else if (blockParent instanceof Initializer) {
//				Initializer initializer = (Initializer) blockParent;
//				previousStart = initializer.getStartPosition();
//			} else if (blockParent instanceof CatchClause) {
//				CatchClause catchClause = (CatchClause) blockParent;
//				previousStart = catchClause.getStartPosition();
//			}
//		}
//		return previousStart;
//	}

//	private DependencyASTVisitor getSelfVisitor() {
//		try {
//			Object obj = this.getClass().getConstructor(new Class[0]).newInstance(new Object[0]);
//			return (DependencyASTVisitor) obj;
//		} catch (IllegalArgumentException e) {
//			e.printStackTrace();
//		} catch (SecurityException e) {
//			e.printStackTrace();
//		} catch (InstantiationException e) {
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			e.printStackTrace();
//		} catch (InvocationTargetException e) {
//			e.printStackTrace();
//		} catch (NoSuchMethodException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}

	public boolean isDebugging() {
		return isDebugging;
	}

//	/**
//	 * @param node
//	 */
//	public boolean isNodeInMustPath(ASTNode node) {
//		return false;
//	}

	public boolean isQualifiedNameOK(String qualifiedName, ASTNode node) {
		
		if (qualifiedName != null && !isClassKnown(qualifiedName) && qualifiedName.indexOf('[') == -1
				&& !"int".equals(qualifiedName) && !"float".equals(qualifiedName) && !"double".equals(qualifiedName)
				&& !"long".equals(qualifiedName) && !"short".equals(qualifiedName) && !"byte".equals(qualifiedName)
				&& !"char".equals(qualifiedName) && !"boolean".equals(qualifiedName) && !"void".equals(qualifiedName)
				&& !qualifiedName.startsWith("org.w3c.dom.")
				&& !(allowExtensions && ExtendedAdapter.isHTMLClass(qualifiedName, false))) {
			ASTNode root = node.getRoot();
			if (root instanceof CompilationUnit) {
				CompilationUnit type = (CompilationUnit) root;
				boolean existedSelf = false;
				List types = type.types();
				for (Iterator iter = types.iterator(); iter.hasNext();) {
					AbstractTypeDeclaration typeDecl = (AbstractTypeDeclaration) iter.next();
					if (typeDecl.resolveBinding().getQualifiedName().equals(qualifiedName)) {
						existedSelf = true;
						break;
					}
				}
				if (!existedSelf) {
					return true;
				}
			}
		}
		return false;
	}

//	protected boolean isSimpleQualified(QualifiedName node) {
//		Name qualifier = node.getQualifier();
//		if (qualifier instanceof SimpleName) {
//			return true;
//		} else if (qualifier instanceof QualifiedName) {
//			return isSimpleQualified((QualifiedName) qualifier);
//		}
//		return false;
//	}

//	public boolean isToCompileVariableName() {
//		return toCompileVariableName;
//	}

	private void readClasses(Annotation annotation, Set<Object> set) {
		StringBuffer buf = new StringBuffer();
		IAnnotationBinding annotationBinding = annotation.resolveAnnotationBinding();
		if (annotationBinding != null) {
			IMemberValuePairBinding[] valuePairs = annotationBinding.getAllMemberValuePairs();
			if (valuePairs != null && valuePairs.length > 0) {
				for (int i = 0; i < valuePairs.length; i++) {
					Object value = valuePairs[i].getValue();
					if (value instanceof Object[]) {
						Object[] values = (Object[]) value;
						for (int j = 0; j < values.length; j++) {
							Object item = values[j];
							if (item instanceof ITypeBinding) {
								ITypeBinding binding = (ITypeBinding) item;
								buf.append(binding.getQualifiedName());
								buf.append(",");
							}
						}
						continue;
					} else if (value instanceof ITypeBinding) {
						ITypeBinding binding = (ITypeBinding) value;
						value = binding.getQualifiedName();
					}

					buf.append(value);
					buf.append(",");
				}
			}
		}
		String[] split = buf.toString().trim().split("\\s*,\\s*");
		for (int i = 0; i < split.length; i++) {
			String s = split[i].trim();
			if (s.length() > 0) {
				set.add(s);
			}
		}
	}

	private void readClasses(TagElement tagEl, Set<Object> set) {
		List<?> fragments = tagEl.fragments();
		StringBuffer buf = new StringBuffer();
		boolean isFirstLine = true;
		for (Iterator iterator = fragments.iterator(); iterator.hasNext();) {
			TextElement commentEl = (TextElement) iterator.next();
			String text = commentEl.getText().trim();
			if (isFirstLine) {
				if (text.length() == 0) {
					continue;
				}
			}
			buf.append(text);
			buf.append(",");
		}
		String[] split = buf.toString().trim().split("\\s*,\\s*");
		for (int i = 0; i < split.length; i++) {
			String s = split[i].trim();
			if (s.length() > 0) {
				set.add(s);
			}
		}
	}
	
	private void readTags(AbstractTypeDeclaration node) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					String tagName = tagEl.getTagName();
					if ("@j2sRequireImport".equals(tagName)) {
						readClasses(tagEl, musts);// requires);
//					} else if ("@j2sOptionalImport".equals(tagName)) {
//						readClasses(tagEl, optionals);
					} else if ("@j2sIgnoreImport".equals(tagName)) {
						readClasses(tagEl, ignores);
					}
				}
			}
		}
		List modifiers = node.modifiers();
		for (Iterator iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = iter.next();
			if (obj instanceof Annotation) {
				Annotation annotation = (Annotation) obj;
				String qName = annotation.getTypeName().getFullyQualifiedName();
				int idx = qName.indexOf("J2S");
				if (idx != -1) {
					String annName = qName.substring(idx);
					annName = annName.replaceFirst("J2S", "@j2s");
					if (annName.startsWith("@j2sRequireImport")) {
						readClasses(annotation, musts);//requires);
//					} else if (annName.startsWith("@j2sOptionalImport")) {
//						readClasses(annotation, optionals);
					} else if (annName.startsWith("@j2sIgnoreImport")) {
						readClasses(annotation, ignores);
					}
				}
			}
		}
	}

	private void removeInnerClasses(Set<Object> set) {
		List<Object> toRemoveList = new ArrayList<Object>();
		for (Iterator iterator = set.iterator(); iterator.hasNext();) {
			Object next = iterator.next();
			String name;
			if (next instanceof QNTypeBinding) {
				QNTypeBinding qn = (QNTypeBinding) next;
				name = qn.qualifiedName;
			} else {
				name = (String) next;
			}
			for (int i = 0; i < classNames.length; i++) {
				if (name.startsWith(classNames[i] + ".")) {
					toRemoveList.add(next);
				}
			}
		}
		for (Iterator iterator = toRemoveList.iterator(); iterator.hasNext();) {
			set.remove(iterator.next());
		}
	}

	private void removeSubClasses(Set<Object> set) {
		Set<QNTypeBinding> removed = new HashSet<QNTypeBinding>();
		Set<QNTypeBinding> reseted = new HashSet<QNTypeBinding>();
		out: for (Iterator iter = set.iterator(); iter.hasNext();) {
			Object n = iter.next();
			if (!(n instanceof QNTypeBinding))
				continue;
			QNTypeBinding qn = (QNTypeBinding) n;
			if (qn.binding != null) {
				for (Iterator iterator = classBindingSet.iterator(); iterator.hasNext();) {
					ITypeBinding binding = (ITypeBinding) iterator.next();
					if (Bindings.isSuperType(binding, qn.binding)) {
						removed.add(qn);
						continue out;
					}
				}
			}
			reseted.add(qn);
		}
		set.removeAll(removed);
		set.removeAll(reseted);
		for (Iterator<QNTypeBinding> i = reseted.iterator(); i.hasNext();) {
			set.add(i.next().qualifiedName);
		}
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}

//	public boolean visit(Block node) {
//		ASTNode parent = node.getParent();
//		if (parent instanceof MethodDeclaration) {
//			MethodDeclaration method = (MethodDeclaration) parent;
//			Javadoc javadoc = method.getJavadoc();
//			/*
//			 * if comment contains "@j2sNative", then output the given native
//			 * JavaScript codes directly.
//			 */
//			if (visitNativeJavadoc(javadoc, node, true) == false) {
//				return false;
//			}
//		} else if (parent instanceof Initializer) {
//			Initializer initializer = (Initializer) parent;
//			Javadoc javadoc = initializer.getJavadoc();
//			/*
//			 * if comment contains "@j2sNative", then output the given native
//			 * JavaScript codes directly.
//			 */
//			if (visitNativeJavadoc(javadoc, node, true) == false) {
//				return false;
//			}
//		}
//		int blockStart = node.getStartPosition();
//		int previousStart = getPreviousStartPosition(node);
//		ASTNode root = node.getRoot();
//		checkJavadocs(root);
//		// for (int i = 0; i < nativeJavadoc.length; i++) {
//		for (int i = nativeJavadoc.length - 1; i >= 0; i--) {
//			Javadoc javadoc = nativeJavadoc[i];
//			int commentStart = javadoc.getStartPosition();
//			if (commentStart > previousStart && commentStart < blockStart) {
//				/*
//				 * if the block's leading comment contains "@j2sNative", then
//				 * output the given native JavaScript codes directly.
//				 */
//				if (visitNativeJavadoc(javadoc, node, true) == false) {
//					return false;
//				}
//			}
//		}
//		return super.visit(node);
//	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * ClassInstanceCreation)
//	 */
//	public boolean visit(ClassInstanceCreation node) {
//		ITypeBinding binding = node.resolveTypeBinding();
//		if (binding != null && binding.isAnonymous()) {
//			binding = node.getType().resolveBinding();
//		}
//		if (binding != null) {
//			addDeclClassReference(node, binding);
//		}
//		return super.visit(node);
//	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * FieldAccess)
//	 */
//	public boolean visit(FieldAccess node) {
//		Object constValue = node.resolveConstantExpressionValue();
//		IVariableBinding resolveFieldBinding = node.resolveFieldBinding();
//		Expression exp = node.getExpression();
//		if (resolveFieldBinding != null && constValue == null
//				&& Modifier.isStatic(resolveFieldBinding.getModifiers())) {
//			if (exp instanceof Name) {
//				addDeclClassReference(node, exp.resolveTypeBinding());
//			}
//		} else if (constValue != null
//				&& (constValue instanceof Number || constValue instanceof Character || constValue instanceof Boolean)) {
//			if ((exp instanceof QualifiedName)
//					|| (exp instanceof QualifiedName && isSimpleQualified((QualifiedName) exp))) {
//				return false;
//			}
//		}
//		return super.visit(node);
//	}

//	public boolean visit(FieldDeclaration node) {
//		if (getJ2STag(node, "@j2sIgnore") != null) {
//			return false;
//		}
//		return super.visit(node);
//	}
//
//	public boolean visit(ImportDeclaration node) {
//		return false;
//	}

//	public boolean visit(InstanceofExpression node) {
//		// this is wrong. instanceof is not a dependency. 
//		
//		Type type = node.getRightOperand();
//		ITypeBinding resolveTypeBinding = type.resolveBinding();
//		QNTypeBinding qn = new QNTypeBinding();
//		String qualifiedName = resolveTypeBinding.getQualifiedName();
//		qn.binding = resolveTypeBinding;
//		qualifiedName = discardGenericType(qualifiedName);
//		qn.qualifiedName = qualifiedName;
//		if (isQualifiedNameOK(qualifiedName, node) && !musts.contains(qn) && !requires.contains(qn)) {
//			if (isNodeInMustPath(node)) {
//				requires.add(qn);
//			} else {
//				optionals.add(qn);
//			}
//		}
//		return super.visit(node);
//	}

	// /* (non-Javadoc)
	// * @see
	// org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ArrayCreation)
	// */
	// public boolean visit(ArrayCreation node) {
	// ArrayType type = node.getType();
	// Type elementType = type.getElementType();
	// if (!elementType.isPrimitiveType()) {
	// ITypeBinding resolveTypeBinding = elementType.resolveBinding();
	// if(resolveTypeBinding != null){
	// ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
	// QNTypeBinding qn = new QNTypeBinding();
	// String qualifiedName = null;
	// if (declaringClass != null) {
	// ITypeBinding dclClass = null;
	// while ((dclClass = declaringClass.getDeclaringClass()) != null) {
	// declaringClass = dclClass;
	// }
	// qualifiedName = declaringClass.getQualifiedName();
	// qn.binding = declaringClass;
	// } else {
	// qualifiedName = resolveTypeBinding.getQualifiedName();
	// qn.binding = resolveTypeBinding;
	// }
	// qualifiedName = discardGenericType(qualifiedName);
	// qn.qualifiedName = qualifiedName;
	// if (isQualifiedNameOK(qualifiedName, node)
	// && !musts.contains(qn)
	// && !requires.contains(qn)) {
	// optionals.add(qn);
	// }
	// }
	// }
	// return super.visit(node);
	// }

//	public boolean visit(Initializer node) {
//		if (getJ2STag(node, "@j2sIgnore") != null) {
//			return false;
//		}
//		return super.visit(node);
//	}

//	public boolean visit(MethodDeclaration node) {
//		IMethodBinding mBinding = node.resolveBinding();
//		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", "deal")) {
//			ITypeBinding[] parameterTypes = mBinding.getParameterTypes();
//			if (parameterTypes != null && parameterTypes.length == 1) {
//				addDeclClassReference(node, parameterTypes[0]);
//			}
//		}
//		boolean toBeIgnored = false;
//		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
//			toBeIgnored = true;
//		}
//		if (!toBeIgnored) {
//			String[] pipeMethods = new String[] { "pipeSetup", "pipeThrough", "through", "pipeMonitoring",
//					"pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper" };
//			for (int i = 0; i < pipeMethods.length; i++) {
//				if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
//					toBeIgnored = true;
//					break;
//				}
//			}
//		}
//		if (!toBeIgnored) {
//			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
//				toBeIgnored = true;
//			}
//		}
//		if (toBeIgnored && getJ2STag(node, "@j2sKeep") == null) {
//			return false;
//		}
//
//		if (getJ2STag(node, "@j2sNative") != null) {
//			return false;
//		}
//		if (getJ2STag(node, "@j2sNativeSrc") != null) {
//			return false;
//		}
//		if (getJ2STag(node, "@j2sXHTML") != null) {
//			return false;
//		}
//		if (getJ2STag(node, "@j2sXCSS") != null) {
//			return false;
//		}
//
//		if (getJ2STag(node, "@j2sIgnore") != null) {
//			return false;
//		}
//
//		if (node.getBody() == null) {
//			/*
//			 * Abstract or native method
//			 */
//			return false;
//		}
//		return super.visit(node);
//	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * MethodInvocation)
//	 */
//	public boolean visit(MethodInvocation node) {
//// no longer necessary BH
////		IMethodBinding resolveMethodBinding = node.resolveMethodBinding();
////		if (resolveMethodBinding != null && Modifier.isStatic(resolveMethodBinding.getModifiers())) {
////			Expression expression = node.getExpression();
////			if (expression instanceof Name) {
////				addDeclClassReference(node, expression.resolveTypeBinding());
////			}
////		}
//		return super.visit(node);
//	}

	public boolean visit(PackageDeclaration node) {
		String name = "" + node.getName();
		setPackageName(name);
		addPackage(name);
		return false;
	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * QualifiedName)
//	 */
//	public boolean visit(QualifiedName node) {
//		Object constValue = node.resolveConstantExpressionValue();
//		if (constValue != null && (constValue instanceof Number || constValue instanceof Character
//				|| constValue instanceof String || constValue instanceof Boolean) && isSimpleQualified(node)) {
//			// buffer.append(constValue);
//			return false;
//		}
//		return super.visit(node);
//	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * SimpleName)
//	 */
//	public boolean visit(SimpleName node) {
//		Object constValue = node.resolveConstantExpressionValue();
//		if (constValue != null
//				&& (constValue instanceof Number || constValue instanceof Character || constValue instanceof Boolean)) {
//			return false;
//		}
//		ITypeBinding typeBinding = node.resolveTypeBinding();
//		IBinding binding = node.resolveBinding();
//		boolean isCasting = false;
//		boolean isQualified = false;
//		ASTNode nodeParent = node.getParent();
//		while (nodeParent != null && nodeParent instanceof QualifiedName) {
//			isQualified = true;
//			nodeParent = nodeParent.getParent();
//		}
//		if (nodeParent != null && nodeParent instanceof SimpleType) {
//			isCasting = true;
//		}
//		if (typeBinding != null && !isCasting && isQualified && !(binding instanceof IVariableBinding)) {
//			QNTypeBinding qn = new QNTypeBinding();
//			if (!typeBinding.isPrimitive()) {
//				boolean isOK = true;
//				if (typeBinding.isArray()) {
//					ITypeBinding elementType = typeBinding.getElementType();
//					while (elementType.isArray()) {
//						elementType = elementType.getElementType();
//					}
//					isOK = !elementType.isPrimitive();
//				} 
//				if (isOK) {			
//					ITypeBinding declaringClass = typeBinding.getDeclaringClass();
//					String qualifiedName;
//					if (declaringClass != null) {
//						ITypeBinding dclClass = null;
//						while ((dclClass = declaringClass.getDeclaringClass()) != null) {
//							declaringClass = dclClass;
//						}
//						qualifiedName = declaringClass.getQualifiedName();
//						qn.binding = declaringClass;
//					} else {
//						qualifiedName = typeBinding.getQualifiedName();
//						qn.binding = typeBinding;
//					}
//					addReference(node, qualifiedName, qn);
//				}
//			}
//		} else if (binding instanceof IVariableBinding) {
//			IVariableBinding varBinding = (IVariableBinding) binding;
//			if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
//				QNTypeBinding qn = new QNTypeBinding();
//				IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
//				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
//				ITypeBinding dclClass = null;
//				while ((dclClass = declaringClass.getDeclaringClass()) != null) {
//					declaringClass = dclClass;
//				}
//				addReference(node, declaringClass.getQualifiedName(), qn);
//			}
//		}
//		return super.visit(node);
//	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
	 * TypeDeclaration)
	 */
	public boolean visit(EnumDeclaration node) {
		//musts.add("java.lang.Enum");
		//addMusts(node);
//		visitForRequires(node);
//		visitForOptionals(node);
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
	 * TypeDeclaration)
	 */
	public boolean visit(TypeDeclaration node) {
		//addMusts(node);
//		visitForRequires(node);
//		visitForOptionals(node);
		return true;
	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
//	 * TypeLiteral)
//	 */
//	public boolean visit(TypeLiteral node) {
//		addDeclClassReference(node, node.getType().resolveBinding());
//		return false;
//	}

	protected void addMusts(AbstractTypeDeclaration node) {
		// Enum and class 
		ITypeBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null && resolveBinding.isTopLevel()) {
			String thisClassName = resolveBinding.getQualifiedName();
			classNameSet.add(thisClassName);
			classBindingSet.add(resolveBinding);
		}
		readTags(node);
		Type superType = (node instanceof TypeDeclaration ? ((TypeDeclaration) node).getSuperclassType() : null);
		if (superType != null)
			addMust(node, superType);
		List superInterfaces = (node instanceof TypeDeclaration ? ((TypeDeclaration) node).superInterfaceTypes()
				: ((EnumDeclaration) node).superInterfaceTypes());
		if (superInterfaces.size() > 0) {
			for (Iterator iter = superInterfaces.iterator(); iter.hasNext();)
				addMust(node, (Type) iter.next());
//				
//				
//				ITypeBinding superBinding = superType.resolveBinding();
//				if (superBinding != null) {
//					QNTypeBinding qn = new QNTypeBinding();
//					String qualifiedName;				
//					ITypeBinding binding = superBinding.getDeclaringClass();
//					if (binding != null) {
//						ITypeBinding declaringClass = null;
//						while ((declaringClass = binding.getDeclaringClass()) != null) {
//							binding = declaringClass;
//						}
//						qualifiedName = binding.getQualifiedName();
//						qn.binding = binding;
//					} else {
//						qualifiedName = superBinding.getQualifiedName();
//						qn.binding = superBinding;
//					}
//					qualifiedName = TypeAdapter.discardGenericType(qualifiedName);
//					qn.qualifiedName = qualifiedName;
//					if (isQualifiedNameOK(qualifiedName, node)) {
//						musts.add(qn);
//					}
//				}
////				else {
////					qn.qualifiedName = superType.toString();
////					qn.binding = superBinding;
////					musts.add(qn);
////				}
//			}
		}
	}

	private void addMust(ASTNode node, Type superType) {
		ITypeBinding superBinding = superType.resolveBinding();
		if (superBinding == null)
			return;
		QNTypeBinding qn = new QNTypeBinding();
		String qualifiedName;
		ITypeBinding binding = superBinding.getDeclaringClass();
		if (binding != null) {
			ITypeBinding declaringClass = null;
			while ((declaringClass = binding.getDeclaringClass()) != null) {
				binding = declaringClass;
			}
			qualifiedName = binding.getQualifiedName();
			qn.binding = binding;
		} else {
			qualifiedName = superBinding.getQualifiedName();
			qn.binding = superBinding;
		}
		qualifiedName = removeBrackets(qualifiedName);
		qn.qualifiedName = qualifiedName;
		if (isQualifiedNameOK(qualifiedName, node)) {
			musts.add(qn);
		}
	}
	
//	/**
//	 * @param node  
//	 */
//	protected void visitForOptionals(AbstractTypeDeclaration node) {
//		// ignore
//	}

//	protected void visitForRequires(AbstractTypeDeclaration node) {
//		for (Iterator iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
//			ASTNode element = (ASTNode) iter.next();
//			if (element instanceof TypeDeclaration) {
//				boolean isInteface = false;
//				if (node instanceof TypeDeclaration) {
//					isInteface = ((TypeDeclaration) node).isInterface();
//				} else {
//					isInteface = false;
//				}
//				if (isInteface || (node.getModifiers() & Modifier.STATIC) != 0) {
//					DependencyASTVisitor visitor = getSelfVisitor();
//					element.accept(visitor);
//					requires.addAll(visitor.musts);
//					requires.addAll(visitor.requires);
//					requires.addAll(visitor.optionals);
//				}
//			} else if (element instanceof Initializer) {
//				if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
//					continue;
//				}
//				DependencyASTVisitor visitor = getSelfVisitor();
//				element.accept(this);
//				requires.addAll(visitor.musts);
//				requires.addAll(visitor.requires);
//				requires.addAll(visitor.optionals);
//			} else if (element instanceof FieldDeclaration) {
//				FieldDeclaration field = (FieldDeclaration) element;
//				if (getJ2STag(field, "@j2sIgnore") != null) {
//					continue;
//				}
//				List fragments = field.fragments();
//				for (int j = 0; j < fragments.size(); j++) {
//					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
//					Expression initializer = vdf.getInitializer();
//					DependencyASTVisitor visitor = getSelfVisitor();
//					if (initializer != null) {
//						initializer.accept(visitor);
//					}
//					requires.addAll(visitor.musts);
//					requires.addAll(visitor.requires);
//					requires.addAll(visitor.optionals);
//				}
//			}
//		}
//	}

//	boolean visitNativeJavadoc(Javadoc javadoc, Block node, boolean superVisit) {
//		if (javadoc != null) {
//			List tags = javadoc.tags();
//			if (tags.size() != 0) {
//				for (Iterator iter = tags.iterator(); iter.hasNext();) {
//					TagElement tagEl = (TagElement) iter.next();
//					if ("@j2sIgnore".equals(tagEl.getTagName())) {
//						if (superVisit)
//							super.visit(node);
//						return false;
//					}
//				}
//				if (isDebugging) {
//					for (Iterator iter = tags.iterator(); iter.hasNext();) {
//						TagElement tagEl = (TagElement) iter.next();
//						if ("@j2sDebug".equals(tagEl.getTagName())) {
//							if (superVisit)
//								super.visit(node);
//							return false;
//						}
//					}
//				}
//				if (!toCompileVariableName) {
//					for (Iterator iter = tags.iterator(); iter.hasNext();) {
//						TagElement tagEl = (TagElement) iter.next();
//						if ("@j2sNativeSrc".equals(tagEl.getTagName())) {
//							if (superVisit)
//								super.visit(node);
//							return false;
//						}
//					}
//				}
//				for (Iterator iter = tags.iterator(); iter.hasNext();) {
//					TagElement tagEl = (TagElement) iter.next();
//					if ("@j2sNative".equals(tagEl.getTagName()) || "@j2sXHTML".equals(tagEl.getTagName())
//							|| "@j2sXCSS".equals(tagEl.getTagName())) {
//						if (superVisit)
//							super.visit(node);
//						return false;
//					}
//				}
//			}
//		}
//		return true;
//	}

}

class QNTypeBinding {
	String qualifiedName;
	ITypeBinding binding;

	public boolean equals(Object obj) {
		if (obj == null)
			return false;
		if (obj instanceof String)
			return qualifiedName.equals(obj);

		if (obj instanceof QNTypeBinding) {
			QNTypeBinding b = (QNTypeBinding) obj;
			return qualifiedName.equals(b.qualifiedName);
		}
		return false;
	}

	public int hashCode() {
		return qualifiedName.hashCode();
	}

}
