const add = (a, b) => {
    if (a === 0) return 1;
    return a + b;
};


const testPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('complete')
        }, 1000)
    })
};

module.exports = {
    add,testPromise
}