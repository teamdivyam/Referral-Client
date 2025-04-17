export default function About() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          About Our Referral Program
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Who We Are</h3>
            <p className="text-gray-600 mb-6">
              We're a platform that connects agents with customers, rewarding
              you for every successful referral. Our mission is to create
              mutually beneficial relationships between businesses and their
              advocates.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Why Join Us</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Competitive commission rates</li>
              <li>• Real-time tracking of your referrals</li>
              <li>• Easy payout system</li>
              <li>• Dedicated support for agents</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
