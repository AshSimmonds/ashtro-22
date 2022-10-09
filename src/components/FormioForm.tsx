import type { FunctionalComponent } from 'preact'


const FormioForm: FunctionalComponent = () => {
    return (
        <>
            <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' />
            <link rel='stylesheet' href='https://cdn.form.io/formiojs/formio.full.min.css' />

            <div>
                Form structure from: <a href="/formio-test01.json">/formio-test01.json</a>
            </div>

            <div>
                Form builder: <a href="https://formio.github.io/formio.js/app/builder">https://formio.github.io/formio.js/app/builder</a>
            </div>

            {/* <script src="https://cdn.form.io/formiojs/formio.embed.min.js?src=http://localhost:3000/formio-test01.json"></script> */}
            <script src="https://cdn.form.io/formiojs/formio.embed.min.js?src=https://g0.wtf/formio-test01.json"></script>

        </>
    )

}

export default FormioForm


