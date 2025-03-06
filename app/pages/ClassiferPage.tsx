import { useState } from "react";
import { Upload } from "lucide-react";

const ClassifierPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    // This would be replaced with your actual API call
    setTimeout(() => {
      setResult({
        disease: "Powdery Mildew",
        confidence: 94.5,
        description:
          "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white to gray powdery growth on leaf surfaces, stems, and sometimes fruit.",
        treatment:
          "Apply fungicides containing sulfur or potassium bicarbonate. Remove and destroy infected plant parts. Improve air circulation around plants.",
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Plant Disease Classifier
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            Upload a clear image of your plant's affected area to get an instant
            diagnosis.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="max-h-64 mb-4 rounded-lg"
                />
              ) : (
                <div className="mb-4 p-4 bg-green-100 rounded-full">
                  <Upload size={32} className="text-green-600" />
                </div>
              )}
              <span className="text-lg font-medium text-green-700">
                {selectedImage ? "Change image" : "Upload plant image"}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG (max 10MB)
              </span>
            </label>
          </div>
        </div>

        {selectedImage && (
          <div className="text-center">
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-green-300"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Results</h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{result.disease}</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {result.confidence}% Confidence
                </span>
              </div>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Description:</h4>
                <p className="text-gray-700">{result.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Treatment:</h4>
                <p className="text-gray-700">{result.treatment}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassifierPage;
