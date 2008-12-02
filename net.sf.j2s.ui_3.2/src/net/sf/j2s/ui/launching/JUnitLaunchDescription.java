/*******************************************************************************
 * Copyright (c) 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     David Saff (saff@mit.edu) - initial API and implementation
 *             (bug 102632: [JUnit] Support for JUnit 4.)
 *******************************************************************************/

package net.sf.j2s.ui.launching;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.internal.corext.util.JavaModelUtil;
import org.eclipse.jdt.internal.junit.launcher.JUnitBaseLaunchConfiguration;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;

public class JUnitLaunchDescription {
	static final String[] ATTRIBUTES_THAT_MUST_MATCH = new String[] {
			IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME,
			JUnitBaseLaunchConfiguration.LAUNCH_CONTAINER_ATTR,
			IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME,
			JUnitBaseLaunchConfiguration.TESTNAME_ATTR
	};

	static final String EMPTY= ""; //$NON-NLS-1$

	private static final String DEFAULT_VALUE= ""; //$NON-NLS-1$

	private Map fAttributes= new HashMap();

	private final IJavaElement fElement;

	private final String fName;

	public JUnitLaunchDescription(IJavaElement element, String name) {
		fElement= element;
		fName= name;
		setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, getProjectName());
	}

	public void copyAttributesInto(ILaunchConfigurationWorkingCopy wc) {
		wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, getProjectName());
		wc.setAttribute(JUnitBaseLaunchConfiguration.ATTR_KEEPRUNNING, false);

		Set definedAttributes= getDefinedAttributes();
		for (Iterator iter= definedAttributes.iterator(); iter.hasNext();) {
			Entry attribute= (Entry) iter.next();
			wc.setAttribute((String) attribute.getKey(), (String) attribute.getValue());
		}
	}

	public boolean equals(Object arg0) {
		JUnitLaunchDescription desc = (JUnitLaunchDescription) arg0;
		return areEqual(desc.fElement, fElement) && areEqual(desc.fName, fName)
				&& areEqual(desc.fAttributes, fAttributes);
	}

	public String getAttribute(String attr) {
		if (fAttributes.containsKey(attr))
			return (String) fAttributes.get(attr);
		return DEFAULT_VALUE;
	}

	public String getContainer() {
		return getAttribute(JUnitBaseLaunchConfiguration.LAUNCH_CONTAINER_ATTR);
	}

	public Set getDefinedAttributes() {
		return fAttributes.entrySet();
	}

	public IJavaElement getElement() {
		return fElement;
	}

	public String getName() {
		return fName;
	}

	public JUnitLaunchDescription setContainer(String handleIdentifier) {
		return setAttribute(JUnitBaseLaunchConfiguration.LAUNCH_CONTAINER_ATTR, handleIdentifier);
	}

	public JUnitLaunchDescription setMainType(String mainType) {
		return setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, mainType);
	}

	public JUnitLaunchDescription setTestKind(String testKindId) {
		return setAttribute(JUnitBaseLaunchConfiguration.TEST_KIND_ATTR, testKindId);
	}

	public JUnitLaunchDescription setTestName(String testName) {
		return setAttribute(JUnitBaseLaunchConfiguration.TESTNAME_ATTR, testName);
	}

	public String toString() {
		return "JUnitLaunchDescription(" + fName + ")"; //$NON-NLS-1$//$NON-NLS-2$
	}

	protected String getProjectName() {
		IJavaProject project = getProject();
		return project == null ? null : project.getElementName();
	}

	boolean attributesMatch(ILaunchConfiguration config) throws CoreException {
		for (int i = 0; i < ATTRIBUTES_THAT_MUST_MATCH.length; i++) {
			if (! configurationMatches(ATTRIBUTES_THAT_MUST_MATCH[i], config)) {
				return false;
			}
		}
		return true;
	}

	boolean configurationMatches(final String attributeName, ILaunchConfiguration config) throws CoreException {
		return config.getAttribute(attributeName, EMPTY).equals(getAttribute(attributeName));
	}

	void setMainType(IType type) {
		setMainType(JavaModelUtil.getFullyQualifiedName(type));
	}

	private boolean areEqual(Object thing, Object otherThing) {
		if (thing == null)
			return otherThing == null;
		return thing.equals(otherThing);
	}

	public IJavaProject getProject() {
		return fElement == null ? null : fElement.getJavaProject();
	}

	private JUnitLaunchDescription setAttribute(String attr, String value) {
		fAttributes.put(attr, value);
		return this;
	}
}
