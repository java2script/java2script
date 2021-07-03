/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1998, 2004, Oracle and/or its affiliates. All rights reserved.
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

package javax.swing.colorchooser;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;

import javax.swing.Icon;
import javax.swing.JColorChooser;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

/**
 * The standard RGB chooser.
 * <p>
 * <strong>Warning:</strong>
 * Serialized objects of this class will not be compatible with
 * future Swing releases. The current serialization support is
 * appropriate for short term storage or RMI between applications running
 * the same version of Swing.  As of 1.4, support for long term storage
 * of all JavaBeans<sup><font size="-2">TM</font></sup>
 * has been added to the <code>java.beans</code> package.
 * Please see {@link java.beans.XMLEncoder}.
 *
 * @author Steve Wilson
 * @author Mark Davidson
 * @see JColorChooser
 * @see AbstractColorChooserPanel
 */
class DefaultRGBChooserPanel extends AbstractColorChooserPanel implements ChangeListener {

    protected JSlider redSlider;
    protected JSlider greenSlider;
    protected JSlider blueSlider;
    protected JSpinner redField;
    protected JSpinner blueField;
    protected JSpinner greenField;

    private final int minValue = 0;
    private final int maxValue = 255;

    private boolean isAdjusting = false; // indicates the fields are being set internally

    public DefaultRGBChooserPanel() {
        super();
        setInheritsPopupMenu(true);
    }

    /**
     * Sets the values of the controls to reflect the color
     */
    private void setColor( Color newColor ) {
        int red = newColor.getRed();
        int blue = newColor.getBlue();
        int green = newColor.getGreen();

        if (redSlider.getValue() != red) {
            redSlider.setValue(red);
        }
        if (greenSlider.getValue() != green) {
            greenSlider.setValue(green);
        }
        if (blueSlider.getValue() != blue) {
            blueSlider.setValue(blue);
        }

        if (((Integer)redField.getValue()).intValue() != red)
            redField.setValue(new Integer(red));
        if (((Integer)greenField.getValue()).intValue() != green)
            greenField.setValue(new Integer(green));
        if (((Integer)blueField.getValue()).intValue() != blue )
            blueField.setValue(new Integer(blue));
    }

    @Override
		public String getDisplayName() {
        return "RGB";//UIManager.getString("ColorChooser.rgbNameText");
    }

    /**
     * Provides a hint to the look and feel as to the
     * <code>KeyEvent.VK</code> constant that can be used as a mnemonic to
     * access the panel. A return value <= 0 indicates there is no mnemonic.
     * <p>
     * The return value here is a hint, it is ultimately up to the look
     * and feel to honor the return value in some meaningful way.
     * <p>
     * This implementation looks up the value from the default
     * <code>ColorChooser.rgbMnemonic</code>, or if it
     * isn't available (or not an <code>Integer</code>) returns -1.
     * The lookup for the default is done through the <code>UIManager</code>:
     * <code>UIManager.get("ColorChooser.rgbMnemonic");</code>.
     *
     * @return KeyEvent.VK constant identifying the mnemonic; <= 0 for no
     *         mnemonic
     * @see #getDisplayedMnemonicIndex
     * @since 1.4
     */
    @Override
		public int getMnemonic() {
        return getInt("ColorChooser.rgbMnemonic", -1);
    }

    /**
     * Provides a hint to the look and feel as to the index of the character in
     * <code>getDisplayName</code> that should be visually identified as the
     * mnemonic. The look and feel should only use this if
     * <code>getMnemonic</code> returns a value > 0.
     * <p>
     * The return value here is a hint, it is ultimately up to the look
     * and feel to honor the return value in some meaningful way. For example,
     * a look and feel may wish to render each
     * <code>AbstractColorChooserPanel</code> in a <code>JTabbedPane</code>,
     * and further use this return value to underline a character in
     * the <code>getDisplayName</code>.
     * <p>
     * This implementation looks up the value from the default
     * <code>ColorChooser.rgbDisplayedMnemonicIndex</code>, or if it
     * isn't available (or not an <code>Integer</code>) returns -1.
     * The lookup for the default is done through the <code>UIManager</code>:
     * <code>UIManager.get("ColorChooser.rgbDisplayedMnemonicIndex");</code>.
     *
     * @return Character index to render mnemonic for; -1 to provide no
     *                   visual identifier for this panel.
     * @see #getMnemonic
     * @since 1.4
     */
    @Override
		public int getDisplayedMnemonicIndex() {
        return getInt("ColorChooser.rgbDisplayedMnemonicIndex", -1);
    }

    @Override
		public Icon getSmallDisplayIcon() {
        return null;
    }

    @Override
		public Icon getLargeDisplayIcon() {
        return null;
    }

    /**
     * The background color, foreground color, and font are already set to the
     * defaults from the defaults table before this method is called.
     */
    @Override
		public void installChooserPanel(JColorChooser enclosingChooser) {
        super.installChooserPanel(enclosingChooser);
    }

