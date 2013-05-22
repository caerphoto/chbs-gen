var fs = require("fs"),
    word_list = fs.readFileSync( "words.txt", {
        encoding: "utf8"
    }).split("\n");

function getSomeWords( count ) {
    var words = [],
        num_words = word_list.length,
        i;

    while ( words.length < count ) {
        i = Math.round( Math.random() * num_words );
        words.push( word_list[ i ] );
    }

    return words;
}

exports.index = function( req, res ) {
    if ( req.query.words ) {
        return res.send( getSomeWords( +req.query.words ) );
    }

    res.render( "index", { words: getSomeWords(4) } );
};
