import test from 'ava';

const urlInput = '#url-input';
const controlGroup = '.control-group';

test.serial('has the functional control group', async (t) => {
  const app = t.context.app;

  await app.client
    .waitForUrl('https://github.com/LulumiProject/lulumi-browser')
    .waitForBrowserWindow()
    .waitForVisible(urlInput)
    .waitForExist(controlGroup);

  expect(await app.client.waitForExist('#browser-navbar__refresh.enabled')).to.equal(true);

  await app.client
    .waitForUrl('https://github.com/LulumiProject/lulumi-browser')
    .loadUrl('lulumi://about/#/lulumi')
    .waitForBrowserWindow();

  expect(await app.client
    .waitForExist('#browser-navbar__goBack.enabled')).to.equal(true);
  expect(await app.client
    .waitForExist('#browser-navbar__goForward.disabled')).to.equal(true);

  await app.client
    .waitForExist('#browser-navbar__goBack.enabled')
    .click('#browser-navbar__goBack.enabled');

  expect(await app.client
    .waitForExist('#browser-navbar__goBack.disabled')).to.equal(true);
  expect(await app.client
    .waitForExist('#browser-navbar__goForward.enabled')).to.equal(true);
});
