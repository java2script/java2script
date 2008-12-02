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

package java.lang;

/**
 * @author zhou renjian
 *
 * 2006-5-5
 */
public class ThreadGroup {

    ThreadGroup parent;
    String name;
    int maxPriority;

    /**
     * Creates an empty Thread group that is not in any Thread group. 
     * This method is used to create the system Thread group.
     */
    protected ThreadGroup() {	// called from C code
	this.name = "system";
	this.maxPriority = Thread.MAX_PRIORITY;
    }

    /**
     * Constructs a new thread group. The parent of this new group is 
     * the thread group of the currently running thread. 
     * <p>
     * The <code>checkAccess</code> method of the parent thread group is 
     * called with no arguments; this may result in a security exception. 
     *
     * @param   name   the name of the new thread group.
     * @exception  SecurityException  if the current thread cannot create a
     *               thread in the specified thread group.
     * @see     java.lang.ThreadGroup#checkAccess()
     * @since   JDK1.0
     */
    public ThreadGroup(String name) {
    	this(Thread.currentThread().getThreadGroup(), name);
	}

    /**
     * Creates a new thread group. The parent of this new group is the 
     * specified thread group. 
     * <p>
     * The <code>checkAccess</code> method of the parent thread group is 
     * called with no arguments; this may result in a security exception. 
     *
     * @param     parent   the parent thread group.
     * @param     name     the name of the new thread group.
     * @exception  NullPointerException  if the thread group argument is
     *               <code>null</code>.
     * @exception  SecurityException  if the current thread cannot create a
     *               thread in the specified thread group.
     * @see     java.lang.SecurityException
     * @see     java.lang.ThreadGroup#checkAccess()
     * @since   JDK1.0
     */
    public ThreadGroup(ThreadGroup parent, String name) {
	if (parent == null) {
	    throw new NullPointerException();
	}
	this.name = name;
	this.parent = parent;
	this.maxPriority = Thread.MAX_PRIORITY;
    }

    /**
     * Returns the name of this thread group.
     *
     * @return  the name of this thread group.
     * @since   JDK1.0
     */
    public final String getName() {
	return name;
    }

    /**
     * Returns the parent of this thread group.
     * <p>
     * First, if the parent is not <code>null</code>, the 
     * <code>checkAccess</code> method of the parent thread group is 
     * called with no arguments; this may result in a security exception. 
     *
     * @return  the parent of this thread group. The top-level thread group
     *          is the only thread group whose parent is <code>null</code>.
     * @exception  SecurityException  if the current thread cannot modify
     *               this thread group.
     * @see        java.lang.ThreadGroup#checkAccess()
     * @see        java.lang.SecurityException
     * @see        java.lang.RuntimePermission
     * @since   JDK1.0
     */
    public final ThreadGroup getParent() {
	return parent;
    }

    /**
     * Returns the maximum priority of this thread group. Threads that are
     * part of this group cannot have a higher priority than the maximum
     * priority.
     *
     * @return  the maximum priority that a thread in this thread group
     *          can have.
     * @see     #setMaxPriority
     * @since   JDK1.0
     */
    public final int getMaxPriority() {
	return maxPriority;
    }

}
