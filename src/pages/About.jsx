import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            About Our Referral Program
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We're revolutionizing the way people earn through referrals. Our
                platform connects passionate agents with customers looking for
                quality products, creating a win-win ecosystem where everyone
                benefits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Started</h2>
              <p className="text-gray-600">
                Founded in 2023, ReferralPro began with a simple idea: to make
                referral marketing accessible and profitable for everyone. What
                started as a small team of three has now grown into a platform
                serving thousands of agents worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Transparency:</strong> Clear commission structures
                    and real-time tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Fairness:</strong> Equal opportunities for all
                    agents
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Innovation:</strong> Constantly improving our
                    platform
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Support:</strong> Dedicated team to help you succeed
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
