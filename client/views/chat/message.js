var shortUrl = function(url, l){
    function shortString(s, l, reverse){
        var stop_chars = [' ','/', '&'];
        var acceptable_shortness = l * 0.80; // When to start looking for stop characters
        var reverse = typeof(reverse) != "undefined" ? reverse : false;
        var s = reverse ? s.split("").reverse().join("") : s;
        var short_s = "";

        for(var i=0; i < l-1; i++){
            short_s += s[i];
            if(i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0){
                break;
            }
        }
        if(reverse){ return short_s.split("").reverse().join(""); }
        return short_s;
    }
    
    var l = typeof(l) != "undefined" ? l : 50;
    var chunk_l = (l/2);
    var url = url.replace("http://","").replace("https://","");

    if(url.length <= l){ return url; }

    var start_chunk = shortString(url, chunk_l, false);
    var end_chunk = shortString(url, chunk_l, true);
    return start_chunk + ".." + end_chunk;
}

Template.message.rendered = function(){
    var message = $(this.find('.message-content'));
    var text = message.html().autoLink({
        callback: function(url) {
            var shortenedUrl = shortUrl(url, 40);
            return '<a target="_blank" href="' + url + '">' +
                shortenedUrl + '</a>';
        } 
    });

    text = Emoticons.apply(text);

    message.html(text);
};