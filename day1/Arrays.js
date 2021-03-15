let array = [
    [1, 2, 1, 2],
    [2, 3, 2, 4],
    [4, 1, 1, 2],
    [4, 5, 2, 4],
];

// find unique elements
let uniques = new Set();
for (let indexI = 0; indexI < array.length; indexI++) {
    for (let indexJ = 0; indexJ < array.length; indexJ++) {
        const element = array[indexI][indexJ];
        uniques.add(element);
    }
}

console.log(uniques);


// get all elements and put thier count
let nonUniques = new Map();
for (let indexI = 0; indexI < array.length; indexI++) {
    for (let indexJ = 0; indexJ < array.length; indexJ++) {
        const element = array[indexI][indexJ];
            if (nonUniques.has(element))
                nonUniques.set(element, nonUniques.get(element) + 1);
            else
                nonUniques.set(element, 1);
    }
}

// delete uniques
for (const iterator of nonUniques) {
    if (iterator[1] == 1) {
        nonUniques.delete(iterator[0]);
    }
}

console.log(nonUniques);
