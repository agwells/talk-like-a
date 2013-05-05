#!/bin/sh -e
chmod +x $1
echo $1 >>SAMPLES
echo "-------------" >>SAMPLES
if [ "$1" != fanboy ]; then
	printf "Here's how this filter sounds, in everyday use.\nNow is the time for all good men to come to the aid of their country." | ./$1 >>SAMPLES
else
	printf "This filter has to be tried on real world text to be understood! Oh, and Ubuntu Rules!" >>SAMPLES
fi
echo "" >>SAMPLES
echo "" >>SAMPLES
