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

package j2s.jmol;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IAnnotationBinding;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMemberValuePairBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

import j2s.core.Java2ScriptCompiler;

/**
 * 
 * ASTVisitor > Java2ScriptASTVisitor > Java2ScriptDependencyVisitor
 * 
 * This class is called by root.accept(me) in the first pass of the
 * transpiler to catalog all the references to classes and then later
 * called by Java2ScriptVisitor to process those.
 * 
 * @author zhou renjian
 * 
 * 2006-5-2
 */
public class J2SDependencyVisitor extends J2SASTVisitor {

	private static class QNTypeBinding {
		String qualifiedName;
		ITypeBinding binding;
		
		public QNTypeBinding() {
		}

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

	// BH 2023.11.10 interfaces as well must be ignored

	private Java2ScriptCompiler compiler;

	public J2SDependencyVisitor(Java2ScriptCompiler compiler) {
		super(false);
		this.compiler = compiler;
	}
	
	private J2SDependencyVisitor getSelfVisitor() {
		return new J2SDependencyVisitor(compiler);
	}
	
	private Set<Object> j2sRequireImport = new HashSet<>();
	
	private Set<Object> j2sOptionalImport = new HashSet<>();
	
	private Set<Object> j2sIgnoreImport = new HashSet<>();

	private Set<String> allClassNames = new HashSet<String>();

	private Set<ITypeBinding> allClassBindings = new HashSet<ITypeBinding>();

	private Set<Object> imports = new HashSet<Object>();
	
	///////// initialization methods - from root.accept(me) ////////////
	

	public boolean visit(ImportDeclaration node) {
		return false;
	}
	
	public void endVisit(ImportDeclaration node) {
		super.endVisit(node);
		if(node.isStatic()&&node.isOnDemand()) {			
			String qnameStr = node.getName().getFullyQualifiedName();
			if(qnameStr!=null && !qnameStr.equals("") && isQualifiedNameOK(qnameStr, node)) {
				if(!imports.contains(qnameStr)) {
					imports.add(qnameStr);
				}
			}
		}
	}

	/**
	 * Includes Interfaces
	 */
	public boolean visit(TypeDeclaration node) {
		ITypeBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null && resolveBinding.isTopLevel()) {
			String thisClassName = resolveBinding.getQualifiedName();
			allClassNames.add(thisClassName);
			allClassBindings.add(resolveBinding);
		}
		readJ2sImportTags(node);

		processImports(node);
		processJ2SRequireImport(node);
		//visitForOptionals(node);
		return super.visit(node);
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding resolveBinding = node.resolveBinding();
		if (resolveBinding.isTopLevel()) {
			String thisClassName = resolveBinding.getQualifiedName();
			allClassNames.add(thisClassName);
			allClassBindings.add(resolveBinding);
		}
		readJ2sImportTags(node);

