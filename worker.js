onmessage = function(n) {
	console.log('Inside worker ', n);
	const arr = [];
	for (let i = 0; i < n.data; i++) {
		arr.push(fibonacci(i));
	}
	console.log('Inside worker ', arr);
	postMessage(arr);
};

function fibonacci(n) {
	return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}
