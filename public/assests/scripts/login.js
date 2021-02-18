// ? signing in the admin
const signinForm = document.getElementById('login-form');

signinForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	//// showing the spinner
	document.getElementById('spinnerDiv').style.display = 'flex';

	//// getting form info
	let email = signinForm.email.value;
	let password = signinForm.password.value;

	//// logging admin in
	auth
		.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			//// hiding the spinner
			document.getElementById('spinnerDiv').style.display = 'none';
			window.location.href = 'index.html';
		})
		.catch((e) => {
			swal("Credentials doesn't match");
		});
});

// ? initialzing the side navbar
$('document').ready(function () {
	$('.buttons').sideNav();
});
