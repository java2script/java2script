/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2005, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package swingjs.plaf;


import java.awt.Dimension;
import javax.swing.BoxLayout;
import javax.swing.JComponent;
import javax.swing.JMenuBar;
import javax.swing.LookAndFeel;
import javax.swing.plaf.UIResource;
import swingjs.api.js.DOMNode;

/**
 * The JSMenuBarUI uses a very simple bare-bones jQuery-driven ul/li menuing
 * system. See http://www.kriesi.at/wp-content/extra_data/suckerfish_tutorial/step4.html.
 * It uses only four lines of JavaScript and a bit of CSS.
 * 
 * @author Bob Hanson
 *
 */
public class JSMenuBarUI extends JSPanelUI {

//	static {
//		
//		// this mechanism allows on-demand loading of the CSS used for the menu bar 
//		
//		JSToolkit.getJavaResource("swingjs/jquery/swingjs-menu.css", true);
//	}
//

	private JMenuBar menuBar;

	public JSMenuBarUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			DOMNode.setTopLeftAbsolute(domNode, 0, 0); // after title bar
		}

		return domNode;
	}

//	private void setMenu() {
//		
//		/**
//		 * @j2sNative
//
//  $(".swingjs-menu ul").css({display: "none"});
//  $(".swingjs-menu li").hover(
//    function(){$(this).find('ul:first').css({visibility: "visible",display: "none"}).show();},
//    function(){$(this).find('ul:first').css({visibility: "hidden"});}
//   );
//   
//
//		 * 
//		 */
//		{}
//	}
//
	
	
	//	@Override
//  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
//		// SwingJS for now: just designated container width/height 
//		return new Dimension(c.getWidth(), c.getHeight());
//	}
//	
//	@Override
//	public Dimension getPreferredSize() {
//		// SwingJS should defer to containing panel
//		return null;
//	}

	@Override
	public void installUI(JComponent jc) {
		menuBar = (JMenuBar) jc;
    if (menuBar.getLayout() == null ||
        menuBar.getLayout() instanceof UIResource) {
        menuBar.setLayout(new DefaultMenuLayout(menuBar,BoxLayout.LINE_AXIS));
    }

    LookAndFeel.installColorsAndFont(jc,
        "MenuBar.background",
        "MenuBar.foreground",
        "MenuBar.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}

	
	@Override
	protected int getContainerHeight() {
		return height = 25;
	}
//	@Override
//	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
////		setMenu();
//		return new Dimension(150, 25);
//	}

	@Override
	public Dimension getPreferredSize() {
		// layout manager will call this specifically for the height
		// we could make this larger if it ends up being multilevel?
  	Dimension d = new Dimension(0, 25);
  	return d;
	}

}
