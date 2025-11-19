import { Button } from '@/components';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/stackManager';
import ApiClient from '@/libs/client/apiClient';
import { XMLParser } from 'fast-xml-parser';

const LoginActivity: ActivityComponentType = () => {
  const { replace, push } = useFlow();

  const convertXmlToJson = (xmlData: any) => {
    const result: Record<string, any[]> = {};

    // Dataset이 배열인 경우와 단일 객체인 경우 모두 처리
    const datasets = Array.isArray(xmlData.Root?.Dataset)
      ? xmlData.Root.Dataset
      : xmlData.Root?.Dataset
        ? [xmlData.Root.Dataset]
        : [];

    datasets.forEach((dataset: any) => {
      const datasetId = dataset['@_id'] || dataset.id;
      if (!datasetId) return;

      // Row가 배열인 경우와 단일 객체인 경우 모두 처리
      const rows = Array.isArray(dataset.Rows?.Row) ? dataset.Rows.Row : dataset.Rows?.Row ? [dataset.Rows.Row] : [];

      const convertedRows = rows.map((row: any) => {
        const rowObj: Record<string, string> = {};

        // Col이 배열인 경우와 단일 객체인 경우 모두 처리
        const cols = Array.isArray(row.Col) ? row.Col : row.Col ? [row.Col] : [];

        cols.forEach((col: any) => {
          const colId = col['@_id'] || col.id;
          const colValue = typeof col === 'string' ? col : col['#text'] || col;
          if (colId) {
            rowObj[colId] = colValue;
          }
        });

        return rowObj;
      });

      result[datasetId] = convertedRows;
    });

    return result;
  };

  const test = () => {
    // const apiClient = new ApiClient();
    // apiClient
    //   .get('/login.MindBridge')
    //   .then((res) => {
    //     console.log('res');
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    fetch('/api', {
      method: 'GET', // GET, POST 등
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'application/xml', // POST 시 필요
      },
    })
      .then(async (response) => {
        const xmlText = await response.text();
        console.log('XML Response:', xmlText);

        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '@_',
          textNodeName: '#text',
        });
        const parsedXml = parser.parse(xmlText);
        console.log('Parsed XML:', parsedXml);

        const jsonResult = convertXmlToJson(parsedXml);
        console.log('Converted JSON:', jsonResult);
      })
      .catch((error) => console.error(error));
  };
  return (
    <AppScreen>
      <div className='flex h-full items-center justify-center'>
        <Button
          className='rounded-full bg-blue-500 px-4 py-2 text-white'
          onClick={() => push('HomeActivity', { title: 'Home' }, { animate: true })}
        >
          Login
        </Button>

        <Button onClick={test}>call ~!</Button>
      </div>
    </AppScreen>
  );
};

export default LoginActivity;
