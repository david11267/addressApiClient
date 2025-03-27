let data = fetch("http://localhost:8080/addresses")
  .then((res) => res.json())
  .then((data) => populateWithDivs(data))
  .catch((err) => console.error("Error fetching addresses:", err));

let activeAddress;
renderButtons();

function renderButtons(address) {
  const target = document.getElementById("cruds");
  target.innerHTML = "";

  if (address == "hidden") {
    return;
  } else if (address == null) {
    createButton(target);
  }

  if (address) {
    createButton(target);
    editButton(target);
    deleteButton(target);
  }
}

function createButton(target) {
  const createBtn = document.createElement("button");
  createBtn.textContent = "Create";
  createBtn.addEventListener("click", () => {
    createListing();
  });
  target.appendChild(createBtn);
}
function editButton(target) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    editListing();
  });
  target.appendChild(editButton);
}
function deleteButton(target) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteListing();
  });
  target.appendChild(deleteButton);
}

function setFocusAddress(address) {
  activeAddress = address;
  renderButtons(address);
  const rightContent = document.getElementById("focus");
  rightContent.innerHTML = `
    <h2> ${address.country}, ${address.city}, ${address.muniplacity}, ${address.street}</h2>
   <img src="${address.imageUrl}">
   <p>${address.description}</p>
    `;
  const focusContent = document.createElement("div");
  focusContent.innerHTML = ``;
}

function populateWithDivs(data, activeAddress) {
  const list = document.getElementById("contentList");
  list.innerHTML = "";

  data.forEach((address) => {
    const div = document.createElement("div");
    div.addEventListener("click", () => {
      setFocusAddress(address);
    });
    div.innerHTML = `
    <h2> ${address.country}, ${address.city}, ${address.muniplacity}, ${address.street}</h2>
   <img src="${address.imageUrl}">`;
    list.appendChild(div);
  });
}

function createListing() {
  renderButtons("hidden");

  const target = document.getElementById("focus");
  target.innerHTML = "";

  const form = document.createElement("form");
  form.method = "DELETE";
  form.action = form.innerHTML = `
             <label for="country">country</label>
            <input type="text" name="country" />
            <label for="city">city</label>
            <input type="text" name="city" />
            <label for="muniplacity">muniplacity</label>
            <input type="text" name="muniplacity" />
            <label for="street">street</label>
            <input type="text" name="street" />
            <label for="imageUrl">imageUrl</label>
            <input type="url" name="imageUrl" />
            <label for="description">description</label>
            <input type="text" name="description" />
            <div>
              <button type="submit">Save</button>
              <button type="reset">Cancel</button>
            </div>`;

  form.addEventListener("submit", (event) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch("http://localhost:8080/addresses/delete", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          target.innerHTML = "<p>Address created successfully!</p>";
        } else {
          target.innerHTML = "<p>Failed to create address.</p>";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        target.innerHTML = "<p>An error occurred.</p>";
      });
  });

  target.appendChild(form);
}

function editListing() {
  renderButtons("hidden");

  const target = document.getElementById("focus");
  target.innerHTML = "";

  const form = document.createElement("form");
  form.innerHTML = `
             <label for="country">country</label>
            <input value="${activeAddress.country}" type="text" name="country" />
            <label for="city">city</label>
            <input value="${activeAddress.city}" type="text" name="city" />
            <label for="muniplacity">muniplacity</label>
            <input value="${activeAddress.muniplacity}" type="text" name="muniplacity" />
            <label for="street">street</label>
            <input value="${activeAddress.street}" type="text" name="street" />
            <label for="imageUrl">imageUrl</label>
            <input value="${activeAddress.imageUrl}" type="url" name="imageUrl" />
            <label for="description">description</label>
            <input value="${activeAddress.description}" type="text" name="description" />
            <div>
              <button type="submit">Save edit</button>
              <button type="reset">Cancel</button>
            </div>`;

  form.addEventListener("submit", (event) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.id = activeAddress.id;

    fetch("http://localhost:8080/addresses", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          target.innerHTML = "<p>Address edited successfully!</p>";
        } else {
          target.innerHTML = "<p>Failed to edit address.</p>";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        target.innerHTML = "<p>An error occurred.</p>";
      });
  });

  target.appendChild(form);
}

function deleteListing() {
  renderButtons("hidden");

  const target = document.getElementById("focus");
  target.innerHTML = "";

  data = {
    id: activeAddress.id,
    country: activeAddress.country,
    city: activeAddress.city,
    muniplacity: activeAddress.muniplacity,
    street: activeAddress.street,
    imageUrl: activeAddress.imageUrl,
    description: activeAddress.description,
  };

  form.addEventListener("submit", (event) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.id = activeAddress.id;

    fetch("http://localhost:8080/addresses", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          target.innerHTML = "<p>Address deleted successfully!</p>";
        } else {
          target.innerHTML = "<p>Failed to delete address.</p>";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        target.innerHTML = "<p>An error occurred.</p>";
      });
  });

  target.appendChild(form);
}
