import type { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "./stackflow.ts";

const MyActivity: ActivityComponentType = () => {
  const { push } = useFlow();

  const onClick = () => {
    push("Article", { title: "Article 1" });
  };

  return (
    <AppScreen appBar={{ title: "My Activity" }}>
      <div>
        <button onClick={onClick}>Go to Article</button>
      </div>
    </AppScreen>
  );
};

export default MyActivity;
