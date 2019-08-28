/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See W3C License http://www.w3.org/Consortium/Legal/ for more
 * details.
 */

package org.w3c.dom.traversal;

import org.w3c.dom.Node;

/**
 *  Filters are objects that know how to "filter out" nodes. If a
 * <code>NodeIterator</code> or <code>TreeWalker</code> is given a
 * <code>NodeFilter</code> , it applies the filter before it returns the next 
 * node. If the filter says to accept the node, the traversal logic returns 
 * it; otherwise, traversal looks for the next node and pretends that the 
 * node that was rejected was not there.
 * <p> The DOM does not provide any filters. <code>NodeFilter</code> is just an
 *  interface that users can implement to provide their own filters. 
 * <p><code>NodeFilters</code> do not need to know how to traverse from node to
 *  node, nor do they need to know anything about the data structure that is 
 * being traversed. This makes it very easy to write filters, since the only 
 * thing they have to know how to do is evaluate a single node. One filter 
 * may be used with a number of different kinds of traversals, encouraging 
 * code reuse.
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 * @since DOM Level 2
 */
public interface NodeFilter {
    // Constants returned by acceptNode
    public static final short FILTER_ACCEPT             = 1;
    public static final short FILTER_REJECT             = 2;
    public static final short FILTER_SKIP               = 3;

    // Constants for whatToShow
    public static final int SHOW_ALL                  = 0xFFFFFFFF;
    public static final int SHOW_ELEMENT              = 0x00000001;
    public static final int SHOW_ATTRIBUTE            = 0x00000002;
    public static final int SHOW_TEXT                 = 0x00000004;
    public static final int SHOW_CDATA_SECTION        = 0x00000008;
    public static final int SHOW_ENTITY_REFERENCE     = 0x00000010;
    public static final int SHOW_ENTITY               = 0x00000020;
    public static final int SHOW_PROCESSING_INSTRUCTION = 0x00000040;
    public static final int SHOW_COMMENT              = 0x00000080;
    public static final int SHOW_DOCUMENT             = 0x00000100;
    public static final int SHOW_DOCUMENT_TYPE        = 0x00000200;
    public static final int SHOW_DOCUMENT_FRAGMENT    = 0x00000400;
    public static final int SHOW_NOTATION             = 0x00000800;

    /**
     *  Test whether a specified node is visible in the logical view of a
     * <code>TreeWalker</code> or <code>NodeIterator</code> . This function 
     * will be called by the implementation of <code>TreeWalker</code> and
     * <code>NodeIterator</code> ; it is not normally called directly from 
     * user code. (Though you could do so if you wanted to use the same 
     * filter to guide your own application logic.)
     * @param n  The node to check to see if it passes the filter or not.
     * @return  a constant to determine whether the node is accepted, 
     *   rejected, or skipped, as defined  above .
     */
    public short acceptNode(Node n);

}

