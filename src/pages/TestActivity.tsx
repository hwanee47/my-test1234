import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button } from '@/components';

const TestActivity: ActivityComponentType = () => {
  const items = [
    {
      title: 'Section 1',
      content: 'Content for section 1\nContent for section 1\nContent for section 1\nContent for section 1\n',
    },
    { title: 'Section 2 disabled', content: 'Content for section 2', isDisabled: true },
    { title: 'Section 3', content: 'Content for section 3' },
    { title: 'Section 4', content: 'Content for section 4' },
    { title: 'Section 5 HTML', content: <span className='text-red-500'>Content for section 5</span> },
  ];

  return (
    <AppScreen appBar={{ title: 'TestActivity' }}>
      <div className='flex h-full w-full flex-col p-2'>
        <h2 className='text-lg font-medium text-gray-700'>Components</h2>
        <div className='mt-2 grid gap-4 sm:grid-cols-2'>
          <Button
            className='rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700'
            onClick={() => console.log('Accordion')}
          >
            Accordion
          </Button>
          <Button
            className='rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700'
            onClick={() => console.log('Accordion')}
          >
            Accordion
          </Button>
          {/* <Accordion items={items} />
          <Accordion items={items} />
          <Accordion items={items} /> */}
        </div>
      </div>
    </AppScreen>
  );
};

export default TestActivity;
