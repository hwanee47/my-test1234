import type { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "./stackflow";

type ArticleParams = {
  title: string;
};

const Article: ActivityComponentType<ArticleParams> = ({
  params = { title: "" },
}) => {
  const { pop } = useFlow();

  const goBack = () => {
    // 액티비티 하나만 제거
    pop();
  };

  const goBackMultiple = () => {
    // 액티비티 여러 개 제거
    pop(3);
  };

  return (
    <AppScreen appBar={{ title: "Article" }}>
      <div>
        <h1>{params.title}</h1>
        <button onClick={goBack}>Back</button>
        <button onClick={goBackMultiple}>Back 3 Steps</button>
      </div>
    </AppScreen>
  );
};

export default Article;
