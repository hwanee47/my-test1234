import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import LoginActivity from '@/pages/login/LoginActivity';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { HomeActivity, NotFoundPageActivity, TestActivity, MenuActivity, InboundStatusActivity } from '@/pages';
import history from '@/libs/plugins/history';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    LoginActivity,
    HomeActivity,
    NotFoundPageActivity,
    TestActivity,
    MenuActivity,
    InboundStatusActivity,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    // 브라우져 history 동기화
    historySyncPlugin({
      // history,
      routes: {
        LoginActivity: '/',
        HomeActivity: '/home',
        NotFoundPageActivity: '/404',
        TestActivity: '/test',
        MenuActivity: '/menu',
        InboundStatusActivity: '/inbound/status',
      },
      fallbackActivity: () => 'NotFoundPageActivity',
      useHash: false,
    }),
  ],
});
