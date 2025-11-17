import { useState, useEffect, useRef, useCallback } from "react";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  enabled?: boolean;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  enabled = true,
}: UsePullToRefreshOptions) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const scrollTop = useRef(0);
  const isDragging = useRef(false);
  const onRefreshRef = useRef(onRefresh);

  // onRefresh가 변경될 때마다 ref 업데이트
  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setPullDistance(threshold);
    try {
      await onRefreshRef.current();
    } catch (error) {
      console.error("Pull to refresh error:", error);
    } finally {
      setIsRefreshing(false);
      setIsPulling(false);
      setPullDistance(0);
    }
  }, [threshold]);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      scrollTop.current = window.scrollY || document.documentElement.scrollTop;
      touchStartY.current = e.touches[0].clientY;
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!enabled || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY.current;

      // 스크롤이 맨 위에 있고 아래로 당기는 경우만 처리
      if (scrollTop.current <= 0 && deltaY > 0) {
        isDragging.current = true;
        e.preventDefault();
        setIsPulling(true);
        const distance = Math.min(deltaY * 0.5, threshold * 1.5); // 저항감 효과
        setPullDistance(distance);
      } else if (scrollTop.current > 0 || deltaY <= 0) {
        if (isDragging.current) {
          setIsPulling(false);
          setPullDistance(0);
          isDragging.current = false;
        }
      }
    };

    const handleTouchEnd = () => {
      if (!enabled || isRefreshing) return;

      if (pullDistance >= threshold && isPulling) {
        handleRefresh();
      } else {
        setIsPulling(false);
        setPullDistance(0);
      }
      isDragging.current = false;
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    enabled,
    isRefreshing,
    threshold,
    isPulling,
    pullDistance,
    handleRefresh,
  ]);

  return {
    isPulling,
    pullDistance,
    isRefreshing,
  };
};
