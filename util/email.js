var global_config = require("../config");
var sendgrid = require("sendgrid")(global_config.setup.sendgrid_api_key);

const year = "2016";
const acceptedSubject = "You've been accepted to BigRed//Hacks "+year+"!";
const waitlistedSubject = "BigRed//Hacks " + year + " decision status";
const rejectectSubject = "BigRed//Hacks " + year + " decision status";
const acceptedBody = "<p>Congratulations, you have been accepted to BigRed//Hacks "+year+"! " +
    "Take a deep breath, all of your hard work has finally paid off.  We know the suspense was killing you.</p>" +
    "<p>A more updated schedule will be posted soon.  We hope to see you there!</p>" +
    "<p>BigRed//Hacks Team</p>"; // TODO: Write
const waitlistedBody = "<p> You've been waitlisted...</p>"; // TODO: Write
const rejectedBody = "<p>You have not been accepted.</p>"; // TODO: Write
const waitlistedToAcceptedBody = "<p>Congratulations, you've survived the wait list and have been accepted to BigRed//Hacks "+year+"! " +
    "Take a deep breath, all of your hard work has finally paid off.  We know the suspense was killing you.</p>" +
    "<p>A more updated schedule will be posted soon.  We hope to see you there!</p>" +
    "<p>BigRed//Hacks Team</p>";

/**
 * Asynchronously sends a transactional email
 * @param body Contains the html body of the email
 * @param config Contains parameters: to.email, to.name, from_email, from_name, and subject
 * @param callback a function of (err, json) to handle callback
 */
function sendEmail (body, config, callback) {
    if (!callback) callback = defaultCallback;
    var email = new sendgrid.Email();

    email.addTo(config.to.email);
    email.setFrom(config.from_email);
    email.setFromName(config.from_name);
    email.setSubject(config.subject);
    email.setHtml(body);
    email.addFilter('templates', 'enable', 1);
    email.addFilter('templates', 'template_id', global_config.sendgrid.sg_general);

    sendgrid.send(email, function(err) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback();
        }
    });
}

module.exports.sendDecisionEmail = function (name, notifyStatus, newStatus, config, callback) {
  if (notifyStatus === "Waitlisted" && newStatus === "Accepted") {
      config.subject = acceptedSubject;
      sendEmail("<p>Hey " + name + ",</p>" + waitlistedToAcceptedBody, config, callback);
  } else {
      switch (newStatus) {
          case "Accepted":
              config.subject = acceptedSubject;
              sendEmail("<p>Hey " + name + ",</p>" + acceptedBody, config, callback);
              break;
          case "Waitlisted":
              config.subject = waitlistedSubject;
              sendEmail("<p>Hi " + name + ",</p>" + waitlistedBody, config, callback);
              break;
          case "Rejected":
              config.subject = rejectectSubject;
              sendEmail("<p>Hi " + name + ",</p>" + rejectedBody, config, callback);
              break;
      }
  }
};

module.exports.sendEmail = sendEmail;

var defaultCallback = function (err, json) {
    if (err) {
        console.log(err);
    } else {
        console.log(json);
    }
};
