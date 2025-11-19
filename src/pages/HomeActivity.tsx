import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@/components';
import { useFlow } from '@/stackManager';

const HomeActivity: ActivityComponentType = () => {
  const { push, pop } = useFlow();
  return (
    <AppScreen appBar={{ title: 'eeeee' }}>
      <div className='flex h-full w-full flex-col p-2'>
        <Button
          className='rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={() => push('TestActivity', { title: 'Test' })}
        >
          Components Guide
        </Button>
      </div>
    </AppScreen>
  );
};

export default HomeActivity;
