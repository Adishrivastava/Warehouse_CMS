// ? displaying data in transactions table

const displayTrans = async () => {
	spinner.style.display = 'flex';

	$('#transTable').DataTable().clear().draw();

	let promise = await db
		.collection('transactions')
		.where('w_name', '==', wareSelect.value)
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				console.log(doc.data().timing);

				$('#transTable')
					.DataTable()
					.row.add([
						doc.data().p_name,
						doc.data().pc_name,
						doc.data().p_qty,
						doc.data().p_price,
						doc.data().timing,
					])
					.draw(false);
			});
		})
		.catch((e) => {
			console.log(e);
		});

	spinner.style.display = 'none';
};

$('#wareSelect').change(function () {
	displayTrans();
});

// ? showing option
const wareSelect = document.getElementById('wareSelect');

const disOption = async () => {
	let promise = await db
		.collection('managers')
		.doc(sessionStorage.getItem('manager_id'))
		.collection('warehouses')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				wareSelect.innerHTML +=
					'<option value="' +
					doc.data().w_name +
					'">' +
					doc.data().w_name +
					'</option>';
			});
		});
	$('select').material_select();
};

disOption();
