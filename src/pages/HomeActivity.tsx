import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@/components';
import { useFlow } from '@/stackManager';
import { useUserInfo } from '@/store';
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const HomeActivity: ActivityComponentType = () => {
  const { replace } = useFlow();
  const { userInfo } = useUserInfo();

  const renderRight = () => {
    return (
      <div className='flex items-center gap-4'>
        <NotificationsNoneIcon fontSize='small' />
        <MenuIcon fontSize='small' onClick={() => replace('MenuActivity', { title: 'Menu' })} />
      </div>
    );
  };

  return (
    <AppScreen appBar={{ title: 'HOME', renderRight: renderRight }}>
      <div className='flex h-full w-full flex-col p-2'>
        <Button
          className='rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={() => {
            // push('TestActivity', { title: 'Test' });
            console.log('userInfo', userInfo);
          }}
        >
          Components Guide
        </Button>
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
