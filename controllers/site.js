var fs = require("fs"),
    word_list = fs.readFileSync( "words.txt", {
        encoding: "utf8"
    }).split("\n"),
    crypto = require("crypto");

function getSomeWords( count, cb ) {
    if ( typeof cb !== "function" ) {
        return false;
    }

    crypto.randomBytes( 8, function( err, bytes ) {
        var words,
            num_words = word_list.length,
            i;

        if ( !err ) {
            words = [];
            while ( words.length < count ) {
                i = bytes.readUInt16LE( words.length );
                i = Math.round( ( i / 0xFFFF ) * num_words );
                words.push( word_list[ i ] );
            }
        }

        cb( err, words );
    });
}

exports.index = function( req, res ) {
    if ( req.query.words ) {
        getSomeWords( +req.query.words, function( err, words ) {
            if ( err) {
                return res.send( 500, "Error generating phrase:" + err );
            }

            res.send( words );
        });
    } else {
        getSomeWords( 4, function( err, words ) {
            if ( err ) {
                words = [ "Error generating phrase:", err ];
            }

            res.render( "index", { words: words } );
        });
    }
};
