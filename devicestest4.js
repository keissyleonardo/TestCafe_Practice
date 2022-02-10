import { Selector } from 'testcafe';
//Test 4 (optional)

fixture`Test REST API`
    .page`http://127.0.0.1:3001`;


test('Check that the UI matches the Server API', async t => {


    const htmlDeviceList = Selector('.list-devices-main').find('.list-devices').child('.device-main-box');
    const nameOfDeleted = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(1) > div.device-info > span.device-name');
    const removeButton = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(1) > div.device-options > button');
    let nameInner = await nameOfDeleted.innerText;

    await t
        .click(removeButton)
        .navigateTo('http://127.0.0.1:3001')

    let elemfound;
    for (let i = 0; i < await htmlDeviceList.count; i++) {
        if (nameInner.exists) 
        {
             elemfound = true;
        } else {
             elemfound = false;
        }
    }
    await t.expect(elemfound).eql(false)
});

