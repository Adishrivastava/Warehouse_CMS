username = sessionStorage.getItem('ware_username');
const spinner = document.getElementById('spinnerDiv');

// ? _________________ logout btn ________________
document.getElementById('logout').addEventListener('click', (evt) => {
	sessionStorage.setItem('manager_username', '');
	sessionStorage.setItem('manager_id', '');
	window.location.href = 'login.html';
});

// ? side nav
document.addEventListener('DOMnameUidLoaded', function () {
	// nav menu
	const menus = document.querySelectorAll('.side-menu');
	M.Sidenav.init(menus, { edge: 'left' });

	// add recipe form
	const forms = document.querySelectorAll('.side-form');
	M.Sidenav.init(forms, { edge: 'left' });
});

const infoDiv = document.getElementById('info-div');

// ? checking if user logged in
if (
	sessionStorage.getItem('manager_username') == '' ||
	sessionStorage.getItem('manager_username') == null
) {
	window.location.href = 'login.html';
}

console.log(sessionStorage.getItem('manager_id'));

// ? __________ displaying different functions ______________

const sec1 = document.getElementById('addItem-d');
const sec2 = document.getElementById('viewStock-d');
const sec3 = document.getElementById('viewTrans-d');
const sec4 = document.getElementById('reqItem-d');

const displaySections = (id) => {
	sec1.style.display = 'none';
	sec2.style.display = 'none';
	sec3.style.display = 'none';
	sec4.style.display = 'none';

	document.getElementById(id).style.display = 'block';
};

// ? _____ some starting functions_____

$(document).ready(function () {
	$('.modal1').modal();

	$('#wareTable').DataTable({
		columnDefs: [
			{
				targets: [0, 1, 2],
				className: 'mdl-data-table__cell--non-numeric',
			},
		],
	});
});
// // setting for side bar
$('document').ready(function () {
	$('.buttons').sideNav();

	$('ul.side-nav li').click(function (e) {
		$('.buttons').sideNav('hide');
	});
});
$.fn.dataTable.ext.errMode = 'none';
