// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;


/**
 * Dialog that prompts the user for their sim-sharing id.
 * This dialog is modal, and blocks until the user enters and id, or quits.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingIdDialog {//extends JDialog {
//
//    // Strings used herein. No i18n needed now, but perhaps in the future.
//    private static final String CONTINUE = "Continue";
//    private static final String EXIT = "Exit";
//
//    private final JTextField textField;
//    private String id;
//
//    public SimSharingIdDialog( String prompt, boolean idRequired, Function1<Character, Boolean> characterValidation ) {
//        this( null, prompt, idRequired, characterValidation );
//        SwingUtils.centerWindowOnScreen( this );
//    }
//
//    public SimSharingIdDialog( Frame owner, String prompt, final boolean idRequired, final Function1<Character, Boolean> characterValidation ) {
//        super( owner, true /* modal */ );
//        setResizable( false );
//
//        // banner
//        JLabel phetLogo = new JLabel( new ImageIcon( PhetCommonResources.getImage( PhetCommonResources.IMAGE_PHET_LOGO ) ) ) {{
//            setBorder( new LineBorder( Color.BLACK ) );
//        }};
//        JPanel bannerPanel = new JPanel();
//        bannerPanel.add( phetLogo );
//
//        // input panel
//        JLabel promptLabel = new JLabel( prompt ) {{
//            setFont( new PhetFont( 16 ) );
//        }};
//        textField = new JTextField() {{
//            setFont( new PhetFont( 16 ) );
//            setColumns( 10 );
//        }};
//        JPanel inputPanel = new JPanel() {{
//            setBorder( new EmptyBorder( 5, 10, 5, 10 ) );
//        }};
//        inputPanel.add( promptLabel );
//        inputPanel.add( textField );
//
//        // action panel
//        final JButton continueButton = new JButton( CONTINUE ) {{
//            setEnabled( !idRequired );
//            addActionListener( new ActionListener() {
//                public void actionPerformed( ActionEvent event ) {
//                    doContinue();
//                }
//            } );
//        }};
//        final JButton exitButton = new JButton( EXIT ) {{
//            addActionListener( new ActionListener() {
//                // pressing the Exit button exits the application.
//                public void actionPerformed( ActionEvent event ) {
//                    exit();
//                }
//            } );
//        }};
//        JPanel actionPanel = new JPanel();
//        actionPanel.add( continueButton );
//        actionPanel.add( exitButton );
//
//        textField.addKeyListener( new KeyAdapter() {
//
//            //TODO if we need something other than numbers in the future, add an input validation function to SimSharingConfig
//            // accept only keystrokes related to entering numbers
//            @Override public void keyTyped( KeyEvent e ) {
//                char c = e.getKeyChar();
//                if ( !( ( c == KeyEvent.VK_BACK_SPACE ) || ( c == KeyEvent.VK_DELETE ) || ( c == KeyEvent.VK_ENTER ) || ( c == KeyEvent.VK_TAB ) || ( characterValidation.apply( c ) ) ) ) {
//                    e.consume();
//                }
//            }
//
//            // enabled/disable the button based on whether the text field contains valid input
//            @Override public void keyReleased( KeyEvent e ) {
//                continueButton.setEnabled( isValidId( textField.getText() ) || !idRequired );
//            }
//        } );
//        textField.addActionListener( new ActionListener() {
//            // pressing Enter is the same as pressing the Continue button
//            public void actionPerformed( ActionEvent e ) {
//                if ( isValidId( textField.getText() ) ) {
//                    doContinue();
//                }
//            }
//        } );
//
//        // main panel
//        JPanel mainPanel = new VerticalLayoutPanel() {{
//            setBorder( new EmptyBorder( 10, 10, 10, 10 ) );
//        }};
//        mainPanel.add( bannerPanel );
//        mainPanel.add( new JSeparator() );
//        mainPanel.add( inputPanel );
//        mainPanel.add( new JSeparator() );
//        mainPanel.add( actionPanel );
//        setContentPane( mainPanel );
//        pack();
//
//        // Add a handler to treat the close button like the exit key.
//        addWindowListener( new WindowAdapter() {
//            public void windowClosing( WindowEvent e ) {
//                exit();
//            }
//        } );
//    }
//
//    private boolean isValidId( String id ) {
//        return ( id != null ) && ( id.length() != 0 );
//    }
//
//    private void doContinue() {
//        id = textField.getText();
//        if ( id != null && id.length() == 0 ) {
//            id = null;
//        }
//        dispose();
//    }
//
//    private void exit() {
//        System.exit( 0 );
//    }
//
//    // Gets the id entered by the user. Returns null if no id was entered.
//    public String getId() {
//        return id == null ? id : id.trim();
//    }
//
//    // test
//    public static void main( String[] args ) {
//        SimSharingConfig config = SimSharingConfig.getConfig( "utah" );
//        SimSharingIdDialog dialog = new SimSharingIdDialog( config.idPrompt, config.idRequired, SimSharingConfig.WORDS );
//        dialog.setVisible( true );
//        System.out.println( "id = " + dialog.getId() );
//        System.exit( 0 );
//    }
}
