#generation of htmls and pdf from docbook.
#author: sgurin

#clean
rm j2s-cmdline-api.pdf
rm -r j2s-cmdline-api-htmls
rm j2s-cmdline-api.tgz

#pdf
dblatex j2s-cmdline-api.xml

#multiple htmls
db2html j2s-cmdline-api.xml
cp -r images j2s-cmdline-api/images
mv j2s-cmdline-api j2s-cmdline-api-htmls
cp j2s-cmdline-api-htmls/t2.html j2s-cmdline-api-htmls/index.html

#multiple htmls compressed:
chmod -R a+x j2s-cmdline-api-htmls
tar cvfz j2s-cmdline-api-htmls.tgz j2s-cmdline-api-htmls

#single html
db2html --nochunks j2s-cmdline-api.xml > j2s-cmdline-api.html