import useSWR from "swr";
import "./App.css";
import Loader from "./components/Loader";
import SpaceCard from "./components/SpaceCard";
import Toolbar from "./components/Toolbar";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAANlDYAEAAAAAL%2F1PsQLYkvlducx60OFGrOECCLU%3DmhuaeBSjpe2cbgRzZCkDsqgjHf9lX3VTOxGIKqBy8WmfkTg1es`,
    },
  }).then((res) => res.json());

function App() {
  let params = {
    query: "web3",
    state: "scheduled",
    "space.fields": "created_at,lang,scheduled_start,title",
  };

  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  const { data, error } = useSWR(
    "https://api.twitter.com/2/spaces/search?" + query,
    fetcher
  );

  if (error) return <div className="app">Failed to load</div>;
  if (!data)
    return (
      <div className="app">
        <Loader />
      </div>
    );

  return (
    <div className="app">
      <Toolbar count={data.meta.result_count} />
      <div className="spaces-container">
        {data.data
          .sort((a, b) => {
            return (
              new Date(a.scheduled_start).getTime() -
              new Date(b.scheduled_start).getTime()
            );
          })
          .map((t) => (
            <SpaceCard
              id={t.id}
              title={t.title}
              scheduled_start={t.scheduled_start}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
