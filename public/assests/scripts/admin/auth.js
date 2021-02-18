// ? Checking if admin is logged in
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		//	swal('logged in');
	} else {
		// window.location.href = 'login_admin.html';
	}
});

// ? logging out the admin _____________________
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	//// logging out the user
	auth
		.signOut()
		.then(() => {
			window.location.href = 'login_page.html';
		})
		.catch((e) => {
			swal("Sorry can't log out");
			console.log(e);
		});
});
