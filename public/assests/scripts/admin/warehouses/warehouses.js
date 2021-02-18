// ? displaying and deleting warehouses

// the list to reference
var whDL = document.getElementById('wh-d-list');

//// displaying warehouses in the table function
const disWareDel = async () => {
	// showing spinner
	spDis.style.display = 'flex';
	//// deleting all rows in the table
	$('#wareTable').DataTable().clear().draw(false);

	let promise = await db
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				//// adding warehouses to the list
				//// setting al info
				$('#wareTable')
					.DataTable()
					.row.add([
						doc.data().w_name,
						'<button class="btn cyan darken-2 waves-effect modal-trigger" style="display:block;margin:auto;" data-target="viewModal" id="' +
							doc.id +
							'-view" onclick="disView(this.id)">view</button>',
						'<button class="btn orange darken-2 waves-effect modal-trigger" style="display:block;margin:auto;" data-target="storModal" id="' +
							doc.id +
							'-sto" onclick="wareSto(this.id)">add storage</button>',
						'<button class="btn red darken-2 waves-effect" style="display:block;margin:auto;" id="' +
							doc.id +
							'" onclick="delWh(this.id)">delete</button>',
					])
					.draw(false);
			});

			// hiding spinner
			spDis.style.display = 'none';
		})
		.catch((e) => {
			console.log(e);
		});

	// hiding spinner
	spDis.style.display = 'none';
};

// ---------------------------------------------------------------------------------

// ? deleting warehouse

const delWh = async (docId) => {
	let promise = await db
		.collection('warehouses')
		.doc(docId)
		.delete()
		.then(() => {
			disWareDel();
		});
};

// ? adding storage data
const storForm = document.getElementById('stor-form');
storForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();
	spDis.style.display = 'flex';

	let docId = storForm.whStor.value;

	let promise = await db
		.collection('warehouses')
		.doc(docId)
		.collection('storages')
		.add({
			s_name: storForm.storName.value,
			s_loc: storForm.storLocation.value,
			s_desc: storForm.storDesc.value,
		})
		.then((docRef) => {
			spDis.style.display = 'none';
			storForm.reset();
			swal('storage added !');
		})
		.catch((e) => {
			console.log(e);
		});
	spDis.style.display = 'none';
});

// ? modal of storage

const wareSto = async (doc) => {
	////splitting doc to get doc id
	a = doc.split('-');
	docId = a[0];

	spDis.style.display = 'flex';

	db.collection('warehouses')
		.doc(docId)
		.get()
		.then((doc) => {
			storForm.whStor.value = doc.id;
			document.getElementById('wh-name-s').innerHTML = doc.data().w_name;
		})
		.catch((e) => {
			console.log(e);
		});

	spDis.style.display = 'none';
};

// ------------------------------------------

// ? for starting the materialize modal
(function ($) {
	$(function () {
		//initialize all modals
		$('.modal').modal();
	}); // end of document ready
})(jQuery); //

// ------------------------------------

// ! calling the function at start
disWareDel();
