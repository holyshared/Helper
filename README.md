Helper
====================================

![Screenshot1](url_to_image1)

How to use
------------------------------------------------------------------------



Build packages
------------------------------------------------------------------------

### Mootools Core
packager build Core/Class.Extras Core/DOMReady -blocks 1.2compat

### Mootools Mobile
packager build Mobile/Swipe -packages Core > mootools-mobile.js

### Helper
packager build Helper/* +use-only Helper > helper.js
