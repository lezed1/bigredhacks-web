/*
 * Typeahead
 */
var engine3 = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/majors.json',
});

engine3.initialize();

//general typeahead
$('#major').typeahead( null, {
    displayKey: 'name',
    source: engine3.ttAdapter()
}).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
    console.log('typetype');
    $(this).data("major", datum.name);
});


//clear if empty on focusout
$("document").ready(function () {
    $("#major").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("major", "");
        }
    });
});