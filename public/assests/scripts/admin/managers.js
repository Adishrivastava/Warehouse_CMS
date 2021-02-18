// ? ________________ Managers table js _____________________

$('document').ready(function () {
	$('mansTable').DataTable();
});

////  Displaying managers in table
const displayManagers = async () => {
	spinner.style.display = 'flex';
	//$('#mansTable').DataTable();
	$('#mansTable').DataTable().clear().draw();

	let promise = await db
		.collection('managers')
		.get()
		.then((snapshot) => {
			let p = snapshot.docs.forEach((doc) => {
				$('#mansTable')
					.DataTable()
					.row.add([
						doc.data().m_name,
						doc.data().m_email,
						doc.data().m_mobile,
						'<button class="btn cyan darken-2 waves-effect modal-trigger" style="display:block;margin:auto;" data-target="modal2" id="' +
							doc.id +
							'" onclick="wareAssigned(this.id)">view</button>',
						`<button class="btn red darken-1 waves-effect" style="display:block;margin:auto;" id="${doc.id}-rem" onclick="removeMan(this.id)">remove</button>`,
					])
					.draw(false);
			});
		})
		.catch((e) => {
			console.log(e);
		});

	spinner.style.display = 'none';
};

//// removing managers
const removeMan = async (idrem) => {
	let temp = idrem.split('-');

	let id = temp[0];

	let promise = await db
		.collection('managers')
		.doc(id)
		.delete()
		.then(() => {
			console.log('manager removed !');
			displayManagers();
		})
		.catch((e) => {
			console.log(e);
		});
};

// ref to warehouses assigbed to managers list
const wareList = document.getElementById('warehousesList');

// ref to hidden input in modal for manager id
const manId = document.getElementById('manId');

//// dispalying assigned warehouses
const wareAssigned = async (id) => {
	spinner.style.display = 'flex';

	// setting the manager id
	manId.value = id;

	// list for adding assigned warehouses
	let assWareList = [];

	// removing previously assigned html
	wareList.innerHTML = '';

	// * displaying the assigned warehouses
	let promise = await db
		.collection('managers')
		.doc(id)
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				wareList.innerHTML +=
					'<li class="collection-item" id=' +
					doc.id +
					'>' +
					doc.data().w_name +
					'<button class="btn waves-effect red" id="' +
					doc.id +
					'-rem" onclick="remWareAssigned(this.id)" style="margin-left:20px">remove</button></li>';

				// adding warehouse to assigned list
				assWareList.push(doc.data().w_name);
			});
		});

	// ref to input div
	const manWareAdd = document.getElementById('manWareAdd');

	manWareAdd.innerHTML = '';

	// * displaying non assigned warehouses for adding as assigned
	let promise2 = await db
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p2 = await snapshot.docs.forEach((doc) => {
				if (!assWareList.includes(doc.data().w_name)) {
					manWareAdd.innerHTML +=
						'<div class="input-field col s12 fixed"><input type="checkbox" id="' +
						doc.data().w_name +
						'" name="assWare" value=' +
						doc.data().w_name +
						' /><label for="' +
						doc.data().w_name +
						'">' +
						doc.data().w_name +
						'</label></div>';
				}
			});
		})
		.catch((e) => {
			console.log(e);
		});
};

const remWareAssigned = async (idrem) => {
	let temp = idrem.split('-');
	let id = temp[0];

	console.log(id);
	let promise = await db
		.collection('managers')
		.doc(manId.value)
		.collection('warehouses')
		.doc(id)
		.delete()
		.then(() => {
			console.log('deleted from manager');
			wareAssigned(manId.value);
		})
		.catch((E) => {
			console.log(E);
		});
};

// ref to add warehouse form
const assWareForm = document.getElementById('assWareForm');

//// assigning warehouses
assWareForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	spinner.style.display = 'flex';

	let length = $('input[name="assWare"]:checked').length;
	let wares = assWareForm.assWare;
	let whList = [];

	try {
		for (let checkbox of wares) {
			if (checkbox.checked) {
				whList.push(checkbox.value);
			}
		}
	} catch (e) {
		whList.push(wares.value);
	}

	//console.log(assWareForm.assWare);
	console.log(whList);

	// looping through all categories selected
	whList.forEach(async (w_name) => {
		let promise = await db
			.collection('managers')
			.doc(manId.value)
			.collection('warehouses')
			.add({ w_name: w_name })
			.then((doc) => {
				console.log(doc.id + 'warehouse assigned !');
			})
			.catch((e) => {
				console.log(e);
			});
	});

	wareAssigned(manId.value);

	spinner.style.display = 'none';
});

// ? __________________________adding manager __________________________

// ref to manager add form
const manAdd = document.getElementById('manAddForm');

//// adding manager
manAdd.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	spinner.style.display = 'flex';

	let promise = await db
		.collection('managers')
		.add({
			m_name: manAdd.manNameInp.value,
			m_email: manAdd.manEmailInp.value,
			m_mobile: manAdd.manMobileInp.value,
			m_password: manAdd.manPasswordInp.value,
		})
		.then((doc) => {
			swal('Manager added !');
			displayManagers();
		})
		.catch((e) => {
			console.log(e);
		});

	spinner.style.display = 'none';
});

// ? calling functions
displayManagers();

// ? for starting the materialize modal
(function ($) {
	$(function () {
		//initialize all modals
		$('.modal').modal();
	}); // end of document ready
})(jQuery); //
