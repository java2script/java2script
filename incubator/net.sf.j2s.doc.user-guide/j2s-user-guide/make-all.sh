#generation of htmls and pdf from docbook.
#author: sgurin

DOC=j2s-user-guide

#clean
rm $DOC.pdf
rm -r $DOC-htmls
rm $DOC.tgz
rm -r dist

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

rm -r *.pdf *.tex *.dsl CATALOG* *~ db2html* *.dsl


