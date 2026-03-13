import NextImage, { type ImageProps } from 'next/image';

export default function AppImage(props: ImageProps) {
  const { alt, ...rest } = props;

  return <NextImage alt={alt} {...rest} />;
}
