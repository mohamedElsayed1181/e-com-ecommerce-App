import FeatureCard from "../component/FeatureCard/FeatureCard";

function Home() {
  const features = [
    {
      title: "Wide Selection",
      description:
        "Discover thousands of products across various categories,fashion.",
    },
    {
      title: "Secure Payments",
      description:
        "Enjoy safe and secure payments with our trusted payment gateways.",
    },
    {
      title: "Fast Delivery",
      description: "Get your orders delivered to your doorstep in record time.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to OUR e-com</h1>
          <p className="text-xl mb-8">
            Your ultimate destination for the latest trends in fashion, and
            more. Explore our wide range of products and enjoy a seamless
            shopping experience.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/rigister"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}

      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose e-come?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-xl mb-8">
            Create an account now and start exploring our amazing collection of
            products.
          </p>
          <a
            href="/rigister"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
