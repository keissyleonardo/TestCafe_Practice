//Test 1 (required)

import http from 'http';
import { Selector } from 'testcafe';

const getResponseData = (url) => new Promise((resolve, reject) => {
    http.get(url, res => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => resolve({ statusCode, contentType, rawData }));
    }).on('error', e => reject(e));
});

fixture `Test REST API`
    .page `http://127.0.0.1:3001`;


test('Check that the UI matches the Server API', async t => {

    const htmlDeviceList = Selector('.list-devices-main').find('.list-devices').child('.device-main-box');

    const response = await getResponseData('http://127.0.0.1:3000/devices');
    let apiDevicesList = JSON.parse(response.rawData);

    // Sort the server device list by HDD Capacity to match the UI
    apiDevicesList.sort((device1, device2) => {
        return device1.hdd_capacity - device2.hdd_capacity;
    });

    await t
        .expect(response.statusCode).eql(200)
        .expect(htmlDeviceList.count).eql(apiDevicesList.length)
    await t
    
    for (let i = 0; i < apiDevicesList.length; i++) {

        let currentElement = htmlDeviceList.nth(i);
        let name = await currentElement.find('.device-name').innerText;
        let type = await currentElement.find('.device-type').innerText;
        let capacity = await currentElement.find('.device-capacity').innerText;
        const removeButton = await currentElement.find('.device-options').child('.device-remove').exists
        const editButton = await currentElement.find('.device-options').child('.device-edit').exists


        await t
            .expect(apiDevicesList[i].type).eql(type)
            .expect(apiDevicesList[i].system_name).eql(name)
            .expect(apiDevicesList[i].hdd_capacity + " GB").eql(capacity)
            .expect(removeButton).ok()
            .expect(editButton).ok()
    }


});



