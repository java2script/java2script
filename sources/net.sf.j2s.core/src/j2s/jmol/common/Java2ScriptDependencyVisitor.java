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

package j2s.jmol.common;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
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
import org.eclipse.jdt.core.dom.PackageDeclaration;
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
 * ASTVisitor > ASTEmptyVisitor > ASTKeywordVisitor > Java2ScriptDependencyVisitor
 * 
 * This class is called by root.accept(me) in the first pass of the
 * transpiler to catalog all the references to classes and then later
 * called by Java2ScriptVisitor to process those.
 * 
 * @author zhou renjian
 * 
 * 2006-5-2
 */
public class Java2ScriptDependencyVisitor extends J2SASTVisitor {

	private static class QNTypeBinding {
		String qualifiedName;
		ITypeBinding binding;
		
		public QNTypeBinding() {
			// TODO Auto-generated constructor stub
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

	public Java2ScriptDependencyVisitor() {
		super();
	}
	
	public Java2ScriptDependencyVisitor(Java2ScriptCompiler compiler) {
		super();
		setCompiler(compiler);
	}
	
	
	
	private Java2ScriptDependencyVisitor setCompiler(Java2ScriptCompiler compiler) {
		this.compiler = compiler;
		return this;
	}



	protected Set<String> classNameSet = new HashSet<String>();

	protected Set<ITypeBinding> classBindingSet = new HashSet<ITypeBinding>();

	protected Set<Object> imports = new HashSet<Object>();
	
	protected Set<Object> j2sRequireImport = new HashSet<Object>();
	
	protected Set<Object> j2sOptionalImport = new HashSet<Object>();
	
	protected Set<Object> j2sIgnoreImport = new HashSet<Object>();

	private boolean isDebugging = false;
	
	public boolean isDebugging() {
		return isDebugging;
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}

	///////// initialization methods - from root.accept(me) ////////////
	
	public boolean visit(PackageDeclaration node) {
		ASTPackageVisitor packageVisitor = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class));
		packageVisitor.setPackageName("" + node.getName());
		return false;
	}


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
		readTags(node);

		visitForMusts(node);
		visitForRequires(node);
		//visitForOptionals(node);
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
		readTags(node);

		imports.add("java.lang.Enum");
		visitForMusts(node);
		visitForRequires(node);
		//visitForOptionals(node);
		return super.visit(node);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ClassInstanceCreation)
	 */
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.TypeLiteral)
	 * 
	 * Foo.class
	 * 
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.FieldAccess)
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
	
	public boolean visit(FieldDeclaration node) {
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		return super.visit(node);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.
	 * MethodInvocation)
	 */
	public boolean visit(MethodInvocation node) {
		/*
		 * sgurin: last fix: returning to original version of the method because
		 * a bug was introduced in my last modifications.
		 */
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
		IMethodBinding mBinding = node.resolveBinding();
		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", "deal")) {
			ITypeBinding[] parameterTypes = mBinding.getParameterTypes();
			if (parameterTypes != null && parameterTypes.length == 1) {
				ITypeBinding paramType = parameterTypes[0];
				ITypeBinding declaringClass = paramType.getDeclaringClass();
				QNTypeBinding qn = new QNTypeBinding();
				String qualifiedName = null;
				if (declaringClass != null) {
					qn.binding = declaringClass;
					qualifiedName = declaringClass.getQualifiedName();
				} else {
					qn.binding = paramType;
					qualifiedName = paramType.getQualifiedName();
				}
				qn.qualifiedName = discardGenericType(qualifiedName);
				j2sOptionalImport.add(qn);
			}
		}
		
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
	
	boolean visitNativeJavadoc(Javadoc javadoc, Block node, boolean superVisit) {
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						return false;
					}
				}
				if (isDebugging) {
					for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sDebug".equals(tagEl.getTagName())) {
							if (superVisit) super.visit(node);
							return false;
						}
					}
				}
