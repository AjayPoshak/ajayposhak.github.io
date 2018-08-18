const worker = new Worker('./worker.js');

function generate() {
	const withOutWorker = document.getElementById('without-worker').checked;
	const withWorker = document.getElementById('with-worker').checked;
	const num = document.getElementById('num').value;
	resetTimer();
	showLoader();
	destroyTable();
	let arr = [];
	if (withOutWorker) {
		arr = calcWithoutWorker(num);
		showTable(arr);
		hideLoader();
	} else {
		arr = initWorker(num);
	}
}

function resetTimer() {
	showTimeTaken(0);
}

function showTimeTaken(params) {
	const timeWidget = document.getElementById('tt');
	const t = document.getElementById('time-taken');
	t.textContent = params;
	timeWidget.style.display = 'block';
}

function destroyTable() {
	const table = document.getElementById('fibo');
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

function showTable(params) {
	console.log('showing table', params);
	const table = document.getElementById('fibo');
	params.map((p, key) => {
		const tr = document.createElement('tr');
		const index = document.createElement('td');
		const data = document.createElement('td');
		index.textContent = key;
		data.textContent = p;
		tr.appendChild(index);
		tr.appendChild(data);
		table.appendChild(tr);
	});
}

function showLoader() {
	const loader = document.getElementById('loader');
	loader.style.visibility = 'visible';
}

function hideLoader() {
	const loader = document.getElementById('loader');
	loader.style.visibility = 'hidden';
}
let startWorkerTime;
function initWorker(n) {
	console.log('worker initiated');
	startWorkerTime = performance.now();
	worker.postMessage(n);
}

function fibonacci(n) {
	return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

function calcWithoutWorker(n) {
	const start = performance.now();
	const arr = [];
	for (let i = 0; i < n; i++) {
		arr.push(fibonacci(i));
	}
	console.log(arr);
	const end = performance.now();
	console.log(`time taken ${end - start}`);
	showTimeTaken(end - start);
	return arr;
}

worker.addEventListener('message', function(e) {
	const endWorkerTime = performance.now();
	console.log(`worker done ${startWorkerTime} ${endWorkerTime}`);
	showTimeTaken(endWorkerTime - startWorkerTime);
	showTable(e.data);
	hideLoader();
});
