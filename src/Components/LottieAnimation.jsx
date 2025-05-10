// components/LottieAnimation.jsx
import Lottie from 'react-lottie';

export default function LottieAnimation({ animationData, height = 400, width = 400 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
}