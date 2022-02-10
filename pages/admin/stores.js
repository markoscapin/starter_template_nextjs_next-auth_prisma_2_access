import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Stores() {
  const { data, error } = useSWR("/api/stores", fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  return (
    <ul>
      {data.map((store) => (
        <li key={store.id}>{store.locationName}</li>
      ))}
    </ul>
  );
}
