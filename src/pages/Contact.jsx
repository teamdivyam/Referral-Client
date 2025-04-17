import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ContactForm from "../components/forms/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need support? Reach out to our team and we'll get back to you
              as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Our Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">support@referralpro.com</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Referral Street<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}