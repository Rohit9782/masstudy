import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Our English Course
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We help students and professionals improve their English communication 
          skills with practical lessons, real-life examples, and interactive learning.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="English Learning"
          className="rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            Our mission is to make English learning simple, practical, and 
            confidence-building. We focus on speaking, grammar, vocabulary, 
            and real-life conversation skills.
          </p>
          <p className="text-gray-600">
            Whether you are a beginner or an advanced learner, our course 
            provides structured lessons that help you improve step by step.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">📚 Structured Lessons</h3>
            <p className="text-gray-600">
              Step-by-step lessons covering grammar, vocabulary, and pronunciation.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">🎤 Speaking Practice</h3>
            <p className="text-gray-600">
              Real conversation practice to build fluency and confidence.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">💼 Professional English</h3>
            <p className="text-gray-600">
              Business English, interview preparation, and workplace communication.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Our Course?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We combine modern teaching techniques with practical examples to 
          ensure fast learning. Our goal is not just to teach English, but 
          to make you confident while speaking in real-world situations.
        </p>
      </div>

    </div>
  );
};

export default About;