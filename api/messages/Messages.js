var mailgun   = require("mailgun-js");

var messageTemplates = {

  approve: function (message, customid) {
  	"use strict";

  	message.subject = "Your account has been approved";
  	message.text		= "Hi " + customid + ". \n\nThank you for signing up to receive online revenue reports from Laniakea. Please add this email address to your contacts to avoid further communication being filtered as spam.";
  	return message;
  },

  notify: function (message, data) {
  	"use strict";

    message.subject = "Monthly report available";
    message.text    = "A new revenue report is now available. Please visit 'https://www.w00d_chipper/account' to download it.";
    return message;
  }
};

function getMessageTemplates(emailType, message, customid, callback) {
	"use strict";

			var templatedMessage;

			switch(emailType) {

				case "approve" :
					templatedMessage = messageTemplates.approve(message, customid);
					break;

				case "notify" :
					templatedMessage = messageTemplates.notify(message, customid);
					break;

				default:
					console.log("Message type not found, try again");
			}
			return callback(null, templatedMessage);

}

function Messages(mailConfig) {
	"use strict";


	this.mailgun 					= mailgun({ apiKey : mailConfig.apiKey, domain : mailConfig.domain });
	this.mailLists 				= mailConfig.mailLists;
	this.domain 					= mailConfig.domain;
	this.list 	 					= this.mailgun.lists("members@" + this.domain);
}

Messages.prototype = {

	addToMailingList: function(data, onComplete) {
		"use strict";
		var self = this;

		self.list.members().create(data, function(err, data) {
			if (err) console.log("members err: " + err);
			console.log("member added to mailing list: " + data.member.name);
		});
	},


	// compose email components and send \\
	sendEmail: function(emailType, email, customid, onComplete) {
		"use strict";
		var self = this;

		self.createMessage(emailType, email, customid, function(err, message) {
			console.log(err, message);
			self.mailgun.messages().send(message, function(senderror) {
				if (senderror) {
					console.log("SendError: " + senderror);
					return onComplete(senderror);
				} else {
					console.log("Mail successfully sent to " + message.to);
					return onComplete(null, message.to);
				}
		});
		});
	},

	getRecipient: function(customid, callback) {
		"use strict";
		var self = this;

		self.list.members().list(function(err, body) {
			if (err) console.log("list err: " + err);
			self.searchMailList(customid, body.items, callback);
		});
	},

	searchMailList: function(customid, members, callback) {
		"use strict";
		var self = this;
		members.some(function(member) {
			if (customid === member.name) {
				callback(null, member.address);
				return true;
			}
		});
	},

	createMessage: function(emailType, email, customid, callback) {
		"use strict";
		var self = this;

		if(!email) {

			self.getRecipient(customid, function(error, emailAddress) {
				console.log(emailAddress, emailType);

				var message = {
					from: "mail@" + self.domain,
					to: emailAddress
				};

				getMessageTemplates(emailType, message, customid, callback);
			});
		}	else {
			console.log(email, customid);
				var message = {
					from: "mail@" + self.domain,
					to: email
				};

			getMessageTemplates(emailType, message, customid, callback);
		}
	}

};

module.exports = Messages;
