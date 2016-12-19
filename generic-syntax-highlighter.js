/*! <https://github.com/tovic/generic-syntax-highlighter> */

(function(win, doc) {

    function SH(s) {
        return '<span style="color:#000000">' + s.replace(new RegExp([
            '<.*?>', // "real" tags
            '&lt;\\?\\S*', // template open
            '\\?&gt;', // template close
            '&lt;.*?&gt;', // HTML tags
            '&lt;!\\-\\-[\\s\\S]*?\\-\\-&gt;', // HTML comments
            '\\/\\/[^\\n]+', // comments
            '#\\s+[^\\n]+', // comments
            '\\/\\*[\\s\\S]*\\*\\/', // comments
            '"(?:\\\\.|[^"\\n])*"', // strings
            '\'(?:\\\\.|[^\'\\n])*\'', // strings
            '`(?:\\\\.|[^`])*`', // strings
            '\\/[^\\n]+\\/[gimuy]*', // regular expressions
            '&amp;\\S+;', // entities
            '\\b(?:true|false)\\b', // booleans
            '(?:\\d*\.)?\\d+', // numbers
            '\\b(?:a(?:bstract|lias|nd|rguments|rray|s(?:m|sert)?|uto)|b(?:ase|egin|ool(?:ean)?|reak|yte)|c(?:ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(?:bugger|cimal|clare|f(?:ault|er)?|init|l(?:egate|ete)?)|do|double|e(?:cho|ls?if|lse(?:if)?|nd|nsure|num|vent|x(?:cept|ec|p(?:licit|ort)|te(?:nds|nsion|rn)))|f(?:allthrough|alse|inal(?:ly)?|ixed|loat|or(?:each)?|riend|rom|unc(?:tion)?)|global|goto|guard|i(?:f|mp(?:lements|licit|ort)|n(?:it|clude(?:_once)?|line|out|stanceof|t(?:erface|ernal)?)?|s)|l(?:ambda|et|ock|ong)|m(?:odule|utable)|NaN|n(?:amespace|ative|ext|ew|il|ot|ull)|o(?:bject|perator|r|ut|verride)|p(?:ackage|arams|rivate|rotected|rotocol|ublic)|r(?:aise|e(?:adonly|do|f|gister|peat|quire(?:_once)?|scue|strict|try|turn))|s(?:byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(?:emplate|hen|his|hrows?|ransient|rue|ry|ype(?:alias|def|id|name|of))|u(?:n(?:checked|def(?:ined)?|ion|less|signed|til)|se|sing)|v(?:ar|irtual|oid|olatile)|w(?:char_t|hen|here|hile|ith)|xor|yield)\\b' // keywords
        ].join('|'), 'g'), function(a) {
            if (a) {
                if (/^(\W|<.*?>)$/.test(a)) {
                    // skip punctuations and "real" tags ...
                } else if (/^(&lt;!\-\-)/.test(a) || /^&lt;\?\S*|\?&gt;$/.test(a)) {
                    a = '<span style="color:#008000;font-style:italic;">' + a + '</span>'; // HTML comments and templates
                } else if (/^(\/\/|#\s+|\/\*)/.test(a)) {
                    a = '<span style="color:#808080;font-style:italic;">' + a + '</span>'; // comments
                } else if (/^&lt;!/.test(a)) {
                    a = '<span style="color:#4682B4;font-style:italic;">' + a + '</span>'; // document types
                } else if (/^&lt;.*?&gt;$/.test(a)) {
                    a = '<span style="color:inherit;">' + SH_tags(a) + '</span>'; // tags
                } else if (/["'`]/.test(a[0])) {
                    a = '<span style="color:#008000;">' + a + '</span>'; // strings
                } else if (/\//.test(a[0])) {
                    a = '<span style="color:#4682B4;">' + a + '</span>'; // regular expressions
                } else if (/^(\d*\.)?\d+$/.test(a)) {
                    a = '<span style="color:#0000FF;">' + a + '</span>'; // numbers
                } else if (a === 'true' || a === 'false') {
                    a = '<span style="color:#A52A2A;font-weight:bold;">' + a + '</span>'; // booleans
                } else if (/^&amp;\S+;$/.test(a)) {
                    a = '<span style="color:#FF4500;">' + a + '</span>' // entities
                } else {
                    a = '<span style="color:#FF0000;font-weight:bold;">' + a + '</span>'; // keywords
                }
            }
            return a;
        }) + '</span>';
    }

    function SH_tags(s) {
        return s.replace(/&lt;(\/?)(\S+)(\s.*?)?&gt;/g, function(a, b, c, d) {
            c = '<span style="color:#800080;font-weight:bold;">' + c + '</span>';
            if (d) {
                d = d.replace(/(\s+)([^\s=]+)(?:=("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\S+))?/g, function(a, b, c, d) {
                    var o = b + '<span style="font-weight:bold;">' + c + '</span>';
                    if (d) {
                        o += '=<span style="color:#0000FF;">' + d + '</span>';
                    }
                    return o;
                });
            } else {
                d = "";
            }
            return '&lt;' + b + c + d + '&gt;';
        });
    }

    win.GSH = function(node) {
        if (!node) return;
        if (node.nodeName) {
            node = [node];
        }
        for (var i = 0, j = node.length, k; i < j; ++i) {
            k = node[i];
            k.innerHTML = SH(k.innerHTML);
        }
    };

})(window, document);