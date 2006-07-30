/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

/**
 * @author josson smith
 * 
 * 2006-5-2
 */
public class DependencyASTVisitor extends ASTVisitor {
	protected StringBuffer buffer = new StringBuffer();

	protected String thisPackageName = "";
	
	protected Set classNameSet = new HashSet();

	protected Set classBindingSet = new HashSet();

	protected Set musts = new HashSet();
	
	protected Set requires = new HashSet();
	
	protected Set optionals = new HashSet();
	
	protected Set ignores = new HashSet();
	
	
	public DependencyASTVisitor() {
		super();
	}

	public DependencyASTVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	public StringBuffer getBuffer() {
		return buffer;
	}

	public void setBuffer(StringBuffer buffer) {
		this.buffer = buffer;
	}

	public String getPackageName() {
		return thisPackageName;
	}
	
	/**
	 * @return Returns the thisClassName.
	 */
	public String[] getClassName() {
		return (String[]) classNameSet.toArray(new String[0]);
	}
	
	/*
	public String getMusts() {
		StringBuffer buf = new StringBuffer();
		buf.append("musts=");
		for (Iterator iter = musts.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}
	
	public String getRequires() {
		StringBuffer buf = new StringBuffer();
		buf.append("requires=");
		for (Iterator iter = requires.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}
	
	public String getOptionals() {
		StringBuffer buf = new StringBuffer();
		buf.append("optionals=");
		for (Iterator iter = optionals.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}
	*/
	
