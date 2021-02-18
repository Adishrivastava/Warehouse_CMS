// ? ________________ adding product category ____________________

const addItemForm = document.getElementById('addItemForm'); // ref to pc form

////adding function
addItemForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	spinner.style.display = 'flex'; // spinner display

	//// getting input data
	let pname = addItemForm.proSel.value;
	let phsn = addItemForm.proHsn.value;
	let punit = addItemForm.proUnit.value;
	let psku = addItemForm.proSku.value;
	let wname = addItemForm.wareSel.value;
	let sname = addItemForm.storSel.value;

	////adding data
	let promise = await db
		.collection('stocks')
		.where('w_name', '==', wname)
		.where('p_name', '==', pname)
		.update({
			p_hsn: pchsn,
			p_unit: pcunit,
			p_sku: psku,
			p_sku: pcunit,
		})
		.then(async (doc) => {
			let p = await disProCat();
			swal('product category added.');
		})
		.catch((e) => {
			console.log(e);
		});

	spinner.style.display = 'none';
});

// ? ________________ displaying options in form ______________

const waresel = document.getElementById('wareSel');
const storsel = document.getElementById('storSel');
const products = document.getElementById('products');

let wareList = [];
let storList = [];

const displayOptions = async () => {
	spinner.style.display = 'flex';

	waresel.innerHTML = '';
	storsel.innerHTML = '';

	let promise = await db
		.collection('managers')
		.doc(sessionStorage.getItem('manager_id'))
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach(async (doc) => {
				waresel.innerHTML +=
					'<option value="' +
					doc.data().w_name +
					'">' +
					doc.data().w_name +
					'</option>';

				wareList.push(doc.data().w_name);

				let pro = await db
					.collection('warehouses')
					.where('w_name', '==', doc.data().w_name)
					.get()
					.then(async (snapshot) => {
						let p = await snapshot.docs.forEach((docRef) => {
							docRef.ref
								.collection('storages')
								.get()
								.then(async (snapshot2) => {
									let p2 = await snapshot2.docs.forEach((doc2) => {
										storsel.innerHTML +=
											'<option value="' +
											doc2.data().s_name +
											'">' +
											doc2.data().s_name +
											'</option>';

										storList.push(doc2.data().s_name);
									});
								});
						});
					});
			});
		});
	$('select').material_select();
	$('#storSel').material_select();
	spinner.style.display = 'none';
};

displayOptions();
