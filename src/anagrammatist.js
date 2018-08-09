importScripts('dictionary.js');
var old_letters;
var old_anagram;
var dict_len = dict.length;

onmessage = function(oEvent) {
    var letters = oEvent.data.letters;
    var anagram = oEvent.data.anagram;
    if (old_letters == letters && old_anagram == anagram)
        return;
    old_letters = letters;
    old_anagram = anagram;
    var available = Array(26).fill(0);
    var A = ("A").charCodeAt(0);
    var llen = letters.length;
    for (var i=0; i<llen; i++)
        try{ available[letters.charCodeAt(i)-A] += 1; } catch {}
    var alen = anagram.length;
    for (var i=0; i<alen; i++)
        try{ available[anagram.charCodeAt(i)-A] -= 1; } catch {}
    var error = "";
    for (var i=0; i<26; i++)
        if (available[i] < 0)
            error += "Short "+(-1*available[i])+" letter "+String.fromCharCode(i+A)+(available[i]<-1?"'s":"")+"<br/>";
    if (error != "") {
        postMessage(error);
    } else {
        var num_avail = available.reduce(function(a,b){return a+b;},0);
        var t0 = performance.now();
        var msg = "";
        for (var i=0;i<dict_len;i++) {
            check: {
            for (var j=0;j<26;j++)
                if (available[j]<dict[i][j])
                    break check;
            msg += dict_words[i]+"<br/>";
            }
        }
        var t1 = performance.now();
        postMessage(msg);
    }
}
