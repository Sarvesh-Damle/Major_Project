const Slider = ({images}) => {
  return (
    <div className="w-[100%] h-[350px] flex gap-5 slider">
        <div className="w-3/4 bigImage">
            <img src={images[0]} alt="property_image" className="w-[100%] h-[100%] object-cover rounded-[10px] cursor-pointer" />
        </div>
        <div className="w-1/4 flex flex-col justify-between gap-5 smallImages">
            {images.slice(1).map((image, index) => (
              <img src={image} alt="property_image" key={index} className="w-[100%] h-[100px] object-cover rounded-[10px] cursor-pointer" />
            ))}
        </div>
    </div>
  )
}

export default Slider