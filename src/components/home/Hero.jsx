import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="bg-gradient-to-r from-blue-500 to-indigo-500
 py-20 px-6 text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Earn Commissions With Every Referral
        </h1>
        <p className="text-xl mb-8">
          Share your unique referral code and earn money when your friends make
          purchases. Join thousands of agents already earning passive income.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="bg-white px-8 py-4 text-lg text-black font-medium rounded-md">
            Get Started
          </Link>
          <a href="#howitworks" className="bg-black px-8 py-4 text-lg font-medium rounded-md">
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
