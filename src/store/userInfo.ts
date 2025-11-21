import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserInfoData = {
  BEF2CNT: number;
  BEF1CNT: number;
  CUSTGBN: string;
  LOGNICK: string;
  USERID: string;
  EMPCD: string;
  EMPNM: string;
  CUSTCD: string;
  CUSTNM: string;
  XDEL: string;
  USEYN: string;
};

interface UserInfo {
  userInfo: UserInfoData;
  setUserInfo: (data: UserInfoData | ((prev: UserInfoData) => UserInfoData)) => void;
  resetUserInfo: () => void;
}

const initData: UserInfoData = {
  BEF2CNT: 0,
  BEF1CNT: 0,
  CUSTGBN: '',
  LOGNICK: '',
  USERID: '',
  EMPCD: '',
  EMPNM: '',
  CUSTCD: '',
  CUSTNM: '',
  XDEL: '',
  USEYN: '',
};

export const useUserInfo = create<UserInfo>()(
  devtools(
    (set) => ({
      userInfo: initData,
      setUserInfo: (data) => set((state) => ({ userInfo: { ...state.userInfo, ...data } })),
      resetUserInfo: () => set({ userInfo: initData }),
    }),
    {
      name: 'userInfo',
      enabled: import.meta.env.DEV,
    },
  ),
);
