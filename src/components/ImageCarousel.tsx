/*************************************************************
 * 이미지 캐러셀 컴포넌트
 * - created by hwanee-k
 * - props 참고 : https://swiperjs.com
 *************************************************************/
import { twMerge } from 'tailwind-merge';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

interface ImageCarouselProps extends Omit<SwiperProps, 'children'> {
  images: {
    id?: string; // 이미지 key값
    src: string; // 이미지 경로
    alt: string; // 이미지 설명
    linkUrl?: string; // 이미지 링크
  }[];
  paginationPosition?: 'inside' | 'outside'; // 페이지네이션 위치
  containerClassName?: string; // 컨테이너 스타일
  paginationContainerClassName?: string; // 페이지네이션 컨테이너 스타일
  bulletClassName?: string; // 불릿 스타일
  activeBulletClassName?: string; // 활성화된 불릿 스타일
  onImageClick?: (data: { id: string | undefined; src: string; linkUrl: string | undefined }) => void; // 이미지 클릭 핸들러
}

export default function ImageCarousel({
  images = [],
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
  onImageClick,
  ...swiperProps
}: ImageCarouselProps) {
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
  const paginationConfig = paginationPosition === 'inside';
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

          // bullet.addEventListener('click', () => {
          //   swiper.slideTo(i);
          //   updatePagination();
          // });

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
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='image-container relative aspect-video w-full'>
                <img
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  className='h-full w-full cursor-pointer object-cover object-center'
                  onClick={() => onImageClick?.({ id: image.id, src: image.src, linkUrl: image.linkUrl })}
                />
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
