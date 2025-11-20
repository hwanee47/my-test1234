import ApiClient from '@/libs/client/apiClient';
import XmlUtils from '@/libs/client/xmlUtils';

// 로그인
export const login = async (lognick: string, userId: string, password: string) => {
  // 요청 파라미터 생성
  const payload = XmlUtils.createXml({
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

  try {
    const res = await new ApiClient().post('/api/login.MindBridge', payload);
    return res;
  } catch (error) {
    console.error(error);
    return {
      Parameters: {
        commonv_CODE: 'SY000E',
        commonv_MESSAGE: '로그인 실패',
      },
    };
  }
};
