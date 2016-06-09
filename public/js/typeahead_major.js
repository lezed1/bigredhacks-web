/*
 * Typeahead
 */
var engine3 = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
        url: '/majors.json',
        filter: function (data) {
            return $.map(data, function (major) {
                return major;
            });
        }
    },
    limit: 3
});

engine3.initialize();
var ttadapt = engine3.ttAdapter();
var $major = $('#major');

//general typeahead
$major.typeahead({
        minLength: 1,
    },
    {
    displayKey: '',
    source: ttadapt,
    limit: 4
}).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
});


//clear if empty on focusout
$("document").ready(function () {
    $major.on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("major", "");
        }
    });
});
