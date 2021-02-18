// ------------------------------------------------------------------------------

// ? adding new warehouse

const wareForm = document.getElementById('ware-form');

wareForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	// showing spinner
	spDis.style.display = 'flex';

	// getting all info from form
	let wname = wareForm.wareName.value;
	let wloc = wareForm.wareLocation.value;
	let wdesc = wareForm.wareDesc.value;

	// adding data to database
	let promise = await db
		.collection('warehouses')
		.add({
			w_name: wname,
			w_loc: wloc,
			w_desc: wdesc,
		})
		.then((doc) => {
			// hidinging spinner
			spDis.style.display = 'none';

			//// deleting all rows in the table
			$('#wareTable').DataTable().clear().draw(false);
			disWareDel();
			wareForm.reset();
			swal('warehouse added !');
		})
		.catch((e) => {
			console.log(e);
		});

	// hidinging spinner
	spDis.style.display = 'none';
});
