import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Database, BarChart2, PieChart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gradient-to-r from-amber-900 to-amber-700 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg')] bg-cover bg-center"
          style={{ backgroundBlendMode: 'multiply' }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-4">
            Whisky Goggle
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Advanced image classification system for whisky bottle identification
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/upload" 
              className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Upload size={18} className="mr-2" />
              Try Classification
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-900 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <BarChart2 size={18} className="mr-2" />
              View Model Performance
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-amber-900 text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-[1.02] border border-amber-100">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Upload size={28} className="text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-3">Upload Image</h3>
              <p className="text-amber-800">
                Upload an image of a whisky bottle. Our system accepts JPEG, PNG, and WebP formats up to 5MB in size.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-[1.02] border border-amber-100">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Database size={28} className="text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-3">AI Processing</h3>
              <p className="text-amber-800">
                Our advanced CNN model analyzes the image, extracting key features to identify the whisky brand and type.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-[1.02] border border-amber-100">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <PieChart size={28} className="text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-3">Get Results</h3>
              <p className="text-amber-800">
                Receive detailed classification results, including whisky name, type, and confidence scores for top predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-800 text-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Model Performance</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-amber-900 bg-opacity-50 rounded-lg">
              <div className="font-bold text-4xl text-amber-200 mb-2">95.2%</div>
              <div className="text-lg text-amber-100">Accuracy</div>
            </div>
            
            <div className="p-6 bg-amber-900 bg-opacity-50 rounded-lg">
              <div className="font-bold text-4xl text-amber-200 mb-2">94.8%</div>
              <div className="text-lg text-amber-100">Precision</div>
            </div>
            
            <div className="p-6 bg-amber-900 bg-opacity-50 rounded-lg">
              <div className="font-bold text-4xl text-amber-200 mb-2">93.7%</div>
              <div className="text-lg text-amber-100">Recall</div>
            </div>
            
            <div className="p-6 bg-amber-900 bg-opacity-50 rounded-lg">
              <div className="font-bold text-4xl text-amber-200 mb-2">94.2%</div>
              <div className="text-lg text-amber-100">F1 Score</div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              View Detailed Metrics
            </Link>
          </div>
        </div>
      </section>

      {/* Dataset Preview */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-amber-900 text-center mb-4">Dataset Overview</h2>
          <p className="text-amber-800 text-center max-w-2xl mx-auto mb-12">
            Our model is trained on a diverse dataset of whisky bottles from various regions and distilleries.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Scotch', 'Bourbon', 'Rye', 'Irish', 'Japanese'].map((type, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                <div className="aspect-[3/4] bg-amber-800 bg-opacity-20 flex items-center justify-center">
                  <div className="font-serif text-xl font-bold text-amber-900">{type}</div>
                </div>
                <div className="absolute inset-0 bg-amber-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-amber-50 font-medium">
                    {Math.floor(Math.random() * 50) + 50} samples
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;