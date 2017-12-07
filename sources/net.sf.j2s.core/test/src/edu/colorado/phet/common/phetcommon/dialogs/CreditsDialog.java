// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.dialogs;

import edu.colorado.phet.common.phetcommon.application.PaintImmediateDialog;

/**
 * The Credits dialog displays several types credits, including:
 * - Development Team
 * - Translation
 * - Third-Party Software
 * <p/>
 * Each type of credit appears under a major heading.
 * A separate inner class handles the specifics of reading, parsing and formatting
 * each type of credit.
 *
 * @author Sam Reid
 * @author Chris Malley
 */
public class CreditsDialog extends PaintImmediateDialog {
//
//    // public for Translation Utility access
//    public static final String TRANSLATION_CREDITS_KEY = "translation.credits";  // key for general translation credits
//    public static final String KSU_CREDITS_KEY = "ksu.credits"; // key for KSU-specific credits
//
//    // preferred size for the scrollpane, change this to affect initial dialog size
//    private static final Dimension SCROLLPANE_SIZE = new Dimension( 525, 300 );
//
//    private static final String TITLE = PhetCommonResources.getString( "Common.About.CreditsDialog.Title" );
//    private static final String CLOSE_BUTTON = PhetCommonResources.getString( "Common.choice.close" );
//    private static final String LICENSE_DETAILS_TITLE = PhetCommonResources.getString( "Common.About.CreditsDialog.licenseDetails" );
//
//    private final ThirdPartySoftwareCredits thirdPartySoftwareCredits;
//
//    public CreditsDialog( Dialog owner, String projectName ) {
//        super( owner, TITLE );
//        setModal( true );
//
//        this.thirdPartySoftwareCredits = new ThirdPartySoftwareCredits( projectName );
//
//        // Create an HTML fragment for each credits heading
//        String devFragment = new DevelopmentTeamCredits( projectName ).createHTMLFragment();
//        String translationFragment = new TranslationCredits( projectName ).createHTMLFragment();
//        String thirdPartySoftwareFragment = thirdPartySoftwareCredits.createHTMLFragment();
//
//        // Create the complete HTML credits string
//        String creditsFragment = devFragment + "<br><br>";
//        if ( translationFragment != null ) {
//            creditsFragment += translationFragment + "<br><br>";
//        }
//        creditsFragment += thirdPartySoftwareFragment;
//        String creditsHTML = HTMLUtils.createStyledHTMLFromFragment( creditsFragment );
//
//        // put the HTML in an interactive scrolling pane
//        InteractiveHTMLPane htmlPane = new InteractiveHTMLPane( this, creditsHTML );
//        JScrollPane scrollPane = new JScrollPane( htmlPane );
//        scrollPane.setPreferredSize( SCROLLPANE_SIZE );
//
//        // Close button
//        JPanel buttonPanel = new JPanel();
//        JButton closeButton = new JButton( CLOSE_BUTTON );
//        closeButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                setVisible( false );
//                dispose();
//            }
//        } );
//        buttonPanel.add( closeButton );
//
//        // layout
//        JPanel panel = new JPanel( new BorderLayout() );
//        panel.setBorder( BorderFactory.createEmptyBorder( 10, 10, 10, 10 ) );
//        panel.add( scrollPane, BorderLayout.CENTER );
//        panel.add( buttonPanel, BorderLayout.SOUTH );
//        setContentPane( panel );
//        pack();
//        SwingUtils.centerDialogInParent( this );
//        htmlPane.setCaretPosition( 0 );
//    }
//
//    /**
//     * An HTML editor pane.
//     * Opens a dialog for third-party license files.
//     * Opens a web browser for all other URLs.
//     */
//    private class InteractiveHTMLPane extends HTMLUtils.HTMLEditorPane {
//        public InteractiveHTMLPane( final Dialog owner, String html ) {
//            super( html );
//            addHyperlinkListener( new HyperlinkListener() {
//                public void hyperlinkUpdate( HyperlinkEvent e ) {
//                    if ( e.getEventType() == HyperlinkEvent.EventType.ACTIVATED ) {
//                        if ( thirdPartySoftwareCredits.isThirdPartyLicenseURL( e.getURL() ) ) {
//                            String html = thirdPartySoftwareCredits.getThirdPartyLicenseHTML( e.getURL() );
//                            ContribLicenseDialog dialog = new ContribLicenseDialog( owner, LICENSE_DETAILS_TITLE, html );
//                            dialog.setVisible( true );
//                        }
//                        else {
//                            PhetServiceManager.showWebPage( e.getURL() );
//                        }
//                    }
//                }
//            } );
//        }
//    }
//
//    /*
//     * Encapsulates the reading, parsing and formatting of Development Team credits.
//     */
//    private static class DevelopmentTeamCredits {
//
//        private static final String TITLE = PhetCommonResources.getString( "Common.About.CreditsDialog.PhetDevelopmentTeam" );
//        private static final String FILENAME = "credits.txt";
//
//        // Localized labels to display in the credits, one label per role.
//        private static final String LABEL_LEAD_DESIGN = PhetCommonResources.getString( "Common.About.CreditsDialog.lead-design" );
//        private static final String LABEL_SOFTWARE_DEVELOPMENT = PhetCommonResources.getString( "Common.About.CreditsDialog.software-development" );
//        private static final String LABEL_DESIGN_TEAM = PhetCommonResources.getString( "Common.About.CreditsDialog.design-team" );
//        private static final String LABEL_INTERVIEWS = PhetCommonResources.getString( "Common.About.CreditsDialog.interviews" );
//
//        private final String projectName;
//
//        public DevelopmentTeamCredits( String projectName ) {
//            this.projectName = projectName;
//        }
//
//        public String createHTMLFragment() {
//            // read the credits file
//            String text = readCreditsFile();
//            if ( text == null ) {
//                return "missing " + FILENAME;
//            }
//
//            // parse and format
//            AnnotationParser.Annotation t = AnnotationParser.parse( text );
//            HashMap map = t.getMap();
//            ArrayList keys = t.getKeyOrdering();
//            StringBuffer credits = new StringBuffer( "<b>" + TITLE + "</b><br><br>" );
//            for ( Iterator iterator = keys.iterator(); iterator.hasNext(); ) {
//
//                // parse
//                String key = (String) iterator.next();
//                String value = (String) map.get( key );
//                String labeledValue = map( key, value );
//
//                // format
//                if ( labeledValue != null ) {
//                    credits.append( labeledValue + "<br>" );
//                }
//            }
//            return credits.toString();
//        }
//
//        /*
//         * Reads the contents of the credits file as a string.
//         * Null if the file wasn't found or some other error occurred.
//         */
//        private String readCreditsFile() {
//            String creditsString = null;
//            String resourceName = projectName + "/" + FILENAME;
//            try {
//                creditsString = new DefaultResourceLoader().getResourceAsString( resourceName );
//            }
//            catch ( IOException e ) {
//                System.err.println( getClass().getName() + ": missing " + resourceName );
//            }
//            return creditsString;
//        }
//
//        /*
//         * Maps a key in the credits file to a label.
//         * Returns null if an unrecognized key is encountered.
//         */
//        private String map( String key, String value ) {
//            if ( key.equals( "lead-design" ) ) {
//                return LABEL_LEAD_DESIGN + ": " + value;
//            }
//            else if ( key.equals( "software-development" ) ) {
//                return LABEL_SOFTWARE_DEVELOPMENT + ": " + value;
//            }
//            else if ( key.equals( "design-team" ) ) {
//                return LABEL_DESIGN_TEAM + ": " + value;
//            }
//            else if ( key.equals( "interviews" ) ) {
//                return LABEL_INTERVIEWS + ": " + value;
//            }
//            else {
//                System.err.println( getClass().getName() + ": unrecognized key encountered in " + FILENAME + ": " + key );
//                return null;
//            }
//        }
//    }
//
//    /*
//     * Encapsulates the reading, parsing and formatting of Translation credits.
//     */
//    private static class TranslationCredits {
//
//        private static final String TITLE = PhetCommonResources.getString( "Common.About.CreditsDialog.TranslationCreditsTitle" );
//
//        private final String projectName;
//
//        public TranslationCredits( String projectName ) {
//            this.projectName = projectName;
//        }
//
//        public String createHTMLFragment() {
//            String credits = readCredits();
//            if ( credits != null ) {
//                return "<b>" + TITLE + "</b><br><br>" + credits + "<br>";
//            }
//            else {
//                return null;
//            }
//        }
//
//        /*
//         * Reads optional credits from the localized strings file.
//         * Returns null if no credits are found.
//         */
//        private String readCredits() {
//            PhetResources resourceLoader = new PhetResources( projectName );
//
//            // first try to load KSU credits
//            String credits = resourceLoader.getLocalizedProperties().getString( KSU_CREDITS_KEY, false /* warnIfMissing */ );
//            if ( !credits.equals( KSU_CREDITS_KEY ) ) {
//                return credits;
//            }
//            else {
//                // if not found, load the general translation credits
//                credits = resourceLoader.getLocalizedProperties().getString( TRANSLATION_CREDITS_KEY, false /* warnIfMissing */ );
//                if ( !credits.equals( TRANSLATION_CREDITS_KEY ) ) {
//                    return credits;
//                }
//                else {
//                    return null;
//                }
//            }
//        }
//    }
//
//    /*
//     * Encapsulates the reading, parsing and formatting of Third-Party Software credits.
//     */
//    private static class ThirdPartySoftwareCredits {
//
//        private static final String TITLE = PhetCommonResources.getString( "Common.About.CreditsDialog.UsesThirdPartySoftware" );
//        private static final String FILENAME = "license-info.txt";
//        private static final String DIRECTORY_NAME = "contrib-licenses";
//        private static final String URL_PROTOCOL = "file";
//        private static final String URL_HOST = "credits";
//
//        private final String projectName;
//
//        public ThirdPartySoftwareCredits( String projectName ) {
//            this.projectName = projectName;
//        }
//
//        public String createHTMLFragment() {
//
//            // read the file
//            String text = readLicenseInfoFile();
//            if ( text == null ) {
//                return "missing " + FILENAME;
//            }
//
//            // parse the file, format for display
//            AnnotationParser.Annotation[] a = AnnotationParser.getAnnotations( text );
//            StringBuffer buffer = new StringBuffer( "<b>" + TITLE + "</b><br><br>" );
//            for ( int i = 0; i < a.length; i++ ) {
//
//                // parse
//                String id = a[i].getId();
//                String name = a[i].get( "name" );
//                String description = a[i].get( "description" );
//                String copyright = a[i].get( "copyright" );
//                String website = a[i].get( "website" );
//                String license = a[i].get( "license" );
//                String licenseFile = a[i].get( "licensefile" );
//
//                // format
//                buffer.append( name + ", " + description + "<br>" );
//                buffer.append( "&copy;&nbsp;" + copyright + " - " + website + "<br>" );
//                if ( license != null ) {
//                    /*
//                     * Create hyperlink for the third-party license file.
//                     * We're sort of hijacking the URL format here, and this might be a little too clever.
//                     * The full resource name of the license file is the path component of the URL.
//                     * URL general format is protocol://host/path
//                     */
//                    String resourceName = projectName + "/" + DIRECTORY_NAME + "/" + id + "-" + licenseFile;
//                    buffer.append( "<a href=\"" + URL_PROTOCOL + "://" + URL_HOST + "/" + resourceName + "\">" + license + "<a>" );
//                }
//                else {
//                    buffer.append( "license not found" );
//                }
//                buffer.append( "<br><br>" );
//            }
//            return buffer.toString();
//
//        }
//
//        /*
//         * Reads the file that describes all third-party license for the sim.
//         * Return null if the file is missing.
//         */
//        private String readLicenseInfoFile() {
//            String licenseString = null;
//            String resourceName = projectName + "/" + DIRECTORY_NAME + "/" + FILENAME;
//            try {
//                licenseString = new DefaultResourceLoader().getResourceAsString( resourceName );
//            }
//            catch ( IOException e ) {
//                // shouldn't happen for sims generated with the build process; license info is copied automatically.
//                System.err.println( getClass().getName() + ": missing  " + resourceName +
//                                    " - Did you generate license info for this sim, using PhetBuildGUI->Misc->Generate License Info ?" );
//            }
//            return licenseString;
//        }
//
//        /**
//         * Does a URL match the format of our third-party license hyperlinks?
//         */
//        public boolean isThirdPartyLicenseURL( URL url ) {
//            return url.getProtocol().equals( URL_PROTOCOL ) && url.getAuthority().equals( URL_HOST );
//        }
//
//        /*
//         * Reads a specific third-party license file from the JAR.
//         * These files are placed in the contrib-licenses directory by the phet build process,
//         * via the Misc menu in PhetBuildGUI
//         */
//        public String getThirdPartyLicenseHTML( URL url ) {
//
//            // get resource name from URL
//            String resourceName = url.getPath();
//            if ( resourceName.charAt( 0 ) == '/' ) { /* resource path must be relative, URL path is absolute */
//                resourceName = resourceName.substring( 1 );
//            }
//
//            // read the resource as text
//            String text = null;
//            try {
//                text = new DefaultResourceLoader().getResourceAsString( resourceName );
//            }
//            catch ( Exception e ) {
//                return "missing " + resourceName;
//            }
//
//            // convert to HTML
//            if ( !text.trim().startsWith( "<html" ) ) {
//                text = HTMLUtils.createStyledHTMLFromFragment( text );
//                text = text.replaceAll( "\\n", "<br>" );
//            }
//
//            return text;
//        }
//    }
//
//    public static void main( String[] args ) {
//        CreditsDialog dialog = new CreditsDialog( new JDialog(), "acid-base-solutions" );
//        dialog.addWindowListener( new WindowAdapter() {
//            public void windowClosing( WindowEvent e ) {
//                System.exit( 0 );
//            }
//
//            public void windowClosed( WindowEvent e ) {
//                System.exit( 0 );
//            }
//        } );
//        SwingUtils.centerWindowOnScreen( dialog );
//        dialog.setVisible( true );
//    }
}