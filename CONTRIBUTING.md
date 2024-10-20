# Welcome to contributing guide

**If you have any questions: You can join us on the Discord of community**

Thank you for investing your time in contributing to my project! Any contribution you make will be reflected on [s42.app](https://s42.app) ✨

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon on the top left corner of this document to get to a specific section of this guide quickly.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Getting started

S42 is designed to be modified by anyone of 42 network without pain. 🎉
A lot of contributions is possible, from given a feedback to implement a complex
new section, all is possible, this is our project (Parce que c'est notre projet).

## Types of contributions

### Issues

#### Create a new issue

If you spot a problem with the app, submit an idea of enchantment or new fonctionnality,
search if an issue don't exist yet. If a related issue doesn't exist,
you can open a new issue using a relevant [issue form](https://github.com/42atomys/stud42/issues/new/choose).

#### Solve an issue

Scan through our [existing issues](https://github.com/42atomys/issues/issues)
to find one that interests you. You can narrow down the search using `labels` as
filters. If it's your first contribution, the label https://github.com/42atomys/stud42/labels/good%20first%20issue
is a good one to start !

As a general rule, we don’t assign issues to anyone. If you find an issue to work on,
you are welcome to open a PR with a fix.

### Make Changes

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation,
see "[Working in a codespace](https://github.com/github/docs/blob/main/contributing/codespace.md)."

#### Make changes locally

1. [Install Docker](https://docs.docker.com/get-docker).

2. [Install Vscode](https://code.visualstudio.com/download).

3. [Install remote container extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

4. Fork the repository and pull your fork.

5. Open your fork on VSCode and start the devcontainer (Function: `Remote-Containers: Open Folder in Container...`)

> This action can takes a long time due to the first initialization of the app
> on your machine. This devcontainer will install all dependencies and setup
> your environement to work on the project automatically. The first build of
> image and container initialization can takes ~ 5 minutes

6. Create a working branch and start with your changes!

For more information about devcontainers and how to use it see the [devcontainers docs](/docs/devcontainers/README.md)

### Commit your update

Commit the changes once you are happy with them.
See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to know
how to do a good commit message. Don't worry a linter is present to help you, this is not a law to annoy you, think of it more as a training on how to manage your commits.

Once your changes are ready, don't forget to **self-review** to speed up the
review process ⚡️

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations 🎉 🎉 Thanks you ✨.

Once your PR is merged, your contributions will be publicly visible on the [GitHub repo](https://github.com/42atomys/stud42).

Now that you are part of the S42 community, awesome !
