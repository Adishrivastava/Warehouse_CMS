// ? ____________ overview of the project _______________

// // firestore modelling ----------------------

// todo < 1 > make a base collection for warehouse
// name
// location
// description
// * nested storage collection

// todo < 2 > for product category collection
// category
// hsn code
// unit

// todo < 3 > products collection
// product name
// product category
// quantity

// todo < 4 > for transactions collection (all the transactions i.e. giving products to warehouses)

// todo < 5 > for managers or users
// name
// email
// phone
// * nested collected for warehouses

// ? _______________ GENERAL JAVASCRIPT __________________

// // saving spinner reference
let spDis = document.getElementById('spinnerDiv');

// // setting for side bar
$('document').ready(function () {
	$('.buttons').sideNav();

	$('ul.side-nav li').click(function (e) {
		$('.buttons').sideNav('hide');
	});
});

// ? datatables
$(document).ready(function () {
	$('.modal1').modal();

	$('select').material_select();
	$('#wareTable').DataTable({
		columnDefs: [
			{
				targets: [0, 1, 2],
				className: 'mdl-data-table__cell--non-numeric',
			},
		],
	});
});

// ? displaying various sections ion click of sidebars

// // displaying the show entity section
document.getElementById('wh-a-btn').addEventListener('click', (evt) => {
	document.querySelector('#wh-f').style.display = 'block';
	document.querySelector('#wh-s').style.display = 'none';
	document.querySelector('#pro-v').style.display = 'none';
	document.querySelector('#stock-v').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'none';
	document.querySelector('#man-a-v').style.display = 'none';
});

// // displaying the show entity section
document.getElementById('wh-v-btn').addEventListener('click', (evt) => {
	document.querySelector('#wh-s').style.display = 'block';
	document.querySelector('#wh-f').style.display = 'none';
	document.querySelector('#pro-v').style.display = 'none';
	document.querySelector('#stock-v').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'none';
	document.querySelector('#man-a-v').style.display = 'none';
});
// // displaying the show entity section
document.getElementById('pro-v-btn').addEventListener('click', (evt) => {
	document.querySelector('#pro-v').style.display = 'block';
	document.querySelector('#wh-f').style.display = 'none';
	document.querySelector('#wh-s').style.display = 'none';
	document.querySelector('#stock-v').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'none';
	document.querySelector('#man-a-v').style.display = 'none';
});

// // displaying the show entity section
document.getElementById('stock-v-btn').addEventListener('click', (evt) => {
	document.querySelector('#pro-v').style.display = 'none';
	document.querySelector('#wh-f').style.display = 'none';
	document.querySelector('#wh-s').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'none';
	document.querySelector('#man-a-v').style.display = 'none';
	document.querySelector('#stock-v').style.display = 'block';
});

// // displaying the show entity section
document.getElementById('trans-v-btn').addEventListener('click', (evt) => {
	document.querySelector('#pro-v').style.display = 'none';
	document.querySelector('#wh-f').style.display = 'none';
	document.querySelector('#wh-s').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'block';
	document.querySelector('#man-a-v').style.display = 'none';
	document.querySelector('#stock-v').style.display = 'none';
});

// // displaying the show entity section
document.getElementById('man-v-btn').addEventListener('click', (evt) => {
	document.querySelector('#pro-v').style.display = 'none';
	document.querySelector('#wh-f').style.display = 'none';
	document.querySelector('#wh-s').style.display = 'none';
	document.querySelector('#trans-v').style.display = 'none';
	document.querySelector('#man-a-v').style.display = 'block';
	document.querySelector('#stock-v').style.display = 'none';
});

// ? disabling any message from datatable
$.fn.dataTable.ext.errMode = 'none';
