(function( D ) {
    var another = D.getElementById("pp-another"),
        pp_out = D.getElementById("pp-phrase"),
        pp_length = D.getElementById("pp-length-output"),
        pp_words = D.getElementById("pp-words"),
        pp_caps = D.getElementById("pp-caps");

    function selectText( element ) {
        // Select the text content of the given element.
        var range, selection;

        if ( D.body.createTextRange ) { // ms
            range = D.body.createTextRange();
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

    pp_words.onchange = another.onclick = function() {
        var xhr = new XMLHttpRequest();

        xhr.open( "GET", "/chbs-gen?words=" + pp_words.value, true );

        xhr.onload = function() {
            var words = JSON.parse( this.responseText );

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
