// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JFrame;

/**
 * This class represents a button that can change state.  Each state can have its own
 * list of ActionListeners.
 * <p/>
 * TODO: there should probably be mode change listeners for this class.
 *
 * @author Sam Reid
 */
public class MultiStateButton extends JButton {
    private Mode mode;//the current mode
    private ArrayList<Mode> modes = new ArrayList<Mode>();//all modes for this button

    /**
     * Creates a MultiStateButton with no modes, modes can be added with addMode().
     */
    public MultiStateButton() {
        this( new Mode[0] );
    }

    /**
     * Create a MultiStateButton with the specified set of modes.
     * Each mode must have a different key.
     * ActionListeners can be added to the modes later.
     *
     * @param mode
     */
    public MultiStateButton( MultiStateButton.Mode[] mode ) {
        for ( int i = 0; i < mode.length; i++ ) {
            addMode( mode[i].getKey(), mode[i].getLabel(), mode[i].getIcon() );
        }
        init();
    }

    public MultiStateButton( Object[] keys, String[] labels, Icon[] icons ) {
        for ( int i = 0; i < labels.length; i++ ) {
            addMode( keys[i], labels[i], icons[i] );
        }
        init();
    }

    private void init() {
        if ( getNumModes() > 0 ) {
            setMode( 0 );
        }
        addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                Mode sourceMode = mode;
                int m = modes.indexOf( mode );
                setMode( ( m + 1 ) % modes.size() );
                sourceMode.dispatchEvent( e );//use our own dispatch since order of dispatch is backwards and/or undocumented in swing
            }
        } );
    }

    private void setMode( int i ) {
        setMode( getMode( i ) );
    }

    private void setMode( Mode mode ) {
        this.mode = mode;
        updateButton();
    }

    public Mode getMode( int i ) {
        return modes.get( i );
    }

    public void addMode( Object key, String label, Icon icon ) {
        addMode( new Mode( key, label, icon ) );
    }

    /**
     * Adds the specified mode to this button.  If this is the first mode
     * added to a button, it will become the button's mode.
     *
     * @param mode
     * @throws IllegalArgumentException if any key is duplicated
     */
    public void addMode( Mode mode ) {
        //use a separate key object instead of label as key so bogus translations will still work properly
        if ( getMode( mode.getKey() ) != null ) {
            throw new IllegalArgumentException( "Duplicate mode not allowed, key=" + mode.getKey() );
        }
        modes.add( mode );

        updateDimension();
        if ( this.mode == null ) {
            setMode( mode );
        }
        updateButton();
    }

    public int getNumModes() {
        return modes.size();
    }

    /**
     * Sets the dimension of this button to be the max specified by the UI and
     * all available modes.
     */
    private void updateDimension() {
        Dimension[] d = new Dimension[modes.size()];
        for ( int i = 0; i < modes.size(); i++ ) {
            setIconAndText( ( modes.get( i ) ) );
            d[i] = getUI().getPreferredSize( this );
        }
        int maxWidth = 0;
        int maxHeight = 0;
        for ( int i = 0; i < d.length; i++ ) {
            Dimension dimension = d[i];
            maxWidth = Math.max( dimension.width, maxWidth );
            maxHeight = Math.max( dimension.height, maxHeight );
        }
        setPreferredSize( new Dimension( maxWidth, maxHeight ) );
    }

    /**
     * Sets the mode of this button to that specified by the given key.
     *
     * @param key
     */
    public void setMode( Object key ) {
        setMode( getMode( key ) );
        updateButton();
    }

    private Mode getMode( Object key ) {
        for ( int i = 0; i < modes.size(); i++ ) {
            Mode mode = modes.get( i );
            if ( mode.getKey().equals( key ) ) {
                return mode;
            }
        }
        return null;
    }

    private void setIconAndText( Mode mode ) {
        setText( mode.getLabel() );
        setIcon( mode.getIcon() );
    }

    private void updateButton() {
        setIconAndText( mode );
    }

    /**
     * Adds an ActionListener to a specific mode for this button.
     *
     * @param key
     * @param actionListener
     */
    public void addActionListener( Object key, final ActionListener actionListener ) {
        getMode( key ).addActionListener( actionListener );
    }

    /**
     * The Mode for a MultiStateButton maintains state for a particular mode of that button,
     * including action listeners.
     */
    protected static class Mode {
        private Object key;
        private String label;
        private Icon icon;
        private ArrayList<ActionListener> actionListeners = new ArrayList<ActionListener>();

        public Mode( Object key, String label, Icon icon ) {
            this.key = key;
            this.label = label;
            this.icon = icon;
        }

        public Object getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        public Icon getIcon() {
            return icon;
        }

        public void dispatchEvent( ActionEvent e ) {
            for ( int i = 0; i < actionListeners.size(); i++ ) {
                ActionListener listener = actionListeners.get( i );
                listener.actionPerformed( e );
            }
        }

        public void addActionListener( ActionListener actionListener ) {
            actionListeners.add( actionListener );
        }

    }

    public static void main( String[] args ) {
        JFrame frame = new JFrame();
        String KEY_PLAY = "play";
        String KEY_PAUSE = "pause";
        MultiStateButton stateButton = new MultiStateButton( new Object[] { KEY_PLAY, KEY_PAUSE }, new String[] { "play", "pause" }, new Icon[2] );
        stateButton.addActionListener( KEY_PLAY, new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                System.out.println( "play was pressed" );
            }
        } );
        stateButton.addActionListener( KEY_PAUSE, new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                System.out.println( "pause was pressed" );
            }
        } );
        frame.setContentPane( stateButton );
        frame.pack();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        frame.setLocation( Toolkit.getDefaultToolkit().getScreenSize().width / 2 - frame.getWidth() / 2,
                           Toolkit.getDefaultToolkit().getScreenSize().height / 2 - frame.getHeight() / 2 );
        frame.show();
    }
}
