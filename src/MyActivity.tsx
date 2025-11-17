import type { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "./stackflow.ts";

const MyActivity: ActivityComponentType = () => {
  const { push, replace } = useFlow();

  const onClick = () => {
    push("Article", { title: "Article 1" });
  };

  const onClick2 = () => {
    replace("Article", { title: "Article 2" });
  };

  return (
    <AppScreen appBar={{ title: "My Activity" }}>
      <div className="flex flex-col gap-2">
        <button onClick={onClick}>Go to Article</button>

        <button onClick={onClick2}>Go to Replace</button>
      </div>
    </AppScreen>
  );
};

export default MyActivity;
