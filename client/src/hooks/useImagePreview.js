import { useEffect, useState } from "react";

export const useImagePreview = () => {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    return () => {
      if (imageSource) {
        URL.revokeObjectURL(imageSource);
      }
    };
  }, [imageSource]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageSource(URL.createObjectURL(file));
    } else {
      setImageSource(null);
    }
  };

  const resetImageSource = () => {
    setImageSource(null);
  };

  return [imageSource, handleFileChange, resetImageSource];
};
