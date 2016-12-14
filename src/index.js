const sample = require('sample');

document.getElementById('calc').addEventListener('click', () => {
    const value1 = Number(document.getElementById('value1').value);
    const value2 = Number(document.getElementById('value2').value);

    const result = sample.add(value1, value2);
    document.getElementById('result').innerText = result;
});
