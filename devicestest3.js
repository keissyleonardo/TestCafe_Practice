import { Selector } from 'testcafe';
//Test 3 (optional)

fixture`Test REST API`
    .page`http://127.0.0.1:3001`;


test('Update existing item from list of devices', async t => {

 
    const htmlDeviceList = Selector('.list-devices-main').find('.list-devices').child('.device-main-box');
    const updatedElement =  Selector('#root > div > div > div.list-devices-main > div > div:nth-child(1) > div.device-info > span.device-name');
    const editButton = await htmlDeviceList.find('.device-options').child('.device-edit'); 
    const addSystemName = Selector('#system_name');
    const updateDevice = Selector('.submitButton')
    const newDevicename = "Renamed Device";


    await t
        .click(editButton)
        .click(addSystemName)
        .pressKey('ctrl+a delete')
        .typeText(addSystemName, newDevicename)
        .click(updateDevice)
        .navigateTo('http://127.0.0.1:3001')

    await t.expect(updatedElement.innerText).eql(newDevicename)
});

