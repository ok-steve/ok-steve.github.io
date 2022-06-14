---
date: 2011-05-11
title: Import Delicious Bookmarks into Zotero
published: false
tags:
  - work
---

If you're like me when you heard the [announcement that Yahoo will "Sunset" Delicious](http://techcrunch.com/2010/12/16/is-yahoo-shutting-down-del-icio-us) you began looking for a place to move all of your bookmarks. I decided to move mine to Zotero, even after the [announcement that Delicious had been purchased](http://detnews.com/article/20110427/BIZ04/104270423/YouTube-founders-buy-bookmark-site-Delicious-from-Yahoo) and that I could migrate my bookmarks to [Avos](http://www.avos.com/). For me at least Zotero had several advantages over going to Avos or another social bookmarking service:

1. I already use it.
2. Although it isn't really a bookmarking application, it can be used as such since it has all of the functionality that Delicious had.
3. In case I ever do need to cite a website I've bookmarked, it will already be in the same application.
4. I have a copy of my data on my computer and thus don't have to rely on the cloud (and hopefully will never have to deal with another "sunsetting").

Unfortunately there was no tool---that I found---that helped me get my data out of Delicious and into Zotero, so I created one and made it available for you all to use as well. Basically it converts a Delicious XML file into a MODS record that can be uploaded by Zotero. It's pretty basic, but it gets the job done (for me at least).

![The deletion of my Delicious account.](/public/img/uploads/delicious-delete.png)

## Step 1: Download your Delicious data

You can go to [my app](http://stevenccherry2.appspot.com/) and enter your Delicious login information and follow the instructions. Don't worry, I won't do anything---dubious or otherwise---with your information. You can look at [my source code on GitHub](https://github.com/sccherry/Delicious-Zotero-Converter) to see for yourself.

The Delicious API limits exports to 1,000 records so if you have a ton of bookmarks, you'll have to segment your data, which you can do by date or by tag.

## Step 2: Import your Delicious data into Zotero

Then in Zotero, [use the import function](http://www.zotero.org/support/getting_stuff_into_your_library#importing_records_from_other_reference_tools) and enter the file you just created.

![Import data into Zotero](/public/img/uploads/import-zotero.png)

You should see a new collection named "delicious-zotero" in your Library. If you don't I'd like to know. Just shoot me a comment.
