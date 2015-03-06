/*jshint node: true */
var fs = require("fs"),
    word_list = fs.readFileSync( "words.txt", {
        encoding: "utf8"
    }).split("\n"),
    crypto = require("crypto"),
    days = "Mon Tues Weds Thurs Fri Sat Sun".split(" "),
    months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

function getSomeWords( count, cb ) {
    if ( typeof cb !== "function" ) {
        return false;
    }

    // 2 bytes per character gives a range of 0 .. 65535 for random number
    // generation, which is then normalised into the 0 .. 20000 range of the
    // word list.
    crypto.randomBytes( count * 2, function( err, bytes ) {
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

function log( words, ip, load ) {
    var now = new Date();
    var s = load ? "\033[36m(page)\033[0m" : "";
    var mins = now.getUTCMinutes();

    console.log(
        "\033[33m" + ip + "\033[0m",
        now.getUTCHours() + ":" + ( mins < 10 ? "0" + mins : mins ),
        days[ now.getDay() + 1 ], now.getDate(),
        months[ now.getMonth() ],
        "[\033[32m", words.join(" "), "\033[0m]",
        "(" + words.length + " " + words.join(" ").length + ")",
        s );
}

exports.index = function( req, res ) {
    if ( req.query.words ) {
        getSomeWords( Math.min( +req.query.words, 20 ), function( err, words ) {
            if ( err) {
                return res.send( 500, "Error generating phrase:" + err );
            }

            log( words, req.ip );
            res.send( words );
        });
    } else {
        getSomeWords( 4, function( err, words ) {
            if ( err ) {
                words = [ "Error generating phrase:", err ];
            }

            log( words, req.ip, true );
            res.render( "index", { words: words } );
        });
    }
};
