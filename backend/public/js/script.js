// Developed by [Tarique Khan]
document.addEventListener("DOMContentLoaded", function () {
    let container = document.querySelector(".container1"); // Ensure this is correct
    let authLink = document.getElementById("authLink");

    function fetchRequests() {
        fetch("/requests")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Requests:", data);
                renderRequests(data);
            })
            .catch(error => console.error("Error fetching requests:", error));
    }

    function renderRequests(requests) {
        container.innerHTML = "";

        if (requests.length === 0) {
            container.innerHTML = "<p>No adoption requests yet. Requests will appear here.</p>";
            return;
        }

        requests.forEach(request => {
            let requestCard = document.createElement("div");
            requestCard.classList.add("request-card");
            requestCard.innerHTML = `
              <h2>${request.name} wants to adopt ${request.pet_name || "Unknown Pet"}</h2>
        <p><strong>Age:</strong> ${request.age}</p>
        <p><strong>Contact:</strong> ${request.contact}</p>
        <p><strong>Email:</strong> ${request.email}</p>
        <p><strong>Status:</strong> ${request.status}</p>
      <button class="approve-btn" data-id="${request.id}">✔ Approve</button>
                <button class="deny-btn" data-id="${request.id}">✖ Deny</button>
            `;
            container.appendChild(requestCard);
        });

        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll(".approve-btn").forEach(button => {
            button.addEventListener("click", function () {
                let requestId = this.getAttribute("data-id");
                updateRequestStatus(requestId, "Approved");
            });
        });

        document.querySelectorAll(".deny-btn").forEach(button => {
            button.addEventListener("click", function () {
                let requestId = this.getAttribute("data-id");
                updateRequestStatus(requestId, "Denied");
            });
        });
    }

    function updateRequestStatus(id, status) {
        fetch(`/requests/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Request ${status} successfully.`, data);
            fetchRequests(); // Refresh requests after update
        })
        .catch(error => console.error("Error updating request:", error));
    }

    // ✅ Admin Authentication Logic
    if (authLink) {
        if (localStorage.getItem("isAdmin") === "true") {
            authLink.innerText = "Logout";
            authLink.href = "#"; // Prevent direct navigation

            authLink.addEventListener("click", function () {
                localStorage.removeItem("isAdmin");
                sessionStorage.clear();

                alert("Logged out successfully!");
                window.location.href = "login.html";

                // 🔥 Prevent back navigation after logout
                setTimeout(() => {
                    window.history.pushState(null, "", "login.html");
                    window.history.replaceState(null, "", "login.html");
                }, 0);
            });
        }
    }

    // 🛑 Disable Back Button If Not Logged In
    if (!localStorage.getItem("isAdmin")) {
        history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            history.pushState(null, null, window.location.href);
        };
    }

    // ✅ Initial Fetch Call
    fetchRequests();
});
