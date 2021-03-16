let array = [
    [1, 2, 1, 2],
    [2, 3, 2, 4],
    [4, 1, 1, 2],
    [4, 5, 2, 4],
];

// find unique elements
let uniques = new Set();
for (let indexI = 0; indexI < array.length; indexI++) {
    for (let indexJ = 0; indexJ < array[0].length; indexJ++) {
        const element = array[indexI][indexJ];
        uniques.add(element);
    }
}

console.log(uniques);

// get all elements and put thier count
let nonUniques = new Map();
for (let indexI = 0; indexI < array.length; indexI++) {
    for (let indexJ = 0; indexJ < array[0].length; indexJ++) {
        const element = array[indexI][indexJ];
        if (nonUniques.has(element))
            nonUniques.set(element, nonUniques.get(element) + 1);
        else nonUniques.set(element, 1);
    }
}

// delete uniques
for (const iterator of nonUniques) {
    if (iterator[1] == 1) {
        nonUniques.delete(iterator[0]);
    }
}

console.log(nonUniques);

// combo array
let comboArray = new Array();
const array1 = [
    [1, 2, 1, 2],
    [2, 3, 2, 4],
    [4, 1, 1, 2],
    [4, 5, 2, 4],
];
const array2 = [
    [4, 5, 2, 4],
    [1, 2, 1, 2],
];

for (let indexI = 0; indexI < array1.length; indexI++) {
    let newRow = new Array();
    for (let indexJ = 0; indexJ < array1[0].length; indexJ++) {
        newRow.push(array1[indexI][indexJ]);
    }
    comboArray.push(newRow);
}

for (let indexI = 0; indexI < array2.length; indexI++) {
    let newRow = new Array();
    for (let indexJ = 0; indexJ < array1[0].length; indexJ++) {
        newRow.push(array2[indexI][indexJ]);
    }
    comboArray.push(newRow);
}

console.log(comboArray);
