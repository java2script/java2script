#generation of htmls and pdf from docbook.
#author: sgurin

#clean
rm j2s-template.pdf
rm -r j2s-template-htmls
rm j2s-template.tgz

#pdf
dblatex j2s-template.xml

#multiple htmls
db2html j2s-template.xml
cp -r images j2s-template/images
mv j2s-template j2s-template-htmls
cp j2s-template-htmls/t2.html j2s-template-htmls/index.html

#multiple htmls compressed:
chmod -R a+x j2s-template-htmls
tar cvfz j2s-template-htmls.tgz j2s-template-htmls

#single html
db2html --nochunks j2s-template.xml > j2s-template.html