		imports.add("java.lang.Enum");
		processImports(node);
		processJ2SRequireImport(node);
		//visitForOptionals(node);
		return super.visit(node);
	}

	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding resolveTypeBinding = node.resolveTypeBinding();
		QNTypeBinding qn = new QNTypeBinding();
		String qualifiedName = null;
		if (resolveTypeBinding != null && resolveTypeBinding.isAnonymous()) {
			qualifiedName = node.getType().resolveBinding().getQualifiedName();
			qn.binding = node.getType().resolveBinding();
		} else if(resolveTypeBinding != null){
			ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
			if (declaringClass != null) {
				ITypeBinding dclClass = null;
				while ((dclClass = declaringClass.getDeclaringClass()) != null) {
					declaringClass = dclClass;
				}
				qualifiedName = declaringClass.getQualifiedName();
				qn.binding = declaringClass;
			} else {
				qualifiedName = resolveTypeBinding.getQualifiedName();
				qn.binding = resolveTypeBinding;
			}
		}else{
			return super.visit(node);
		}
		qualifiedName = discardGenericType(qualifiedName);
		qn.qualifiedName = qualifiedName;
		if (isQualifiedNameOK(qualifiedName, node) 
				&& !imports.contains(qn)
				&& !j2sRequireImport.contains(qn)) {
			j2sOptionalImport.add(qn);
		}
		return super.visit(node);
	}
	
	/**
	 * Foo.class
	 */
	public boolean visit(TypeLiteral node) {
		ITypeBinding resolveTypeBinding = node.getType().resolveBinding();
		ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
		QNTypeBinding qn = new QNTypeBinding();
		String qualifiedName = null;
		if (declaringClass != null) {
			ITypeBinding dclClass = null;
			while ((dclClass = declaringClass.getDeclaringClass()) != null) {
				declaringClass = dclClass;
			}
			qualifiedName = declaringClass.getQualifiedName();
			qn.binding = declaringClass;
		} else {
			qualifiedName = resolveTypeBinding.getQualifiedName();
			qn.binding = resolveTypeBinding;
		}
		qualifiedName = discardGenericType(qualifiedName);
		qn.qualifiedName = qualifiedName;
		if (isQualifiedNameOK(qualifiedName, node) 
				&& !imports.contains(qn)
				&& !j2sRequireImport.contains(qn)) {
			j2sOptionalImport.add(qn);
		}
		return false;
	}
	
	/**
	 * 
	 * xxxx.Foo
	 * 
	 */
	public boolean visit(FieldAccess node) {
		Object constValue = node.resolveConstantExpressionValue();
		IVariableBinding resolveFieldBinding = node.resolveFieldBinding();
		Expression exp = node.getExpression();
		if (resolveFieldBinding != null && constValue == null && Modifier.isStatic(resolveFieldBinding.getModifiers())) {
			Expression expression = exp;
			if (expression instanceof Name) {
				Name name = (Name) expression;
				ITypeBinding resolveTypeBinding = name.resolveTypeBinding();
				ITypeBinding declaringClass = resolveTypeBinding.getDeclaringClass();
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				if (declaringClass != null) {
					ITypeBinding dclClass = null;
					while ((dclClass = declaringClass.getDeclaringClass()) != null) {
						declaringClass = dclClass;
					}
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = resolveTypeBinding.getQualifiedName();
					qn.binding = resolveTypeBinding;
				}
				qualifiedName = discardGenericType(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node) 
						&& !imports.contains(qn)
						&& !j2sRequireImport.contains(qn)) {
					j2sOptionalImport.add(qn);
				}
			}
		} else if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Character
				|| constValue instanceof Boolean)) {
			if ((exp instanceof QualifiedName) 
					|| (exp instanceof QualifiedName && isSimpleQualified((QualifiedName) exp))) {
				return false;
			}
		}

		return super.visit(node);
	}
	
	/**
	 * this.xxx
	 */
	public boolean visit(FieldDeclaration node) {
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		return super.visit(node);
	}

	public boolean visit(MethodInvocation node) {
		IMethodBinding resolveMethodBinding = node.resolveMethodBinding();
		if (resolveMethodBinding != null
				&& Modifier.isStatic(resolveMethodBinding.getModifiers())) {
			Expression expression = node.getExpression();
			if (expression instanceof Name) {
				Name name = (Name) expression;
				ITypeBinding resolveTypeBinding = name.resolveTypeBinding();
				ITypeBinding declaringClass = resolveTypeBinding
						.getDeclaringClass();
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				if (declaringClass != null) {
					ITypeBinding dclClass = null;
					while ((dclClass = declaringClass.getDeclaringClass()) != null) {
						declaringClass = dclClass;
					}
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = resolveTypeBinding.getQualifiedName();
					qn.binding = resolveTypeBinding;
				}
				qualifiedName = discardGenericType(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node)
						&& !imports.contains(qn) && !j2sRequireImport.contains(qn)) {
					j2sOptionalImport.add(qn);
				}
			}
		}
		return super.visit(node);
	}

	public boolean visit(Initializer node) {
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		return super.visit(node);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.QualifiedName)
	 */
	public boolean visit(QualifiedName node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Character
				|| constValue instanceof String
				|| constValue instanceof Boolean)
				&& isSimpleQualified(node)) {
			//buffer.append(constValue);
			return false;
		}
		return super.visit(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.SimpleName)
	 */
	public boolean visit(SimpleName node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Character
				|| constValue instanceof Boolean)) {
			return false;
		}
		ITypeBinding typeBinding = node.resolveTypeBinding();
		IBinding binding = node.resolveBinding();
		boolean isCasting = false;
		boolean isQualified = false;
		ASTNode nodeParent = node.getParent();
		while (nodeParent != null && nodeParent instanceof QualifiedName) {
			isQualified = true;
			nodeParent = nodeParent.getParent();
		}
		if (nodeParent != null && nodeParent instanceof SimpleType) {
			isCasting = true;
		}
		if (typeBinding != null && !isCasting && isQualified 
				&& !(binding instanceof IVariableBinding)) {
			QNTypeBinding qn = new QNTypeBinding();
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
							ITypeBinding dclClass = null;
							while ((dclClass = declaringClass.getDeclaringClass()) != null) {
								declaringClass = dclClass;
							}
							qualifiedName = declaringClass.getQualifiedName();
							qn.binding = declaringClass;
						} else {
							qualifiedName = elementType.getQualifiedName();
							qn.binding = elementType;
						}
					}
				} else {
					ITypeBinding declaringClass = typeBinding.getDeclaringClass();
					if (declaringClass != null) {
						ITypeBinding dclClass = null;
						while ((dclClass = declaringClass.getDeclaringClass()) != null) {
							declaringClass = dclClass;
						}
						qualifiedName = declaringClass.getQualifiedName();
						qn.binding = declaringClass;
					} else {
						qualifiedName = typeBinding.getQualifiedName();
						qn.binding = typeBinding;
					}
				}
			}
			if (isQualifiedNameOK(qualifiedName, node) 
					&& !imports.contains(qualifiedName)
					&& !j2sRequireImport.contains(qualifiedName)) {
				qn.qualifiedName = qualifiedName;
				j2sOptionalImport.add(qn);
			}
		} else if (binding instanceof IVariableBinding) {
			IVariableBinding varBinding = (IVariableBinding) binding;
			if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				
				IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				
				ITypeBinding dclClass = null;
				while ((dclClass = declaringClass.getDeclaringClass()) != null) {
					declaringClass = dclClass;
				}
				qualifiedName = declaringClass.getQualifiedName();
				if (isQualifiedNameOK(qualifiedName, node) 
						&& !imports.contains(qualifiedName)
						&& !j2sRequireImport.contains(qualifiedName)) {
					qn.qualifiedName = qualifiedName;
					j2sOptionalImport.add(qn);
				}

			}
			
		}
		return super.visit(node);
	}