//				if (!toCompileVariableName) {
//					for (Iterator iter = tags.iterator(); iter.hasNext();) {
//						TagElement tagEl = (TagElement) iter.next();
//						if ("@j2sNativeSrc".equals(tagEl.getTagName())) {
//							if (superVisit) super.visit(node);
//							return false;
//						}
//					}
//				}
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sNative".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						return false;
					}
				}
			}
		}
		return true;
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
//				List<?> commentList = unit.getCommentList();
//				ArrayList<Comment> list = new ArrayList<Comment>();
//				for (Iterator<?> iter = commentList.iterator(); iter.hasNext();) {
//					Comment comment = (Comment) iter.next();
//					if (comment instanceof Javadoc) {
//						Javadoc javadoc = (Javadoc) comment;
//						List<?> tags = javadoc.tags();
//						if (tags.size() != 0) {
//							for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
//								TagElement tagEl = (TagElement) itr.next();
//								String tagName = tagEl.getTagName();
//								if ("@j2sIgnore".equals(tagName)
//										|| "@j2sDebug".equals(tagName)
//										|| "@j2sNative".equals(tagName)) {
//									list.add(comment);
//								}
//							}
//						}
//					}
//				}
//				nativeJavadoc = (Javadoc[]) list.toArray(nativeJavadoc);
//			}
//		}
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
	
	/**
	 * Method with "j2s*" tag.
	 * 
	 * @param node
	 * @return
	 */
	protected Object getJ2STag(BodyDeclaration node, String tagName) {
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
					if (annName.startsWith(tagName)) {
						return annotation;
					}
				}
			}
		}
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						return tagEl;
					}
				}
			}
		}
		return null;
	}

	protected void readClasses(Annotation annotation, Set<Object> set) {
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

	protected void readClasses(TagElement tagEl, Set<Object> set) {
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
	private void readTags(AbstractTypeDeclaration node) {
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

	public boolean isClassKnown(String qualifiedName) {
		String[] knownClasses = new String[] {
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
		
		for (int i = 0; i < knownClasses.length; i++) {
			if (knownClasses[i].equals(qualifiedName)) {
				return true;
			}
		}
		return false;
	}
	public boolean isQualifiedNameOK(String qualifiedName, ASTNode node) {
		if (qualifiedName != null 
				&& !isClassKnown(qualifiedName)
				&& qualifiedName.indexOf('[') == -1
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
				&& !qualifiedName.startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qualifiedName.startsWith("net.sf.j2s.html.")) {
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

	protected void visitForRequires(AbstractTypeDeclaration node) {
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
					Java2ScriptDependencyVisitor visitor = getSelfVisitor();
					element.accept(visitor);
					j2sRequireImport.addAll(visitor.imports);
					j2sRequireImport.addAll(visitor.j2sRequireImport);
					j2sRequireImport.addAll(visitor.j2sOptionalImport);
				}
			} else if (element instanceof Initializer) {
				if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
					continue;
				}
				Java2ScriptDependencyVisitor visitor = getSelfVisitor();
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
						Java2ScriptDependencyVisitor visitor = getSelfVisitor();
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
	
	private Java2ScriptDependencyVisitor getSelfVisitor() {
		try {
			Java2ScriptDependencyVisitor newVisitor = ((Java2ScriptDependencyVisitor) this.getClass().getConstructor(new Class[0]).newInstance(new Object[0])).setCompiler(compiler);
			return newVisitor;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

//	protected void visitForOptionals(AbstractTypeDeclaration node) {
//
//	}

	protected boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}
	
///////// delivery section -- from ASTScriptVisitor ///////////////
	
	public String discardGenericType(String name) {
		return  ASTTypeVisitor.discardGenericType(name);
	}
	
	public String getPackageName() {
		return ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
	}
	/**
	 * @return Returns the thisClassName.
	 */
	public String[] getClassNames() {
		return classNameSet.toArray(new String[0]);
	}
	
	protected void checkSuperType(Set<Object> set) {
		Set<QNTypeBinding> removed = new HashSet<QNTypeBinding>();
		Set<QNTypeBinding> reseted = new HashSet<QNTypeBinding>();
		for (Iterator<Object> iter = set.iterator(); iter.hasNext();) {
			Object n = iter.next();
			if (n instanceof QNTypeBinding) {
				QNTypeBinding qn = (QNTypeBinding) n;
				boolean isRemoved = false;
				for (Iterator<ITypeBinding> iterator = classBindingSet.iterator(); iterator
						.hasNext();) {
					ITypeBinding binding = iterator.next();
					if (qn.binding != null && Bindings.isSuperType(binding, qn.binding)) {
						removed.add(qn);
						isRemoved = true;
						break;
					}
				}
				if (!isRemoved) {
					reseted.add(qn);
				}
			}
		}
		set.removeAll(removed);
		set.removeAll(reseted);
		for (Iterator<QNTypeBinding> i = reseted.iterator(); i.hasNext();) {
			QNTypeBinding qn = i.next();
			set.add(qn.qualifiedName);
		}
	}
	

	protected void remedyDependency(Set<Object> set) {
		String[] classNames = getClassNames();
		for (int i = 0; i < classNames.length; i++) {
			if ("net.sf.j2s.ajax.ASWTClass".equals(classNames[i])) {
				return;
			}
		}
		List<Object> toRemoveList = new ArrayList<Object>();
		boolean needRemedy = false;
		for (Iterator<Object> iterator = set.iterator(); iterator.hasNext();) {
			Object next = iterator.next();
			String name = null;
			if (next instanceof QNTypeBinding) {
				QNTypeBinding qn = (QNTypeBinding) next;
				name = qn.qualifiedName;
			} else {
				name = (String) next;
			}
			if ("net.sf.j2s.ajax.AClass".equals(name)
					|| "net.sf.j2s.ajax.ASWTClass".equals(name)) {
				needRemedy = true;
				//break;
			}
			for (Iterator<String> itr = classNameSet.iterator(); itr.hasNext();) {
				String className = itr.next();
				if (name.startsWith(className + ".")) { // inner class dependency
					toRemoveList.add(next);
				}
			}
		}
		if (needRemedy) {
			set.add("java.lang.reflect.Constructor");
		}
		for (Iterator<Object> iterator = toRemoveList.iterator(); iterator.hasNext();) {
			set.remove(iterator.next());
		}
	}

	public String getDependencyScript(StringBuffer mainJS) {
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
		String js = mainJS.toString();
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
		buf.append("Clazz.load (");
		// clazz.load([imports],name,[interfaces],[??])
		if (imports.size() != 0 || j2sRequireImport.size() != 0) {
			buf.append("[");
			String[] ss = imports.toArray(new String[0]);
			Arrays.sort(ss);
			String lastClassName = joinArrayClasses("imports",buf, ss, null);
			if (imports.size() != 0 && j2sRequireImport.size() != 0) {
				buf.append(", ");
			}
			ss = j2sRequireImport.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses("requireImports", buf, ss, lastClassName);
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		if (classNameSet.size() > 1) {
			buf.append("[");
		}
		joinArrayClasses("getClassNames()", buf, getClassNames(), null);
		if (classNameSet.size() > 1) {
			buf.append("]");
		}
		buf.append(", ");
		if (j2sOptionalImport.size() != 0) {
			buf.append("[");
			String[] ss = j2sOptionalImport.toArray(new String[0]);
			Arrays.sort(ss);
			joinArrayClasses("optional", buf, ss, null);
			buf.append("], ");
		} else {
			buf.append("null, ");
		}
		buf.append("function () {\r\n");
		buf.append(js);
		buf.append("});\r\n");
		return buf.toString();
	}

	private String joinArrayClasses(String why, StringBuffer buf, String[] ss, String last) {
		return joinArrayClasses(why, buf, ss, last, ", ");
	}
	
	/**
	 * @param why  
	 */
	private String joinArrayClasses(String why, StringBuffer buf, String[] ss, String last, String seperator) {
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

