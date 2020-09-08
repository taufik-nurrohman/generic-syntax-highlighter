<?php

require __DIR__ . '/generic-syntax-highlighter.php';

?><!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta content="width=device-width" name="viewport">
    <title>Generic Syntax Highlighter</title>
    <style>
    pre {
      background: #fff;
      color: #000;
      border: 1px solid;
      padding: .5em;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    </style>
  </head>
  <body>
    <pre><code><?php echo SH(htmlentities('<!-- comment -->
<div class="foo" id="bar" title="foo \\"bar \\\\\" ba\\\'z qux">
  <p>lorem ipsum &amp; dolor sit</p>
</div>')); ?></code></pre>
    <pre><code><?php echo SH(htmlentities('<!DOCTYPE html>
<html dir="ltr">
  <head>
    <!-- comment -->
    <title>Test</title>
    <style>
    #foo {color:red}
    .bar {color:#fff}
    </style>
    <?php

    # do header ...
    echo do_header($_GET[\'foo\']);

    ?>
  </head>
  <body>
    <script>
    // inline comment
    function foo(bar) {
        var v = /\s 123 true function\//g;
        var w = "foo" + 4;
        var x = true;
        var y = 4 + 5 + 1.5 + .4;
        var z = `<div>
  <div></div>
</div>`;
        /**
         * block comment
         */
        return "string" + \'string\' + "string \\" str\\\'ing" + \'string \\\' str\"ing\' + "" + \'\';
    }
    </script>
  </body>
</html>')); ?></code></pre>
    <p><em>Currently not targeted for highlighting CSS syntax.</em></p>
  </body>
</html>
