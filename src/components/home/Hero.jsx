import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
  const navigate = useNavigate();
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
          <Button
            variant="secondary"
            className="px-8 py-6 text-lg"
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started
          </Button>
          <Button
            className="px-8 py-6 text-lg"
            // onClick={() => navigate("#howitworks")}
          >
            Learn How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}
