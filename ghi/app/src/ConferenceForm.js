import React, {useEffect, useState} from 'react'

export default function NewConference() {

  const [name, setName] = useState('')
  function nameChange(event) {
    setName(event.target.value)
  }

  const [startDate, setStartDate] = useState('')
  function startDateChange(event) {
    setStartDate(event.target.value)
  }

  const [endDate, setEndDate] = useState('')
  function endDateChange(event) {
    setEndDate(event.target.value)
  }

  const [description, setDescription] = useState('')
  function descriptionChange(event) {
    setDescription(event.target.value)
  }

  const [maxPresentations, setMaxPres] = useState('')
  function maxPresChange(event) {
    setMaxPres(event.target.value)
  }

  const [maxAttendees, setMaxAttendees] = useState('')
  function maxAttendeesChange(event) {
    setMaxAttendees(event.target.value)
  }

  const [location, setLocation] = useState('')
  function locationChange(event) {
    setLocation(event.target.value)
  }

  const [locations, setLocations] = useState([])

  async function submitBtnHandler(event) {
    event.preventDefault()
    // create empty JSON data
    const data = {}

    data.name = name
    data.starts = startDate
    data.ends = endDate
    data.description = description
    data.max_presentations = maxPresentations
    data.max_attendees = maxAttendees
    data.location = location
    console.log(data)

    const conferenceUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      setName('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setMaxPres('')
      setMaxAttendees('')
      setLocation('')
    }
  }

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations)
      }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
<>
      <main>
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Conference</h1>
                <form id="create-conference-form" onSubmit={submitBtnHandler}>
                  <div className="form-floating mb-3">
                    <input placeholder="Name" required type="text" id="name" name='name' className="form-control" value={name} onChange={nameChange}></input>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="Start Date" required type="date" name='starts' id="starts" className="form-control" value={startDate} onChange={startDateChange}></input>
                    <label htmlFor="starts">Start Date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="End Date" required type="date" name='ends' id="ends" className="form-control" value={endDate} onChange={endDateChange}></input>
                    <label htmlFor="ends">End Date</label>
                  </div>
                  <div className="mb-3">
                    <textarea placeholder='Description' type='text' required id="description" className="form-control" name='description' value={description} onChange={descriptionChange}></textarea>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder='Maximum Presentations' type="number" required id="max_presentations" className="form-control" name='max_presentations' value={maxPresentations} onChange={maxPresChange}></input>
                    <label htmlFor="max_presentations">Max Presentations</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder='Maximum Attendees' type="number" required id="max_attendees" className="form-control" name='max_attendees' value={maxAttendees} onChange={maxAttendeesChange}></input>
                    <label htmlFor="max_attendees">Max Attendees</label>
                  </div>
                  <div className="mb-3">
                    <select required id="location" className="form-select" name='location' value={location} onChange={locationChange}>

                      <option>Choose a Location</option>
                      {locations.map((location) => {
                        return (
                          <option value={location.id} key={location.id}>
                            {location.name}
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
