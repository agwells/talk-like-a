#!/bin/sh -e
chmod +x $1
echo $1 >>SAMPLES
echo "-------------" >>SAMPLES
printf "Here's how this filter sounds, in everyday use.\nNow is the time for all good men to come to the aid of their country." | ./$1 >>SAMPLES
echo "" >>SAMPLES
echo "" >>SAMPLES
