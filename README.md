This is a port to JavaScript of the debian `filters` package, which is a
collection of command-line jokey text transformation scripts. For example,
the "eleet" command transforms text so that it looks like it was written
in classic 90s 1337-speak. These scripts are classics of \*nix humor; `filters`
package itself contains ports of older versions of them, some of which date
back to the 1980s.

The text transformation algorithms used here are based on code cloned from
this Git repo: `git://git.joeyh.name/filters`

The code for the debian version of the scripts, is in the `/originals` directory.
The `make-test-data` script runs a sample text through each of the original
filters, so that its output can be compared to the output from the JS versions.
If you wish to run `make-test-data`, you must first compile the originals,
by cd'ing to `/originals` and doing `make all`. You will of course need some
compilation dependencies. See the documentation in the `/originals` directory
for details.

The filters were written by several different authors; see the `/originals`
directory for copyright information on each of them.

TODO: lots of stuff!
