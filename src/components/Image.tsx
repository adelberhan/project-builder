interface IProps {
  imageUrl: string;
  alt: string;
  className: string;
}
const Image = ({ alt, imageUrl, className }: IProps) => {
  return <img src={imageUrl} alt={alt} className={className} />;
};

export default Image;
