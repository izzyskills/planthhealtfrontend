import { usePredictions } from "../context/PredictionContext";
import { formatDistance } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";

const PreviousClassificationsPage = () => {
  const { predictions } = usePredictions();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Prediction History</h1>
        <p className="text-gray-600 mb-8">
          Your last 5 plant disease predictions
        </p>

        {predictions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No predictions yet. Try analyzing a plant!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={prediction.image}
                      alt={`${prediction.plant} with ${prediction.disease}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{prediction.disease}</CardTitle>
                          <CardDescription>
                            {prediction.plant} •{" "}
                            {formatDistance(
                              new Date(prediction.date),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-600">
                          {prediction.confidence}% Confidence
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="details">
                          <AccordionTrigger>
                            Details & Treatment
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              <div>
                                <h4 className="font-medium mb-1">
                                  Description:
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {prediction.description}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Treatment:</h4>
                                <p className="text-sm text-gray-600">
                                  {prediction.treatment}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousClassificationsPage;
