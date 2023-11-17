Jmol-j2-site.zip is a collection of JS files from src_4.2/ processing 
by the legacy 4.2 java2script transpiler. It is only used for non-SwingJS Jmol.
                   

Jmol-j2-site.zip needs to be copied into Jmol/site-resources-zip/ manually.


where it can be unzipped into the site/ directory


Fixes and modifications from the originals

BH 2023.11.16   removed unnecessary references to StringBuilder and StringBuffer
                since these are just strings in JavaScript (which has exceptionally
                fast string operations in browsers).
                
