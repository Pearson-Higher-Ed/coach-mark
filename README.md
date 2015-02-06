# o-component-blueprint

**Note:** This is not a usable Origami component.

A file structure to start building your own Origami component.

### Creating a new Origami Module

1. Clone this repository into a new folder  `git clone https://github.com/Financial-Times/o-component-blueprint.git o-your-component`
2. Search and replace `o-component-blueprint` to `o-your-component`  `find . -name '*.*' -type f -print -exec sed -i '' 's/o-component-blueprint/o-your-component/g' {} \;`
3. Search and replace `oComponentBlueprint` to `oYourComponent`  `find . -name '*.*' -type f -print -exec sed -i '' 's/oComponentBlueprint/oYourComponent/g' {} \;`
4. Re-name the component in the description field of origami.json

### Deploying for the first time

1. Create a new repository (tipically: on GitHub)
2. Delete the existing Git directory: `rm -Rf .git`
3. Initialise a new local Git repository: `git init .`
4. Add the remote repository:  `git remote add origin https://github.com/Financial-Times/o-your-component.git`
5. Test and verify: `obt test && obt verify` (and fix the code raising errors)
6. Commit and push: `git add . && git commit -m "Initial commit" && git push origin master`