	protected void checkSuperType(Set set) {
		Set removed = new HashSet();
		Set reseted = new HashSet();
		for (Iterator iter = set.iterator(); iter.hasNext();) {
			Object n = iter.next();
			if (n instanceof QNTypeBinding) {
				QNTypeBinding qn = (QNTypeBinding) n;
				boolean isRemoved = false;
				for (Iterator iterator = classBindingSet.iterator(); iterator
						.hasNext();) {
					ITypeBinding binding = (ITypeBinding) iterator.next();
					if (Bindings.isSuperType(binding, qn.binding)) {
						removed.add(qn);
						//set.remove(qn);
						isRemoved = true;
						break;
					}
				}
				if (!isRemoved) {
					reseted.add(qn);
					//set.remove(qn);
					//set.add(qn.qualifiedName);
				}
			}
		}
		set.removeAll(removed);
		set.removeAll(reseted);
		for (Iterator i = reseted.iterator(); i.hasNext();) {
			QNTypeBinding qn = (QNTypeBinding) i.next();
			set.add(qn.qualifiedName);
		}
	}
	public String getDependencyScript(StringBuffer mainJS) {
		checkSuperType(musts);
		checkSuperType(requires);
		checkSuperType(optionals);
		
		musts.remove("");
		requires.remove("");
		optionals.remove("");

		for (Iterator iter = ignores.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (musts.contains(s)) {
				musts.remove(s);
			}
			if (requires.contains(s)) {
				requires.remove(s);
			}
			if (optionals.contains(s)) {
				optionals.remove(s);
			}
		}
		for (Iterator iter = musts.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (requires.contains(s)) {
				requires.remove(s);
			}
			if (optionals.contains(s)) {
				optionals.remove(s);
			}
		}
		for (Iterator iter = requires.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (optionals.contains(s)) {
				optionals.remove(s);
			}
		}
		
		String js = mainJS.toString();
		if (musts.size() == 0 && requires.size() == 0 && optionals.size() == 0) {
			return js;
		}
		StringBuffer buf = new StringBuffer();
		if (js.startsWith("Clazz.declarePackage")) {
			int index = js.indexOf("\r\n");
			buf.append(js.substring(0, index + 2));
			js = js.substring(index + 2);
		}
		buf.append("Clazz.load (");
		if (musts.size() != 0 || requires.size() != 0) {
			buf.append("[");
			String[] ss = (String[]) musts.toArray(new String[0]);
			Arrays.sort(ss);
			String lastClassName = joinArrayClasses(buf, ss, null);
			/*
			for (Iterator iter = musts.iterator(); iter.hasNext();) {
				String className = (String) iter.next();
				buf.append("\"");
				buf.append(className);
				buf.append("\"");
				if (iter.hasNext()) {
					buf.append(", ");
				}
			}
			*/
			if (musts.size() != 0 && requires.size() != 0) {
				buf.append(", ");
			}
			ss = (String[]) requires.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses(buf, ss, lastClassName);
			/*
			for (Iterator iter = requires.iterator(); iter.hasNext();) {
				String className = (String) iter.next();
				buf.append("\"");
				buf.append(className);
				buf.append("\"");
				if (iter.hasNext()) {
					buf.append(", ");
				}
			}
			*/
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		if (classNameSet.size() > 1) {
			buf.append("[");
		}
		joinArrayClasses(buf, getClassName(), null);
		/*
		buf.append("\"");
		//buf.append(thisClassName);
		String key = "org.eclipse.swt.";
		for (Iterator iter = classNameSet.iterator(); iter.hasNext();) {
			String thisClassName = (String) iter.next();
			if (thisClassName.startsWith(key)) {
				buf.append("$wt.");
				buf.append(thisClassName.substring(key.length()));;
			} else {
				buf.append(thisClassName);
			}
			if (iter.hasNext()) {
				buf.append("\", \"");
			}
		}
		buf.append("\"");
		*/
		if (classNameSet.size() > 1) {
			buf.append("]");
		}
		buf.append(", ");
		if (optionals.size() != 0) {
			buf.append("[");
			String[] ss = (String[]) optionals.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses(buf, ss, null);
			/*
			for (Iterator iter = optionals.iterator(); iter.hasNext();) {
				String className = (String) iter.next();
				buf.append("\"");
				buf.append(className);
				buf.append("\"");
				if (iter.hasNext()) {
					buf.append(", ");
				}
			}
			*/
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		buf.append("function () {\r\n");
		buf.append(js);
		buf.append("});\r\n");
		return buf.toString();
	}

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
					buf.append(ss[i].substring(key.length()));;
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
		Set set = new HashSet();
		set.add ("java.lang.UnsupportedOperationException");
		set.add ("java.lang.CloneNotSupportedException");
		set.add ("java.io.ObjectOutputStream");
		set.add ("java.lang.ClassNotFoundException");
		set.add ("java.io.ObjectInputStream");
		set.add ("java.lang.IllegalStateException");
		set.add ("java.lang.IllegalArgumentException");
		set.add ("java.lang.CloneNotSupportedException");
		set.add ("java.io.IOException");
		set.add ("java.io.PrintWriter");
		set.add ("java.util.NoSuchElementException");
		set.add ("java.lang.Float");
		set.add ("java.util.ConcurrentModificationException");
		set.add ("java.lang.ClassCastException");
		set.add ("java.lang.NullPointerException");
		set.add ("java.lang.StringIndexOutOfBoundsException");
		String[] s = new String[] {
				"java.lang.Character", "java.lang.InternalError", "java.util.Collections", "java.io.FileInputStream", "java.lang.InterruptedException", "java.lang.IndexOutOfBoundsException", "java.lang.ArrayIndexOutOfBoundsException"
		};
		for (int i = 0; i < s.length; i++) {
			set.add(s[i]);
		}
		s = new String[] {
				"java.io.ObjectOutputStream", "java.text.SimpleDateFormat", "java.util.TimeZone", "java.lang.ClassNotFoundException", "java.io.ObjectInputStream", "java.lang.CloneNotSupportedException", "java.lang.IllegalArgumentException", "java.util.Locale", "java.io.IOException", "java.text.DateFormat", "java.util.GregorianCalendar", "java.util.Calendar", "java.lang.ref.SoftReference"
		};
		for (int i = 0; i < s.length; i++) {
			set.add(s[i]);
		}
		String[] ss = (String[]) set.toArray(new String[0]);
		StringBuffer buf = new StringBuffer();
		Arrays.sort(ss);
		joinArrayClasses(buf, ss, null);
		System.out.println(buf.toString().replaceAll(", ", ",\r\n\t"));
	}

	public boolean visit(PackageDeclaration node) {
		thisPackageName = "" + node.getName();
		return false;
	}

	protected void readClasses(TagElement tagEl, Set set) {
		List fragments = tagEl.fragments();
		StringBuffer buf = new StringBuffer();
		boolean isFirstLine = true;
		for (Iterator iterator = fragments.iterator(); iterator
				.hasNext();) {
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
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.TypeLiteral)
	 */
	public boolean visit(TypeLiteral node) {
		ITypeBinding resolveTypeBinding = node.getType().resolveBinding();
		ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
		QNTypeBinding qn = new QNTypeBinding();
		String qualifiedName = null;
		if (declaringClass != null) {
			qualifiedName = declaringClass.getQualifiedName();
			qn.binding = declaringClass;
		} else {
			qualifiedName = resolveTypeBinding.getQualifiedName();
			qn.binding = resolveTypeBinding;
		}
		qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
		qn.qualifiedName = qualifiedName;
		if (isQualifiedNameOK(qualifiedName, node) 
				&& !musts.contains(qn)
				&& !requires.contains(qn)) {
			optionals.add(qn);
		}
		return false;
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.TypeDeclaration)
	 */
	public boolean visit(TypeDeclaration node) {
		ITypeBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null && resolveBinding.isTopLevel()) {
			String thisClassName = resolveBinding.getQualifiedName();
			classNameSet.add(thisClassName);
			classBindingSet.add(resolveBinding);
		}
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					String tagName = tagEl.getTagName();
					if ("@j2sRequireImport".equals(tagName)) {
						readClasses(tagEl, requires);
					} else if ("@j2sOptionalImport".equals(tagName)) {
						readClasses(tagEl, optionals);
					} else if ("@j2sIgnoreImport".equals(tagName)) {
						readClasses(tagEl, ignores);
					} 
				}
			}
		}
		visitForMusts(node);
		visitForRequires(node);
		visitForOptionals(node);
		return super.visit(node);
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.TypeDeclaration)
	 */
	public boolean visit(EnumDeclaration node) {
		ITypeBinding resolveBinding = node.resolveBinding();
		if (resolveBinding.isTopLevel()) {
			String thisClassName = resolveBinding.getQualifiedName();
			classNameSet.add(thisClassName);
			classBindingSet.add(resolveBinding);
		}
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					String tagName = tagEl.getTagName();
					if ("@j2sRequireImport".equals(tagName)) {
						readClasses(tagEl, requires);
					} else if ("@j2sOptionalImport".equals(tagName)) {
						readClasses(tagEl, optionals);
					} else if ("@j2sIgnoreImport".equals(tagName)) {
						readClasses(tagEl, ignores);
					} 
				}
			}
		}
		musts.add("java.lang.Enum");
		visitForMusts(node);
		visitForRequires(node);
		visitForOptionals(node);
		return super.visit(node);
	}

	public boolean isQualifiedNameOK(String qualifiedName, ASTNode node) {
		if (qualifiedName != null 
				&& !"java.lang.Object".equals(qualifiedName)
				&& !"java.lang.Class".equals(qualifiedName)
				&& !"java.lang.String".equals(qualifiedName)
				&& !"java.lang.System".equals(qualifiedName)
				&& !"java.io.PrintStream".equals(qualifiedName)
				&& !"java.lang.Math".equals(qualifiedName)
				&& !"java.lang.Integer".equals(qualifiedName)
				&& !qualifiedName.startsWith("org.w3c.dom.")
				&& !qualifiedName.startsWith("org.eclipse.swt.internal.xhtml.")) {
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
	protected void visitForMusts(AbstractTypeDeclaration node) {
		Type superclassType = null;
		if (node instanceof TypeDeclaration) {
			superclassType = ((TypeDeclaration) node).getSuperclassType();
		}
		if (superclassType != null) {
			ITypeBinding superBinding = superclassType.resolveBinding();
			if (superBinding != null) {
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName;
				ITypeBinding declaringClass = superBinding.getDeclaringClass();
				if (declaringClass != null) {
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = superBinding.getQualifiedName();
					qn.binding = superBinding;
				}
				qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node)) {
					musts.add(qn);
				}
				//musts.add(superBinding.getQualifiedName());
			}
		}
		List superInterfaces = null;
		if (node instanceof TypeDeclaration) {
			superInterfaces = ((TypeDeclaration) node).superInterfaceTypes();
		} else {
			superInterfaces = ((EnumDeclaration) node).superInterfaceTypes();
		}
		int size = superInterfaces.size();
		if (size != 0) {
			for (Iterator iter = superInterfaces.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				ITypeBinding binding = ((Type) element).resolveBinding();
				QNTypeBinding qn = new QNTypeBinding();
				if (binding != null) {
					String qualifiedName;
					ITypeBinding declaringClass = binding.getDeclaringClass();
					if (declaringClass != null) {
						qualifiedName = declaringClass.getQualifiedName();
						qn.binding = declaringClass;
					} else {
						qualifiedName = binding.getQualifiedName();
						qn.binding = binding;
					}
					qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
					qn.qualifiedName = qualifiedName;
					if (isQualifiedNameOK(qualifiedName, node)) {
						musts.add(qn);
					}
				} else {
					qn.qualifiedName = element.toString();
					qn.binding = binding;
					musts.add(qn);
				}
			}
		}
	}

	protected void visitForRequires(AbstractTypeDeclaration node) {
		for (Iterator iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				boolean isInteface = false;
				if (node instanceof TypeDeclaration) {
					isInteface = ((TypeDeclaration) node).isInterface();
				} else {
					isInteface = false;
				}
				if (isInteface || (node.getModifiers() & Modifier.STATIC) != 0) {
					DependencyASTVisitor visitor = new DependencyASTVisitor();
					element.accept(visitor);
					requires.addAll(visitor.musts);
					requires.addAll(visitor.requires);
					requires.addAll(visitor.optionals);
				}
			} else if (element instanceof Initializer) {
				DependencyASTVisitor visitor = new DependencyASTVisitor();
				element.accept(this);
				requires.addAll(visitor.musts);
				requires.addAll(visitor.requires);
				requires.addAll(visitor.optionals);
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
//				if ((field.getModifiers() & Modifier.STATIC) != 0) {
					List fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments
								.get(j);
						Expression initializer = vdf.getInitializer();
						DependencyASTVisitor visitor = new DependencyASTVisitor();
						if (initializer != null) {
							initializer.accept(visitor);
						}
						requires.addAll(visitor.musts);
						requires.addAll(visitor.requires);
						requires.addAll(visitor.optionals);
					}
//				} else if (node.isInterface()) {
//					List fragments = field.fragments();
//					for (int j = 0; j < fragments.size(); j++) {
//						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments
//								.get(j);
//						Expression initializer = vdf.getInitializer();
//						DependencyASTVisitor visitor = new DependencyASTVisitor();
//						if (initializer != null) {
//							initializer.accept(visitor);
//						}
//						requires.addAll(visitor.musts);
//						requires.addAll(visitor.requires);
//						requires.addAll(visitor.optionals);
//					}
//				}
			}
		}
	}

	protected void visitForOptionals(AbstractTypeDeclaration node) {

	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.SimpleName)
	 */
	public boolean visit(SimpleName node) {
		/*
		ITypeBinding typeBinding = node.resolveTypeBinding();
		if (typeBinding != null) {
			String qualifiedName = null;
			if (!typeBinding.isPrimitive()) {
				if (typeBinding.isArray()) {
					ITypeBinding elementType = typeBinding.getElementType();
					while (elementType.isArray()) {
						elementType = elementType.getElementType();
					}
					if (!elementType.isPrimitive()) {
						ITypeBinding declaringClass = elementType.getDeclaringClass();
						if (declaringClass != null) {
							qualifiedName = declaringClass.getQualifiedName();
						} else {
							qualifiedName = elementType.getQualifiedName();
						}
					}
				} else {
					ITypeBinding declaringClass = typeBinding.getDeclaringClass();
					if (declaringClass != null) {
						qualifiedName = declaringClass.getQualifiedName();
					} else {
						qualifiedName = typeBinding.getQualifiedName();
					}
				}
			}
			if ("byte".equals(qualifiedName)) {
				System.out.println("fds");
			}
			if (isQualifiedNameOK(qualifiedName, node) 
					&& !musts.contains(qualifiedName)
					&& !requires.contains(qualifiedName)) {
				optionals.add(qualifiedName);
			}
		}
//		ASTNode parent = node.getParent();
//		if (parent instanceof QualifiedName) {
//			QualifiedName qName = (QualifiedName) parent;
//			if (node == qName.getName()) {
//				
//			}
//		}
		*/
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ClassInstanceCreation)
	 */
	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding resolveTypeBinding = node.resolveTypeBinding();
		QNTypeBinding qn = new QNTypeBinding();
		String qualifiedName = null;
		if (resolveTypeBinding.isAnonymous()) {
			qualifiedName = node.getType().resolveBinding().getQualifiedName();
			qn.binding = node.getType().resolveBinding();
		} else {
			ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
			if (declaringClass != null) {
				qualifiedName = declaringClass.getQualifiedName();
				qn.binding = declaringClass;
			} else {
				qualifiedName = resolveTypeBinding.getQualifiedName();
				qn.binding = resolveTypeBinding;
			}
		}
		qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
		qn.qualifiedName = qualifiedName;
		if (isQualifiedNameOK(qualifiedName, node) 
				&& !musts.contains(qn)
				&& !requires.contains(qn)) {
			optionals.add(qn);
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ArrayCreation)
	 */
	public boolean visit(ArrayCreation node) {
		ArrayType type = node.getType();
		Type elementType = type.getElementType();
		if (!elementType.isPrimitiveType()) {
			ITypeBinding resolveTypeBinding = elementType.resolveBinding();
			ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
			QNTypeBinding qn = new QNTypeBinding();
			String qualifiedName = null;
			if (declaringClass != null) {
				qualifiedName = declaringClass.getQualifiedName();
				qn.binding = declaringClass;
			} else {
				qualifiedName = resolveTypeBinding.getQualifiedName();
				qn.binding = resolveTypeBinding;
			}
			qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
			qn.qualifiedName = qualifiedName;
			if (isQualifiedNameOK(qualifiedName, node) 
					&& !musts.contains(qn)
					&& !requires.contains(qn)) {
				optionals.add(qn);
			}
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.MethodInvocation)
	 */
	public boolean visit(MethodInvocation node) {
		IMethodBinding resolveMethodBinding = node.resolveMethodBinding();
		if (Modifier.isStatic(resolveMethodBinding.getModifiers())) {
			Expression expression = node.getExpression();
			if (expression instanceof Name) {
				Name name = (Name) expression;
				ITypeBinding resolveTypeBinding = name.resolveTypeBinding();
				ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				if (declaringClass != null) {
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = resolveTypeBinding.getQualifiedName();
					qn.binding = resolveTypeBinding;
				}
				qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node) 
						&& !musts.contains(qn)
						&& !requires.contains(qn)) {
					optionals.add(qn);
				}
			}
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.FieldAccess)
	 */
	public boolean visit(FieldAccess node) {
		Object constValue = node.resolveConstantExpressionValue();
		IVariableBinding resolveFieldBinding = node.resolveFieldBinding();
		if (constValue == null && Modifier.isStatic(resolveFieldBinding.getModifiers())) {
			Expression expression = node.getExpression();
			if (expression instanceof Name) {
				Name name = (Name) expression;
				ITypeBinding resolveTypeBinding = name.resolveTypeBinding();
				ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				if (declaringClass != null) {
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = resolveTypeBinding.getQualifiedName();
					qn.binding = resolveTypeBinding;
				}
				qualifiedName = JavaLangUtil.ripGeneric(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node) 
						&& !musts.contains(qn)
						&& !requires.contains(qn)) {
					optionals.add(qn);
				}
			}
		}
		return super.visit(node);
	}
}

class QNTypeBinding {
	String qualifiedName;
	ITypeBinding binding;
	
	public boolean equals(Object obj) {
		if (obj == null/* || !(obj instanceof QNTypeBinding)*/) {
			return false;
		}
		if (obj instanceof String) {
			return qualifiedName.equals(obj);
		} else if (obj instanceof QNTypeBinding) {
			QNTypeBinding b = (QNTypeBinding) obj;
			return /*binding == b.binding &&*/ qualifiedName.equals(b.qualifiedName);
		} else {
			return false;
		}
	}
	
	public int hashCode() {
		return qualifiedName.hashCode();
	}
	
}
