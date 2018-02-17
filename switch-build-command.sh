#!/bin/sh
set -e

enable() {
perl -0 -p \
	-e 's|<!--\s*(<buildCommand>\s*<name>'"$1"'</name>.*?</buildCommand>\s*)\n\s*-->|\1|gs'
}

disable() {
perl -0 -p \
	-e 's|\n((\s*)<buildCommand>\s*<name>'"$1"'</name>.*?\n(\s*)</buildCommand>.*?\n)|\n\2<!--\n\1\3-->\n|sg' \
| perl -0 -p \
	-e 's|<!--\s*(<!--\s*<buildCommand>\s*<name>'"$1"'</name>.*?</buildCommand>\s*-->)\s*-->|\1|gs'
}

file="$1"
shift

while [ -n "$1" ]; do
case "$1" in
+*) cmd=enable;name="${1#+}";;
-*) cmd=disable;name="${1#-}";;
*) false;;
esac
echo "$cmd" "$name"
sed -e 's/\r$//g' "$file" | $cmd "$name" | sed -e 's/$/\r/g' > "$file.tmp"
mv "$file.tmp" "$file"
shift
done
