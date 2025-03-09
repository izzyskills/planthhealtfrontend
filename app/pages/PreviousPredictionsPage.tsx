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
import { Button } from "~/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { baseURL } from "~/api/api";
import { useGetPredictions } from "~/api/Requests";
import { useAuth } from "~/context/AuthContext";

const PreviousClassificationsPage = () => {
  const { isLoggedIn } = useAuth();
  const {
    data: predictions = [],
    isLoading,
    error,
    refetch: refreshPredictions,
  } = useGetPredictions();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">Prediction History</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshPredictions()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-2 mr-2" />
            ) : (
              <RefreshCw size={16} className="mr-2" />
            )}
            Refresh
          </Button>
        </div>
        <p className="text-gray-600 dark:text-gray-300  mb-8">
          Your recent plant disease predictions
        </p>

        {!isLoggedIn ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Please log in to view your prediction history.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : isLoading && predictions.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-red-600 dark:text-red-400">
                <p>Error loading predictions. Please try again later.</p>
              </div>
            </CardContent>
          </Card>
        ) : predictions.length === 0 ? (
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
                    {/* For the image, we need to check what format it is */}
                    {typeof prediction.image === "string" &&
                    prediction.image.startsWith("data:") ? (
                      // If it's a data URL (from a file upload in the current session)
                      <img
                        src={prediction.image}
                        alt={`${prediction.plant} with ${prediction.disease}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // If it's a filename or path, we might need to get it from an API endpoint
                      <img
                        src={`${baseURL}/predictions/${prediction.id}/image`}
                        alt={`${prediction.plant} with ${prediction.disease}`}
                        className="h-full w-full object-cover"
                      />
                    )}
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
                          {typeof prediction.confidence === "number" &&
                          prediction.confidence <= 1
                            ? `${(prediction.confidence * 100).toFixed(1)}%`
                            : `${prediction.confidence}%`}{" "}
                          Confidence
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
                                <p className="text-sm dark:text-gray-300 text-gray-600">
                                  {prediction.description}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">
                                  Treatments:
                                </h4>
                                {Array.isArray(prediction.treatments) ? (
                                  <ul className="list-disc list-inside text-sm dark:text-gray-300 text-gray-600">
                                    {prediction.treatments.map(
                                      (treatment, idx) => (
                                        <li key={idx}>{treatment}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-sm dark:text-gray-300 text-gray-600">
                                    {prediction.treatments}
                                  </p>
                                )}
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
