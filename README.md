# o-component-blueprint

Project structure for new Origami components.

**Note:** This is not a usable Origami component. Once you have completed the steps for creating and deploying the new module, replace this README with the provided template:

```
mv README.md.template README.md
```

### Creating a new Origami Module

1. Clone this repository into a new folder:

  ```
  git clone https://github.com/Pearson-Higher-Ed/o-component-blueprint.git o-your-component
  ```
2. Search `o-component-blueprint` and replace with `o-your-component`:

  ```
  find . -name '*.*' -type f -print -exec sed -i '' 's/o-component-blueprint/o-your-component/g' {} \;
  ```
3. Search `oComponentBlueprint` and replace with `oYourComponent`:

  ```
  find . -name '*.*' -type f -print -exec sed -i '' 's/oComponentBlueprint/oYourComponent/g' {} \;
  ```
4. Re-name the component in the description field of `origami.json`

### Deploying for the first time

1. Create a new repository ([GitHub](https://github.com/Pearson-Higher-Ed) for OSS or [Stash](https://devops-tools.pearson.com/stash/) for internal components). If you are deploying to GitHub, you may need to make a request to one of the organization's [owners](https://github.com/orgs/Pearson-Higher-Ed/teams/owners) to create the repository.
2. Delete the existing Git directory: `rm -Rf .git`
3. Initialize a new local Git repository: `git init .`
4. Add the remote repository:

  ```
  git remote add origin https://github.com/Pearson-Higher-Ed/o-your-component.git
  ```
5. Install dependencies: `obt install`
6. Test and verify: `obt test && obt verify`
7. Commit and push: `git add . && git commit -m "Initial commit" && git push origin master`

----

## License

This is a fork of [Financial-Times/o-component-blueprint](https://github.com/Financial-Times/o-component-blueprint), which is published by the Financial Times under the [MIT license](http://opensource.org/licenses/MIT).
