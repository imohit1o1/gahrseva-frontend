import { useHealth } from './hooks/usehealth';

export default function App() {
  const { data, isLoading, error } = useHealth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500">
        GharSeva Landing page
      </h1>
      <p>Uptime: {data?.uptime}</p>
      <p>Heap Total: {data?.memoryUsage?.heapTotal}</p>
      <p>Heap Used: {data?.memoryUsage?.heapUsed}</p>
      <p>RSS: {data?.memoryUsage?.rss}</p>
    </div>
  );
}
