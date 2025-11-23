import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, ImageCarousel } from '@/components';
import { useFlow } from '@/stackManager';
import { useUserInfo } from '@/store';
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NodeCarousel } from '@/components';

const HomeActivity: ActivityComponentType = () => {
  const { replace } = useFlow();
  const { userInfo } = useUserInfo();

  const images = [
    {
      src: '/photo.png',
      alt: '이미지 1',
    },
    {
      src: '/photo.png',
      alt: '이미지 2',
    },
    {
      src: '/photo.png',
      alt: '이미지 3',
    },
  ];

  const renderRight = () => {
    return (
      <div className='flex items-center gap-4'>
        <NotificationsNoneIcon fontSize='small' />
        <MenuIcon fontSize='small' onClick={() => replace('MenuActivity', {})} />
      </div>
    );
  };

  return (
    <AppScreen appBar={{ title: 'MBRID', renderRight: renderRight }}>
      <div className='flex h-full w-full flex-col'>
        <div className='p-2'>
          <ImageCarousel
            containerClassName='[&_.image-container]:h-[136px]'
            images={images}
            navigation={false}
            paginationPosition='outside'
            paginationContainerClassName='absolute bottom-2 right-2 z-10'
            activeBulletClassName='w-5 h-1.5 mx-0.5 bg-[#F4AF25]'
            bulletClassName='w-1.5 h-1.5 mx-0.5 bg-[#DEE1E6FF]'
          />
        </div>

        <div className='h-[300px] bg-[#F8F9FA] px-3 py-4'>
          <div>
            <h1 className='text-lg font-bold'>Statistics</h1>
          </div>
        </div>

        <div className='px-3 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg font-bold'>Notice</h1>
            <a href='#' className='text-sm text-[#9095A1]'>
              더보기
            </a>
          </div>
          <div className='mt-3 flex flex-col gap-3 px-0.5'>
            <div className='flex flex-col gap-1 border-b border-[#DEE1E6] pb-3'>
              <span className='truncate text-sm text-[#171A1F]'>모바일 시스템 오픈 안내</span>
              <span className='text-xs text-[#BDC1CA]'>2025.11.21</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-[#DEE1E6] pb-3'>
              <span className='truncate text-sm text-[#171A1F]'>
                전산시스템 정기점검에 따른 MBRID 모바일 서비스 일시중지 안내를
              </span>
              <span className='text-xs text-[#BDC1CA]'>2025.11.21</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-[#DEE1E6] pb-3'>
              <span className='truncate text-sm text-[#171A1F]'>
                전산시스템 정기점검에 따른 MBRID 모바일 서비스 일시중지 안내를
              </span>
              <span className='text-xs text-[#BDC1CA]'>2025.11.21</span>
            </div>
          </div>
        </div>
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
