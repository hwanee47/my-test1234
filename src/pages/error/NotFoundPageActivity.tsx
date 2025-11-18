import { AppScreen } from '@stackflow/plugin-basic-ui';
import type { ActivityComponentType } from '@stackflow/react';

const NotFoundPageActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div>
        <h1>페이지를 찾을 수 없습니다.</h1>
      </div>
    </AppScreen>
  );
};

export default NotFoundPageActivity;
