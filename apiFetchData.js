let data = fetch("http://localhost:8080/addresses")
  .then((res) => res.json())
  .then((data) => populateWithDivs(data))
  .catch((err) => console.error("Error fetching addresses:", err));

function setFocusAddress(address) {
  const rightContent = document.getElementById("focus");
  rightContent.innerHTML=`
    <h2> ${address.country}, ${address.city}, ${address.muniplacity}, ${address.street}</h2>
   <img src="${address.imageUrl}">
    `;
  const focusContent = document.createElement("div");
  focusContent.innerHTML = ``;
}

function populateWithDivs(data) {
  const list = document.getElementById("contentList");
  list.innerHTML = "";

  data.forEach((address) => {
    const div = document.createElement("div");
    div.addEventListener("click", () => setFocusAddress(address));
    div.innerHTML = `
    <h2> ${address.country}, ${address.city}, ${address.muniplacity}, ${address.street}</h2>
   <img src="${address.imageUrl}">
    `;

    list.appendChild(div);
  });
}
