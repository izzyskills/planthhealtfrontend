import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ArrowRight, Leaf, Check, Award } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Identify Plant Diseases Instantly
              </h1>
              <p className="text-xl mb-6">
                Take a photo of your plants and get an accurate diagnosis using
                our advanced AI technology.
              </p>
              <Button variant="secondary" asChild size="lg">
                <Link to="/classify" className="inline-flex items-center">
                  Try it now <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Card className="p-1">
                <CardContent className="p-0">
                  <img
                    src="/5483545.jpg"
                    alt="Plant disease detection"
                    className="rounded"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload a Photo</h3>
                <p className="text-muted-foreground">
                  Take a clear photo of the affected plant leaf or stem and
                  upload it to our platform.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get AI Diagnosis</h3>
                <p className="text-muted-foreground">
                  Our advanced AI model will analyze the image and identify the
                  disease affecting your plant.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Treatment Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Receive detailed information about the disease and specific
                  treatment recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card text-card-foreground shadow shadow-emerald-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to diagnose your plants?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our platform supports over 50 plant species and can identify more
            than 100 different plant diseases with high accuracy.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/classify">Start Classifying</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
