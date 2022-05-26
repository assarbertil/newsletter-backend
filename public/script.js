const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const subscribeField = document.getElementById("subscribe");

// Register a user based on the input parameters
const registerUser = (email, password, subscribe) => {
  axios
    .post("/api/register", {
      email,
      password,
      isSubscribed: subscribe,
    })
    .then(({ data: user }) => {
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

      setTimeout(row.remove(), 0.3);
    })
    .catch(err => alert(err.response.data.message));
};

// Delete user by id
const deleteUser = (id, email) => {
  if (confirm(`Are you sure you want to delete ${email}?`)) {
    axios
      .delete(`/api/user/${id}`)
      .then(res => {
        const row = document.querySelector(`[data-user="${id}"]`);
        console.log(row);
        row.classList.contains("slide-in") && row.classList.remove("slide-in");
        row.classList.add("slide-out");
      })
      .catch(err => alert(err.response.data.message));
  }
};

// Set subscribed status for user by id
const setSubscribedStatus = (id, boolean) => {
  axios
    .patch(`/api/user/${id}`, { isSubscribed: boolean })
    .catch(err => alert(err.response.data.message));
};

const form = document.getElementById("register");

// Form submit handler, send the data to the server
form.onsubmit = e => {
  e.preventDefault();

  registerUser(emailField.value, passwordField.value, subscribeField.checked);
};

// Iterate over all delete buttons and add a click handler
const addDeleteHandlers = () => {
  document.querySelectorAll(".delete-button").forEach(input => {
    input.onclick = e => {
      deleteUser(e.target.dataset.id, e.target.dataset.email);
    };
  });
};

// Iterate over all checkboxes and add a change handler
const addToggleSubscribedHandlers = () => {
  document.querySelectorAll("[data-is-subscribed]").forEach(input => {
    input.onchange = e =>
      setSubscribedStatus(e.target.dataset.id, e.target.checked);
  });
};

// Initially add the handlers
addDeleteHandlers();
addToggleSubscribedHandlers();
