/*************************************************************
 * Node 캐러셀 컴포넌트
 * - created by hwanee-k
 * - props 참고 : https://swiperjs.com
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReactNode, useEffect, useState } from 'react';
import type { AutoplayOptions } from 'swiper/types';

interface NodeCarouselProps extends Omit<SwiperProps, 'children'> {
  nodes: {
    id?: string; // 노드 key값
    content: ReactNode; // 노드 내용
    onClick?: () => void; // 클릭 핸들러
  }[];
  paginationPosition?: 'inside' | 'outside'; // 페이지네이션 위치
  containerClassName?: string; // 컨테이너 스타일
  paginationContainerClassName?: string; // 페이지네이션 컨테이너 스타일
  bulletClassName?: string; // 불릿 스타일
  activeBulletClassName?: string; // 활성화된 불릿 스타일
  autoplay?: boolean | AutoplayOptions;
}

export default function NodeCarousel({
  nodes = [],
  modules = [Navigation, Pagination, Autoplay],
  spaceBetween = 30,
  slidesPerView = 1,
  navigation = true,
  autoplay = { delay: 3000, disableOnInteraction: false },
  className = '',
  paginationPosition = 'inside',
  containerClassName = '',
  paginationContainerClassName = '',
  bulletClassName = '',
  activeBulletClassName = '',
  ...swiperProps
}: NodeCarouselProps) {
  const [swiper, setSwiper] = useState<any>(null);
  const [paginationElement, setPaginationElement] = useState<HTMLDivElement | null>(null);

  /** 스타일 정의 ***/
  // 기본 불릿 스타일
  const defaultBulletClasses = 'bg-[#1F293716] w-2.5 h-2.5 inline-block rounded-full mx-1';

  // 기본 활성화된 불릿 스타일
  const defaultActiveBulletClasses = 'bg-[#007AFF] w-8 h-2.5 bg-amber-500';

  // 적용할 스타일
  const bulletClasses = twMerge(defaultBulletClasses, bulletClassName);
  const activeBulletClasses = twMerge(defaultActiveBulletClasses, activeBulletClassName);

  // 페이지네이션 설정
  const paginationConfig =
    paginationPosition === 'inside'
      ? {
          clickable: true,
          renderBullet: (index: number, className: string) => {
            const isActive = swiper?.activeIndex === index;
            return `<span class="${className} ${
              isActive ? `${activeBulletClasses}` : `${bulletClasses}`
            }" data-index="${index}"></span>`;
          },
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }
      : {
          clickable: true,
          enabled: false,
        };

  // Pagination position이 outside일때 적용 (커스텀 기능으로 swiper 동작과 동일하게 하기 위함)
  useEffect(() => {
    if (paginationPosition === 'outside' && paginationElement && swiper) {
      const updatePagination = () => {
        if (!paginationElement || !swiper) return;

        paginationElement.innerHTML = '';

        for (let i = 0; i < swiper.slides.length; i++) {
          const bullet = document.createElement('span');
          const isActive = i === swiper.activeIndex;

          bullet.className = twMerge(
            'inline-block mx-1 rounded-full',
            isActive ? `${activeBulletClasses}` : `${bulletClasses}`,
          );

          paginationElement.appendChild(bullet);
        }
      };

      updatePagination();

      swiper.on('slideChange', updatePagination);

      return () => {
        swiper.off('slideChange', updatePagination);
      };
    }
  }, [swiper, paginationElement, paginationPosition, bulletClasses, activeBulletClasses]);

  return (
    <div className={twMerge('mx-auto w-full max-w-4xl', containerClassName)}>
      <div className='relative'>
        <Swiper
          modules={modules}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={navigation}
          pagination={paginationConfig}
          autoplay={autoplay}
          className={twMerge('rounded-lg', className)}
          onSwiper={setSwiper}
          {...swiperProps}
        >
          {nodes.map((node, index) => (
            <SwiperSlide key={node.id || index}>
              <div className='node-container relative w-full' onClick={node.onClick}>
                {node.content}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Outside pagination container */}
        {paginationPosition === 'outside' && (
          <div
            ref={setPaginationElement}
            className={twMerge('mt-4 flex justify-center', paginationContainerClassName)}
          ></div>
        )}
      </div>
    </div>
  );
}
