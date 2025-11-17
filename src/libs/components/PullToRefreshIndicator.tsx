import React from "react";

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  threshold: number;
  isRefreshing: boolean;
}

export const PullToRefreshIndicator: React.FC<PullToRefreshIndicatorProps> = ({
  pullDistance,
  threshold,
  isRefreshing,
}) => {
  const progress = Math.min((pullDistance / threshold) * 100, 100);
  const rotation = progress * 3.6; // 360도 회전

  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10px",
        transition: isRefreshing ? "none" : "transform 0.2s ease-out",
        transform: `translateX(-50%) translateY(${Math.max(
          0,
          pullDistance - 40
        )}px)`,
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "3px solid #e0e0e0",
          borderTopColor: isRefreshing ? "#007AFF" : "#007AFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          animation: isRefreshing ? "spin 1s linear infinite" : "none",
          transform: isRefreshing ? "none" : `rotate(${rotation}deg)`,
        }}
      >
        {!isRefreshing && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#007AFF"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7-7 7 7" />
          </svg>
        )}
      </div>
      {isRefreshing && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#666",
            fontWeight: 500,
          }}
        >
          새로고침 중...
        </div>
      )}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
