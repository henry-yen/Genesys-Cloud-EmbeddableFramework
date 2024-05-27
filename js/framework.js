var contactSearchCallback;

window.Framework = {
    config: {
        name: "testApp",
        clientIds: {
            "mypurecloud.jp": "2a7dca41-bd83-4def-be36-f97fcf58b238"
        },
        customInteractionAttributes: ['PT_URLPop', 'PT_SearchValue', 'PT_TransferContext'],
        settings: {
            embedWebRTCByDefault: true,
            hideWebRTCPopUpOption: false,
            enableCallLogs: true,
            enableTransferContext: true,
            hideCallLogSubject: true,
            hideCallLogContact: false,
            hideCallLogRelation: false,
            searchTargets: ['people', 'queues', 'frameworkContacts'],
            theme: {
                primary: "#dacebd",
                text: "#123"
            }
        }
    },
    display: {
        interactionDetails: {
            call: [
                "framework.DisplayAddress",
                "call.Ani",
                "call.ConversationId",
                "call.name",
                "framework.interactionDurationSeconds"
            ]
        }
    },
    initialSetup: function () {
        window.PureCloud.subscribe([
            {
                type: 'Interaction',
                callback: function (category, interaction) {
                    window.parent.postMessage(JSON.stringify({type: "interactionSubscription", data: {category: category, interaction: interaction}}), "*");
                    updatePhoneNumber(interaction);
                }
            },
            {
                type: 'UserAction',
                callback: function (category, data) {
                    window.parent.postMessage(JSON.stringify({type: "userActionSubscription", data: {category: category, data: data}}), "*");
                }
            },
            {
                type: 'Notification',
                callback: function (category, data) {
                    window.parent.postMessage(JSON.stringify({type: "notificationSubscription", data: {category: category, data: data}}), "*");
                }
            }
        ]);
    },
    screenPop: function (searchString, interaction) {
        // Use your CRM vendor's API to perform screen pop.
    },
    processCallLog: function (callLog, interaction, eventName, onSuccess, onFailure) {
        // Use your CRM vendor's API to provide interaction log information.
        onSuccess({
            id: callLog.id
        });
    },
    openCallLog: function (callLog) {
        // Implement your openCallLog logic here.
    },
    contactSearch: function (searchValue, onSuccess, onFailure) {
        // Implement your contactSearch logic here.
    }
};

function updatePhoneNumber(interaction) {
    var phoneNumber = interaction.call.Ani; // Extract the phone number from the interaction object
    var phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.value = phoneNumber;
    }
}

window.addEventListener("message", function(event) {
    // Add a check for the event origin if needed for security
    // if (event.origin !== "https://your-trusted-origin.com") return;

    var message;
    try {
        message = JSON.parse(event.data);
    } catch (e) {
        console.error("Invalid message format", e);
        return;
    }

    if (message) {
        if (message.type === "clickToDial") {
            window.PureCloud.clickToDial(message.data);
        } else if (message.type === "addAssociation") {
            window.PureCloud.addAssociation(message.data);
        } else if (message.type === "addCustomAttributes") {
            window.PureCloud.addCustomAttributes(message.data);
        } else if (message.type === "addTransferContext") {
            window.PureCloud.addTransferContext(message.data);
        } else if (message.type === "sendContactSearch") {
            if (contactSearchCallback) {
                contactSearchCallback(message.data);
            }
        } else if (message.type === "updateUserStatus") {
            window.PureCloud.User.updateStatus(message.data);
            window.PureCloud.Interaction.updateState(message.data);
        }
    }
});
