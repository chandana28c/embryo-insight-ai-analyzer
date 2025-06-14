
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import ClassificationResults from '@/components/ClassificationResults';
import AnalysisPanel from '@/components/AnalysisPanel';
import ModelUpload from '@/components/ModelUpload';
import { Microscope, Brain, Stethoscope } from 'lucide-react';

interface ClassificationResult {
  class: string;
  confidence: number;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedModel, setUploadedModel] = useState<File | null>(null);
  const [classificationResults, setClassificationResults] = useState<ClassificationResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockPreprocessedImages = {
    grayscale: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HcmF5c2NhbGU8L3RleHQ+PC9zdmc+',
    edgeDetected: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDAwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FZGdlIERldGVjdGVkPC90ZXh0Pjwvc3ZnPg==',
    histogramEqualized: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlZWVlZWUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5OTk5OTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IaXN0b2dyYW0gRXF1YWxpemVkPC90ZXh0Pjwvc3ZnPg=='
  };

  const mockPerformanceMetrics = {
    accuracy: 0.9234,
    confusionMatrix: [
      [45, 2, 1, 0, 1, 0, 1],
      [1, 38, 2, 1, 0, 1, 0],
      [0, 1, 42, 1, 0, 0, 1],
      [2, 0, 1, 35, 2, 1, 0],
      [0, 0, 0, 1, 28, 0, 0],
      [1, 0, 0, 0, 0, 33, 1],
      [0, 1, 0, 0, 1, 0, 31]
    ],
    classLabels: ['1-1-2', '2-2-2', '3-2-2', '2-1-3', 'Arrested', 'Morula', 'Early']
  };

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name);
    setUploadedImage(file);
    setClassificationResults([]);
    setShowAnalysis(false);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setClassificationResults([]);
    setShowAnalysis(false);
  };

  const handleModelUpload = (file: File) => {
    console.log('Model uploaded:', file.name);
    setUploadedModel(file);
  };

  const handleClassifyImage = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an embryo image first",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedModel) {
      toast({
        title: "No model uploaded",
        description: "Please upload your trained model first",
        variant: "destructive"
      });
      return;
    }

    setIsClassifying(true);
    
    // Simulate API call for classification
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock classification results
      const mockResults: ClassificationResult[] = [
        { class: '3-2-2', confidence: 0.87 },
        { class: '2-2-2', confidence: 0.09 },
        { class: 'Morula', confidence: 0.03 },
        { class: '2-1-3', confidence: 0.01 }
      ];
      
      setClassificationResults(mockResults);
      toast({
        title: "Classification complete",
        description: `Embryo classified as ${mockResults[0].class} with ${(mockResults[0].confidence * 100).toFixed(1)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Classification failed",
        description: "Invalid input. Please upload a valid embryo image.",
        variant: "destructive"
      });
    } finally {
      setIsClassifying(false);
    }
  };

  const handleAnalyze = () => {
    if (!classificationResults.length) {
      toast({
        title: "No classification results",
        description: "Please classify an image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      toast({
        title: "Analysis complete",
        description: "Detailed analysis and performance metrics are now available",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <Microscope className="h-8 w-8 text-blue-600" />
              <Brain className="h-8 w-8 text-blue-500" />
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-2">
            Embryo Development Analysis System
          </h1>
          <p className="text-center text-blue-600 text-lg">
            AI-Powered IVF Success Rate Enhancement Platform
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ModelUpload 
              onModelUpload={handleModelUpload}
              uploadedModel={uploadedModel}
            />
            <ImageUpload
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onRemoveImage={handleRemoveImage}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ClassificationResults
              results={classificationResults}
              isLoading={isClassifying}
            />
            
            {uploadedImage && uploadedModel && (
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleClassifyImage}
                  disabled={isClassifying}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                >
                  {isClassifying ? (
                    <>
                      <Brain className="mr-2 h-5 w-5 animate-spin" />
                      Classifying...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Classify Embryo
                    </>
                  )}
                </Button>
                
                {classificationResults.length > 0 && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    variant="outline"
                    className="w-full border-blue-300 hover:bg-blue-50 h-12 text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Microscope className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Microscope className="mr-2 h-5 w-5" />
                        Analyze
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Panel */}
        {showAnalysis && (
          <div className="mt-8">
            <AnalysisPanel
              preprocessedImages={mockPreprocessedImages}
              performanceMetrics={mockPerformanceMetrics}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
