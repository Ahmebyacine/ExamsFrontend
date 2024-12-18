import React, { useRef, useId } from 'react';
import { Upload, X } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const ImageManager = ({ image, onDelete, onUpload }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const uniqueId = useId();

  const handleUpload = (event) => {
    if (onUpload) {
      onUpload(event);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={`dropzone-file-${uniqueId}`}
              className="flex flex-col items-center justify-center w-full h-54 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
            >
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-8">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">{t("upMsg1")}</span>{t("upMsg2")}</p>
                  <p className="text-xs text-gray-500">{t("pictureMsg")}</p>
                </div>
              )}
              {image && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    className="absolute top-2 right-2 bg-white text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }}
                  >
                    {t("upNewImg")}
                  </button>
                </div>
              )}
              <input
                id={`dropzone-file-${uniqueId}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                ref={fileInputRef}
              />
            </label>
          </div>
        </div>
    </div>
  );
};

export default ImageManager;