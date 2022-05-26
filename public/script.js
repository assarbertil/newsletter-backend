const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const subscribeField = document.getElementById("subscribe");

// Register a user based on the input parameters
const registerUser = (email, password, subscribe) =>
  fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      isSubscribed: subscribe,
    }),
  }).then(res => {
    if (res.status === 201) {
      res.json().then(user => {
        console.log(user.isSubscribed);
        const row = `
        <tr data-user="${user._id}" class="slide-in">
          <td>${user.email}</td>
          <td>
            <input data-is-subscribed data-id="${
              user._id
            }" type="checkbox" name="subscribed-${user._id}" ${
          user.isSubscribed ? "checked" : ""
        } />
          </td>
          <td>
            <button data-id="${user._id}" data-email="${
          user.email
        }" class="delete-button">Delete</button>
          </td>
        <tr>`;

        document.getElementById("users").insertAdjacentHTML("beforeend", row);
        addDeleteHandlers();
        addToggleSubscribedHandlers();

        emailField.value = "";
        passwordField.value = "";
        subscribeField.checked = true;
      });
    } else {
      res.json().then(data => alert(data.message));
    }
  });

/**
 * Delete user by id
 */
const deleteUser = (id, email) => {
  if (confirm(`Are you sure you want to delete ${email}?`)) {
    fetch(`/api/user/${id}`, {
      method: "DELETE",
    }).then(res => {
      if (res.status === 200) {
        const row = document.querySelector(`[data-user="${id}"]`);
        console.log(row);
        row.classList.contains("slide-in") && row.classList.remove("slide-in");
        row.classList.add("slide-out");
      } else {
        res.json().then(data => alert(data.message));
      }
    });
  }
};

/**
 * Set subscribed status for user by id
 */
const setSubscribed = (id, boolean) =>
  fetch(`/api/user/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isSubscribed: boolean }),
  }).then(res => {
    if (res.status === 200) {
      // location.reload();
    } else {
      res.json().then(data => alert(data.message));
    }
  });

const form = document.getElementById("register");

/**
 * Form submit handler, send the data to the server
 */
form.onsubmit = e => {
  e.preventDefault();

  registerUser(emailField.value, passwordField.value, subscribeField.checked);
};

/**
 * Iterate over all delete buttons and add a click handler
 */
const addDeleteHandlers = () => {
  document.querySelectorAll(".delete-button").forEach(input => {
    input.onclick = e => {
      deleteUser(e.target.dataset.id, e.target.dataset.email);
    };
  });
};

/**
 * Iterate over all checkboxes and add a change handler
 */
const addToggleSubscribedHandlers = () => {
  document.querySelectorAll("[data-is-subscribed]").forEach(input => {
    input.onchange = e => setSubscribed(e.target.dataset.id, e.target.checked);
  });
};

/**
 * Initially run the handlers
 */
addDeleteHandlers();
addToggleSubscribedHandlers();
