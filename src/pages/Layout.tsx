import React, { ReactNode } from 'react';
import { AppScreen, AppScreenProps } from '@stackflow/plugin-basic-ui';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useFlow } from '@/stackManager';
import { PullToRefresh } from '@/components';
import { useInView } from 'react-intersection-observer';

interface LayoutProps extends AppScreenProps {
  onBack?: () => void; // 뒤로가기시 콜백 함수
  onRefresh?: () => Promise<void> | void; // 새로고침 이벤트
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, onRefresh, ...restProps }) => {
  const { pop } = useFlow();
  const { ref: topRef, inView: isAtTopState } = useInView();

  const mergedAppBar = {
    ...restProps.appBar,
    title: <span className='text-base font-semibold'>{restProps.appBar?.title}</span>,
    backButton: {
      ...(restProps.appBar?.backButton || {}),
      ariaLabel: '뒤로가기',
      renderIcon: () => <KeyboardBackspaceIcon sx={{ fontSize: 22 }} />,
      onClick: () => {
        pop();
        if (onBack) onBack();
      },
    },
  };

  return (
    <AppScreen {...restProps} appBar={mergedAppBar}>
      {/* {children} */}
      {onRefresh ? (
        <PullToRefresh
          maxDistance={100}
          isAtTopState={isAtTopState}
          onRefresh={() => {
            return onRefresh?.();
          }}
          controlled={true}
        >
          {children}
        </PullToRefresh>
      ) : (
        children
      )}
    </AppScreen>
  );
};

export default Layout;
