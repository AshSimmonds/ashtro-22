import type { FunctionalComponent } from 'preact'
// import { h } from 'preact'

const readOnlyApiKey = 'keyJLhVXNN3146CVO'

const data = await fetch(
    "https://api.airtable.com/v0/app0yd2hvlSxsieUo/submissions",
    { headers: { Authorization: `Bearer ${readOnlyApiKey}` } }
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
                <label for={'my-modal-' + record.id} class="btn btn-sm btn-outline mt-1">{record.id} | {JSON.stringify(record.fields.Address)}</label>

                <input type="checkbox" id={'my-modal-' + record.id} className="modal-toggle" />
                <label for={'my-modal-' + record.id} class="modal cursor-pointer">
                    <label className="modal-box relative" for="">
                        <p className="text-xs">{JSON.stringify(record)}</p>
                    </label>
                </label>

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
