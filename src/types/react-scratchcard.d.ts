declare module 'react-scratchcard' {
    interface ScratchCardProps {
      width: number;
      height: number;
      image: string;
      finishPercent?: number;
      onComplete?: () => void;
      onScratch?: () => void;
      brushSize?: number;
    }
  
    const ScratchCard: React.FC<ScratchCardProps>;
  
    export default ScratchCard;
  }
  