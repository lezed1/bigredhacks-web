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

$('#hardware').tagsinput({
    typeaheadjs: {
        minLength: 0,
        displayKey: 'name',
        valueKey: 'name',
        name: 'name',
        source: engine2.ttAdapter()
    }
});

//clear if empty on focusout
$("document").ready(function () {
    $("#hardware").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("hardware", "");
        }
    });
});