// BH 2023.11.23 No! this is unnecessary
// we never need to declare imports for instanceOf
//	public boolean visit(InstanceofExpression node) {
//		Type type = node.getRightOperand();
//		ITypeBinding resolveTypeBinding = type.resolveBinding();
//		QNTypeBinding qn = new QNTypeBinding();
//		String qualifiedName = resolveTypeBinding.getQualifiedName();
//		qn.binding = resolveTypeBinding;
//		qualifiedName = discardGenericType(qualifiedName);
//		qn.qualifiedName = qualifiedName;
//		if (isQualifiedNameOK(qualifiedName, node) 
//				&& !imports.contains(qn)
//				&& !j2sRequireImport.contains(qn)) {
//			j2sOptionalImport.add(qn);
//		}
//		return super.visit(node);
//	}
//	
	public boolean visit(MethodDeclaration node) {
		if (getJ2STag(node, "@j2sNativeSrc") != null) {
			return false;
		}		
		if (getJ2STag(node, "@j2sNative") != null) {
			return false;
		}
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		if (node.getBody() == null) {
			/*
			 * Abstract or native method
			 */
			return false;
		}
		return super.visit(node);
	}
	
//	public boolean visit(Block node) {
//
//
//		
//		
//		
//		
//		ASTNode parent = node.getParent();
//		if (parent instanceof MethodDeclaration) {
//			MethodDeclaration method = (MethodDeclaration) parent;
//			Javadoc javadoc = method.getJavadoc();
//			/*
//			 * if comment contains "@j2sNative", then output the given native 
//			 * JavaScript codes directly. 
//			 */
//			if (processJ2STags(javadoc, node, true) == false) {
//				return false;
//			}
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//			
//		} else if (parent instanceof Initializer) {
//			Initializer initializer = (Initializer) parent;
//			Javadoc javadoc = initializer.getJavadoc();
//			/*
//			 * if comment contains "@j2sNative", then output the given native 
//			 * JavaScript codes directly. 
//			 */
//			if (processJ2STags(javadoc, node, true) == false) {
//				return false;
//			}
//		}
//		int blockStart = node.getStartPosition();
//		int previousStart = getPreviousStartPosition(node);
//		ASTNode root = node.getRoot();
//		checkJavadocs(root);
//		for (int i = nativeJavadoc.length - 1; i >= 0; i--) {
//			Javadoc javadoc = nativeJavadoc[i];
//			int commentStart = javadoc.getStartPosition();
//			if (commentStart > previousStart && commentStart < blockStart) {
//				/*
//				 * if the block's leading comment contains "@j2sNative", 
//				 * then output the given native JavaScript codes directly. 
//				 */
//				if (!processJ2STags(javadoc, node, true)) {
//					return false;
//				}
//			}
//		}
//		return super.visit(node);
//	}
	
	private void readJ2sImportTags(AbstractTypeDeclaration node) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					String tagName = tagEl.getTagName();
					if ("@j2sRequireImport".equals(tagName)) {
						readClasses(tagEl, j2sRequireImport);
					} else if ("@j2sOptionalImport".equals(tagName)) {
						readClasses(tagEl, j2sOptionalImport);
					} else if ("@j2sIgnoreImport".equals(tagName)) {
						readClasses(tagEl, j2sIgnoreImport);
					} 
				}
			}
		}
		List<?> modifiers = node.modifiers();
		for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = iter.next();
			if (obj instanceof Annotation) {
				Annotation annotation = (Annotation) obj;
				String qName = annotation.getTypeName().getFullyQualifiedName();
				int idx = qName.indexOf("J2S");
				if (idx != -1) {
					String annName = qName.substring(idx);
					annName = annName.replaceFirst("J2S", "@j2s");
					if (annName.startsWith("@j2sRequireImport")) {
						readClasses(annotation, j2sRequireImport);
					} else if (annName.startsWith("@j2sOptionalImport")) {
						readClasses(annotation, j2sOptionalImport);
					} else if (annName.startsWith("@j2sIgnoreImport")) {
						readClasses(annotation, j2sIgnoreImport);
					}
				}
			}
		}
	}

	private static void readClasses(Annotation annotation, Set<Object> set) {
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

	private static void readClasses(TagElement tagEl, Set<Object> set) {
		List<?> fragments = tagEl.fragments();
		StringBuffer buf = new StringBuffer();
		boolean isFirstLine = true;
		for (Iterator<?> iterator = fragments.iterator(); iterator
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
	
	private static String[] knownClasses = new String[] {
			"java.lang.Object",
			"java.lang.Class",
			"java.lang.String",
			"java.io.Serializable",
			"java.lang.Iterable",
			"java.lang.CharSequence",
			"java.lang.Cloneable",
			"java.lang.Comparable",
			"java.lang.Runnable",
			"java.util.Comparator",
			"java.lang.System",
			"java.io.PrintStream",
			"java.lang.Math",
			"java.lang.Integer"
	};	

	private static boolean isClassKnown(String qualifiedName) {
		for (int i = 0; i < knownClasses.length; i++) {
			if (knownClasses[i].equals(qualifiedName)) {
				return true;
			}
		}
		return false;
	}
	
	private static boolean isQualifiedNameOK(String qualifiedName, ASTNode node) {
		if (qualifiedName != null 
				&& !isClassKnown(qualifiedName)
				&& qualifiedName.indexOf('[') < 0
				&& !"int".equals(qualifiedName)
				&& !"float".equals(qualifiedName)
				&& !"double".equals(qualifiedName)
				&& !"long".equals(qualifiedName)
				&& !"short".equals(qualifiedName)
				&& !"byte".equals(qualifiedName)
				&& !"char".equals(qualifiedName)
				&& !"boolean".equals(qualifiedName)
				&& !"void".equals(qualifiedName)
				&& !qualifiedName.startsWith("org.w3c.dom.")
				) {
			ASTNode root = node.getRoot();
			if (root instanceof CompilationUnit) {
				CompilationUnit type = (CompilationUnit) root;
				boolean existedSelf = false;
				List<?> types = type.types();
				for (Iterator<?> iter = types.iterator(); iter.hasNext();) {
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
	
	private void processImports(AbstractTypeDeclaration node) {
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
					ITypeBinding dclClass = null;
					while ((dclClass = declaringClass.getDeclaringClass()) != null) {
						declaringClass = dclClass;
					}
					qualifiedName = declaringClass.getQualifiedName();
					qn.binding = declaringClass;
				} else {
					qualifiedName = superBinding.getQualifiedName();
					qn.binding = superBinding;
				}
				qualifiedName = discardGenericType(qualifiedName);
				qn.qualifiedName = qualifiedName;
				if (isQualifiedNameOK(qualifiedName, node)) {
					imports.add(qn);
				}
				//musts.add(superBinding.getQualifiedName());
			}
		}
		List<?> superInterfaces = null;
		if (node instanceof TypeDeclaration) {
			superInterfaces = ((TypeDeclaration) node).superInterfaceTypes();
		} else {
			superInterfaces = ((EnumDeclaration) node).superInterfaceTypes();
		}
		int size = superInterfaces.size();
		if (size != 0) {
			for (Iterator<?> iter = superInterfaces.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				ITypeBinding binding = ((Type) element).resolveBinding();
				QNTypeBinding qn = new QNTypeBinding();
				if (binding != null) {
					String qualifiedName;
					ITypeBinding declaringClass = binding.getDeclaringClass();
					if (declaringClass != null) {
						ITypeBinding dclClass = null;
						while ((dclClass = declaringClass.getDeclaringClass()) != null) {
							declaringClass = dclClass;
						}
						qualifiedName = declaringClass.getQualifiedName();
						qn.binding = declaringClass;
					} else {
						qualifiedName = binding.getQualifiedName();
						qn.binding = binding;
					}
					qualifiedName = discardGenericType(qualifiedName);
					qn.qualifiedName = qualifiedName;
					if (isQualifiedNameOK(qualifiedName, node)) {
						imports.add(qn);
					}
				} else {
					qn.qualifiedName = element.toString();
					qn.binding = binding;
					imports.add(qn);
				}
			}
		}
	}

	private void processJ2SRequireImport(AbstractTypeDeclaration node) {
		for (Iterator<?> iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				boolean isInteface = false;
				if (node instanceof TypeDeclaration) {
					isInteface = ((TypeDeclaration) node).isInterface();
				} else {
					isInteface = false;
				}
				if (isInteface || (node.getModifiers() & Modifier.STATIC) != 0) {
					J2SDependencyVisitor visitor = getSelfVisitor();
					element.accept(visitor);
					j2sRequireImport.addAll(visitor.imports);
					j2sRequireImport.addAll(visitor.j2sRequireImport);
					j2sRequireImport.addAll(visitor.j2sOptionalImport);
				}
			} else if (element instanceof Initializer) {
				if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
					continue;
				}
				J2SDependencyVisitor visitor = getSelfVisitor();
				element.accept(this);
				j2sRequireImport.addAll(visitor.imports);
				j2sRequireImport.addAll(visitor.j2sRequireImport);
				j2sRequireImport.addAll(visitor.j2sOptionalImport);
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (getJ2STag(field, "@j2sIgnore") != null) {
					continue;
				}
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments
								.get(j);
						Expression initializer = vdf.getInitializer();
						J2SDependencyVisitor visitor = getSelfVisitor();
						if (initializer != null) {
							initializer.accept(visitor);
						}
						j2sRequireImport.addAll(visitor.imports);
						j2sRequireImport.addAll(visitor.j2sRequireImport);
						j2sRequireImport.addAll(visitor.j2sOptionalImport);
					}
			}
		}
	}
	
	private static boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}
	
	private String discardGenericType(String name) {
		return  BindingHelper.discardGenericType(name);
	}
	
