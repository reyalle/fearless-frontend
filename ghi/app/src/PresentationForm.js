import React, { useEffect, useState } from "react"

function NewPresentation() {

  const [conferences, setConferences] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [coName, setCoName] = useState('')
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

//   OR

const nameChange = (event) => {
    const value = event.target.value;
    setName(value)
};

const emailChange = (event) => {
    const value = event.target.value;
    setEmail(value)
};

const coNameChange = (event) => {
    const value = event.target.value;
    setCoName(value)
};

const titleChange = (event) => {
    const value = event.target.value;
    setTitle(value)
};

const synopsisChange = (event) => {
    const value = event.target.value;
    setSynopsis(value)
};

const conferenceChange = (event) => {
    const value = event.target.value;
    setConference(value)
}

const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/'

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setConferences(data.conferences)
    }
  }

const submitBtnHandler = async (event) => {
    event.preventDefault()
        // create empty JSON data
    const data = {}
    data.presenter_name = name;
    data.presenter_email = email
    data.company_name = coName
    data.title = title
    data.synopsis = synopsis
    data.conference = conference
    // const conferenceId = data.conference
    console.log(conference)
    console.log(data);

    const presentationUrl = `http://localhost:8000${conference}presentations/`;
    console.log(presentationUrl)
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const response = await fetch(presentationUrl, fetchConfig);
    // console.log(response)
    if (response.ok) {
        const newPresentation = await response.json();
        console.log(newPresentation);

        setName('');
        setEmail('');
        setCoName('');
        setTitle('');
        setSynopsis('');
        setConference('');
    }
}

  useEffect(() => {
    fetchData()
  }, [])

    return (
        <>
<main>
<div className="container">
<div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a New Presentation</h1>
            <form id="create-presentation-form" onSubmit={submitBtnHandler}>
                <div className="form-floating mb-3">
                    <input value={name} onChange={nameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"></input>
                    <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={email} onChange={emailChange} name="presenter_email" type="email" className="form-control" id="presenter_email" placeholder="Presenter email"></input>
                    <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={coName} onChange={coNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"></input>
                    <label htmlFor="company_name">Company name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={title} onChange={titleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"></input>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="mb-3">
                    <textarea value={synopsis} onChange={synopsisChange} placeholder="Synopsis" required type="text" name="synopsis" id="synopsis" className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <select onChange={conferenceChange} required name="conference" id="conference" className="form-select">
                        <option value="">Select conference</option>
                        {conferences.map(conference => {
                            return (
                                <option key={conference.href} value={conference.href}>
                                    {conference.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</div>
</div>
</main>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossOrigin="anonymous">
</script>

        </>
    )
}

export default NewPresentation
