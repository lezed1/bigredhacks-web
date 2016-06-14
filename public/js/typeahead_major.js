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
    limit: 3,
    sorter: function (a, b) {
        if (a.indexOf('CS') > -1 && b.indexOf('CS' > -1)) {
            return a.localeCompare(b);
        } else if (b.indexOf('CS') > -1) {
            return 1;
        } else if (a.indexOf('CS') > -1) {
            return -1;
        } else {
            return a.localeCompare(b);
        }
    }
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
