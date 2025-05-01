import React, { useState, useEffect } from 'react';
import { Info, ThumbsUp, Award, Droplet } from 'lucide-react';

interface ClassificationResult {
  whiskyName: string;
  score: number;
  spiritType: string;
  abv: number;
  proof: number;
  size: string;
  shelfPrice: number;
  popularityScore: number;
}

interface ResultsCardProps {
  results: ClassificationResult;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ results }) => {
  const { 
    whiskyName, 
    score, 
    spiritType, 
    abv, 
    proof, 
    size, 
    shelfPrice, 
    popularityScore 
  } = results;
  
  const [percentage, setPercentage] = useState<number | null>(null);

  useEffect(() => {
    if (score >= 0 && score <= 1) {
      // Convert score to percentage (ensure it's between 0-100)
      setPercentage(Math.round(score * 100));
    }
  }, [score]);

  // Calculate confidence bar color based on score
  const getConfidenceColor = () => {
    if (percentage! >= 90) return 'bg-green-500';
    if (percentage! >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  // Format price to USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-amber-100 pb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-serif text-xl font-bold text-amber-900">
            {whiskyName}
          </h3>
          <span className="text-sm font-medium px-2 py-1 rounded bg-amber-100 text-amber-800">
            {spiritType}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-amber-700">Confidence</span>
            <span className="text-sm font-medium text-amber-900">
              {percentage !== null ? `${percentage}%` : 'Loading...'}
            </span>
          </div>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getConfidenceColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${percentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* ABV */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <Droplet size={16} className="text-amber-700" />
          </div>
          <div>
            <div className="text-xs text-amber-700">ABV</div>
            <div className="font-medium text-amber-900">{abv}%</div>
          </div>
        </div>
        
        {/* Proof */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <Award size={16} className="text-amber-700" />
          </div>
          <div>
            <div className="text-xs text-amber-700">Proof</div>
            <div className="font-medium text-amber-900">{proof}</div>
          </div>
        </div>
        
        {/* Size */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <Info size={16} className="text-amber-700" />
          </div>
          <div>
            <div className="text-xs text-amber-700">Size</div>
            <div className="font-medium text-amber-900">{size}</div>
          </div>
        </div>
        
        {/* Popularity */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <ThumbsUp size={16} className="text-amber-700" />
          </div>
          <div>
            <div className="text-xs text-amber-700">Popularity</div>
            <div className="font-medium text-amber-900">{popularityScore}</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-amber-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-amber-700">Average Price:</span>
          <span className="font-medium text-lg text-amber-900">{formatPrice(shelfPrice)}</span>
        </div>
      </div>
      
      <div className="mt-6">
  <div className="text-sm text-amber-600 italic">
    Similar whiskies you might enjoy:
  </div>
  <div className="mt-2 flex flex-wrap gap-2">
    {Array.isArray(results) && results.length > 0 && (
      <>
        <span className="text-xs px-2 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800">
          {results[1].whiskyName}
        </span>
        <span className="text-xs px-2 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800">
          {results[2].whiskyName}
        </span>
      </>
    )}
  </div>
</div>

    </div>
  );
};

export default ResultsCard;
