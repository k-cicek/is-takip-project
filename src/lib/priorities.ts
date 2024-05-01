export async function getPriorities() {
  const res = await fetch("http://localhost:3000/priorities");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
