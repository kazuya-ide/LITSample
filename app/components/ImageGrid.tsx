import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const StaticImageCard = ({ imageUrl, topText, bottomText, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ▼ useEffectの実行時の cardRef.current の値を一時変数にコピー
    const currentCardRef = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // unobserveする際も entry.target を使うので、ここでは currentCardRef は不要
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    // ▼ observe する際はコピーした変数を使う
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    // ▼ クリーンアップ関数
    return () => {
      // ▼ unobserve する際も、マウント時の要素への参照（コピーした変数）を使う
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 依存配列は空のまま（このeffectはマウント/アンマウント時にのみ実行したいため）

  // ... (以降の return 部分は変更なし)
  return (
    <div
      key={index} // key は map 側で指定するので、ここでは不要な場合が多い
      className="rounded-lg shadow-md bg-gray-900 w-full flex flex-col overflow-hidden relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
      ref={cardRef}
    >
      <div className="w-full relative aspect-square" style={{ opacity: 0.5 }}>
        <Image
          src={imageUrl}
          alt="Example Image" // altテキストは具体的にした方が良い場合も
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={index < 6 ? true : false}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center p-4 text-center" style={{ justifyContent: 'flex-start' }}>
        <div style={{ height: '30%' }} />
        <div className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ marginBottom: '0.2em' }}>
          {topText.split(' ').slice(0, Math.ceil(topText.split(' ').length / 2)).join(' ')}
          <br />
          {topText.split(' ').slice(Math.ceil(topText.split(' ').length / 2)).join(' ')}
        </div>
        <div className="bg-yellow-300 rounded-full py-0.5 md:py-1 lg:py-1.5 px-1 md:px-1.5 lg:px-2 transition duration-200">
          <span className="text-black font-semibold text-sm md:text-base lg:text-lg">
            {bottomText}
          </span>
        </div>
      </div>
    </div>
  );
};

// ImageGrid コンポーネントは変更なし
const ImageGrid = () => {
  const images = [
    { imageUrl: '/交通誘導警備 - 株式会社CGSコーポレーション.jpg', topText: 'TRAFIC　CONTROL', bottomText: '交通誘導警備' },
    { imageUrl: '/常駐警備・施設警備｜ALSOKの法人向けセキュリティ・防犯対策.jpg', topText: 'FACILITY　SECURITY', bottomText: '施設警備' },
    { imageUrl: '/輸送警備  安全を哲学し創造するTONET Group.jpg', topText: 'TRANSPORT　SECURITY', bottomText: '輸送警備' },
    { imageUrl: '/要人警護  事業紹介  株式会社エグゼクティブプロテクション：カスタマイズできる警備のスペシャリスト集団.jpg', topText: 'EXECUTIVE　PROTECTION', bottomText: '要人警護' },
    { imageUrl: '/リスクマネジメントとは？リスクの種類や正しいプロセスを紹介｜人材派遣会社は【スタッフサービス】.jpg', topText: 'RISK　MANAGEMENT', bottomText: 'リスクマネジメント' },
    { imageUrl: '/Other Service – EZYNOW.jpg', topText: 'OTHER　SERVICE', bottomText: 'その他のサービス' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <StaticImageCard
          key={index} // ここで key を指定
          imageUrl={image.imageUrl}
          topText={image.topText}
          bottomText={image.bottomText}
          index={index}
        />
      ))}
    </div>
  );
};

export default ImageGrid;