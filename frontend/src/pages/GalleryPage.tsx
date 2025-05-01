import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { sampleWhiskies } from '../utils/mockData';

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedWhisky, setSelectedWhisky] = useState(null);
  
  // Filter whiskies based on search term and type filter
  const filteredWhiskies = sampleWhiskies.filter(whisky => {
    const matchesSearch = whisky.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         whisky.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? whisky.type === filterType : true;
    
    return matchesSearch && matchesType;
  });
  
  // Get unique whisky types for filter
  const whiskyTypes = Array.from(new Set(sampleWhiskies.map(whisky => whisky.type)));
  
  // Format price to USD
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-6 text-center">
          Whisky Gallery
        </h1>
        <p className="text-amber-800 text-center max-w-2xl mx-auto mb-8">
          Browse through our collection of correctly classified whisky bottles from our dataset.
        </p>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-amber-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-amber-400" />
              </div>
              <input
                type="text"
                placeholder="Search whiskies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <X size={16} className="text-amber-400 hover:text-amber-600" />
                </button>
              )}
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-amber-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
              >
                <option value="">All Types</option>
                {whiskyTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredWhiskies.length > 0 ? (
            filteredWhiskies.map((whisky) => (
              <div 
                key={whisky.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 transform transition-transform hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedWhisky(whisky)}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-amber-100">
                  <img 
                    src={whisky.imageUrl} 
                    alt={whisky.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-900 text-amber-50 text-xs px-2 py-1 rounded-full">
                    {whisky.abv}% ABV
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-amber-900 mb-1 truncate">
                    {whisky.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700">{whisky.type}</span>
                    <span className="font-medium text-amber-900">{formatPrice(whisky.price)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <div className="text-amber-600 font-medium">No whiskies found</div>
              <div className="text-amber-700 text-sm mt-2">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Whisky Detail Modal */}
      {selectedWhisky && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-amber-100">
              <h3 className="font-serif text-xl font-bold text-amber-900">Whisky Details</h3>
              <button
                onClick={() => setSelectedWhisky(null)}
                className="text-amber-500 hover:text-amber-700"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              <div className="md:flex">
                <div className="md:w-1/2 p-4">
                  <div className="bg-amber-50 rounded overflow-hidden">
                    <img 
                      src={selectedWhisky.imageUrl} 
                      alt={selectedWhisky.name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-4">
                  <h4 className="font-serif text-2xl font-bold text-amber-900 mb-2">
                    {selectedWhisky.name}
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-amber-600">Type</div>
                      <div className="font-medium text-amber-900">{selectedWhisky.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-amber-600">Region</div>
                      <div className="font-medium text-amber-900">{selectedWhisky.region}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-amber-600">ABV</div>
                      <div className="font-medium text-amber-900">{selectedWhisky.abv}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-amber-600">Average Price</div>
                      <div className="font-medium text-amber-900">{formatPrice(selectedWhisky.price)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-amber-100">
                    <div className="text-sm text-amber-600 mb-2">Model Classification Results</div>
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-green-800 font-medium">Confidence Score</span>
                        <span className="text-green-800 font-bold">98.2%</span>
                      </div>
                      <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '98.2%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 mt-4">
                <h5 className="font-serif font-bold text-amber-900 mb-2">Similar Whiskies</h5>
                <div className="flex overflow-x-auto pb-2 space-x-4">
                  {sampleWhiskies.slice(0, 3).map((whisky) => (
                    <div key={whisky.id} className="flex-shrink-0 w-32">
                      <div className="bg-white rounded shadow-sm overflow-hidden">
                        <div className="h-32 bg-amber-100">
                          <img 
                            src={whisky.imageUrl} 
                            alt={whisky.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <div className="text-xs font-medium text-amber-900 truncate">{whisky.name}</div>
                          <div className="text-xs text-amber-700">{whisky.type}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;