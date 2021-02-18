// ? ___________ display warehouses as options _______________
const waretosel = document.getElementById('wareToSel');

const disOpt = async () => {
	let promise = await db
		.collection('managers')
		.doc(sessionStorage.getItem('manager_id'))
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				waretosel.innerHTML +=
					'<option value="' +
					doc.data().w_name +
					'">' +
					doc.data().w_name +
					'</option>';
			});
		});
	$('select').material_select();
};

disOpt();

// ? ________________showing data in stock datatable___________

const showIt = async (evt) => {
	let promise = await db
		.collection('stock')
		.where('w_name', '==', waretosel.value)
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				let d = doc.data();
				console.log(d);
				$('#stockTable')
					.DataTable()
					.row.add([d.p_name, d.p_hsn, d.p_unit, d.p_sku, d.p_price])
					.draw(false);
			});
		});
};

$('#wareToSel').change(function () {
	showIt();
});
