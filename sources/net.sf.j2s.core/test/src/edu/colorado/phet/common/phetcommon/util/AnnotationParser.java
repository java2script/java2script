// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.StringTokenizer;

//TODO: remove duplicate copy in licensing, build-tools and phet-common
public class AnnotationParser {
    public static Annotation[] getAnnotations( String text ) {
        StringTokenizer st = new StringTokenizer( text, "\n" );
        ArrayList<Annotation> annotations = new ArrayList<Annotation>();
        while ( st.hasMoreTokens() ) {
            String tok = st.nextToken().trim();
            if ( !tok.startsWith( "#" ) ) {
                annotations.add( parse( tok ) );
            }
        }
        return annotations.toArray( new Annotation[annotations.size()] );
    }

    public static class Annotation {
        private String id;
        private HashMap<String, String> map;
        private ArrayList<String> keyOrdering;

        public Annotation( String id, HashMap<String, String> map, ArrayList<String> keyOrdering ) {
            this.id = id;
            this.map = map;
            this.keyOrdering = keyOrdering;
        }

        public String getId() {
            return id;
        }

        public HashMap<String, String> getMap() {
            return map;
        }

        @Override
				public String toString() {
            return id + ": " + map;
        }

        public String get( String s ) {
            return map.get( s );
        }

        public ArrayList<String> getKeyOrdering() {
            return keyOrdering;
        }
    }

    public static Annotation parse( String line ) {
        line = line.trim();
        StringTokenizer st = new StringTokenizer( line, " " );
        HashMap<String, String> map = new HashMap<String, String>();
        String id = st.nextToken();
        ArrayList<String> keyOrdering = new ArrayList<String>();
        for ( int index = line.indexOf( '=' ); index >= 0; index = line.indexOf( '=', index + 1 ) ) {
//            System.out.println( "Found '=' at: " + index );
            String key = getKey( line, index );
            String value = getValue( line, index );
            map.put( key, value );
            keyOrdering.add( key );
        }
        return new Annotation( id, map, keyOrdering );
    }

    private static String getValue( String line, int index ) {
        int end = line.indexOf( '=', index + 1 );
        if ( end < 0 ) {
            end = line.length();
        }
        else {
            for ( int i = end; i >= 0; i-- ) {
                if ( line.charAt( i ) == ' ' ) {
                    end = i;
                    break;
                }
            }
        }
        String val = line.substring( index + 1, end );
//        System.out.println( "val = " + val );
        return val.trim();
    }

    private static String getKey( String line, int index ) {
        for ( int i = index; i >= 0; i-- ) {
            if ( line.charAt( i ) == ' ' ) {
                String key = line.substring( i, index );
//                System.out.println( "key = " + key );
                return key.trim();
            }
        }
        throw new RuntimeException( "No key found" );
    }

    public static void visit( File file ) throws IOException {
        if ( file.isDirectory() ) {
            File[] fileList = file.listFiles();
            for ( File file1 : fileList ) {
                visit( file1 );
            }
        }
        else {
            if ( file.getName().equals( "license.txt" ) ) {
//                System.out.println( "Found license.txt file at: " + file.getAbsolutePath() );
                String newFile = "{\n";
                try {
                    String s = FileUtils.loadFileAsString( file );
                    StringTokenizer st = new StringTokenizer( s, "\n" );
                    boolean prev = false;
                    while ( st.hasMoreTokens() ) {
                        String token = st.nextToken();
                        Annotation a = AnnotationParser.parse( token );
//                        System.out.println( a );
                        if ( prev ) {
                            newFile = newFile + ",\n";
                        }
                        newFile = newFile + annotationToJSONString( token, a );
                        prev = true;
                    }
                }
                catch( IOException e ) {
                    e.printStackTrace();
                }
                newFile = newFile + "\n}";
                FileUtils.writeString( file, newFile );
//                System.out.println( "******\n" + newFile + "\n*******" );
            }
        }
    }

    public static class Result {
        public final String id;
        public final String projectURL;
        public final String notes;
        public final String license;
        public final String text;

        public Result( String id, String text, String projectURL, String license, String notes ) {
            this.id = id;
            this.projectURL = projectURL;
            this.notes = notes;
            this.license = license;
            this.text = text;
        }

        @Override public String toString() {
            return "  \"" + id + "\": {\n" +
                   "    \"text\": [\n" +
                   "  " + text +
                   "    ],\n" +
                   "    \"projectURL\": \"" + projectURL + "\",\n" +
                   "    \"license\": \"" + license + "\",\n" +
                   "    \"notes\": \"" + notes + "\"\n" +
                   "  }";
        }
    }

    private static String annotationToJSONString( String line, Annotation a ) {
        String id = a.id;
        String projectURL = a.get( "source" );
        String notes = a.get( "notes" );
        String license = a.get( "license" );
        String author = a.get( "author" );
        if ( a.map.containsKey( "Author" ) ) { author = a.get( "Author" ); }
        if ( a.map.containsKey( "author" ) && a.map.containsKey( "Author" ) ) {
            throw new RuntimeException( "Two authors" );
        }

        if ( projectURL == null ) {
            projectURL = "";
        }
        if ( notes == null ) {
            notes = "";
        }
        if ( license == null ) {
            license = "";
        }
        if ( author == null ) {
            author = "";
        }

        boolean switchToPhET = false;
        if ( author.equals( "" ) && author.equals( "Ron Le Master" ) ) {
            switchToPhET = true;
            notes = "by Ron Le Master" + ( notes.equals( "" ) ? "" : ", " + notes );
        }
        if ( author.equals( "" ) && author.equals( "Emily Randall" ) ) {
            switchToPhET = true;
            notes = "by Emily Randall" + ( notes.equals( "" ) ? "" : ", " + notes );
        }
        if ( author.equals( "" ) && author.equals( "Yuen-ying Carpenter" ) ) {
            switchToPhET = true;
            notes = "by Yuen-ying Carpenter" + ( notes.equals( "" ) ? "" : ", " + notes );
        }
        if ( author.equals( "" ) && author.equals( "Bryce" ) ) {
            switchToPhET = true;
            notes = "by Bryce" + ( notes.equals( "" ) ? "" : ", " + notes );
        }

        Set<String> set = a.map.keySet();
        for ( Object key : set ) {
            if ( !key.equals( "source" ) &&
                 !key.equals( "notes" ) &&
                 !key.equals( "license" ) &&
                 !key.equals( "author" ) &&
                 !key.equals( "Author" ) ) {
                System.out.println( "UNUSED KEY: " + key );
            }
        }
        if ( line.toLowerCase().contains( "=phet" ) || switchToPhET ) {
            if ( notes.equals( "" ) ) {
                notes = author;
            }
            else if ( !author.equals( "" ) ) {
                notes = notes + ", " + author;
            }
            author = "University of Colorado Boulder";
            projectURL = "http://phet.colorado.edu";
            license = "contact phethelp@colorado.edu";
        }
        String text = "    \"Copyright 2002-2015 " + author + "\"\n";
        if ( line.toLowerCase().contains( "public domain" ) ) {
            text = "    \"Public Domain\"\n";
            license = "Public Domain";
        }

        String outputText = new Result( id, text, projectURL, license, notes ).toString();
        System.out.println( "LINE:\n" + line + "\nTEXT:\n" + outputText );
        return outputText;
    }

    public static void main( String[] args ) throws IOException {
        Annotation a = AnnotationParser.parse( "test-id name=my name age=3 timestamp=dec 13, 2008" );
        System.out.println( "a = " + a );

        // For porting license.txt to json
        visit( new File( "/Users/samreid/github" ) );
    }
}


