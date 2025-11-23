import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useFlow } from '@/stackManager';
import { Avatar, Card } from '@/components';
import { useUserInfo } from '@/store';
import { menuList } from './menu';

const MenuActivity: ActivityComponentType = () => {
  const { replace, push } = useFlow();
  const { userInfo } = useUserInfo();

  const renderRight = () => {
    return (
      <div className='flex items-center gap-4'>
        <HomeOutlinedIcon fontSize='small' onClick={() => replace('HomeActivity', { title: 'Home' })} />
      </div>
    );
  };

  /**
   * 메뉴 클릭 이벤트
   * @param activity 이동할 액티비티
   */
  const handleMenuClick = (activity: string) => {
    push(activity as any, {});
  };

  return (
    <AppScreen appBar={{ title: 'MY', renderRight: renderRight }} backgroundColor='#F8F9FA'>
      <div className='flex h-full flex-col pb-3'>
        <div className='bg-white'>
          <img src='/my.jpg' alt='photo' />
          <div className='relative'>
            <AccountCircleIcon style={{ fontSize: 100, color: '#9095A1', position: 'absolute', top: -50, left: 10 }} />
            <div className='flex flex-col px-3 py-3.5'>
              <div className='ml-auto font-bold text-[#171A1F]'>3LS 컴퍼니</div>
              <div className='mt-4 flex flex-col gap-1 pl-2'>
                <span className='font-bold text-[#171A1F]'>닉네임 (홍길동)</span>
                <div className='flex items-center justify-between text-sm text-[#6F7787]'>
                  <div className='flex items-center gap-1.5'>
                    <VpnKeyOutlinedIcon style={{ fontSize: 14 }} />
                    <span>로그인 아이디 : likebird</span>
                  </div>
                  <div
                    className='flex cursor-pointer items-center gap-1.5'
                    onClick={() => {
                      replace('LoginActivity', {});
                    }}
                  >
                    <LogoutOutlinedIcon style={{ fontSize: 14 }} />
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-full flex-col gap-2 px-3 pt-3'>
          <div className='flex-1'>
            <Card className='h-full rounded-none'>
              <div className='flex flex-col gap-4'>
                {/* 메뉴 리스트 */}
                {menuList.map((item, index) => (
                  <div className='flex flex-col gap-3' key={index}>
                    <div className='flex items-center gap-2 text-sm'>
                      <span>{item.title}</span>
                      <div className='h-px flex-1 bg-[#DEE1E6]' />
                    </div>
                    <div className='flex flex-col gap-3 px-3 text-sm text-[#565D6D]'>
                      {item.items.map((item, index) => (
                        <div
                          className='flex items-center justify-between'
                          onClick={() => handleMenuClick(item.activity ?? '')}
                          key={index}
                        >
                          <span>{item.title}</span>
                          <ArrowForwardIosOutlinedIcon style={{ fontSize: 14 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className=''>
            <Card className='flex items-center justify-center rounded-none py-2.5'>
              <span className='text-xs text-[#9095A1]'>앱 버전 v1.0.0</span>
            </Card>
          </div>
        </div>
      </div>
    </AppScreen>
  );
};

export default MenuActivity;
