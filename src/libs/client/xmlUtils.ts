/*************************************************************
 * XML 유틸리티
 * - created by hwanee-k
 *************************************************************/

import { XMLParser } from 'fast-xml-parser';

// 타입 정의
export interface ColumnDef {
  id: string;
  type?: string;
  size?: string;
}

export interface DatasetInput {
  id: string;
  columns?: ColumnDef[];
  rows: Record<string, any>[];
}

export interface CreateXmlOptions {
  datasets: DatasetInput[];
  variables?: Record<string, any>;
}

export default class XmlUtils {
  /**
   * XML을 JSON으로 변환
   */
  static convertXmlToJson(xmlData: string): Record<string, any[]> {
    return convertXmlToJson(xmlData);
  }

  /**
   * JSON을 XML로 변환
   */
  static convertJsonToXml(jsonData: any): string {
    return convertJsonToXml(jsonData);
  }

  /**
   * 간단한 형태의 데이터로 XML 생성 (권장)
   * @example
   * // Variables 없이 사용
   * const xml = HttpUtils.createXml({
   *   datasets: [
   *     {
   *       id: "dsInput0＠User",
   *       columns: [
   *         { id: "USERID", type: "STRING", size: "255" },
   *         { id: "PASSWORD", type: "STRING", size: "255" }
   *       ],
   *       rows: [
   *         { USERID: "likebird", PASSWORD: "1111", LOGNICK: "3ls" }
   *       ]
   *     }
   *   ]
   * });
   *
   * // Variables 포함
   * const xml = HttpUtils.createXml({
   *   variables: { param1: "value1", param2: "value2" },
   *   datasets: [...]
   * });
   */
  static createXml(options: CreateXmlOptions | DatasetInput[]): string {
    // 배열로 전달된 경우 (하위 호환성)
    const datasets = Array.isArray(options) ? options : options.datasets;
    const variables = Array.isArray(options) ? undefined : options.variables;

    const jsonData = {
      Root: {
        Variables: variables || {},
        Dataset: datasets.map((dataset) => ({
          id: dataset.id,
          ColumnInfo: dataset.columns
            ? {
                Column: dataset.columns.map((col) => ({
                  id: col.id,
                  type: col.type || 'STRING',
                  size: col.size || '255',
                })),
              }
            : undefined,
          Rows: {
            Row: dataset.rows.map((row) => ({
              Col: Object.entries(row).map(([key, value]) => ({
                id: key,
                value: value,
              })),
            })),
          },
        })),
      },
    };

    return convertJsonToXml(jsonData);
  }
}

/**
 * JSON을 XML로 변환
 */
const convertJsonToXml = (jsonData: any): string => {
  if (!jsonData || !jsonData.Root) {
    return '<?xml version="1.0" encoding="UTF-8"?><Root></Root>';
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Root>\n';

  // Variables 처리
  if (jsonData.Root.Variables && Object.keys(jsonData.Root.Variables).length > 0) {
    xml += '    <Variables>\n';
    Object.entries(jsonData.Root.Variables).forEach(([key, value]) => {
      xml += `        <Variable id="${escapeXml(key)}">${escapeXml(value)}</Variable>\n`;
    });
    xml += '    </Variables>\n';
  } else {
    xml += '    <Variables />\n';
  }

  // Dataset 처리 (배열 또는 단일 객체 모두 처리)
  const datasets = Array.isArray(jsonData.Root.Dataset)
    ? jsonData.Root.Dataset
    : jsonData.Root.Dataset
      ? [jsonData.Root.Dataset]
      : [];

  datasets.forEach((dataset: any) => {
    const datasetId = dataset.id || dataset['@_id'] || '';
    xml += `    <Dataset id="${escapeXml(datasetId)}">\n`;

    // ColumnInfo 처리
    if (dataset.ColumnInfo && dataset.ColumnInfo.Column) {
      xml += '        <ColumnInfo>\n';
      const columns = Array.isArray(dataset.ColumnInfo.Column)
        ? dataset.ColumnInfo.Column
        : [dataset.ColumnInfo.Column];

      columns.forEach((column: any) => {
        const colId = column.id || column['@_id'] || '';
        const colType = column.type || '';
        const colSize = column.size || '';
        xml += `            <Column id="${escapeXml(colId)}" type="${escapeXml(colType)}" size="${escapeXml(colSize)}"/>\n`;
      });
      xml += '        </ColumnInfo>\n';
    }

    // Rows 처리
    if (dataset.Rows && dataset.Rows.Row) {
      xml += '        <Rows>\n';
      const rows = Array.isArray(dataset.Rows.Row) ? dataset.Rows.Row : [dataset.Rows.Row];

      rows.forEach((row: any) => {
        xml += '            <Row>\n';

        // Col 처리
        if (row.Col) {
          const cols = Array.isArray(row.Col) ? row.Col : [row.Col];
          cols.forEach((col: any) => {
            const colId = col.id || col['@_id'] || '';
            const colValue = col.value || col['#text'] || col.text || '';
            xml += `                <Col id="${escapeXml(colId)}">${escapeXml(colValue)}</Col>\n`;
          });
        } else {
          // Col이 없고 직접 키-값 쌍인 경우
          Object.keys(row).forEach((key) => {
            if (key !== 'Col') {
              xml += `                <Col id="${escapeXml(key)}">${escapeXml(row[key])}</Col>\n`;
            }
          });
        }

        xml += '            </Row>\n';
      });
      xml += '        </Rows>\n';
    }

    xml += '    </Dataset>\n';
  });

  xml += '</Root>';
  return xml;
};

// XML 특수 문자 이스케이프 처리
const escapeXml = (str: any): string => {
  if (str === null || str === undefined) {
    return '';
  }
  const text = String(str);
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * XML을 JSON으로 변환
 */
const convertXmlToJson = (xmlData: string): Record<string, any[]> => {
  const result: Record<string, any[]> = {};

  const parsedXml = new XMLParser({
    ignoreAttributes: false,
  }).parse(xmlData);

  // Dataset이 배열인 경우와 단일 객체인 경우 모두 처리
  const datasets = Array.isArray(parsedXml.Root?.Dataset)
    ? parsedXml.Root.Dataset
    : parsedXml.Root?.Dataset
      ? [parsedXml.Root.Dataset]
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
