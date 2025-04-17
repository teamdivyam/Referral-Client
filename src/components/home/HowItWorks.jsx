export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description:
        "Create your agent account and get your unique referral code",
    },
    {
      title: "Share Your Code",
      description:
        "Share your referral link with friends, family, and customers",
    },
    {
      title: "They Purchase",
      description: "Your referrals use your code when making purchases",
    },
    {
      title: "Earn Commissions",
      description: "Get paid for every successful transaction",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
