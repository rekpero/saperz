// If your extension doesn't need a background script, just leave this file empty
/* global chrome */

messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  // console.log("I can run your javascript like any other code in your project");
  // console.log("just do not forget, I cannot render anything !");
  // chrome.alarms.getAll((alarms) => {
  //   console.log(alarms);
  // });

  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.sync.get(["subscriptions"], (result) => {
      const subscriptions = result.subscriptions || [];
      const selectedSubscription = subscriptions.find(
        (s) => s.id === alarm.name
      );
      if (selectedSubscription) {
        chrome.notifications.create(
          "notificaton-" + selectedSubscription.id,
          {
            type: "basic",
            iconUrl: "img/icon-48.png",
            title: `${selectedSubscription.title} is starting`,
            message: `${selectedSubscription.title} is starting soon, join now otherwise you will miss it!  
          
            https://twitter.com/i/spaces/${selectedSubscription.id}/peek`,
            priority: 2,
          },
          (notificationId) => {
            console.log(notificationId, "Is notified");
          }
        );
      }
    });
  });
}
