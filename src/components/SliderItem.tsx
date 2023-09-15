
interface SliderItemProps {
  src: string;
  width: number;
  height: number;
}

const SliderItem: React.FC<SliderItemProps> = ({
  src,
  width,
  height
}) => {

  const cardStyle  = {
    "--width": { width },
    "--height": {height},
  }
  return (
    <div className="slider-item">
      <div className="card img-holder" style={cardStyle as React.CSSProperties}>
        <img src={src} alt=""  width={width} height={height} className="img-cover"/>
      </div>
    </div>
  )
}

export default SliderItem