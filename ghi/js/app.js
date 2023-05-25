function createCard(name, location, description, pictureUrl, startFormat, endFormat) {
    return `
        <div class="card shadow border-ligh mb-5 bg-body-tertiary rounded">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted mb-3">${location}</h6>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer">
                ${startFormat} - ${endFormat}
            </div>
        </div>
    `;
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        alert(response.statusText)
      } else {
        const data = await response.json();

        for (let [index, conference] of data.conferences.entries()) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();

            const title = details.conference.name;
            const location = details.conference.location.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;

            const startDate = new Date(details.conference.starts);
            const startFormat = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`;
            const endDate = new Date(details.conference.ends);
            const endFormat = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;

            const html = createCard(title, location, description, pictureUrl, startFormat, endFormat);
            const column = document.querySelector(`.column-${index % 3 + 1}`);
            column.innerHTML += html;

          }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
      alert(response.statusText)
    }

});
