import { Button } from '@/components';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/stackManager';

const LoginActivity: ActivityComponentType = () => {
  const { replace } = useFlow();
  return (
    <AppScreen>
      <div className='flex h-full items-center justify-center'>
        <Button
          className='rounded-full bg-blue-500 px-4 py-2 text-white'
          onClick={() => replace('HomeActivity', { title: 'Home' }, { animate: false })}
        >
          Login
        </Button>
      </div>
    </AppScreen>
  );
};

export default LoginActivity;
