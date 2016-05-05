/*
 * Typeahead
 */
var engine2 = new Bloodhound({
    datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/api/hardware',
});

engine2.initialize();

//general typeahead
$('#hardware').typeahead( null, {
    displayKey: 'name',
    source: engine2.ttAdapter()
}).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
    $(this).data("hardware", datum.name);
});


//clear if empty on focusout
$("document").ready(function () {
    $("#hardware").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("hardware", "");
        }
    });
});