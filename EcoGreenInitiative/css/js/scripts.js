document.addEventListener("DOMContentLoaded", () => {
    const signupModal = document.getElementById("signupModal");
    const signinModal = document.getElementById("signinModal");
    const signupBtn = document.getElementById("signupBtn");
    const signinBtn = document.getElementById("signinBtn");
    const closeSignup = document.getElementById("closeSignup");
    const closeSignin = document.getElementById("closeSignin");

    signupBtn.addEventListener("click", () => {
        signupModal.style.display = "block";
    });

    signinBtn.addEventListener("click", () => {
        signinModal.style.display = "block";
    });

    closeSignup.addEventListener("click", () => {
        signupModal.style.display = "none";
    });

    closeSignin.addEventListener("click", () => {
        signinModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == signupModal) {
            signupModal.style.display = "none";
        }
        if (event.target == signinModal) {
            signinModal.style.display = "none";
        }
    });

    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let userExists = users.some(user => user.username === username || user.email === email);

            if (userExists) {
                document.getElementById("signupMessage").textContent = "Username or email already exists.";
                document.getElementById("signupMessage").style.color = "red";
            } else {
                users.push({ username, email, password });
                localStorage.setItem("users", JSON.stringify(users));
                document.getElementById("signupMessage").textContent = "Sign up successful!";
                document.getElementById("signupMessage").style.color = "green";
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("signinUsername").value;
            const password = document.getElementById("signinPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                document.getElementById("signinMessage").textContent = "Sign in successful!";
                document.getElementById("signinMessage").style.color = "green";
            } else {
                document.getElementById("signinMessage").textContent = "Invalid username or password.";
                document.getElementById("signinMessage").style.color = "red";
            }
        });
    }
});
