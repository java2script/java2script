#generation of htmls and pdf from docbook.
#author: sgurin

DOC=j2s-user-guide

rm -r ../htmls

#multiple htmls
db2html $DOC.xml
cp -r images $DOC/images
mv $DOC ../htmls
rm -r *.pdf *.tex *.dsl CATALOG* *~ db2html* *.dsl


