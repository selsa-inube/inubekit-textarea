# IDS - Starter

This project is a starter repository that can be used to develop and publish new Inube Design System components. With this repository the intention is that any design-system team member can start to develop a new component without starting from scratch.

## Readme

This readme contains the details of usage of the starter. Once you create a new repo based in this template in github, please change the content of the README and make it relatable to the component you are creating.

## Instructions of usage

### Package.json

1. **name**: As you can see in the package.json file, the name of this package is "ids-starter". Please rename the name when you start your new project. Remember that all components are publish by the @inubekit organization in npm, so rename the package as @inubekit/{new-component-name}
2. **description**: Complete the description about the component you are creating.

### Environment variables

1. In order to control releases and package publishing, you will need to have a .env file with some environment variables.
2. `GH_TOKEN`: Create this token in github.com, using your profile settings. This token requires the **repo** scope.
3. `NPM_TOKEN`: Create this token in npmjs.com. You must ask the admin to add you as a organization admin prior to publish the package in npm.

### Pull Requests

1. All PRs must have a semver label attached to it. This is the way the publishing and versioning process will use to know if a PR demands a major, minor or patch version to be created.
2. To have these labels available, please run `npm run auto create-labels` to create them (you need to have already your `GH_TOKEN` in .env in order to make this command work).

### Publishing

Follow these steps to publish and release a new version of your package. Also check that you're an admin in the repository (validate with your team leader).

1. `npm run changelog`: this command will create a changelog for you, including in the document the changes that the current release will publish in the new version of the package and what should be the version number of the release. The number is calculated using the labels of all the PRs that are included in this new version (see the Pull Requests details above).
2. `npm version <new-version>`: this command makes multiple things. First, deletes the /dist folder in your project. Second, executes the build of the project and its files are stored in a new /dist folder. Third, creates a new version using the version number you pass in the command (use the version calculated in the changelog step). Fourth, executes a git push with the new version tag included. Fifth, creates a new release in Github. **This step requires that you have your `GH_TOKEN` working**.
3. `npm login`: you must be logged in with npm to continue the process.
4. `npm publish`: with the new build already in /dist, you can now execute this command and the new package version will be published in npm. **This command requires tat you have you `NPM_TOKEN` working.**
