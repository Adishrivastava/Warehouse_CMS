// ? displaying and deleting warehouses

const whDoc = document.getElementById('whDoc'); // taking the reference to the warehouse doc input for view

//// displaying warehouses in the table function
const disView = async (doc) => {
	let d = doc.split('-');
	docId = d[0];

	spDis.style.display = 'flex'; // showing spinner

	whDoc.value = docId; // assigning wh doc to hidden input

	let p1 = await renderSt(docId);
	//let p2 = await renderMa(docId);

	spDis.style.display = 'none'; // hiding spinner
};

// ? function to rendor stor

const renderSt = async (docId) => {
	$('#storTable').DataTable().clear().draw(false);
	//// rendering storage houses
	let promise1 = await db
		.collection('warehouses')
		.doc(docId)
		.collection('storages')
		.get()
		.then(async (snapshot) => {
			let p = await snapshot.docs.forEach((docRef) => {
				$('#storTable')
					.DataTable()
					.row.add([
						docRef.data().s_name,
						docRef.data().s_loc,
						docRef.data().s_desc,

						'<button class="btn red darken-2 waves-effect" style="display:block;margin:auto;" id="' +
							docRef.id +
							'" onclick="remSt(this.id)">remove</button>',
					])
					.draw(false);
			});
		})
		.catch((e) => {
			console.log(e);
		});
};

// ? rendering managers
// const renderMa = async (docId) => {
// 	$('#manTable').DataTable().clear().draw(false);
// 	//// rendering managers
// 	let promise2 = await db
// 		.collection('warehouses')
// 		.doc(docId)
// 		.collection('managers')
// 		.get()
// 		.then(async (snapshot) => {
// 			let p = await snapshot.docs.forEach((docRef) => {
// 				$('#manTable')
// 					.DataTable()
// 					.row.add([
// 						docRef.data().m_name,
// 						docRef.data().m_email,
// 						docRef.data().m_mobile,

// 						'<button class="btn red darken-2 waves-effect" style="display:block;margin:auto;" id="' +
// 							docRef.id +
// 							'" onclick="remMa(this.id)">remove</button>',
// 					])
// 					.draw(false);
// 			});
// 		})
// 		.catch((e) => {
// 			console.log(e);
// 		});
// };

// ? removing storage spaces

const remSt = async (docId) => {
	console.log(whDoc.value);

	let promise = await db
		.collection('warehouses')
		.doc(whDoc.value)
		.collection('storages')
		.doc(docId)
		.delete()
		.then(() => {
			renderSt(whDoc.value);
		});
};
