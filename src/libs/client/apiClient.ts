/*************************************************************
 * API 클라이언트 (use fetch)
 * - created by hwanee-k
 *************************************************************/
import XmlUtils from './xmlUtils';

export const MBRID_API = {
  BACKEND: 'BACKEND' as const,
};

export const getBaseUrl = (apiName: keyof typeof MBRID_API): string => {
  let API_BASE_URL;

  switch (apiName) {
    case MBRID_API.BACKEND:
      API_BASE_URL = import.meta.env.VITE_PROXY_SERVER;
      break;
  }

  return API_BASE_URL || '';
};

type XplatformResponse = Record<string, any>;

export default class ApiClient {
  private baseUrl: string;

  constructor(API_NAME: (typeof MBRID_API)[keyof typeof MBRID_API] = MBRID_API.BACKEND) {
    this.baseUrl = getBaseUrl(API_NAME);
  }

  async fetch(url: string, options: RequestInit = {}): Promise<XplatformResponse> {
    const headers = {
      ...options.headers,
    };

    const response = await fetch(`${url}`, { ...options, headers });

    if (!response.ok) {
      console.error(`API 요청 실패 :: ${url} ==> `, response);
      throw new Error(`API 요청 실패`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('text/html') || contentType?.includes('text/plain')) {
      return XmlUtils.convertXmlToJson(await response.text());
    } else if (contentType?.includes('image/jpg')) {
      return response;
    }

    const xmlText = await response.text();
    return XmlUtils.convertXmlToJson(xmlText);
  }

  async get(endpoint: string, options: RequestInit = {}) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      ...options,
    });
  }

  async post(endpoint: string, data: any, options: RequestInit = { headers: { 'Content-Type': 'application/xml' } }) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: data,
      ...options,
    });
  }

  async postFormData(endpoint: string, data: FormData, options: RequestInit = {}) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: data,
      ...options,
    });
  }

  async put(endpoint: string, data: any, options: RequestInit = { headers: { 'Content-Type': 'application/xml' } }) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      body: data,
      ...options,
    });
  }

  async delete(endpoint: string, options: RequestInit = {}) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      ...options,
    });
  }
}
