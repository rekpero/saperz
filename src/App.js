/* global chrome */
import React, { useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import SpaceCard from "./components/SpaceCard";
import Toolbar from "./components/Toolbar";
import { Fragment } from "react/cjs/react.production.min";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAANlDYAEAAAAAL%2F1PsQLYkvlducx60OFGrOECCLU%3DmhuaeBSjpe2cbgRzZCkDsqgjHf9lX3VTOxGIKqBy8WmfkTg1es`,
    },
  }).then((res) => res.json());

function App() {
  const [spaces, setSpaces] = React.useState([]);
  const [spacesLoading, setSpacesLoading] = React.useState(true);

  useEffect(() => {
    startup();
  }, []);

  // const emptySpace = () => {
  //   chrome.storage.sync.set({ subscriptions: [] }, () => {
  //     console.log("subscriptions cleared");
  //     chrome.storage.sync.get(["subscriptions"], (result) => {
  //       console.log(result);
  //     });
  //   });
  // };

  const startup = async () => {
    setSpacesLoading(true);
    let params = {
      query: "web3",
      state: "scheduled",
      "space.fields": "created_at,lang,scheduled_start,title",
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const response = await fetcher(
      "https://api.twitter.com/2/spaces/search?" + query
    );
    console.log(response.data);
    const resSpaces = response.data.sort((a, b) => {
      return (
        new Date(a.scheduled_start).getTime() -
        new Date(b.scheduled_start).getTime()
      );
    });
    chrome.storage.sync.get(["subscriptions"], (result) => {
      const subscriptions = result.subscriptions || [];
      console.log(result);
      const updatedSpaces = resSpaces.map((s) => ({
        ...s,
        is_subscribed: subscriptions.map((s) => s.id).includes(s.id),
      }));
      setSpaces(updatedSpaces);
      setSpacesLoading(false);
    });
  };

  const onSubscribe = (space) => {
    if (!space.is_subscribed) {
      chrome.storage.sync.get(["subscriptions"], (result) => {
        const subscriptions = result.subscriptions || [];
        subscriptions.push(space);
        chrome.storage.sync.set({ subscriptions }, () => {
          console.log("subscribed");
          chrome.alarms.create(space.id, {
            when: new Date(space.scheduled_start).getTime(),
          });
          chrome.notifications.create("notificaton-" + space.id, {
            type: "basic",
            iconUrl: "img/icon-48.png",
            title: "Notification Set",
            message: `Notification for ${space.title} has been set!`,
            priority: 2,
          });
          const updatedSpaces = spaces.map((s) => ({
            ...s,
            is_subscribed: subscriptions.map((s) => s.id).includes(s.id),
          }));
          setSpaces(updatedSpaces);
        });
      });
    }
  };

  if (spacesLoading)
    return (
      <div className="app">
        <Loader />
      </div>
    );

  return (
    <div className="app">
      <Toolbar count={spaces.length} />
      <div className="spaces-container">
        {spaces.map((t, i) => (
          <Fragment key={i}>
            <SpaceCard space={t} onSubscribe={onSubscribe} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
