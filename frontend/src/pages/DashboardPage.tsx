import React from 'react';
import { 
  BarChart, ChevronUp, ChevronDown, Clock, Cpu, Database, 
  CalendarDays, BarChart2, Scale, Target 
} from 'lucide-react';
import { modelMetrics, trainingHistory, whiskyDistribution } from '../utils/mockData';

const DashboardPage = () => {
  // Function to render confusion matrix
  const renderConfusionMatrix = () => {
    const { confusionMatrix, classNames } = modelMetrics;
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-amber-200">
          <thead>
            <tr>
              <th className="border border-amber-200 bg-amber-50 p-2"></th>
              {classNames.map((name, index) => (
                <th key={index} className="border border-amber-200 bg-amber-50 p-2 text-amber-800">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {confusionMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border border-amber-200 bg-amber-50 p-2 text-amber-800">
                  {classNames[rowIndex]}
                </th>
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`border border-amber-200 p-2 text-center ${
                      rowIndex === cellIndex 
                        ? 'bg-green-100 font-medium text-green-800' 
                        : cell > 0 
                          ? 'bg-red-50 text-red-700' 
                          : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-6 text-center">
          Model Performance Dashboard
        </h1>
        <p className="text-amber-800 text-center max-w-2xl mx-auto mb-8">
          Detailed metrics and visualizations of our whisky classification model's performance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Accuracy */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-amber-700 font-medium">Accuracy</div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Target size={16} className="text-amber-700" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-amber-900">{modelMetrics.accuracy}%</div>
              <div className="ml-2 text-xs text-green-600 flex items-center">
                <ChevronUp size={14} />
                2.1%
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600">vs. previous model version</div>
          </div>
          
          {/* F1 Score */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-amber-700 font-medium">F1 Score</div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Scale size={16} className="text-amber-700" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-amber-900">{modelMetrics.f1Score}%</div>
              <div className="ml-2 text-xs text-green-600 flex items-center">
                <ChevronUp size={14} />
                1.8%
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600">balance between precision & recall</div>
          </div>
          
          {/* Inference Time */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-amber-700 font-medium">Inference Time</div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock size={16} className="text-amber-700" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-amber-900">{modelMetrics.inferenceTime}ms</div>
              <div className="ml-2 text-xs text-green-600 flex items-center">
                <ChevronDown size={14} />
                25ms
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600">avg. time per prediction</div>
          </div>
          
          {/* Dataset Size */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-amber-700 font-medium">Dataset Size</div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Database size={16} className="text-amber-700" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-amber-900">{modelMetrics.datasetSize}</div>
              <div className="ml-2 text-xs text-green-600 flex items-center">
                <ChevronUp size={14} />
                12.4%
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600">includes data augmentation</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Training History Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100">
            <h2 className="font-serif text-xl font-bold text-amber-900 mb-4 flex items-center">
              <BarChart2 size={20} className="mr-2 text-amber-700" />
              Training History
            </h2>
            <div className="h-[300px] flex items-center justify-center bg-amber-50 rounded border border-amber-100">
              <div className="text-amber-700 italic text-sm">
                Interactive training charts will be displayed here
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-3 rounded border border-amber-100">
                <div className="text-sm text-amber-700">Training Time</div>
                <div className="font-medium text-amber-900">{modelMetrics.trainingTime}</div>
              </div>
              <div className="bg-amber-50 p-3 rounded border border-amber-100">
                <div className="text-sm text-amber-700">Total Epochs</div>
                <div className="font-medium text-amber-900">{modelMetrics.trainingEpochs}</div>
              </div>
            </div>
          </div>
          
          {/* Confusion Matrix */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100">
            <h2 className="font-serif text-xl font-bold text-amber-900 mb-4 flex items-center">
              <BarChart size={20} className="mr-2 text-amber-700" />
              Confusion Matrix
            </h2>
            {renderConfusionMatrix()}
            <div className="mt-4 text-xs text-amber-600 italic">
              The confusion matrix shows how many samples were correctly classified (diagonal)
              versus those that were classified incorrectly (off-diagonal).
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100 lg:col-span-2">
            <h2 className="font-serif text-xl font-bold text-amber-900 mb-4 flex items-center">
              <Database size={20} className="mr-2 text-amber-700" />
              Dataset Distribution
            </h2>
            <div className="h-[300px] flex items-center justify-center bg-amber-50 rounded border border-amber-100">
              <div className="text-amber-700 italic text-sm">
                Whisky type distribution chart will be displayed here
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100">
            <h2 className="font-serif text-xl font-bold text-amber-900 mb-4 flex items-center">
              <Cpu size={20} className="mr-2 text-amber-700" />
              Model Info
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-amber-700">Architecture</span>
                <span className="font-medium text-amber-900">EfficientNetB3</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-amber-700">Parameters</span>
                <span className="font-medium text-amber-900">{modelMetrics.paramsCount}</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-amber-700">Input Size</span>
                <span className="font-medium text-amber-900">300×300×3</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-amber-700">Batch Size</span>
                <span className="font-medium text-amber-900">32</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-amber-700">Learning Rate</span>
                <span className="font-medium text-amber-900">0.0001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700">Last Updated</span>
                <span className="font-medium text-amber-900 flex items-center">
                  <CalendarDays size={14} className="mr-1" />
                  {modelMetrics.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
            Future Improvements
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-amber-200 mt-1 mr-3"></div>
              <div>
                <div className="font-medium text-amber-800">Expand the dataset</div>
                <div className="text-sm text-amber-700">
                  Add more images of rare and limited-edition whiskies to improve classification accuracy for uncommon bottles.
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-amber-200 mt-1 mr-3"></div>
              <div>
                <div className="font-medium text-amber-800">Model distillation</div>
                <div className="text-sm text-amber-700">
                  Create a smaller, faster model for mobile deployment while maintaining accuracy.
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-amber-200 mt-1 mr-3"></div>
              <div>
                <div className="font-medium text-amber-800">Advanced augmentations</div>
                <div className="text-sm text-amber-700">
                  Implement more sophisticated image augmentation techniques to improve model robustness to varying lighting conditions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;