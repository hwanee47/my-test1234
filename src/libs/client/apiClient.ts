/*************************************************************
 * API 클라이언트 (use fetch)
 * - created by hwanee-k
 *************************************************************/

export const MBRID_API = {
  BACKEND: "BACKEND" as const,
};

export const getBaseUrl = (apiName: keyof typeof MBRID_API): string => {
  let API_BASE_URL;

  switch (apiName) {
    case MBRID_API.BACKEND:
      API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      break;
  }

  return API_BASE_URL || "";
};

export default class ApiClient {
  private baseUrl: string;

  constructor(
    API_NAME: (typeof MBRID_API)[keyof typeof MBRID_API] = MBRID_API.BACKEND
  ) {
    this.baseUrl = getBaseUrl(API_NAME);
  }

  async fetch(url: string, options: RequestInit = {}) {
    // 헤더 설정
    const headers = {
      ...options.headers,
    };
    const response = await fetch(`${url}`, { ...options, headers });

    if (!response.ok) {
      console.error(`API 요청 실패 :: ${url} ==> `, response);
      throw new Error(`API 요청 실패`);
    }

    const contentType = response.headers.get("content-type");
    // HTML 내용을 텍스트로 읽기
    if (contentType && contentType.includes("text/html")) {
      const htmlContent = await response.text();

      return htmlContent;
    }
    // 이미지
    else if (contentType && contentType.includes("image/jpg")) {
      return response;
    }
    // 평문
    else if (contentType && contentType.includes("text/plain")) {
      return await response.text();
    }

    return response.json();
  }

  async get(endpoint: string, options: RequestInit = {}) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      ...options,
    });
  }

  async post(
    endpoint: string,
    data: any,
    options: RequestInit = { headers: { "Content-Type": "application/json" } }
  ) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  async postFormData(
    endpoint: string,
    data: FormData,
    options: RequestInit = {}
  ) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: data,
      ...options,
    });
  }

  async put(
    endpoint: string,
    data: any,
    options: RequestInit = { headers: { "Content-Type": "application/json" } }
  ) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint: string, options: RequestInit = {}) {
    return this.fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      ...options,
    });
  }
}
