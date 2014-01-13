---
title: Archivematica
date: 2013-10-11
tags: tutorials
published: false
---

So I had quite an ordeal to install Archivematica as a production system. So I decided to document what I did to get a working system.

### Install Ubuntu

1. [Install Ubuntu from ISO](http://youtu.be/hK-oggHEetc)
1. Install Synaptic via the Ubuntu Software Center
1. [Install Guest Additions](http://virtualboxes.org/doc/installing-guest-additions-on-ubuntu), except the location of the *.run file is different, VBOXADDITIONS_4.2.18_88780 (reboot and try again - window rescaling - if doesn't work)

### Install Archivematica

1. [Install Archivematica](https://www.archivematica.org/wiki/Multi_Node_Install), except don't add the gpg key, u=root, p=PASSWORD-need to set, "otherwise leave as is/unless the client is on the same server", don't fiddle with mysql, also install the client, mail - use defaults, no fstab
1. Check clamdscan; In Synaptic reinstall clamav-daemon

### Configure Shared Directories

1. Shared folders (permanent)
1. sudo gpasswd -a USERNAME archivematica
1. reboot
1. Create folder under /home (Transform), move transferBacklog to ~/Documents
1. `id -u archivematica; id -g archivematica`, 333:333
1. `sudo gedit /etc/rc.local` and add the lines `mount -t vboxsf -o uid=333,gid=333 SHAREDFOLDERNAME /home/FOLDERNAME` and `mount -t vboxsf -o uid=333,gid=333 SHAREDFOLDERNAME /var/archivematica/sharedDirectory/www/AIPsStore`
1. reboot
1. Move transferBacklog back to AIPsStore (on host computer)
1. sudo gpasswd -d USERMNAME archivematica
1. Browser - select transfer directory

[Normalize for access]

1. Go to "localhost" and install site
1. Add transfer directory

Other
-----

1. [Create MySQL user](LINK) and change database permissions
1. sharedDirectory/rejected - stored files
