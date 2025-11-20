import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import LoginActivity from '@/pages/login/LoginActivity';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { HomeActivity, NotFoundPageActivity, TestActivity } from '@/pages';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    LoginActivity,
    HomeActivity,
    NotFoundPageActivity,
    TestActivity,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    // 브라우져 history 동기화
    historySyncPlugin({
      routes: {
        LoginActivity: '/',
        HomeActivity: '/home',
        NotFoundPageActivity: '/404',
        TestActivity: '/test',
      },
      fallbackActivity: () => 'NotFoundPageActivity',
      useHash: false,
    }),
  ],
});
