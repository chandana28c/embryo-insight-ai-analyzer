
import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ModelUploadProps {
  onModelUpload: (file: File) => void;
  uploadedModel: File | null;
}

const ModelUpload: React.FC<ModelUploadProps> = ({ 
  onModelUpload, 
  uploadedModel 
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
    const modelFile = files.find(file => 
      file.name.endsWith('.h5') || 
      file.name.endsWith('.keras') || 
      file.name.endsWith('.zip')
    );
    
    if (modelFile) {
      onModelUpload(modelFile);
      toast({
        title: "Model uploaded successfully",
        description: `${modelFile.name} is ready for use`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a .h5, .keras, or .zip model file",
        variant: "destructive"
      });
    }
  }, [onModelUpload, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onModelUpload(file);
      toast({
        title: "Model uploaded successfully",
        description: `${file.name} is ready for use`,
      });
    }
  }, [onModelUpload, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <FileText className="h-5 w-5" />
          ML Model Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!uploadedModel ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
            <p className="font-medium text-gray-700 mb-2">
              Upload your trained model
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports .h5, .keras, or .zip files
            </p>
            <input
              type="file"
              accept=".h5,.keras,.zip"
              onChange={handleFileSelect}
              className="hidden"
              id="model-upload"
            />
            <Button 
              asChild 
              variant="outline"
              className="border-blue-300 hover:bg-blue-50"
            >
              <label htmlFor="model-upload" className="cursor-pointer">
                Select Model File
              </label>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">{uploadedModel.name}</p>
                <p className="text-sm text-green-600">
                  {(uploadedModel.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Model Ready
            </Badge>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Supported formats:</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>.h5</strong> - Keras HDF5 format</li>
                <li>• <strong>.keras</strong> - Native Keras format</li>
                <li>• <strong>.zip</strong> - SavedModel format (compressed)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelUpload;