    @Override
		protected void buildChooser() {

        String redString = "Red";//UIManager.getString("ColorChooser.rgbRedText");
        String greenString = "Green";//UIManager.getString("ColorChooser.rgbGreenText");
        String blueString = "Blue";//UIManager.getString("ColorChooser.rgbBlueText");

        setLayout( new BorderLayout() );
        Color color = getColorFromModel();


        JPanel enclosure = new JPanel();
        enclosure.setLayout( new SmartGridLayout( 3, 3 ) );
        enclosure.setInheritsPopupMenu(true);

        // The panel that holds the sliders

        add( enclosure, BorderLayout.CENTER );
        //        sliderPanel.setBorder(new LineBorder(Color.black));

        // The row for the red value
        JLabel l = new JLabel(redString);
        l.setDisplayedMnemonic(AbstractColorChooserPanel.getInt("ColorChooser.rgbRedMnemonic", -1));
        enclosure.add(l);
        redSlider = newSlider(color.getRed(), l);
        enclosure.add(redSlider);
        redField = new JSpinner(
            new SpinnerNumberModel(color.getRed(), minValue, maxValue, 1));
        redField.setInheritsPopupMenu(true);
        JPanel redFieldHolder = new JPanel(new CenterLayout());
        redFieldHolder.setInheritsPopupMenu(true);
        redField.addChangeListener(this);
        redFieldHolder.add(redField);
        enclosure.add(redFieldHolder);

        // The row for the green value
        l = new JLabel(greenString);
        l.setDisplayedMnemonic(AbstractColorChooserPanel.getInt("ColorChooser.rgbGreenMnemonic", -1));
        enclosure.add(l);
        greenSlider = newSlider(color.getGreen(), l);
        enclosure.add(greenSlider);
        greenField = new JSpinner(
            new SpinnerNumberModel(color.getGreen(), minValue, maxValue, 1));
        greenField.setInheritsPopupMenu(true);
        JPanel greenFieldHolder = new JPanel(new CenterLayout());
        greenFieldHolder.add(greenField);
        greenFieldHolder.setInheritsPopupMenu(true);
        greenField.addChangeListener(this);
        enclosure.add(greenFieldHolder);

        // The slider for the blue value
        l = new JLabel(blueString);
        l.setDisplayedMnemonic(AbstractColorChooserPanel.getInt("ColorChooser.rgbBlueMnemonic", -1));
        enclosure.add(l);
        blueSlider = newSlider(color.getBlue(), l);
        enclosure.add(blueSlider);
        blueField = new JSpinner(
            new SpinnerNumberModel(color.getBlue(), minValue, maxValue, 1));
        blueField.setInheritsPopupMenu(true);
        JPanel blueFieldHolder = new JPanel(new CenterLayout());
        blueFieldHolder.add(blueField);
        blueField.addChangeListener(this);
        blueFieldHolder.setInheritsPopupMenu(true);
        enclosure.add(blueFieldHolder);

        redSlider.addChangeListener( this );
        greenSlider.addChangeListener( this );
        blueSlider.addChangeListener( this );

        redSlider.putClientProperty("JSlider.isFilled", Boolean.TRUE);
        greenSlider.putClientProperty("JSlider.isFilled", Boolean.TRUE);
        blueSlider.putClientProperty("JSlider.isFilled", Boolean.TRUE);
    }

    private JSlider newSlider(int val, JLabel l) {
        JSlider s = new JSlider(JSlider.HORIZONTAL, 0, 255, val);
        s.setFont(new Font("Helvetica", Font.PLAIN, 8));
        s.setMajorTickSpacing( 85 );
        s.setMinorTickSpacing( 17 );
        s.setPaintTicks( true );
        s.setPaintLabels( true );
        s.setInheritsPopupMenu(true);
        l.setLabelFor(s);
        return s;
	}

	@Override
		public void uninstallChooserPanel(JColorChooser enclosingChooser) {
        super.uninstallChooserPanel(enclosingChooser);
        removeAll();
    }

    @Override
		public void updateChooser() {
        if (!isAdjusting) {
            isAdjusting = true;

            setColor(getColorFromModel());

            isAdjusting = false;
        }
    }

    @Override
		public void stateChanged( ChangeEvent e ) {
        if ( e.getSource() instanceof JSlider && !isAdjusting) {

            int red = redSlider.getValue();
            int green = greenSlider.getValue();
            int blue = blueSlider.getValue() ;
            Color color = new Color (red, green, blue);

            getColorSelectionModel().setSelectedColor(color);
        } else if (e.getSource() instanceof JSpinner && !isAdjusting) {

            int red = ((Integer)redField.getValue()).intValue();
            int green = ((Integer)greenField.getValue()).intValue();
            int blue = ((Integer)blueField.getValue()).intValue();
            Color color = new Color (red, green, blue);

            getColorSelectionModel().setSelectedColor(color);
        }
    }

}
