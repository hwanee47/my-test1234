import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import MyActivity from "./MyActivity.tsx";
import Article from "./Article.tsx";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      routes: {
        /**
         * You can link the registered activity with the URL template.
         */
        MyActivity: "/",
        Article: "/articles",
        NotFoundPage: "/404",
      },
      /**
       * If a URL that does not correspond to the URL template is given, it moves to the `fallbackActivity`.
       */
      fallbackActivity: ({ context }) => "NotFoundPage",
      /**
       * Uses the hash portion of the URL (i.e. window.location.hash)
       */
      useHash: false,
    }),
  ],
  activities: {
    MyActivity,
    Article,
  },
  initialActivity: () => "MyActivity",
});
