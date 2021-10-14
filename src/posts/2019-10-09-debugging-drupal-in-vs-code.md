---
layout: post.njk
title: Debugging Drupal in VS Code
date: 2019-10-09
published: true
tags: 
  - posts
---
I use [docker4drupal](https://github.com/wodby/docker4drupal), the [Drupal Composer template](https://github.com/drupal-composer/drupal-project), and VS Code for my local Drupal development. Below is a description of how to configure VS Code's debugging tools to work with this setup.

### PHP

1. Install the [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
2. In the debugging panel add configuration for PHP.
3. Edit the "Listen for XDebug" configuration by adding `"pathMappings": { "/var/www/html": "${workspaceRoot}" }`.
4. In `docker-compose.yml` file uncomment `PHP_XDEBUG`, `PHP_XDEBUG_DEFAULT_ENABLE`, `PHP_XDEBUG_REMOTE_CONNECT_BACK`, and `PHP_XDEBUG_REMOTE_HOST` (whichever line applies to your environment).
5. Install [Xdebug helper for Firefox](https://addons.mozilla.org/en-US/firefox/addon/xdebug-helper-for-firefox/) and/or [XDebug helper for Chrome](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc).

### JavaScript

1. Install the [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug) and/or [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2. In the debugging panel add "launch" configuration for Firefox and/or Chrome debuggers.
3. Edit the configuration by adding `"webRoot": "\${workspaceFolder}/web"`.

I create a gist to display the complete configuration file:

<script src="https://gist.github.com/sccherry/3338e8855387e489b1bf97553348bde6.js"></script>
