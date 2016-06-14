/*
 * Typeahead
 */

var _tt_college_enabled = false; //whether the typeahead is enabled

var engine = new Bloodhound({
    name: 'colleges',
    prefetch: '/api/colleges',
    datumTokenizer: function (d) {
        return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 5,
    sorter: function (a, b) {

        //case insensitive matching
        var input = $('#college,#new-college').val().toLowerCase();

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

/**
 * Enable the typeahead
 * @private
 */
var _tt_college_enable = function() {
    if (_tt_college_enabled) {
        return;
    }

    $('#college').typeahead({
        hint: true,
        highlight: true,
        autoselect: false,
        minLength: 3
    }, {
        displayKey: 'name', // if not set, will default to 'value',
        source: engine.ttAdapter()
    }).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
        $(this).data("collegeid", datum.id);
        $("#collegeid,#new-collegeid").val(datum.id);
    });

//used in admin bus management
    $('.typeaheadlist').typeahead({
        hint: true,
        highlight: true,
        autoselect: false,
        minLength: 3
    }, {
        displayKey: 'name', // if not set, will default to 'value',
        source: engine.ttAdapter()
    }).on('typeahead:selected typeahead:autocomplete', function (obj, datum, name) {
        var currentidlist = $("#collegeidlist").val();
        if (currentidlist != "") {
            $("#collegeidlist").val(currentidlist + "," + datum.id);
        }
        else {
            $("#collegeidlist").val(datum.id);
        }
    });

    _tt_college_enabled = true;

    //clear if empty on focusout
    $("#college,#new-college").on("focusout", function () {
        if ($(this).val().length == 0) {
            $(this).data("collegeid", "");
            $("#collegeid,#new-collegeid").val("");
        }
    });
};

/**
 * Disable the typeahead
 * @private
 */
var _tt_college_disable = function() {
    _tt_college_enabled = false;
    $("#college").typeahead("destroy");
    $("#college,#new-college").off("focusout");
};

/**
 * Extend the jquery object with namespaced typeahead funcions
 */
$.extend({
    CollegeTypeahead: {
        enable: _tt_college_enable,
        disable: _tt_college_disable
    }
});