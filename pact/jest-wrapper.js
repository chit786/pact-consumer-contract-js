beforeAll(async () => {
    await global.provider.setup();
});

afterAll(async () => {
    await global.provider.finalize();
});
