---
title: Adding ARIA landmarks to Omega
date: 2012-08-30
tags: tutorials
libraries: prettify
---

Omega is an awesome base theme for Drupal, but there are some features I wish it had. One of which making it more accessible by adding [ARIA landmark roles](http://www.w3.org/TR/wai-aria/roles) to different regions. Fortunately it’s easy to add a preprocess function to accomplish this.

The Drupal website has a [generic description of adding ARIA roles](http://drupal.org/node/1179668), but to add them according to Omega conventions you can do the following in the preprocess-region.inc in the preprocess folder in your Omega subtheme.

    function YOURTHEMENAME_alpha_preprocess_region(&$vars) {
      // 'branding' is the region name
      // (same names as is in the .info file)
      if ($vars['region'] == 'branding') {
        // 'banner' is the ARIA role name
        $vars['attributes_array']['role'] = 'banner';
      }
      // Add more roles here
    }

You can use more if statements within the function to add roles to more regions. You’ll need to decide what roles you want to assign to each region. You could also follow the same conventions to add roles to zones, blocks, etc.

This post has been about the technical implementation of adding ARIA landmarks. For guidance on how to use landmarks look at [this blog post from the Paciello Group](http://www.paciellogroup.com/blog/2013/02/using-wai-aria-landmarks-2013).
