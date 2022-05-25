// Register a user based on the input parameters
const registerUser = (email, password, subscribe) =>
  fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      subscribe,
    }),
  }).then(res => {
    if (res.status === 201) {
      location.reload();
    } else {
      res.json().then(data => alert(data.message));
    }
  });

// Delete user by id
const deleteUser = id =>
  fetch(`/api/user/${id}`, {
    method: "DELETE",
  }).then(res => {
    if (res.status === 200) {
      location.reload();
    } else {
      res.json().then(data => alert(data.message));
    }
  });

// Set subscribed status for user by id
const setSubscribed = (id, boolean) =>
  fetch(`/api/user/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isSubscribed: boolean }),
  }).then(res => {
    if (res.status === 200) {
      location.reload();
    } else {
      res.json().then(data => alert(data.message));
    }
  });

const form = document.getElementById("register");

// Form submit handler, send the data to the server
form.onsubmit = e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const subscribe = document.getElementById("subscribe").checked;

  registerUser(email, password, subscribe);
};

// Iterate over all delete buttons and add a click handler
document.querySelectorAll(".delete-button").forEach(input => {
  const email = input.dataset.email;
  const id = input.dataset.id;

  input.onclick = e => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      deleteUser(id);
    }
  };
});

// Iterate over all checkboxes and add a change handler
document.querySelectorAll("[data-subscribed-status]").forEach(input => {
  const id = input.dataset.id;

  input.onchange = e => {
    setSubscribed(id, input.checked);
  };
});
