import { Selector } from 'testcafe';

//Test 2 (optional)

fixture`Test REST API`
    .page`http://127.0.0.1:3001`;


test('Add new item to list of devices', async t => {

    const addDevice = Selector('.submitButton');
    const addSystemName = Selector('#system_name');
    const typeSelect = Selector('#type');
    const typeOption = typeSelect.find('option');
    const add_hdd_capacity = Selector('#hdd_capacity');
    const saveNewDevice = Selector('.submitButton');
    const htmlDeviceList = Selector('.list-devices-main').find('.list-devices').child('.device-main-box');

    const newDeviceDetails = {
        name: "Keissy-test-" + Math.floor(Math.random() * 10000),
        type: "WINDOWS_SERVER",
        capacity: Math.floor(Math.random() * 10000).toString()
    };

    await t
        .click(addDevice)
        .typeText(addSystemName, newDeviceDetails.name)
        .click(typeSelect)
        .click(typeOption.withAttribute('value', newDeviceDetails.type))
        .expect(typeSelect.value).eql(newDeviceDetails.type)
        .typeText(add_hdd_capacity, newDeviceDetails.capacity)
        .click(saveNewDevice); 

 
    let elemFound = false;
    for (let i = 0; i < await htmlDeviceList.count; i++) {

        let currentElement = htmlDeviceList.nth(i);
        let name = await currentElement.find('.device-name').innerText;

        if (name === newDeviceDetails.name) {
            elemFound = true;
            let type = await currentElement.find('.device-type').innerText;
            let capacity = await currentElement.find('.device-capacity').innerText;

            await t
                .expect(name).eql(newDeviceDetails.name)
                .expect(type).eql(newDeviceDetails.type)
                .expect(capacity).eql(newDeviceDetails.capacity + ' GB');

            break;
        }
    }

    // Used to make sure the element was found. If not used, if the element is not found the test still passes because the "expects" never run.
    await t.expect(elemFound).eql(true);
});

