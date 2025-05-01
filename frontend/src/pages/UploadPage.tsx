import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, RotateCw, CheckCircle2 } from 'lucide-react';
import ResultsCard from '../components/ResultsCard';

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef(null);

  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const [stream, setStream] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    } else {
      setError('File too large or unsupported format');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleChange({ target: { files: [file] } });
    }
  };

  const onButtonClick = () => inputRef.current.click();

  const resetUpload = () => {
    setImagePreview(null);
    setResults(null);
    setError('');
  };

  const analyzeImage = async () => {
  if (!imagePreview) return;
  setIsAnalyzing(true);

  try {
    const blob = await fetch(imagePreview).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob, 'upload.png');

    const response = await axios.post('http://localhost:5000/api/search', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setResults(response.data);
    console.log('Analysis results:', response.data);
  } catch (err) {
    console.error('Image upload failed:', err);
    setError('Failed to analyze image. Try again.');
  } finally {
    setIsAnalyzing(false);
  }
};


  // === Camera functions ===
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.videoWidth;
    canvas.height = videoRef.videoHeight;
    canvas.getContext("2d").drawImage(videoRef, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setImagePreview(dataUrl);
    stopCamera();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Upload & Camera Area */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100">
        <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
          Upload Image
        </h2>

        {!imagePreview && !showCamera ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive
                ? 'border-amber-500 bg-amber-50'
                : 'border-amber-200 hover:border-amber-400'
            } transition-colors duration-300`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            <Upload size={48} className="mx-auto text-amber-400 mb-4" />
            <p className="text-amber-800 mb-2">
              Drag and drop an image here, or click to browse
            </p>
            <p className="text-amber-500 text-sm mb-4">
              Supported formats: JPEG, PNG, WebP (Max: 5MB)
            </p>

            <button
              onClick={onButtonClick}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg mr-2 transition-colors"
            >
              Select Image
            </button>

            <button
              onClick={startCamera}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Take Photo
            </button>

            {error && (
              <p className="mt-4 text-red-500 text-sm">{error}</p>
            )}
          </div>
        ) : showCamera ? (
          <div className="relative text-center">
            <video
              ref={(ref) => setVideoRef(ref)}
              autoPlay
              playsInline
              className="w-full rounded-lg max-h-[400px] object-contain"
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={capturePhoto}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg object-contain max-h-[400px]"
            />
            <button
              onClick={resetUpload}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>

            {!results && !isAnalyzing && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={analyzeImage}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  Analyze Image
                </button>
              </div>
            )}

            {isAnalyzing && (
              <div className="mt-4 text-center">
                <div className="flex justify-center mb-2">
                  <RotateCw size={24} className="text-amber-600 animate-spin" />
                </div>
                <p className="text-amber-800">Analyzing whisky bottle...</p>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="mt-6">
          <h3 className="font-medium text-amber-900 mb-2">Tips for best results:</h3>
          <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
            <li>Ensure good lighting with minimal glare</li>
            <li>Position the label clearly in frame</li>
            <li>Avoid cropping the bottle shape</li>
            <li>Remove any obstructing objects</li>
          </ul>
        </div>
      </div>

      {/* Results Area */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-amber-100">
        <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
          Classification Results
        </h2>

        {!results ? (
          <div className="flex flex-col items-center justify-center h-[300px] border border-dashed border-amber-200 rounded-lg">
            <div className="text-amber-400 mb-2">
              <CheckCircle2 size={48} />
            </div>
            <p className="text-amber-800 text-center">
              Upload and analyze an image to see classification results
            </p>
          </div>
        ) : (
          <ResultsCard results={results[0]} />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
