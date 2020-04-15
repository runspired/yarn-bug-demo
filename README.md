# Yarn Bug

## Issue

yarn install modifies node_modules of linked dependencies

## Setup 

A project (`project-a`) with a link to another project (`project-b`) on disk in dependencies in it's package.json (`link:../some/path/other/project-b`) with different versions of the same dependency (`broccoli-plugin`) in their own dependency trees.

Note: This issue is also observed when using `yarn link project-b`, so the `link:` syntax is not uniquely leading to this.

## Steps To Reproduce

1) `git clone git@github.com:runspired/yarn-bug-demo.git`
2) `cd yarn-bug-demo/project-b`
3) `yarn install`
4) `node index.js` (this will print `version: 1.3.1`)

At this point it is useful to `npm ls broccoli-plugin` and `yarn why broccoli-plugin` to
examine the hoisting of `broccoli-plugin` that has occurred within node_modules for `project-b`.

5) `cd ../project-a`
6) `yarn install`

At this point it is again useful to `npm ls broccoli-plugin` and `yarn why broccoli-plugin` to
examine the hoisting of `broccoli-plugin` that has occurred within node_modules for BOTH `project-a` and `project-b`. You can already note that node_modules for `project-b` has been affected.

7) `cd ../project-b`
8) `node index.js` 💥 we blow up because we no longer are receiving version `1.3.1`.