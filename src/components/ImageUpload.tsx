
import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  uploadedImage, 
  onRemoveImage 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (PNG, JPG, JPEG)",
        variant: "destructive"
      });
    }
  }, [onImageUpload, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <ImageIcon className="h-6 w-6" />
          Embryo Image Upload
        </h2>
        
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your embryo image here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Image
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded embryo"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              <Button
                onClick={onRemoveImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                File: {uploadedImage.name}
              </p>
              <p className="text-sm text-gray-600">
                Size: {(uploadedImage.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
