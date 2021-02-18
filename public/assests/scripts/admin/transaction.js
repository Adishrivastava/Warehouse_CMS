// ? displaying data in transactions table

const displayTrans = async () => {
	spinner.style.display = 'flex';

	$('#transTable').DataTable().clear().draw();

	let promise = await db
		.collection('transactions')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
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

displayTrans();

// ? ____________ adding filters in transTable______________

const reqFunc = async () => {
	let promise = db
		.collection('requests')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach(async (doc) => {
				console.log(doc.id);
				$('#reqTable')
					.DataTable()
					.row.add([
						doc.data().m_name,
						doc.data().p_name,
						doc.data().p_qty,
					])
					.draw(false);
			});
		});
};

reqFunc();
