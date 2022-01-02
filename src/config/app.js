(async function () {
    const app = await require('./express')();

    app.listen(5000, () => console.log('Listening on port 5000'));
})();