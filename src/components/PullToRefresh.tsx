/*************************************************************
 * 풀투리프레시 컴포넌트
 * - created by hwanee-k
 *************************************************************/
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Spinner } from '.';

interface PullToRefreshProps {
  children: ReactNode; // 컨텐츠
  maxDistance: number; // 최대 당기는 거리
  isAtTopState?: boolean; // 최상단 상태 (최상단인지 판단여부를 위해 사용됨)
  controlled?: boolean; // 제어 모드 (제어 모드가 아니면 500ms 후 자동 닫기)
  onRefresh: () => Promise<void> | void; // 새로고침 이벤트
}

const PullToRefresh = ({ children, maxDistance, isAtTopState, controlled = false, onRefresh }: PullToRefreshProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalIsRefreshing, setInternalIsRefreshing] = useState(false);
  const isRefreshing = internalIsRefreshing;
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);
  const [initialScrollY, setInitialScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [wasScrollingUp, setWasScrollingUp] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const pullDistanceRef = useRef(0); // 성능 최적화용 ref
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const scrollListener = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 방향 감지
      if (currentScrollY < lastScrollY) {
        setWasScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        setWasScrollingUp(false);
      }

      lastScrollY = currentScrollY;

      if (pulled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [pulled]);

  /**
   * 초기화
   */
  const resetToInitial = () => {
    setPulled(false);
    setInternalIsRefreshing(false);
    setHasScrolled(false);
    setInitialScrollY(0); // initialScrollY도 리셋
    setWasScrollingUp(false); // 스크롤 방향도 리셋
    setPullDistance(0); // pull distance도 리셋

    // animationFrame 정리
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const onStart = (y: number, x: number, touch: boolean) => {
    const currentScrollY = window.scrollY;
    setStartY(y);
    setStartX(x);
    setIsTouch(touch);
    setPulled(true);
  };

  const onMove = (y: number, x: number) => {
    // 터치 시작 시점의 스크롤 위치가 최상단이 아니면 중단

    // 터치 시작 시점이 정확히 0이 아니면 절대 허용하지 않음
    if (initialScrollY !== 0) {
      // 터치 시작 시점이 최상단이 아니면 중단
      resetToInitial();
      return;
    }

    // 현재 위치도 isAtTop으로 체크
    if (!isAtTop()) {
      // 현재 위치가 최상단이 아니면 중단
      resetToInitial();
      return;
    }

    // 스크롤이 발생했으면 pull to refresh 중단
    if (hasScrolled || window.scrollY !== initialScrollY) {
      resetToInitial();
      return;
    }

    // 이미 방향 체크가 완료된 상태이므로 바로 pull to refresh 동작
    if (pulled) {
      const moveY = y;
      const pulledDistance = Math.min(Math.pow(moveY - startY, 0.875), maxDistance);

      if (pulledDistance > 0) {
        // requestAnimationFrame을 사용해서 부드럽게 업데이트
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setPullDistance(pulledDistance);
        });
        pullDistanceRef.current = pulledDistance;
        if (pulledDistance >= maxDistance) {
          setInternalIsRefreshing(true);
        } else {
          setInternalIsRefreshing(false);
        }
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setPullDistance(0);
        });
        pullDistanceRef.current = 0;
        setInternalIsRefreshing(false);
      }
    }
  };

  const onEnd = async () => {
    if (pulled) {
      if (isRefreshing) {
        try {
          await onRefresh();

          // controlled 모드가 아니면 기본 동작 (500ms 후 자동 닫기)
          if (!controlled) {
            await new Promise((resolve) => {
              setTimeout(resolve, 500);
            });
          }

          resetToInitial();
        } catch (error) {
          console.error('Error while refreshing:', error);
          resetToInitial();
        }
      } else {
        resetToInitial();
      }
    }
  };

  /**
   * 최상단 체크
   * @returns 최상단 여부
   */
  const isAtTop = () => {
    // Intersection Observer 상태와 기본 스크롤 체크를 조합
    const scrollY = window.scrollY;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // Observer가 최상단을 감지하고, 스크롤도 0이고, 위로 스크롤하는 중이 아닐 때
    return isAtTopState && scrollY <= 0 && scrollTop <= 0 && !wasScrollingUp;
  };

  /**
   * 터치 시작 이벤트
   * @param e 터치 이벤트
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    // 최상단에서만 refresh 시작
    const currentScrollY = window.scrollY;
    const atTop = isAtTop();

    // 터치 시작 시점의 스크롤 위치를 정확히 저장
    setInitialScrollY(currentScrollY);

    // isAtTop 함수를 활용해서 더 정확한 체크
    if (atTop) {
      onStart(e.touches[0].clientY, e.touches[0].clientX, true);
      // preventDefault 하지 않음 - 스크롤이 정상 작동하도록
    }
  };

  /**
   * 터치 이동 이벤트
   * @param e 터치 이벤트
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    // 터치 시작 시점의 스크롤 위치가 최상단이 아니면 중단
    // console.log('handleTouchMove - 체크:', { initialScrollY, currentScrollY: window.scrollY, pulled });

    // 터치 시작 시점이 정확히 0이 아니면 절대 허용하지 않음
    if (initialScrollY !== 0) {
      // 터치 시작 시점이 최상단이 아니면 중단
      return;
    }

    // 현재 위치도 isAtTop으로 체크
    if (!isAtTop()) {
      // 현재 위치가 최상단이 아니면 중단
      return;
    }

    if (isTouch && pulled) {
      // 터치 방향을 먼저 체크
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      const isMovingDown = e.touches[0].clientY > startY;

      // 좌우 스와이프가 상하 이동보다 크면 pull to refresh 중단
      if (deltaX > deltaY * 1.2 && deltaX > 15) {
        resetToInitial();
        return;
      }

      // 아래로 당기는 동작이고 상하 이동이 더 크면 pull to refresh 동작
      if (isMovingDown && deltaY > deltaX && deltaY > 10) {
        onMove(e.touches[0].clientY, e.touches[0].clientX);
        e.preventDefault();
      } else if (!isMovingDown) {
        // 위로 올리는 동작이면 즉시 중단
        resetToInitial();
      }
    }
  };

  /**
   * 터치 종료 이벤트
   */
  const handleEnd = () => {
    if (isTouch && pulled) {
      onEnd();
    }
  };

  return (
    <div ref={containerRef} className='relative'>
      {/* Pull to refresh 영역 - 고정된 위치에 오버레이 */}
      {(pulled && pullDistance > 0 && pullDistance < maxDistance) || (controlled && isRefreshing) ? (
        <div
          className='fixed top-0 right-0 left-0 z-[9999] mx-auto w-full max-w-xl'
          style={{
            height: controlled && isRefreshing ? `${maxDistance}px` : `${pullDistance}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            willChange: 'height', // 성능 최적화
            transform: 'translateZ(0)', // 하드웨어 가속
            backgroundColor: 'transparent', // 배경 투명
          }}
        >
          <div className='flex items-center gap-2'>
            <Spinner className='h-7 w-7 text-white' />
          </div>
        </div>
      ) : null}

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
