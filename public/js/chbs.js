(function( D ) {
    var another = D.getElementById("pp-another"),
        pp_out = D.getElementById("pp-phrase"),
        pp_length = D.getElementById("pp-length-output"),
        pp_punc = D.getElementById("pp-punc"),
        pp_caps = D.getElementById("pp-caps");

    function selectText( element ) {
        // Select the text content of the given element.
        var range, selection;

        if ( D.body.createTextRange ) { // ms
            range = d.body.createTextRange();
            range.moveToElementText( element );
            range.select();
        } else if ( window.getSelection ) { // moz, opera, webkit
            selection = window.getSelection();
            range = D.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function addPunctuation( words ) {
        var ends = [
                "!",
                ",",
                ".",
                "?",
                ":",
                ";",
                " -",
                "..."
            ];

        return words.map(function( word ) {
            return word +
                ends[ ( Math.random() * ends.length ) | 0 ];
        });
    }

    function addCapitals( words ) {
        return words.map(function( word ) {
            if ( Math.random() < 0.5 ) {
                word = word.split("");
                word[0] = word[0].toUpperCase();
                word = word.join("");
            }

            return word;
        });
    }

    another.onclick = function() {
        var xhr = new XMLHttpRequest(),
            num_words = 4;

        xhr.open( "GET", "/chbs-gen?words=" + num_words, true );

        xhr.onload = function() {
            var words = JSON.parse( this.responseText );

            if ( pp_punc.checked ) {
                words = addPunctuation( words );
            }

            if ( pp_caps.checked ) {
                words = addCapitals( words );
            }

            words = words.join(" ");
            pp_out.innerHTML = words;
            pp_length.innerHTML = words.length;
        };

        xhr.send();
    };

    pp_out.onclick = function() {
        selectText( this );
    };
}( document ));
