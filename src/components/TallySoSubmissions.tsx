import type { FunctionalComponent } from 'preact'
// import { h } from 'preact'


const data = await fetch(
  "https://api.airtable.com/v0/app0yd2hvlSxsieUo/submissions",
  { headers: { Authorization: `Bearer ${import.meta.env.AIRTABLE_API_KEY}` } }
).then((response) =>
  response.json()
);

// Components that are build-time rendered also log to the CLI.
// When rendered with a client:* directive, they also log to the browser console.
console.log(data.records);

const TallySoSubmissions: FunctionalComponent = () => {
  return <>
    {JSON.stringify(data.records)}
  </>;
};

export default TallySoSubmissions;
