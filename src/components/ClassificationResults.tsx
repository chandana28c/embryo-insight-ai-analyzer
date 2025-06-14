
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp } from 'lucide-react';

interface ClassificationResult {
  class: string;
  confidence: number;
  description?: string;
}

interface ClassificationResultsProps {
  results: ClassificationResult[];
  isLoading: boolean;
}

const EMBRYO_DESCRIPTIONS: Record<string, string> = {
  '1-1-2': 'Day 2: 2-cell stage embryo with even blastomeres',
  '2-2-2': 'Day 2: 4-cell stage embryo with good morphology',
  '3-2-2': 'Day 3: 8-cell stage embryo with excellent quality',
  '2-1-3': 'Day 2-3: Embryo with fragmentation',
  'Arrested': 'Development arrested - poor prognosis',
  'Morula': 'Day 4: Morula stage with compaction',
  'Early': 'Early cleavage stage embryo',
};

const getGradeColor = (className: string): string => {
  if (className.includes('3-2-2')) return 'bg-green-100 text-green-800';
  if (className.includes('2-2-2')) return 'bg-blue-100 text-blue-800';
  if (className.includes('Arrested')) return 'bg-red-100 text-red-800';
  if (className.includes('Morula')) return 'bg-purple-100 text-purple-800';
  return 'bg-gray-100 text-gray-800';
};

const ClassificationResults: React.FC<ClassificationResultsProps> = ({ 
  results, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-blue-600">Analyzing embryo image...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results.length) {
    return null;
  }

  const topResult = results[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <TrendingUp className="h-5 w-5" />
          Classification Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Result */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <Badge className={getGradeColor(topResult.class)} variant="secondary">
              {topResult.class}
            </Badge>
            <span className="text-2xl font-bold text-blue-700">
              {(topResult.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            {EMBRYO_DESCRIPTIONS[topResult.class] || 'Embryo classification result'}
          </p>
          <Progress 
            value={topResult.confidence * 100} 
            className="h-2"
          />
        </div>

        {/* All Results */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">All Predictions:</h4>
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className={index === 0 ? 'border-blue-500 text-blue-700' : ''}
                >
                  {result.class}
                </Badge>
                <span className="text-sm text-gray-600">
                  {EMBRYO_DESCRIPTIONS[result.class]?.split(' - ')[0] || result.class}
                </span>
              </div>
              <span className="font-medium text-gray-700">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassificationResults;
