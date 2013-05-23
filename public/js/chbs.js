(function( D ) {
    var another = D.getElementById("pp-another"),
        pp_out = D.getElementById("pp-phrase"),
        pp_length = D.getElementById("pp-length-output");

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

    another.onclick = function() {
        var xhr = new XMLHttpRequest(),
            num_words = 4;

        xhr.open( "GET", "/chbs-gen?words=" + num_words, true );

        xhr.onload = function() {
            var words = JSON.parse( this.responseText ).join(" ");
            pp_out.innerHTML = words;
            pp_length.innerHTML = words.length;
        };

        xhr.send();
    };

    pp_out.onclick = function() {
        selectText( this );
    };
}( document ));
