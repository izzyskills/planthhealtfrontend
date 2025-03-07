import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Prediction } from "../types";

interface PredictionContextType {
  predictions: Prediction[];
  addPrediction: (prediction: Prediction) => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(
  undefined
);

export const PredictionProvider = ({ children }: { children: ReactNode }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "1",
      image: "/api/placeholder/300/200",
      disease: "Powdery Mildew",
      confidence: 94.5,
      date: "2025-03-06T14:20:00Z",
      plant: "Tomato",
      description:
        "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white to gray powdery growth on leaf surfaces, stems, and sometimes fruit.",
      treatment:
        "Apply fungicides containing sulfur or potassium bicarbonate. Remove and destroy infected plant parts. Improve air circulation around plants.",
    },
    {
      id: "2",
      image: "/api/placeholder/300/200",
      disease: "Early Blight",
      confidence: 88.2,
      date: "2025-03-05T09:15:00Z",
      plant: "Potato",
      description:
        "Early blight is a common fungal disease characterized by brown spots with concentric rings that form a target-like pattern on lower leaves.",
      treatment:
        "Remove affected leaves. Apply fungicide. Ensure proper spacing between plants for good air circulation.",
    },
    {
      id: "3",
      image: "/api/placeholder/300/200",
      disease: "Black Spot",
      confidence: 92.7,
      date: "2025-03-04T16:45:00Z",
      plant: "Rose",
      description:
        "Black spot is a fungal disease that causes black spots on leaves, which eventually yellow and drop. It's common in roses.",
      treatment:
        "Remove and destroy infected leaves. Apply fungicide labeled for black spot. Water at the base of plants to keep foliage dry.",
    },
  ]);

  const addPrediction = (prediction: Prediction) => {
    setPredictions((prev) => [prediction, ...prev].slice(0, 5));
  };

  return (
    <PredictionContext.Provider value={{ predictions, addPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePredictions = () => {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error("usePredictions must be used within a PredictionProvider");
  }
  return context;
};
