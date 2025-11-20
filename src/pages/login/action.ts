import XmlUtils from '@/libs/client/xmlUtils';

// 로그인
export const login = async (lognick: string, userId: string, password: string) => {
  console.log('lognick', lognick);
  const xml = XmlUtils.createXml({
    variables: {},
    datasets: [
      {
        id: 'dsInput0＠User',
        columns: [
          { id: 'LOGNICK', type: 'STRING', size: '255' },
          { id: 'USERID', type: 'STRING', size: '255' },
          { id: 'PASSWORD', type: 'STRING', size: '255' },
        ],
        rows: [{ LOGNICK: lognick, USERID: userId, PASSWORD: password }],
      },
    ],
  });

  fetch('/api', {
    method: 'POST', // GET, POST 등
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'application/xml', // POST 시 필요
    },
    body: xml,
  })
    .then(async (response) => {
      const xmlText = await response.text();
      const jsonResult = XmlUtils.convertXmlToJson(xmlText);
      console.log('jsonResult', jsonResult);
      return jsonResult;
    })
    .catch((error) => console.error(error));
};
