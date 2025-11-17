import type { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "./stackflow";
import { useState } from "react";

type ArticleParams = {
  title: string;
};

type RouteData = {
  code: string;
  routes: Array<{
    distance: number;
    duration: number;
    legs: Array<{
      distance: number;
      duration: number;
    }>;
  }>;
  waypoints: Array<{
    location: [number, number];
    distance: number;
  }>;
};

const Article: ActivityComponentType<ArticleParams> = ({
  params = { title: "" },
}) => {
  const { pop } = useFlow();
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goBack = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://route.1call-logis.co.kr/route/v1/driving/127.32322,37.351541;127.2631981,37.3561632?overview=false"
      );
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      const data: RouteData = await response.json();
      setRouteData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  const goBackMultiple = () => {
    // 액티비티 여러 개 제거
    pop(3);
  };

  return (
    <AppScreen appBar={{ title: "Article" }}>
      <div style={{ padding: "20px" }}>
        <h1>{params.title}</h1>
        <button onClick={goBack} disabled={loading}>
          {loading ? "로딩 중..." : "Back up date!!"}
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={goBackMultiple}
        >
          Back 3 Steps
        </button>

        {error && (
          <div style={{ marginTop: "20px", color: "red" }}>
            <strong>오류:</strong> {error}
          </div>
        )}

        {routeData && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h2>경로 정보</h2>
            <p>
              <strong>상태:</strong> {routeData.code}
            </p>

            {routeData.routes.map((route, index) => (
              <div
                key={index}
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                }}
              >
                <h3>경로 {index + 1}</h3>
                <p>
                  <strong>총 거리:</strong> {route.distance.toLocaleString()}m (
                  {(route.distance / 1000).toFixed(2)}km)
                </p>
                <p>
                  <strong>총 소요 시간:</strong> {Math.round(route.duration)}초
                  ({Math.round(route.duration / 60)}분)
                </p>

                {route.legs.map((leg, legIndex) => (
                  <div
                    key={legIndex}
                    style={{ marginTop: "10px", paddingLeft: "15px" }}
                  >
                    <p>
                      <strong>구간 {legIndex + 1}:</strong>
                    </p>
                    <p>거리: {leg.distance.toLocaleString()}m</p>
                    <p>시간: {Math.round(leg.duration)}초</p>
                  </div>
                ))}
              </div>
            ))}

            {routeData.waypoints && routeData.waypoints.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                <h3>경유지</h3>
                {routeData.waypoints.map((waypoint, index) => (
                  <div
                    key={index}
                    style={{
                      marginTop: "10px",
                      padding: "8px",
                      backgroundColor: "#e8f4f8",
                      borderRadius: "5px",
                    }}
                  >
                    <p>
                      <strong>경유지 {index + 1}:</strong>
                    </p>
                    <p>
                      위치: [{waypoint.location[0]}, {waypoint.location[1]}]
                    </p>
                    <p>거리: {waypoint.distance.toFixed(2)}m</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppScreen>
  );
};

export default Article;
