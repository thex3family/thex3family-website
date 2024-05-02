<div align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <a href="https://the.x3.family"><img alt="thex3family logo" src="./public/assets/main-logo(white).png" alt="the.x3.family" width="125"></a>
</div>


<hr style="margin-top: 3em; margin-bottom: 3em;">

This is the repository for [the.x3.family](https://the.x3.family) website, a resource for the Co-x3 Family Foundation. Our mission is to _“To equip students, creatives, and retirees with knowledge to level up every day, tools to put their learning into action, and a community to never struggle alone."_ - read more about what this means [here](https://the.x3.family/contribute/about-us).

[the.x3.family](https://the.x3.family) is being improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to manage its evolution. 

If you’re interested in supporting us, find out [how to contribute](https://the.x3.family/contribute/). We also host online spaces to have meaningful conversations – come share your ideas or just say hi over [in our community](https://our.x3.family/).

## How To Contribute

Contributions of any kind are welcome! We follow the [all-contributors](https://allcontributors.org/docs/en/overview) specification, which means we recognize contributors to an open-source project in a way that rewards every contribution, not just code.

### 1. Submit An Issue

- Create a [new issue](https://github.com/thex3family/thex3family-website/issues/new/choose).
- Comment on the issue (if you'd like to be assigned to it) - that way [our team can assign the issue to you](https://github.blog/2019-06-25-assign-issues-to-issue-commenters/).

More information on the issue creation process, and expectations around creating issues can be [found here](docs/github-issue-triage-process.md).

### 2. Fork The Repository (repo)

- If you're not sure, here's how to [fork the repo](https://help.github.com/en/articles/fork-a-repo).

### 3. Set Up Your Local Environment (optional)

If you're ready to contribute and create your PR, it will help to set up a local environment so you can see your changes.

### 4. Make Awesome Changes!

1. Create new branch for your changes

```sh
git checkout -b new_branch_name
```

2. Start developing!

```sh
yarn dev
```

3. Commit and prepare for pull request (PR). In your PR commit message, reference the issue it resolves (see [how to link a commit message to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)).

```sh
git commit -m "brief description of changes [Fixes #1234]"
```

4. Push to your GitHub account

```sh
git push
```

### 5. Submit Your PR

- After your changes are committed to your GitHub fork, submit a pull request (PR) to the `dev` branch of the `thex3family/thex3family-website` repo
- In your PR description, reference the issue it resolves (see [linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword))
  - ex. `Updates out of date content [Fixes #1234]`
- Vercel (our hosting service for build previews) deploys all PRs to a publicly accessible preview URL.
- _Confirm your GC preview deploy looks & functions as expected_
- Why not say hi and draw attention to your PR in [our community](https://our.x3.family/)?

### 7. Wait for review

- The website team reviews every PR
- Acceptable PRs will be approved & merged into the `dev` branch

### 8. Release

- `master` is continually synced to Vercel and will automatically deploy new commits to the.x3.family
- You can [view the history of releases](https://github.com/thex3family/thex3family-website/releases), which include PR highlights

<hr style="margin-top: 3em; margin-bottom: 3em;">

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

The development of this website was inspired by the work of [ethereum.org](https://github.com/ethereum/ethereum-org-website). Before implementing any custom elements, we highly recommend exploring their codebase to gain insights and discover solutions that may be applicable to our website's needs.