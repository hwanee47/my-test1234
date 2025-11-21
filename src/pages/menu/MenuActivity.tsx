import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useFlow } from '@/stackManager';
import { Avatar, Card } from '@/components';
import { useUserInfo } from '@/store';

const MenuActivity: ActivityComponentType = () => {
  const { replace } = useFlow();
  const { userInfo } = useUserInfo();

  const renderRight = () => {
    return (
      <div className='flex items-center gap-4'>
        <HomeOutlinedIcon fontSize='small' onClick={() => replace('HomeActivity', { title: 'Home' })} />
      </div>
    );
  };

  return (
    <AppScreen appBar={{ title: 'MENU', renderRight: renderRight }}>
      <div className='flex h-full w-full flex-col gap-2 bg-[#F8F9FAFF] px-0 pt-1'>
        <Card className='rounded-none py-3'>
          <div className='flex items-center gap-2'>
            {/* Avatar */}
            <div className='h-[50px] w-[50px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                version='1.1'
                viewBox='0 0 256 256'
                xmlSpace='preserve'
                className='h-full w-full'
              >
                <g
                  style={{
                    stroke: 'none',
                    strokeWidth: 0,
                    strokeDasharray: 'none',
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeMiterlimit: 10,
                    fill: '#9095A1FF',
                    fillRule: 'nonzero',
                    opacity: 1,
                  }}
                  transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'
                >
                  <path
                    d='M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z'
                    style={{
                      stroke: 'none',
                      strokeWidth: 1,
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fill: '#9095A1FF',
                      fillRule: 'nonzero',
                      opacity: 1,
                    }}
                    transform=' matrix(1 0 0 1 0 0) '
                    strokeLinecap='round'
                  />
                </g>
              </svg>
            </div>

            {/* User Info */}
            <div className='flex flex-col gap-1'>
              <div className='text-sm font-medium'>
                {userInfo.EMPNM}({userInfo.LOGNICK})
              </div>
              <div className='text-sm text-[#9095A1FF]'>
                로그인 아이디 : {userInfo.USERID} v{__APP_VERSION__}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppScreen>
  );
};

export default MenuActivity;
