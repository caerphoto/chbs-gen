(function( D ) {
    var another = D.getElementById("pp-another"),
    pp_out = D.getElementById("pp-phrase"),
    pp_length = D.getElementById("pp-length-output"),
    pp_words = D.getElementById("pp-words"),
    hash_count;

    function selectText( element ) {
        // Select the text content of the given element.
        var range, selection;

        if ( D.body.createTextRange ) { // ms
            range = D.body.createTextRange();
            range.moveToElementText( element );
        } else if ( window.getSelection ) { // moz, opera, webkit
            selection = window.getSelection();
            range = D.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    pp_words.onchange = another.onclick = function() {
        var xhr = new XMLHttpRequest();

        xhr.open( "GET", "/chbs-gen?words=" + pp_words.value, true );

        xhr.onload = function() {
            var words = JSON.parse( this.responseText );

            pp_out.className = null;

            words = words.join(" ");
            pp_out.innerHTML = words;
            pp_length.innerHTML = words.length;
        };

        pp_out.className = "loading";
        xhr.send();
    };

    pp_out.onclick = function() {
        selectText( this );
    };

    if ( window.location.hash ) {
        hash_count = parseInt( window.location.hash.slice(1) );
    }

    if ( hash_count ) {
        pp_words.value = hash_count;
    }
}( document ));
