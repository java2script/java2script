#generation of htmls and pdf from docbook.
#author: sgurin

DOC=j2s-user-guide

#clean
rm $DOC.pdf
rm -rf $DOC-htmls
rm $DOC.tgz
rm -rf dist

mkdir dist

#pdf
dblatex $DOC.xml
mv $DOC.pdf dist

#multiple htmls
db2html $DOC.xml
cp -r images $DOC/images
mv $DOC dist/$DOC-htmls
#cp $DOC-htmls/t2.html $DOC-htmls/index.html
#chmod -R a+x dist/$DOC-htmls

tar cvfz dist/$DOC-htmls.tgz dist/$DOC-htmls


#single html
mkdir dist/$DOC-singlehtml
db2html --nochunks $DOC.xml > dist/$DOC-singlehtml/$DOC.html
cp -r images dist/$DOC-singlehtml/images

cp index.html dist

rm -r *.pdf *.tex *.dsl CATALOG* *~ db2html* *.dsl


