import { Button, Input } from '@/components';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/stackManager';
import ApiClient from '@/libs/client/apiClient';
import { XMLParser } from 'fast-xml-parser';

const LoginActivity: ActivityComponentType = () => {
  const { replace, push } = useFlow();

  return (
    <AppScreen backgroundColor='#2F6A8DFF'>
      <div className='flex h-screen flex-col'>
        <div className='flex h-full flex-col items-center justify-center gap-2'>
          <img src='/logo.png' />
          <span className='text-3xl font-bold text-white'>MBRID</span>
        </div>
        <div className='rounded-t-2xl bg-white'>
          <div className='mx-auto mt-3 h-1 w-[40px] bg-[#DEE1E6FF]'></div>
          <div className='mt-10 px-6 pb-9'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <span className=''>회사명</span>
                <Input name='companyName' placeholder='' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className=''>아이디</span>
                <Input name='companyName' placeholder='' />
              </div>
              <div className='flex flex-col gap-2'>
                <span className=''>비밀번호</span>
                <Input name='companyName' placeholder='' />
              </div>
            </div>
            <div className='mt-10'>
              <Button
                className='w-full rounded-2xl bg-[#2F6A8DFF] py-3 text-white'
                onClick={() => push('HomeActivity', { title: 'Home' }, { animate: false })}
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppScreen>
  );
};

export default LoginActivity;
