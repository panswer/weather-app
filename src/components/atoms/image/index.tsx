import styles from "./image.module.css";

interface ImageParams {
  src: string;
  alt?: string;
  imgClass?: string;
}

const Image = ({ alt, src, imgClass }: ImageParams) => {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.imageStyle.concat(imgClass ? ` ${imgClass}` : "")}
    />
  );
};

export default Image;
