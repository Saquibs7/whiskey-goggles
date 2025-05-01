// Mock data for demonstration purposes

// Mock classification results for a sample whisky
export const mockClassificationResults = {
  whiskyName: 'Macallan 18 Sherry Oak',
  confidence: 94.3,
  spiritType: 'Single Malt Scotch',
  abv: 43,
  proof: 86,
  size: '750ml',
  averagePrice: 349.99,
  popularityScore: 92
};

// Sample dataset of whiskies for the gallery
export const sampleWhiskies = [
  {
    id: 1,
    name: 'Macallan 18 Sherry Oak',
    type: 'Single Malt Scotch',
    region: 'Speyside',
    abv: 43,
    price: 349.99,
    imageUrl: 'https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg'
  },
  {
    id: 2,
    name: 'Buffalo Trace',
    type: 'Bourbon',
    region: 'Kentucky',
    abv: 45,
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg'
  },
  {
    id: 3,
    name: 'Redbreast 12',
    type: 'Irish Whiskey',
    region: 'Ireland',
    abv: 40,
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/4417511/pexels-photo-4417511.jpeg'
  },
  {
    id: 4,
    name: 'Yamazaki 12',
    type: 'Japanese Whisky',
    region: 'Japan',
    abv: 43,
    price: 159.99,
    imageUrl: 'https://images.pexels.com/photos/5121628/pexels-photo-5121628.jpeg'
  },
  {
    id: 5,
    name: 'Lagavulin 16',
    type: 'Single Malt Scotch',
    region: 'Islay',
    abv: 43,
    price: 99.99,
    imageUrl: 'https://images.pexels.com/photos/3645492/pexels-photo-3645492.jpeg'
  },
  {
    id: 6,
    name: 'Crown Royal',
    type: 'Canadian Whisky',
    region: 'Canada',
    abv: 40,
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/339696/pexels-photo-339696.jpeg'
  },
  {
    id: 7,
    name: 'Blanton\'s Original',
    type: 'Bourbon',
    region: 'Kentucky',
    abv: 46.5,
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/3925008/pexels-photo-3925008.jpeg'
  },
  {
    id: 8,
    name: 'Glenfiddich 15',
    type: 'Single Malt Scotch',
    region: 'Speyside',
    abv: 40,
    price: 69.99,
    imageUrl: 'https://images.pexels.com/photos/2796547/pexels-photo-2796547.jpeg'
  },
];

// Mock model metrics data
export const modelMetrics = {
  accuracy: 95.2,
  precision: 94.8,
  recall: 93.7,
  f1Score: 94.2,
  trainingTime: '6 hours 23 minutes',
  trainingEpochs: 50,
  inferenceTime: 300, // in milliseconds
  paramsCount: '24.6M',
  datasetSize: '10,248 images',
  lastUpdated: '2025-03-15',
  confusionMatrix: [
    [452, 12, 3, 2],
    [8, 421, 5, 1],
    [5, 7, 356, 4],
    [2, 3, 2, 378]
  ],
  classNames: ['Scotch', 'Bourbon', 'Rye', 'Irish']
};

// Sample training history for loss and accuracy charts
export const trainingHistory = {
  epochs: Array.from({length: 50}, (_, i) => i + 1),
  trainLoss: Array.from({length: 50}, () => Math.random() * 0.5 + 0.1).sort((a, b) => b - a),
  valLoss: Array.from({length: 50}, () => Math.random() * 0.6 + 0.2).sort((a, b) => b - a),
  trainAcc: Array.from({length: 50}, (_, i) => 0.5 + (i * 0.01) + (Math.random() * 0.05)),
  valAcc: Array.from({length: 50}, (_, i) => 0.45 + (i * 0.009) + (Math.random() * 0.06))
};

// Distribution of whisky types in the dataset
export const whiskyDistribution = [
  { type: 'Scotch', count: 3245 },
  { type: 'Bourbon', count: 2876 },
  { type: 'Rye', count: 1234 },
  { type: 'Irish', count: 985 },
  { type: 'Japanese', count: 876 },
  { type: 'Canadian', count: 654 },
  { type: 'Other', count: 378 }
];