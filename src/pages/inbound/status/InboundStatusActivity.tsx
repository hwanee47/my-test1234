import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useFlow } from '@/stackManager';

const InboundStatusActivity: ActivityComponentType = () => {
  const { pop } = useFlow();

  return (
    <AppScreen
      appBar={{
        title: <span style={{ fontSize: '15px', fontWeight: 'bold' }}>입고 현황</span>,
        backButton: {
          ariaLabel: '뒤로가기',
          renderIcon: () => <KeyboardBackspaceIcon sx={{ fontSize: 22 }} />,
          onClick: () => pop(), // 뒤로가기 동작 지정
        },
      }}
    >
      hi
    </AppScreen>
  );
};

export default InboundStatusActivity;
