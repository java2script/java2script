/*
 * Copyright 1998-2006 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
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
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

package swingjs.plaf;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.beans.PropertyChangeListener;
import java.io.File;

import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ActionMap;
import javax.swing.InputMap;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFileChooser;
import javax.swing.JPanel;
import javax.swing.LookAndFeel;
import javax.swing.SwingUtilities;
import javax.swing.plaf.ActionMapUIResource;

import sun.swing.DefaultLookup;

/**
 * Basic L&F implementation of a FileChooser.
 *
 * @author Jeff Dinkins
 */
public class JSFileChooserUI extends JSPanelUI {

    public final static String ACTION_APPROVE_SELECTION = "approveSelection";
    public final static String ACTION_CANCEL            = "cancelSelection";

    protected int openButtonMnemonic = 0;
    protected int cancelButtonMnemonic = 0;

    protected String openButtonText = null;
    protected String cancelButtonText = null;


    private String openDialogTitleText = null;

    // Some generic FileChooser functions
    private Action approveSelectionAction = new ApproveSelectionAction();
    private Action cancelSelectionAction = new CancelSelectionAction();
    private JFileChooser filechooser = null;


    private PropertyChangeListener propertyChangeListener = null;

    // The accessoryPanel is a container to place the JFileChooser accessory component
    private JPanel accessoryPanel = null;


    public void installUI(JComponent c) {
        accessoryPanel = new JPanel(new BorderLayout());
        filechooser = (JFileChooser) c;

        installDefaults(filechooser);
        installComponents(filechooser);
        installListeners(filechooser);
        filechooser.applyComponentOrientation(filechooser.getComponentOrientation());
    }

    public void uninstallUI(JComponent c) {
        uninstallListeners((JFileChooser) filechooser);
        uninstallComponents((JFileChooser) filechooser);
        uninstallDefaults((JFileChooser) filechooser);

        if(accessoryPanel != null) {
            accessoryPanel.removeAll();
        }

        accessoryPanel = null;
        getFileChooser().removeAll();
    }

    public void installComponents(JFileChooser fc) {
    }

    public void uninstallComponents(JFileChooser fc) {
    }

    protected void installListeners(JFileChooser fc) {
        propertyChangeListener = createPropertyChangeListener(fc);
        if(propertyChangeListener != null) {
            fc.addPropertyChangeListener(propertyChangeListener);
        }
        //fc.addPropertyChangeListener(getModel());

        InputMap inputMap = getInputMap(JComponent.
                                        WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
        SwingUtilities.replaceUIInputMap(fc, JComponent.
                                         WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, inputMap);
        ActionMap actionMap = getActionMap();
        SwingUtilities.replaceUIActionMap(fc, actionMap);
    }

    InputMap getInputMap(int condition) {
        if (condition == JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT) {
            return (InputMap)DefaultLookup.get(getFileChooser(), this,
                    "FileChooser.ancestorInputMap");
        }
        return null;
    }

    ActionMap getActionMap() {
        return createActionMap();
    }

    ActionMap createActionMap() {
        ActionMap map = new ActionMapUIResource();
        map.put(ACTION_APPROVE_SELECTION, getApproveSelectionAction());
        map.put(ACTION_CANCEL, getCancelSelectionAction());
        return map;
    }


    protected void uninstallListeners(JFileChooser fc) {
        if(propertyChangeListener != null) {
            fc.removePropertyChangeListener(propertyChangeListener);
        }
        SwingUtilities.replaceUIInputMap(fc, JComponent.
                                         WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, null);
        SwingUtilities.replaceUIActionMap(fc, null);
    }


    protected boolean readOnly = true;
    protected boolean usesSIngleFilePane = true;
    
    protected void installDefaults(JFileChooser fc) {
        installStrings(fc);
       LookAndFeel.installProperty(fc, "opaque", Boolean.FALSE);
    }

    protected void installStrings(JFileChooser fc) {

        openButtonText   = "Open";//UIManager.getString("FileChooser.openButtonText",l);
        openDialogTitleText = "Open File";//UIManager.getString("FileChooser.openDialogTitleText",l);
        cancelButtonText = "Cancel";//UIManager.getString("FileChooser.cancelButtonText",l);
    }

    protected void uninstallDefaults(JFileChooser fc) {
        uninstallStrings(fc);
    }

    protected void uninstallStrings(JFileChooser fc) {
        openButtonText   = null;
        cancelButtonText = null;
    }

    public PropertyChangeListener createPropertyChangeListener(JFileChooser fc) {
        return null;
    }

    public String getFileName() {
        return null;
    }

    public String getDirectoryName() {
        return null;
    }

    public void setFileName(String filename) {
    }

    public void setDirectoryName(String dirname) {
    }

    public void rescanCurrentDirectory(JFileChooser fc) {
    }

    public void ensureFileIsVisible(JFileChooser fc, File f) {
    }

    public JFileChooser getFileChooser() {
        return filechooser;
    }

    public JPanel getAccessoryPanel() {
        return accessoryPanel;
    }

    protected JButton getApproveButton(JFileChooser fc) {
        return null;
    }

    public String getApproveButtonToolTipText(JFileChooser fc) {
        return null;
    }


    // *******************************************************
    // ************ FileChooser UI PLAF methods **************
    // *******************************************************

    /**
     * Returns the title of this dialog
     */
    public String getDialogTitle(JFileChooser fc) {
        String dialogTitle = fc.getDialogTitle();
        if (dialogTitle != null) {
            return dialogTitle;
        } else if (fc.getDialogType() == JFileChooser.OPEN_DIALOG) {
            return openDialogTitleText;
        } else {
            return getApproveButtonText(fc);
        }
    }


    public int getApproveButtonMnemonic(JFileChooser fc) {
    	return 0;
    }

    public String getApproveButtonText(JFileChooser fc) {
        String buttonText = fc.getApproveButtonText();
        if (buttonText != null) {
            return buttonText;
        } else if (fc.getDialogType() == JFileChooser.OPEN_DIALOG) {
            return openButtonText;
        } else {
            return null;
        }
    }


    // *****************************
    // ***** Directory Actions *****
    // *****************************

    public Action getApproveSelectionAction() {
        return approveSelectionAction;
    }

    public Action getCancelSelectionAction() {
        return cancelSelectionAction;
    }

    /**
     * Responds to an Open or Save request
     */
    protected class ApproveSelectionAction extends AbstractAction {
        protected ApproveSelectionAction() {
            super(ACTION_APPROVE_SELECTION);
        }
        public void actionPerformed(ActionEvent e) {

            JFileChooser chooser = getFileChooser();

            String filename = getFileName();
            if (filename != null) {
                // Remove whitespace from beginning and end of filename
                filename = filename.trim();
            }

            if (filename == null || filename.equals("")) {
                return;
            }

            File selectedFile = new File(filename);
            if (selectedFile != null) {
                chooser.setSelectedFile(selectedFile);
                chooser.approveSelection();
            }
        }
    }


    /**
     * Responds to a cancel request.
     */
    protected class CancelSelectionAction extends AbstractAction {
        public void actionPerformed(ActionEvent e) {
            getFileChooser().cancelSelection();
        }
    }

}
