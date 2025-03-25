let data = fetch("http://localhost:8080/addresses")
  .then((res) => res.json())
  .then((data) => populateWithDivs(data))
  .catch((err) => console.error("Error fetching addresses:", err));

function populateWithDivs(data) {
  const list = document.getElementById("contentList");
  list.innerHTML = "";

  data.forEach((address) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <h2> ${address.country}, ${address.city}, ${address.muniplacity}, ${address.street}</h2>
   <img src="${address.imageUrl}">

    `;
    list.appendChild(div);
  });
}
