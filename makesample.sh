#!/bin/sh -e
chmod +x $1
echo $1 >>SAMPLES
echo "-------------" >>SAMPLES
printf "Here's how this filter sounds, in everyday use.\nThis line is another sample of this filter's output." | ./$1 >>SAMPLES
echo "" >>SAMPLES
