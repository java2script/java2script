// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.preferences;

//import edu.colorado.phet.common.phetcommon.statistics.SessionMessage;

/**
 * Preferences dialog.
 */
public class PreferencesDialog {//extends PaintImmediateDialog {
//
//    private static final String TITLE = PhetCommonResources.getString( "Common.preferences.title" );
//    private static final String UPDATES_TAB = PhetCommonResources.getString( "Common.preferences.updates" );
//    private static final String PRIVACY_TAB = PhetCommonResources.getString( "Common.preferences.privacy" );
//    private static final String OK_BUTTON = PhetCommonResources.getString( "Common.choice.ok" );
//    private static final String CANCEL_BUTTON = PhetCommonResources.getString( "Common.choice.cancel" );
//
////    private final UpdatesPreferencesPanel updatesPreferencesPanel;
////    private final PrivacyPreferencesPanel privacyPreferencesPanel;
//
//    public PreferencesDialog( Frame owner, /*SessionMessage sessionMessage,*/
//                              PhetPreferences preferences, boolean showPrivacyUI, boolean showUpdatesUI, boolean isDev ) {
//
//        super( owner, TITLE );
//        setResizable( false );
//        setModal( false );
//
//        JPanel userInputPanel = new JPanel();
//        JTabbedPane jTabbedPane = new JTabbedPane();
//        userInputPanel.add( jTabbedPane );
////        updatesPreferencesPanel = new UpdatesPreferencesPanel( preferences );
////        privacyPreferencesPanel = new PrivacyPreferencesPanel( preferences, sessionMessage, isDev );
////        if ( showUpdatesUI ) {
////            jTabbedPane.addTab( UPDATES_TAB, updatesPreferencesPanel );
////        }
////        if ( showPrivacyUI ) {
////            jTabbedPane.addTab( PRIVACY_TAB, privacyPreferencesPanel );
////        }
//
//        JButton okButton = new JButton( OK_BUTTON );
//        okButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                savePreferences();
//                dispose();
//            }
//        } );
//
//        JButton cancelButton = new JButton( CANCEL_BUTTON );
//        cancelButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                dispose();
//            }
//        } );
//
//        JPanel buttonPanel = new JPanel( new FlowLayout( FlowLayout.CENTER ) );
//        buttonPanel.add( okButton );
//        buttonPanel.add( cancelButton );
//
//        // layout
//        JPanel panel = new JPanel();
//        EasyGridBagLayout layout = new EasyGridBagLayout( panel );
//        panel.setLayout( layout );
//        layout.addComponent( userInputPanel, 0, 0 );
//        layout.addAnchoredComponent( buttonPanel, 2, 0, GridBagConstraints.CENTER );
//        setContentPane( panel );
//        pack();
//        if ( owner != null ) {
//            SwingUtils.centerDialogInParent( this );
//        }
//        else {
//            SwingUtils.centerWindowOnScreen( this );
//        }
//    }
//
//    private void savePreferences() {
////        updatesPreferencesPanel.save();
////        privacyPreferencesPanel.save();
//    }
//
////    /*
////    * Test, this edits the real preferences file!
////    */
////    public static void main( String[] args ) {
////        ISimInfo simInfo = new PhetApplicationConfig( args, "balloons" );
////        SessionCounter.initInstance( "balloons", "balloons" );
//////        SessionMessage sessionMessage = SessionMessage.initInstance( simInfo );
////        PreferencesDialog preferencesDialog = new PreferencesDialog( null, /*sessionMessage,*/ PhetPreferences.getInstance(), true, true, true );
////        preferencesDialog.addWindowListener( new WindowAdapter() {
////            public void windowClosing( WindowEvent e ) {
////                System.exit( 0 );
////            }
////
////            public void windowClosed( WindowEvent e ) {
////                System.exit( 0 );
////            }
////        } );
////        preferencesDialog.setVisible( true );
////    }
}
