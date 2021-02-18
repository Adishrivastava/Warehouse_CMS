// * logging in the user
const form = document.getElementById('login-form');
form.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	username = form.usernameInput.value;
	password = form.passwordInput.value;

	let promise = await db
		.collection('managers')
		.where('m_password', '==', password)
		.where('m_name', '==', username)
		.get()
		.then(async (snapshot) => {
			let flag = true;

			console.log('got in !');

			let p = await snapshot.docs.forEach((doc) => {
				flag = false;

				sessionStorage.setItem('manager_username', username);
				sessionStorage.setItem('manager_id', doc.id);
				console.log(sessionStorage.getItem('manager_username'));
				console.log(sessionStorage.getItem('manager_id'));
				window.location.href = './index.html';
			});

			if (snapshot.docs.length < 1) {
				swal('Sorry wrong username or password!');
			}
		})
		.catch((e) => {
			console.log(e);
		});
});
