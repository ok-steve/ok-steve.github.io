---
date: 2022-03-22
title: What closes a Github ticket?
published: true
tags:
  - work
---

Github provides useful functionality to [automatically close tickets](https://help.github.com/en/articles/closing-issues-using-keywords) using keywords that reference the ticket number. But where can you add those references? I dug in to find out.

This question came about my work when we recently did a release in which none of the tickets we fixed were closed. We use the [git-flow model](https://nvie.com/posts/a-successful-git-branching-model/) for our workflow, merging pull requests into a `develop` branch and waiting to merge to the `master` branch until we start a new deployment. Github assumes a pull request will get merged directly into the main branch. So, I did some research to determine which scenarios would actually close tickets.

I added keywords in 3 places:

1. The pull request description.
2. A comment on the pull request.
3. In a Git commit message that is part of the pull request.

I did the above 3 for the following 2 workflows (for a total of 6 tests):

- Pull request merges directly into master.
- Pull request first merges into a develop branch, then another PR merges into master.

When merging a pull request directly into `master` tickets will automatically close if the keyword is in the pull request description (#1) or the commit message (#3). When merging first into `develop`, only a keyword in a commit message (#3) will close the ticket.

You can see my work in the [Github repository](https://github.com/sccherry/close-ticket-test) I used for these tests.

So, if you have a workflow that uses separate `master` and `develop` branches, including the keywords in the commit messages is the best way to ensure that tickets will be closed automatically.
