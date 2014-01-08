---
title: Adding Google Analytics to Omeka
date: 2012-07-18
tags: tutorials
libraries: prettify
---

At my job we use Google Analytics on almost all of our sites. For many of the systems we use there is a plugin available to make Google Analytics configuration easier, like for [Wordpress](http://wordpress.org/extend/plugins/google-analytics-for-wordpress) and [Drupal](http://drupal.org/project/google_analytics). Unfortunately there is not a similar plugin for Omeka.

This is a problem because we have multiple Omeka sites---two at the moment, but likely more in the future---and each of these sites uses the same theme, but has a different Analytics profile. We were using the [recommended method for adding Analytics code](http://omeka.org/forums/topic/google-analytics-plugin), but this involved maintaining two sets of theme files with entirely the same code, except the Analytics ID. Talk about a pain in rear. So, I came up with the following method to remove all site-specific information from the code and put it in the database.

I'm not going to write about how to use Google Analytics; I assume you will already have that set up. I also assume you understand theming (though you probably don't need to know that much PHP).

### Get your Google Analytics ID into the database

The first step is to enable to Omeka to hold your Google Analytics ID in the database. Since, it's really the only unique part of the Google Analytics code.

To do that in the config.ini file add the following lines:

    use_google_analytics.type = "checkbox"
    use_google_analytics.options.label = "Use Google Analytics"
    use_google_analytics.options.description = "Check this box if you wish to enable your Google Analytics account on this site. Don't forget to enter your account number below!"
    use_google_analytics.options.value = "1"

    google_analytics_id.type = "text"
    google_analytics_id.options.label = "Google Analytics ID"
    google_analytics_id.options.description = "Enter the Google Analytics ID to track this site."

This creates an option in the theme configuration---Settings &rarr; Themes &rarr; Configure---where you can enter your Analytics ID. The form will have many fields that you probably have seen when setting up other Omeka sites. But there will also be a field to enter your Analytics ID (UA-XXXXXXX-XX). So enter it. you can also turn Analytics off and on using the checkbox available.

### Enter the Google Analytics tracking code in your theme

Ok, now that you have the code in the database you need to make sure it is output in a theme file. The code can go anywhere. [Google recommends](http://support.google.com/googleanalytics/bin/answer.py?hl=en&amp;answer=174090) that it go before the closing `</head>` tag---which would be in the file common/header.php. However I decided to put in the footer---common/footer.php---right above the closing `</body>` tag as is done in HTML5 Boilerplate.

Enter the following code wherever you want it to be output.

    <?php if (!has_permission('Items', 'showNotPublic') && get_theme_option('Use Google Analytics') !== '0'): ?>
      <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
      <script>
        var _gaq=[['_setAccount','<?php echo get_theme_option('Google Analytics ID'); ?>'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
      </script>
    <?php endif; ?>

This code does a few things:

- The first line checks if a user has permissions to view private files, which is an indicator that user is logged in, and if the checkbox mentioned earlier is checked.
- The next several lines are basically the code I got from Google. If you set up your Analytics account and get different code to past in, feel free to use that. The only part you really need to change is after `_setAccount`; replace the Analytics ID with the PHP function to output the value from the settings.

### Conclusion

That's really it, a simple way to allow multiple sites to use the same theme with different Google Analytics code. Of course, this method is tied to a specific theme, so writing a legitimate plugin would probably be the ideal. But I don't really have the time for that.
