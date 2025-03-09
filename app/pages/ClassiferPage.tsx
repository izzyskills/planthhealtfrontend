import { useState, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import type { Prediction, PredictionRequest } from "../types";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useSubmitPrediction } from "~/api/Requests";

const ClassifierPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitPredictionMutation = useSubmitPrediction();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    try {
      const predictionRequest: PredictionRequest = {
        image: selectedFile,
      };

      const result = await submitPredictionMutation.mutateAsync(
        predictionRequest
      );
      setResult(result);

      // No longer need to add to prediction context
      // The mutations should invalidate the predictions query automatically
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Plant Disease Classifier
      </h1>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Upload a clear image of your plant's affected area to get an
              instant diagnosis.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
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
              <Button
                onClick={analyzeImage}
                disabled={submitPredictionMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {submitPredictionMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin size-4 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
              {selectedImage && !submitPredictionMutation.isPending && (
                <Button onClick={resetForm} variant="outline" className="ml-2">
                  Reset
                </Button>
              )}
            </div>
          )}

          {result && (
            <div className="mt-8 border-t pt-6 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
                Results
              </h2>
              <div className="bg-green-50 p-4 rounded-lg dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold dark:text-white">
                    {result.disease}
                  </h3>
                  <Badge className="bg-green-600 dark:bg-green-500">
                    {(result.confidence * 100).toFixed(1)}% Confidence
                  </Badge>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2 dark:text-gray-300">
                    Plant:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-400">
                    {result.plant}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2 dark:text-gray-300">
                    Description:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-400">
                    {result.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 dark:text-gray-300">
                    Treatments:
                  </h4>
                  {Array.isArray(result.treatments) ? (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                      {result.treatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-400">
                      {result.treatments}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassifierPage;
