Generic Syntax Highlighter
==========================

[Demo](https://taufik-nurrohman.github.io/generic-syntax-highlighter)

Usage
-----

Put `generic-syntax-highlighter.min.js` script just before the `</body>` tag then call `GSH(node)` function next to it, where `node` is a HTML collection or a HTML node.

~~~ .html
<script src="generic-syntax-highlighter.min.js"></script>
<script>
window.addEventListener('DOMContentLoaded', function() {
    GSH(document.querySelectorAll('pre > code:not(.txt)'));
});
</script>
~~~
