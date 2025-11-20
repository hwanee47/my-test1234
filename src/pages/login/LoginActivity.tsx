import { Button, Checkbox, Input } from '@/components';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/stackManager';
import { useState } from 'react';
import { login } from './action';
import { useLoading, useToast } from '@/contexts';

const LoginActivity: ActivityComponentType = () => {
  const { replace } = useFlow();
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSaveId, setIsSaveId] = useState(false);
  const [lognick, setLognick] = useState('3ls');
  const [id, setId] = useState('likebird');
  const [password, setPassword] = useState('1111');

  // 로그인 처리
  const handleLogin = async () => {
    setIsLoading(true);
    const res = await login(lognick, id, password);
    setIsLoading(false);
    console.log('res111', res);
    if (res.Parameters.commonv_CODE === 'SY000M') {
      replace('HomeActivity', { title: 'Home' });
    } else {
      showToast('error', res.Parameters.commonv_MESSAGE);
    }
  };

  return (
    <AppScreen backgroundColor='#2F6A8DFF'>
      <div className='flex h-screen flex-col'>
        <div className='flex h-full flex-col items-center justify-center gap-2'>
          <img src='/logo.png' />
          <span className='text-3xl font-bold text-white'>MBRID</span>
        </div>
        <div className='rounded-t-2xl bg-white'>
          <div className='mx-auto mt-3 h-1 w-[40px] bg-[#DEE1E6FF]'></div>
          <div className='mt-6 px-6 pb-9'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-bold text-gray-700'>회사명</h2>
                <Input name='lognick' placeholder='' onChange={(e) => setLognick(e.target.value)} value={lognick} />
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-bold text-gray-700'>아이디</h2>
                <Input name='id' placeholder='' onChange={(e) => setId(e.target.value)} value={id} />
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-bold text-gray-700'>비밀번호</h2>
                <Input
                  name='password'
                  type={isShowPassword ? 'text' : 'password'}
                  inputMode='numeric'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  rightElement={
                    <Button
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className='bg-transparent text-[#9095A7] hover:text-[#06F]'
                    >
                      {isShowPassword ? (
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z'
                            fill='currentColor'
                          />
                        </svg>
                      ) : (
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.27 7.61 17 4.5 12 4.5C10.73 4.5 9.51 4.75 8.36 5.2L10.83 7.67C11.34 7.23 11.91 7 12 7ZM2 4.27L3.28 5.55L3.74 6.01C2.08 7.3 0.78 9 0 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z'
                            fill='currentColor'
                          />
                        </svg>
                      )}
                    </Button>
                  }
                  rightElementClassName='right-3'
                />
              </div>
              <div>
                <Checkbox
                  id='chkSaveId'
                  checked={isSaveId}
                  label='아이디 저장'
                  labelClassName='text-sm'
                  checkboxClassName='checked:bg-[#2F6A8DFF]'
                  onChange={(checked) => setIsSaveId(checked)}
                />
              </div>
            </div>
            <div className='mt-4'>
              <Button className='w-full rounded-md bg-[#2F6A8DFF] py-3 text-white' onClick={handleLogin}>
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