///////// delivery section -- from Java2ScriptLegayCompiler ///////////////

	/**
	 * Adjust Clazz._load calls to only include the necessary class dependencies.
	 * 
	 * The only nonprivate method here.
	 * 
	 * @param visitor
	 * @return
	 */
	public String cleanLoadCalls(J2SASTVisitor visitor) {
		checkSuperType(imports);
		checkSuperType(j2sRequireImport);
		checkSuperType(j2sOptionalImport);
		remedyDependency(imports);
		remedyDependency(j2sRequireImport);
		remedyDependency(j2sOptionalImport);

		imports.remove("");
		j2sRequireImport.remove("");
		j2sOptionalImport.remove("");

		for (Iterator<Object> iter = j2sIgnoreImport.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (imports.contains(s)) {
				imports.remove(s);
			}
			if (j2sRequireImport.contains(s)) {
				j2sRequireImport.remove(s);
			}
			if (j2sOptionalImport.contains(s)) {
				j2sOptionalImport.remove(s);
			}
		}
		for (Iterator<Object> iter = imports.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (j2sRequireImport.contains(s)) {
				j2sRequireImport.remove(s);
			}
			if (j2sOptionalImport.contains(s)) {
				j2sOptionalImport.remove(s);
			}
		}
		for (Iterator<Object> iter = j2sRequireImport.iterator(); iter.hasNext();) {
			String s = (String) iter.next();
			if (j2sOptionalImport.contains(s)) {
				j2sOptionalImport.remove(s);
			}
		}
		String js = visitor.buffer.toString();
		if (imports.size() == 0 && j2sRequireImport.size() == 0 && j2sOptionalImport.size() == 0) {
			return js;
		}
		StringBuffer buf = new StringBuffer();
		if (js.startsWith("Clazz.declarePackage")) {
			int index = js.indexOf("\r\n");
			buf.append(js.substring(0, index + 2));
			js = js.substring(index + 2);
		}

		if (j2sIgnoreImport.size() > 0) {
			// BH 2023.11.10 interfaces as well and remove javax.sound.sampled.LineListener in the following case:
			//	Clazz.instantialize (this, arguments);
			//}, org.jmol.util, "JmolAudio", null, [javax.sound.sampled.LineListener, org.jmol.api.JmolAudioPlayer]);
			int pt = js.indexOf("Clazz.instantialize");
			pt = (pt < 0 ? -1 : js.indexOf("},", pt));
			int pt1 = (pt < 0 ? -1 : js.indexOf("\r\n", pt + 2));
			if (pt1 > 0) {
				String js1 = js.substring(0, pt1);
				boolean fixed = false;
				for (Iterator<Object> iter = j2sIgnoreImport.iterator(); iter.hasNext();) {
					String s = (String) iter.next();
					pt = js1.indexOf(s);
					if (pt > 2) {
						fixed = true;
						int len = s.length();
						if (js1.charAt(pt + len) == ',') {
							len += 2;
						} else if (js1.charAt(pt - 2) == ',') {
							len += 2;
							pt -= 2;
						}
						js1 = js1.substring(0, pt) + js1.substring(pt + len);
					}
				}
				if (fixed) {
					js = js1 + js.substring(pt1);
				}
			}
		}
		
		// one of these per class
		
		buf.append("Clazz.load (");
		// clazz.load([imports],name,[interfaces],[??])
		if (imports.size() != 0 || j2sRequireImport.size() != 0) {
			buf.append("[");
			String[] ss = imports.toArray(new String[0]);
			Arrays.sort(ss);
			String lastClassName = joinArrayClasses(buf,ss, null);
			if (imports.size() != 0 && j2sRequireImport.size() != 0) {
				buf.append(", ");
			}
			ss = j2sRequireImport.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses(buf, ss, lastClassName);
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		if (allClassNames.size() > 1) {
			buf.append("[");
		}
		joinArrayClasses(buf, allClassNames.toArray(new String[allClassNames.size()]), 
				null);
		if (allClassNames.size() > 1) {
			buf.append("]");
		}
		buf.append(", ");
		if (j2sOptionalImport.size() != 0) {
			buf.append("[");
			String[] ss = j2sOptionalImport.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses(buf, ss, null);
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		buf.append("function () {\r\n");
		buf.append(js);
		buf.append("});\r\n");
		return buf.toString();
	}

	private void checkSuperType(Set<Object> set) {
		Set<QNTypeBinding> reseted = new HashSet<QNTypeBinding>();
		for (Iterator<Object> setIterator = set.iterator(); setIterator.hasNext();) {
			Object classNameOrBinding = setIterator.next();
			if (!(classNameOrBinding instanceof QNTypeBinding)) {
				continue;
			}
			QNTypeBinding qn = (QNTypeBinding) classNameOrBinding;
			boolean isRemoved = false;
			for (Iterator<ITypeBinding> classBindingIterator = allClassBindings.iterator(); classBindingIterator
					.hasNext();) {
				ITypeBinding binding = classBindingIterator.next();
				if (qn.binding != null && BindingHelper.isSuperType(binding, qn.binding)) {
					setIterator.remove();
					isRemoved = true;
					break;
				}
			}
			if (!isRemoved) {
				reseted.add(qn);
			}
		}
		set.removeAll(reseted);
		for (Iterator<QNTypeBinding> iter = reseted.iterator(); iter.hasNext();) {
			set.add(iter.next().qualifiedName);
		}
	}
	
	private void remedyDependency(Set<Object> set) {
		for (Iterator<Object> setIterator = set.iterator(); setIterator.hasNext();) {
			Object classNameOrBinding = setIterator.next();
			String setItemName = (classNameOrBinding instanceof QNTypeBinding 
					? ((QNTypeBinding) classNameOrBinding).qualifiedName
							: (String) classNameOrBinding);
			for (Iterator<String> classNameIterator = allClassNames.iterator(); classNameIterator.hasNext();) {
				if (setItemName.startsWith(classNameIterator.next() + ".")) { 
					// inner class dependency
					setIterator.remove();
					break;
				}
			}
		}
	}

	private String joinArrayClasses(StringBuffer buf, String[] ss, String last) {
		String seperator = ", ";
		String lastClassName = last;
		boolean haveExclusions = compiler.excludeFile(null);
		for (int i = 0; i < ss.length; i++) {
			String s = ss[i];
			String sf = s.replace('.', '/');
			boolean doExclude = haveExclusions && compiler.excludeFile(sf);
			if (doExclude) {
				continue;
			}
			buf.append("\"");
			boolean dollared = true;
			if (lastClassName == null) {
				dollared = false;
			} else {
				int idx1 = lastClassName.lastIndexOf('.');
				int idx2 = s.lastIndexOf('.');
				if (idx1 == -1 || idx2 == -1 || idx1 != idx2) {
					dollared = false;
				} else {
					if (lastClassName.subSequence(0, idx1).equals(s.subSequence(0, idx2))) {
						buf.append("$");
						buf.append(s.substring(idx2));
					} else {
						dollared = false;
					}
				}
			}
			if (!dollared) {
				buf.append(s);
			}
			lastClassName = s;
			buf.append("\"");
			if (i < ss.length - 1) {
				buf.append(seperator);
			}
		}
		return lastClassName;
	}
	
	
	
}

