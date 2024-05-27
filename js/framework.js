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
                    window.parent.postMessage(interaction.call.Ani, "*");
                }
            },
            {
                type: 'UserAction',
                callback: function (category, data) {
                    window.parent.postMessage(data, "*");
                }
            },
            {
                type: 'Notification',
                callback: function (category, data) {
                    window.parent.postMessage(data, "*");
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
