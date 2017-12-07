// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.dialogs;

import edu.colorado.phet.common.phetcommon.application.PaintImmediateDialog;

/**
 * ErrorDialog is a general-purpose error dialog.
 * If an Exception is specified, a Details button is visible that lets you see the stack trace.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ErrorDialog extends PaintImmediateDialog {
//
//    private static final String TITLE = PhetCommonResources.getString( "Common.title.error" );
//    private static final String CLOSE_BUTTON = PhetCommonResources.getString( "Common.choice.close" );
//    private static final String DETAILS_BUTTON = PhetCommonResources.getString( "Common.ErrorDialog.detailsButton" );
//    private static final String DETAILS_TITLE = PhetCommonResources.getString( "Common.ErrorDialog.detailsTitle" );
//    private static final String CONTACT_PHET = PhetCommonResources.getString( "Common.ErrorDialog.contactPhet" );
//
//    public ErrorDialog( Frame owner, String message ) {
//        this( owner, message, null /* exception */ );
//    }
//
//    public ErrorDialog( Frame owner, String message, final Exception exception ) {
//        super( owner, TITLE );
//        init( message, exception );
//    }
//
//    public ErrorDialog( JDialog owner, String message ) {
//        this( owner, message, null /* exception */ );
//    }
//
//    public ErrorDialog( JDialog owner, String message, final Exception exception ) {
//        super( owner, TITLE );
//        init( message, exception );
//    }
//
//    private void init( String message, final Exception exception ) {
//        setResizable( false );
//        setModal( true );
//
//        JPanel messagePanel = new JPanel();
//        messagePanel.setBorder( BorderFactory.createEmptyBorder( 5, 5, 5, 5 ) );
//        String htmlString = HTMLUtils.createStyledHTMLFromFragment( message );
//        JComponent htmlPane = new InteractiveHTMLPane( htmlString );
//        messagePanel.add( htmlPane );
//        htmlPane.setBackground( messagePanel.getBackground() );
//
//        JPanel buttonPanel = new JPanel();
//
//        // closes the dialog
//        JButton closeButton = new JButton( CLOSE_BUTTON );
//        closeButton.addActionListener( new ActionListener() {
//
//            public void actionPerformed( ActionEvent e ) {
//                dispose();
//            }
//        } );
//        buttonPanel.add( closeButton );
//
//        // Details button
//        if ( exception != null ) {
//            final JButton detailsButton = new JButton( DETAILS_BUTTON );
//            detailsButton.addActionListener( new ActionListener() {
//                public void actionPerformed( ActionEvent event ) {
//                    // show a stack trace
//                    String htmlMessage = getContactPhetMessageHTML();
//                    JDialog dialog = new StackTraceDialog( ErrorDialog.this, DETAILS_TITLE, htmlMessage, exception );
//                    SwingUtils.centerDialogInParent( dialog );
//                    dialog.setModal( ErrorDialog.this.isModal() ); // use same modality for details
//                    dialog.setVisible( true );
//                }
//            } );
//            buttonPanel.add( detailsButton );
//        }
//
//        // layout
//        JPanel panel = new JPanel();
//        EasyGridBagLayout layout = new EasyGridBagLayout( panel );
//        panel.setLayout( layout );
//        int row = 0;
//        int column = 0;
//        layout.addComponent( messagePanel, row++, column );
//        layout.addFilledComponent( new JSeparator(), row++, column, GridBagConstraints.HORIZONTAL );
//        layout.addAnchoredComponent( buttonPanel, row++, column, GridBagConstraints.CENTER );
//
//        setContentPane( panel );
//        pack();
//        SwingUtils.centerDialogInParent( this );
//    }
//
//    private static String getContactPhetMessageHTML() {
//        Object[] args = { HTMLUtils.getPhetMailtoHref() };
//        String htmlFragment = MessageFormat.format( CONTACT_PHET, args );
//        return HTMLUtils.createStyledHTMLFromFragment( htmlFragment );
//    }
//
//    // test
//    public static void main( String[] args ) {
//        // dialog must have an owner if you want cursor to change over hyperlinks
//        JFrame frame = new JFrame();
//        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
//        SwingUtils.centerWindowOnScreen( frame );
//        frame.setVisible( true );
//        String htmlMessage = "<html>Something very bad<br>just happened.</html>";
//        JDialog dialog = new ErrorDialog( frame, htmlMessage, new IOException() );
//        dialog.addWindowListener( new WindowAdapter() {
//            public void windowClosing( WindowEvent e ) {
//                System.exit( 0 );
//            }
//
//            public void windowClosed( WindowEvent e ) {
//                System.exit( 0 );
//            }
//        } );
//        dialog.setVisible( true );
//    }
}
