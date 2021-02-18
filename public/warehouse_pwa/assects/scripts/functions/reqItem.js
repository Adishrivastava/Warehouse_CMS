//? _______________ request from ______________

const reqform = document.getElementById('reqForm');

reqform.addEventListener('submit', async (evt) => {
	evt.preventDefault();

	spinner.style.display = 'flex';

	let product = reqform.proSelect.value;
	let qty = reqform.proQty.value;

	let promise = await db
		.collection('requests')
		.add({
			m_name: sessionStorage.getItem('manager_username'),
			p_name: product,
			p_qty: qty,
		})
		.then((doc) => {
			spinner.style.display = 'none';
			swal('added !');
		})
		.catch((e) => {
			spinner.style.display = 'none';
			swal('sorry cannot be added due to some issue!');
		});

	spinner.style.display = 'none';
});

// ? displaying options for products
const proselect = document.getElementById('proSelect');

const disProOpt = async () => {
	console.log('he');
	let promise = await db
		.collection('product-categories')
		.get()
		.then(async (snapshot) => {
			console.log(snapshot.docs);
			let p = await snapshot.docs.forEach(async (doc) => {
				proselect.innerHTML +=
					'<option value="' +
					doc.data().pc_name +
					'">' +
					doc.data().pc_name +
					'</option>';
			});
			$('select').material_select();
		});
};

disProOpt();
