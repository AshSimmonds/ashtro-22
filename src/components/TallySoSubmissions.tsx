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


const listOfSubmissions = data.records.map((record: {
    fields: any; id: string; 
}) => {
    return (
        <>
            <div>
                {record.id} | {JSON.stringify(record.fields.Address)}
            </div>  
        </>
    );
});

const TallySoSubmissions: FunctionalComponent = () => {
    return <>
        {listOfSubmissions}
    </>;

};

export default TallySoSubmissions;
