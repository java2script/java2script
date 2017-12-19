// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util.persistence;


/**
 * XMLPersistenceManager handles save and loading objects.
 * It saves/loads configurations to/from files as XML-encoded objects.
 * It handles the user interface for selecting the file to save/load, including any error dialogs.
 * It works differently if the application was started with Web Start.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class XMLPersistenceManager {
//
//    //----------------------------------------------------------------------------
//    // Class<?> data
//    //----------------------------------------------------------------------------
//
//    private static final String SAVE_TITLE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.save.title" );
//    private static final String SAVE_CONFIRM_MESSAGE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.save.confirm.message" );
//    private static final String SAVE_ERROR_MESSAGE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.save.error.message" );
//    private static final String SAVE_ERROR_ENCODE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.save.error.encode" );
//
//    private static final String LOAD_TITLE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.load.title" );
//    private static final String LOAD_ERROR_MESSAGE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.load.error.message" );
//    private static final String LOAD_ERROR_DECODE = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.load.error.decode" );
//    private static final String LOAD_ERROR_CONTENTS = PhetCommonResources.getInstance().getLocalizedString( "XMLPersistenceManager.load.error.contents" );
//
//    //----------------------------------------------------------------------------
//    // Instance data
//    //----------------------------------------------------------------------------
//
//    private ISaveLoadStrategy _saveLoadStrategy;
//
//    //----------------------------------------------------------------------------
//    // Constructors
//    //----------------------------------------------------------------------------
//
//    /**
//     * Sole constructor.
//     */
//    public XMLPersistenceManager( Frame parentFrame ) {
//        if ( wasWebStarted() ) {
//            _saveLoadStrategy = new WebStartSaveLoadStrategy( parentFrame );
//        }
//        else {
//            _saveLoadStrategy = new LocalSaveLoadStrategy( parentFrame );
//        }
//    }
//
//    public void save( Object object ) {
//        _saveLoadStrategy.save( object );
//    }
//
//    public Object load() {
//        return _saveLoadStrategy.load();
//    }
//
//    /*
//    * Determines if the simulation was started using Java Web Start.
//    *
//    * @return true or false
//    */
//    private static boolean wasWebStarted() {
//        return ( System.getProperty( "javawebstart.version" ) != null );
//    }
//
//    //----------------------------------------------------------------------------
//    // Save/Load strategies
//    //----------------------------------------------------------------------------
//
//    /*
//    * Interface implemented by all Save/Load strategies.
//    */
//    private interface ISaveLoadStrategy {
//        public void save( Object object );
//
//        public Object load();
//    }
//
//    /*
//    * Base class for all Save/Load strategies.
//    */
//    private static abstract class AbstractObjectSaveLoadStrategy implements ISaveLoadStrategy {
//
//        private Frame _parentFrame;
//        private String _mostRecentDirectoryName; // the most recent directory visited in a file chooser
//
//        public AbstractObjectSaveLoadStrategy( Frame parentFrame ) {
//            super();
//            _parentFrame = parentFrame;
//            _mostRecentDirectoryName = null;
//        }
//
//        protected Frame getParentFrame() {
//            return _parentFrame;
//        }
//
//        protected String getMostRecentDirectoryName() {
//            return _mostRecentDirectoryName;
//        }
//
//        protected void setMostRecentDirectoryName( String name ) {
//            _mostRecentDirectoryName = name;
//        }
//
//        /*
//        * Gets the directory name portion of a filename.
//        *
//        * @param filename
//        * @return directory name
//        */
//        protected static String getDirectoryName( String filename ) {
//            String directoryName = null;
//            int index = filename.lastIndexOf( File.pathSeparatorChar );
//            if ( index != -1 ) {
//                directoryName = filename.substring( index );
//            }
//            return directoryName;
//        }
//
//        /*
//        * Shows the error message associated with an exception in an
//        * error dialog, and prints a stack trace to the console.
//        *
//        * @param format
//        * @param e
//        */
//        protected void showError( String format, Exception e ) {
//            showError( format, e.getMessage() );
//            e.printStackTrace();
//        }
//
//        /*
//        * Shows the error message in an error dialog.
//        *
//        * @param format
//        * @param e
//        */
//        protected void showError( String format, String errorMessage ) {
//            Object[] args = { errorMessage };
//            String message = MessageFormat.format( format, args );
//            PhetOptionPane.showErrorDialog( _parentFrame, message );
//        }
//    }
//
//    /*
//    * Save/Load strategy that saves using the local file I/O interface.
//    */
//    private static class LocalSaveLoadStrategy extends AbstractObjectSaveLoadStrategy {
//
//        public LocalSaveLoadStrategy( Frame parentFrame ) {
//            super( parentFrame );
//        }
//
//        public void save( Object object ) {
//
//            try {
//                // Choose the file to save.
//                JFileChooser fileChooser = new JFileChooser( getMostRecentDirectoryName() );
//                fileChooser.setDialogTitle( SAVE_TITLE );
//                int rval = fileChooser.showSaveDialog( getParentFrame() );
//                setMostRecentDirectoryName( fileChooser.getCurrentDirectory().getAbsolutePath() );
//                File selectedFile = fileChooser.getSelectedFile();
//                if ( rval == JFileChooser.CANCEL_OPTION || selectedFile == null ) {
//                    return;
//                }
//
//                setMostRecentDirectoryName( selectedFile.getParentFile().getAbsolutePath() );
//
//                // If the file exists, confirm overwrite.
//                if ( selectedFile.exists() ) {
//                    String title = PhetCommonResources.getInstance().getLocalizedString( "Common.title.confirm" );
//                    int reply = PhetOptionPane.showYesNoDialog( getParentFrame(), SAVE_CONFIRM_MESSAGE, title );
//                    if ( reply != JOptionPane.YES_OPTION ) {
//                        return;
//                    }
//                }
//
//                // XML encode directly to the file.
//                String filename = selectedFile.getAbsolutePath();
//                FileOutputStream fos = new FileOutputStream( filename );
//                BufferedOutputStream bos = new BufferedOutputStream( fos );
//                XMLEncoder encoder = new XMLEncoder( bos );
//                encoder.setExceptionListener( new ExceptionListener() {
//
//                    private int errors = 0;
//
//                    // Report the first recoverable exception.
//                    public void exceptionThrown( Exception e ) {
//                        if ( errors == 0 ) {
//                            showError( SAVE_ERROR_ENCODE, e );
//                            errors++;
//                        }
//                    }
//                } );
//                encoder.writeObject( object );
//                encoder.close();
//            }
//            catch ( Exception e ) {
//                showError( SAVE_ERROR_MESSAGE, e );
//            }
//        }
//
//        public Object load() {
//
//            Object object = null;
//
//            try {
//                // Choose the file to load.
//                JFileChooser fileChooser = new JFileChooser( getMostRecentDirectoryName() );
//                fileChooser.setDialogTitle( LOAD_TITLE );
//                int rval = fileChooser.showOpenDialog( getParentFrame() );
//                setMostRecentDirectoryName( fileChooser.getCurrentDirectory().getAbsolutePath() );
//                File selectedFile = fileChooser.getSelectedFile();
//                if ( rval == JFileChooser.CANCEL_OPTION || selectedFile == null ) {
//                    return null;
//                }
//
//                // XML decode directly from the file.
//                String filename = selectedFile.getAbsolutePath();
//                FileInputStream fis = new FileInputStream( filename );
//                BufferedInputStream bis = new BufferedInputStream( fis );
//                XMLDecoder decoder = new XMLDecoder( bis );
//                decoder.setExceptionListener( new ExceptionListener() {
//                    private int errors = 0;
//
//                    // Report the first recoverable exception.
//                    public void exceptionThrown( Exception e ) {
//                        if ( errors == 0 ) {
//                            showError( LOAD_ERROR_DECODE, e );
//                            errors++;
//                        }
//                    }
//                } );
//                object = decoder.readObject();
//                decoder.close();
//                if ( object == null ) {
//                    showError( LOAD_ERROR_MESSAGE, LOAD_ERROR_CONTENTS );
//                }
//            }
//            catch ( Exception e ) {
//                showError( LOAD_ERROR_MESSAGE, e );
//                object = null;
//            }
//
//            return object;
//        }
//    }
//
//    /*
//    * Save/Load strategy that saves using Web Start (JNLP) file I/O services.
//    */
//    private static class WebStartSaveLoadStrategy extends AbstractObjectSaveLoadStrategy {
//
//        public WebStartSaveLoadStrategy( Frame parentFrame ) {
//            super( parentFrame );
//        }
//
//        public void save( Object object ) {
//
//            try {
//                // XML encode into a byte output stream.
//                ByteArrayOutputStream baos = new ByteArrayOutputStream();
//                XMLEncoder encoder = new XMLEncoder( baos );
//                encoder.setExceptionListener( new ExceptionListener() {
//
//                    private int errors = 0;
//
//                    // Report the first recoverable exception.
//                    public void exceptionThrown( Exception e ) {
//                        if ( errors == 0 ) {
//                            showError( SAVE_ERROR_ENCODE, e );
//                            errors++;
//                        }
//                    }
//                } );
//                encoder.writeObject( object );
//                encoder.close();
//                if ( object == null ) {
//                    showError( SAVE_ERROR_MESSAGE, "XML encoding failer" );
//                    return;
//                }
//
//                // Convert to a byte input stream.
//                ByteArrayInputStream inputStream = new ByteArrayInputStream( baos.toByteArray() );
//
//                // Get the JNLP service for saving files.
//                FileSaveService fss = (FileSaveService) ServiceManager.lookup( "javax.jnlp.FileSaveService" );
//                if ( fss == null ) {
//                    showError( SAVE_ERROR_MESSAGE, "JNLP FileSaveService is unavailable" );
//                    return;
//                }
//
//                // Save the configuration to a file.
//                FileContents fc = fss.saveFileDialog( null, null, inputStream, getMostRecentDirectoryName() );
//                if ( fc != null ) {
//                    setMostRecentDirectoryName( getDirectoryName( fc.getName() ) );
//                }
//            }
//            catch ( Exception e ) {
//                showError( SAVE_ERROR_MESSAGE, e );
//            }
//        }
//
//        public Object load() {
//
//            Object object = null;
//
//            try {
//                // Get the JNLP service for opening files.
//                FileOpenService fos = (FileOpenService) ServiceManager.lookup( "javax.jnlp.FileOpenService" );
//                if ( fos == null ) {
//                    showError( LOAD_ERROR_MESSAGE, "JNLP FileOpenService is unavailable" );
//                    return null;
//                }
//
//                // Read the configuration from a file.
//                FileContents fc = fos.openFileDialog( getMostRecentDirectoryName(), null );
//                if ( fc == null ) {
//                    return null;
//                }
//                setMostRecentDirectoryName( getDirectoryName( fc.getName() ) );
//
//                // Convert the FileContents to an input stream.
//                InputStream inputStream = fc.getInputStream();
//
//                // XML-decode the input stream.
//                XMLDecoder decoder = new XMLDecoder( inputStream );
//                decoder.setExceptionListener( new ExceptionListener() {
//                    private int errors = 0;
//
//                    // Report the first recoverable exception.
//                    public void exceptionThrown( Exception e ) {
//                        if ( errors == 0 ) {
//                            showError( LOAD_ERROR_DECODE, e );
//                            errors++;
//                        }
//                    }
//                } );
//                object = decoder.readObject();
//                decoder.close();
//                if ( object == null ) {
//                    showError( LOAD_ERROR_MESSAGE, LOAD_ERROR_CONTENTS );
//                }
//            }
//            catch ( Exception e ) {
//                showError( LOAD_ERROR_MESSAGE, e );
//                object = null;
//            }
//
//            return object;
//        }
//    }
}
