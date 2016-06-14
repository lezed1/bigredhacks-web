var global_config = require("../config");
var sendgrid = require("sendgrid")(global_config.setup.sendgrid_api_key);

/**
 * Asynchronously sends a transactional email
 * @param body Contains the html body of the email
 * @param config Contains parameters: to.email, to.name, from_email, from_name, and subject
 * @param callback a function of (err, json) to handle callback
 */
module.exports.sendEmail = function (body, config, callback) {
    if (!callback) callback = defaultCallback;
    var email = new sendgrid.Email();

    email.addTo(config.to.email);
    email.setFrom(config.from_email);
    email.setFromName(config.from_name);
    email.setSubject(config.subject);
    email.setHtml(body);
    email.addFilter('templates', 'enable', 1);
    email.addFilter('templates', 'template_id', global_config.sendgrid.sg_general);

    sendgrid.send(email, callback);
};

var defaultCallback = function (err, json) {
    if (err) {
        console.log(err);
    } else {
        console.log(json);
    }
};
