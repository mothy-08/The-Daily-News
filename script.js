document.addEventListener("DOMContentLoaded", function () {
	const visibilityToggles = document.querySelectorAll(
		"[data-toggle-visibility]"
	);

	console.log(visibilityToggles);
	visibilityToggles.forEach((toggle) => {
		toggle.addEventListener("click", () => {
			const input = toggle.closest(".auth__field").querySelector("input");

			if (input.type === "password") {
				input.type = "text";
				toggle.textContent = "visibility_off";
				toggle.setAttribute("data-toggle-visibility", "true");
			} else {
				input.type = "password";
				toggle.textContent = "visibility";
				toggle.setAttribute("data-toggle-visibility", "false");
			}
		});
	});

	const usernameInput = document.getElementById("username");
	const usernameLabel = document.querySelector('label[for="username"]');
	const usernameIcon = document.getElementById("username-icon");
	const passwordInput = document.getElementById("password");
	const passwordLabel = document.querySelector('label[for="password"]');
	const passwordIcon = document.getElementById("password-icon");
	const emailInput = document.getElementById("email");
	const emailLabel = document.querySelector('label[for="email"]');
	const emailIcon = document.getElementById("mail-icon");
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	const confirmPasswordInput = document.getElementById("confirm-password");
	const confirmPasswordLabel = document.querySelector(
		'label[for="confirm-password"]'
	);
	const confirmPasswordIcon = document.getElementById("confirm-password-icon");

	const loginButton = document.getElementById("login-button");
	const signupButton = document.getElementById("signup-button");

	let usernameValue = null;
	let emailValue = null;
	let passwordValue = null;
	let confirmPasswordValue = null;
	let existingUser = null;

	// Login Page
	if (window.location.pathname === "/auth/login.html") {
		usernameInput.addEventListener("input", () => {
			usernameValue = usernameInput.value.trim();
			existingUser = localStorage.getItem(usernameValue);

			if (usernameValue === "") {
				usernameLabel.textContent = "Enter username";
				usernameLabel.style.color = "initial";
				usernameIcon.style.color = "initial";
				usernameInput.style.color = "initial";
				usernameInput.style.borderColor = "initial";
				usernameInput.style.outlineColor = "initial";
				passwordLabel.textContent = "Enter password";
				passwordLabel.style.color = "initial";
				passwordInput.style.color = "initial";
				passwordInput.style.borderColor = "initial";
				passwordInput.style.outlineColor = "initial";
				passwordIcon.style.color = "initial";
				return;
			}

			if (existingUser) {
				usernameLabel.textContent = "Username found.";
				usernameLabel.style.color = "green";
				usernameInput.style.color = "green";
				usernameIcon.style.color = "green";
				usernameInput.style.borderColor = "green";
				usernameInput.style.outlineColor = "green";
			} else {
				usernameLabel.textContent = "Username does not exist. Sign up instead.";
				usernameLabel.style.color = "red";
				usernameInput.style.color = "red";
				usernameIcon.style.color = "red";
				usernameInput.style.borderColor = "red";
				usernameInput.style.outlineColor = "red";
			}

			checkUserPassword();
		});

		function checkUserPassword() {
			passwordValue = passwordInput.value.trim();

			if (!usernameValue || !existingUser) {
				passwordLabel.textContent = "Enter a valid username first.";
				passwordLabel.style.color = "initial";
				passwordInput.style.color = "initial";
				passwordInput.style.borderColor = "initial";
				passwordInput.style.outlineColor = "initial";
				passwordIcon.style.color = "initial";
				return;
			}

			const { password: storedPassword } = JSON.parse(existingUser);

			if (passwordValue === "") {
				passwordLabel.textContent = "Enter password";
				passwordLabel.style.color = "initial";
				passwordInput.style.color = "initial";
				passwordIcon.style.color = "initial";
				passwordInput.style.borderColor = "initial";
				passwordInput.style.outlineColor = "initial";
				return;
			}

			if (passwordValue !== storedPassword) {
				passwordLabel.textContent = "Incorrect Password.";
				passwordLabel.style.color = "red";
				passwordInput.style.color = "red";
				passwordInput.style.borderColor = "red";
				passwordInput.style.outlineColor = "red";
				passwordIcon.style.color = "red";
			} else {
				passwordLabel.textContent = "Correct Password";
				passwordLabel.style.color = "green";
				passwordInput.style.color = "green";
				passwordInput.style.borderColor = "green";
				passwordInput.style.outlineColor = "green";
				passwordIcon.style.color = "green";
			}
		}

		passwordInput.addEventListener("input", checkUserPassword);

		function checkLoginEnabled() {
			usernameValue = usernameInput.value;
			passwordValue = passwordInput.value;
			existingUser = localStorage.getItem(usernameValue);

			loginButton.disabled =
				usernameValue === "" ||
				!existingUser ||
				passwordValue !== JSON.parse(existingUser)?.password;
		}

		usernameInput.addEventListener("input", checkLoginEnabled);
		passwordInput.addEventListener("input", checkLoginEnabled);

		checkLoginEnabled();

		const loginForm = document.querySelector("form");
		loginForm.addEventListener("submit", function (event) {
			event.preventDefault();

			const username = document.getElementById("username").value.trim();
			const password = passwordInput.value.trim();

			const userData = localStorage.getItem(username);
			if (!userData) {
				alert("User not found! Please sign up first.");
				return;
			}

			const { password: storedPassword } = JSON.parse(userData);
			if (password !== storedPassword) {
				alert("Incorrect password! Please try again.");
				return;
			}

			if (password === storedPassword) {
				localStorage.setItem("loggedInUser", username); // Store the logged-in user
				window.location.href = "/index.html";
			}
		});
	}

	// Signup Page
	if (window.location.pathname === "/auth/signup.html") {
		usernameInput.addEventListener("input", () => {
			usernameValue = usernameInput.value.trim();
			existingUser = localStorage.getItem(usernameValue);
			if (usernameValue === "") {
				usernameLabel.textContent = "Enter username";
				usernameLabel.style.color = "initial";
				usernameIcon.style.color = "initial";
				usernameInput.style.color = "initial";
				usernameInput.style.borderColor = "initial";
				usernameInput.style.outlineColor = "initial";
				return;
			}

			if (existingUser) {
				usernameLabel.textContent = "Username already taken! Try another.";
				usernameLabel.style.color = "red";
				usernameInput.style.color = "red";
				usernameIcon.style.color = "red";
				usernameInput.style.borderColor = "red";
				usernameInput.style.outlineColor = "red";
			} else {
				usernameLabel.textContent = "Your username is unique.";
				usernameLabel.style.color = "green";
				usernameInput.style.color = "green";
				usernameIcon.style.color = "green";
				usernameInput.style.borderColor = "green";
				usernameInput.style.outlineColor = "green";
			}
		});

		emailInput.addEventListener("input", function () {
			emailValue = emailInput.value;

			if (emailValue === "") {
				emailLabel.textContent = "Enter email address";
				emailLabel.style.color = "initial";
				emailIcon.style.color = "initial";
				emailInput.style.color = "initial";
				emailInput.style.borderColor = "initial";
				emailInput.style.outlineColor = "initial";
				return;
			}

			if (emailPattern.test(emailValue)) {
				emailLabel.textContent = "You entered a valid email address.";
				emailLabel.style.color = "green";
				emailInput.style.color = "green";
				emailIcon.style.color = "green";
				emailInput.style.borderColor = "green";
				emailInput.style.outlineColor = "green";
			} else {
				emailLabel.textContent = "Enter a valid email address";
				emailLabel.style.color = "red";
				emailInput.style.color = "red";
				emailIcon.style.color = "red";
				emailInput.style.borderColor = "red";
				emailInput.style.outlineColor = "red";
			}
		});

		passwordInput.addEventListener("input", function () {
			passwordValue = passwordInput.value;

			if (passwordValue === "") {
				passwordLabel.textContent = "Enter password";
				passwordLabel.style.color = "initial";
				passwordInput.style.color = "initial";
				passwordIcon.style.color = "initial";
				passwordInput.style.borderColor = "initial";
				passwordInput.style.outlineColor = "initial";
				return;
			}

			if (passwordValue.length < 8) {
				passwordLabel.textContent = "Password must be at least 8 characters.";
				passwordLabel.style.color = "red";
				passwordInput.style.color = "red";
				passwordInput.style.borderColor = "red";
				passwordInput.style.outlineColor = "red";
				passwordIcon.style.color = "red";
			} else {
				passwordLabel.textContent = "Password is at least 8 characters.";
				passwordLabel.style.color = "green";
				passwordInput.style.color = "green";
				passwordIcon.style.color = "green";
				passwordInput.style.borderColor = "green";
				passwordInput.style.outlineColor = "green";
			}

			confirmPasswordInput.dispatchEvent(new Event("input"));
		});

		confirmPasswordInput.addEventListener("input", function () {
			confirmPasswordValue = confirmPasswordInput.value;
			passwordValue = passwordInput.value;

			if (confirmPasswordValue === "") {
				confirmPasswordLabel.textContent = "Re-enter password";
				confirmPasswordLabel.style.color = "initial";
				confirmPasswordInput.style.color = "initial";
				confirmPasswordIcon.style.color = "initial";
				confirmPasswordInput.style.borderColor = "initial";
				confirmPasswordInput.style.outlineColor = "initial";
				return;
			}

			if (confirmPasswordValue.length < 8) {
				confirmPasswordLabel.textContent =
					"Password must be at least 8 characters.";
				confirmPasswordLabel.style.color = "red";
				confirmPasswordInput.style.color = "red";
				confirmPasswordIcon.style.color = "red";
				confirmPasswordInput.style.borderColor = "red";
				confirmPasswordInput.style.outlineColor = "red";
			} else if (confirmPasswordValue !== passwordValue) {
				confirmPasswordLabel.textContent = "Passwords do not match.";
				confirmPasswordLabel.style.color = "red";
				confirmPasswordInput.style.color = "red";
				confirmPasswordIcon.style.color = "red";
				confirmPasswordInput.style.borderColor = "red";
				confirmPasswordInput.style.outlineColor = "red";
			} else {
				confirmPasswordLabel.textContent = "Passwords match.";
				confirmPasswordLabel.style.color = "green";
				confirmPasswordInput.style.color = "green";
				confirmPasswordIcon.style.color = "green";
				confirmPasswordInput.style.borderColor = "green";
				confirmPasswordInput.style.outlineColor = "green";
			}
		});

		function checkSignupEnabled() {
			usernameValue = usernameInput.value;
			emailValue = emailInput.value;
			passwordValue = passwordInput.value;
			confirmPasswordValue = confirmPasswordInput.value;
			existingUser = localStorage.getItem(usernameValue);

			signupButton.disabled =
				usernameValue === "" ||
				existingUser ||
				!emailPattern.test(emailValue) ||
				passwordValue.length < 8 ||
				confirmPasswordValue !== passwordValue;
		}

		usernameInput.addEventListener("input", checkSignupEnabled);
		emailInput.addEventListener("input", checkSignupEnabled);
		passwordInput.addEventListener("input", checkSignupEnabled);
		confirmPasswordInput.addEventListener("input", checkSignupEnabled);

		checkSignupEnabled();

		const signupForm = document.querySelector("form");
		signupForm.addEventListener("submit", function (event) {
			event.preventDefault();

			const username = document.getElementById("username").value.trim();
			const email = emailInput.value.trim();
			const password = passwordInput.value;

			existingUser = localStorage.getItem(usernameValue);

			if (existingUser) {
				alert("User already exists! Please login.");
				return;
			}

			const userData = { email, password };
			localStorage.setItem(username, JSON.stringify(userData));

			window.location.href = "/index.html";
		});
	}

	const username = localStorage.getItem("loggedInUser");
	if (username) {
		// If logged in, hide login/signup links and show logout link
		document.getElementById("login-link").style.display = "none";
		document.getElementById("signup-link").style.display = "none";
		document.getElementById("logout-link").style.display = "inline-block";

		// Logout functionality
		document
			.getElementById("logout-link")
			.addEventListener("click", function () {
				localStorage.removeItem("loggedInUser"); // Remove the logged-in user from localStorage
				window.location.reload(); // Reload page to update links
				window.location.href = "/auth/login.html";
			});
	}
});
