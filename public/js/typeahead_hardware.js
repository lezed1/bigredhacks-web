/*
 * Typeahead
 */
var engine = new Bloodhound({
    name: 'colleges',
    prefetch: '/api/hardware',
    datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 5,
    sorter: function (a, b) {

        //case insensitive matching
        var input = $('#hardware').val().toLowerCase();

        a = a.name.toLowerCase();
        b = b.name.toLowerCase();

        //move exact matches to top
        if (input === a) {
            return -1;
        }
        if (input === b) {
            return 1;
        }

        //move beginning matches to top
        if (a.lastIndexOf(input, 0) === 0) {
            return -1;
        }
        if (b.lastIndexOf(input, 0) === 0) {
            return 1;
        }
    }
});

engine.initialize();

//general typeahead
$('.typeahead_hardware').typeahead({
    hint: true,
    highlight: true,
    autoselect: false,
    minLength: 3
}, {
    displayKey: 'name', // if not set, will default to 'value',
    source: engine.ttAdapter()
}).on('typeahead_hardware:selected typeahead_hardware:autocomplete', function (obj, datum, name) {
    $(this).data("hardwareid", datum.id);
    $("#hardwareid").val(datum.id);
});


//clear if empty on focusout
$("document").ready(function () {
    $("#hardware").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("hardwareid", "");
            $("#hardwareid").val("");
        }
    });
});