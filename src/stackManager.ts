import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import LoginActivity from '@/pages/LoginActivity';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import HomeActivity from '@/pages/HomeActivity';
import NotFoundPageActivity from '@/pages/error/NotFoundPageActivity';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    LoginActivity,
    HomeActivity,
    NotFoundPageActivity,
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
      },
      fallbackActivity: () => 'NotFoundPageActivity',
      useHash: false,
    }),
  ],
});
