/*
 * Typeahead
 */
var engine3 = new Bloodhound({
    datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/majors.json',
});

engine3.initialize();

//general typeahead
$('#major').typeahead( {
    hint: true,
    highlight: true,
    autoselect: false,
    minLength: 3}, {
    displayKey: '',
    source: engine3.ttAdapter()
}).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
    $(this).data("major", datum);
});


//clear if empty on focusout
$("document").ready(function () {
    $("#major").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("major", "");
        }
    });
});