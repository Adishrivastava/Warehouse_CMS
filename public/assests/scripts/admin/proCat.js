// ? table for product categories

//// rendering table for pc
const disProCat = async () => {
	let promise = await db
		.collection('product-categories')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((doc) => {
				$('#proCatTable')
					.DataTable()
					.row.add([
						doc.data().pc_name,
						doc.data().pc_hsn,
						doc.data().pc_unit,

						'<button class="btn red darken-2 waves-effect" style="display:block;margin:auto;" id="' +
							doc.id +
							'" onclick="remPc(this.id)">remove</button>',
					])
					.draw(false);
			});
		});
};

//// removing pc
const removePc = async (docId) => {
	let promise = await db
		.collection('product-categories')
		.doc(docId)
		.delete()
		.then(() => {
			disProCat();
		})
		.catch((e) => {
			console.log(e);
		});
};

// ? adding product category

const pcForm = document.getElementById('proCat-form'); // ref to pc form

////adding function
pcForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	spDis.style.display = 'flex'; // spinner display

	//// getting input data
	let pcname = pcForm.proCatName.value;
	let pchsn = pcForm.proCatHsn.value;
	let pcunit = pcForm.proCatUnit.value;

	////adding data
	let promise = await db
		.collection('product-categories')
		.add({
			pc_name: pcname,
			pc_hsn: pchsn,
			pc_unit: pcunit,
		})
		.then(async (doc) => {
			let p = await disProCat();
			swal('product category added.');
		})
		.catch((e) => {
			console.log(e);
		});

	spDis.style.display = 'none';
});

// ? calling every opening functions

disProCat();
