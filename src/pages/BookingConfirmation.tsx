import React, { useRef } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Check, Calendar, Users, CreditCard, Mail, Phone, Printer, ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const printRef = useRef<HTMLDivElement>(null);

  if (!bookingData) {
    return <Navigate to="/booking" replace />;
  }

  // Generate a random booking reference number
  const bookingReference = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    if (printRef.current) {
      try {
        const content = printRef.current;
        const printWindow = window.open('', '_blank');

        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Booking Confirmation - ${bookingReference}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  .header { text-align: center; margin-bottom: 30px; }
                  .confirmation-box { border: 1px solid #e2e2e2; padding: 20px; margin-bottom: 20px; }
                  .section { margin-bottom: 20px; }
                  .section h3 { margin-bottom: 10px; color: #333; }
                  .detail-row { display: flex; margin-bottom: 8px; }
                  .detail-label { font-weight: bold; width: 100px; }
                  .footer { margin-top: 30px; text-align: center; font-size: 0.8em; color: #666; }
                </style>
              </head>
              <body>
                ${content.innerHTML}
                <div class="footer">
                  <p>Thank you for choosing our hotel. We look forward to welcoming you!</p>
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
          toast.success("Print window opened");
        } else {
          toast.error("Could not open print window. Please check your popup blocker settings.");
        }
      } catch (error) {
        toast.error("There was an error printing your confirmation");
      }
    }
  };

  return (
    <Layout>
      <div className="bg-hotel-charcoal/5 py-20 mb-12">
        <div className="container-custom">
          <SectionTitle
            subtitle="THANK YOU"
            title="Booking Confirmed"
            description="Your reservation has been successfully confirmed. We look forward to welcoming you to our hotel."
          />
        </div>
      </div>

      <div className="container-custom mb-20">
        <div className="max-w-3xl mx-auto">
          <div ref={printRef} className="bg-white p-6 sm:p-8 rounded-lg shadow-card border border-hotel-sand mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-center mb-2">
              Booking Confirmed
            </h2>

            <p className="text-center text-hotel-stone mb-6">
              Booking Reference: <span className="font-bold">{bookingReference}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Check-in</div>
                      <div className="text-hotel-stone">{bookingData.checkIn}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Check-out</div>
                      <div className="text-hotel-stone">{bookingData.checkOut}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <Users className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-hotel-stone">
                        {bookingData.adults} {parseInt(bookingData.adults) === 1 ? "Adult" : "Adults"}
                        {bookingData.children && parseInt(bookingData.children) > 0 && `, ${bookingData.children} ${parseInt(bookingData.children) === 1 ? "Child" : "Children"}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Guest Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <Users className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Name</div>
                      <div className="text-hotel-stone">{bookingData.firstName} {bookingData.lastName}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <Mail className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-hotel-stone break-words">{bookingData.email}</div>
                    </div>
                  </div>
                  {bookingData.phone && (
                    <div className="flex">
                      <Phone className="h-5 w-5 text-hotel-gold mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-hotel-stone">{bookingData.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-hotel-sand py-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Total Amount</div>
                  <div className="text-sm text-hotel-stone">Including all taxes and fees</div>
                </div>
                <div className="text-2xl font-serif text-hotel-gold">${bookingData.totalPrice}</div>
              </div>
            </div>

            <div className="bg-hotel-beige/30 p-4 rounded-md mb-6">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-hotel-gold mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Payment Information</div>
                  <div className="text-sm text-hotel-stone">
                    Your payment will be processed at check-in. A valid credit card is required to guarantee your reservation.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button
              to="/"
              variant="outline"
              icon={<ArrowLeft size={16} />}
              iconPosition="left"
            >
              Return to Homepage
            </Button>

            <Button
              onClick={handlePrint}
              variant="primary"
              icon={<Printer size={16} />}
              iconPosition="left"
            >
              Print Confirmation
            </Button>
          </div>

          <div className="text-center mt-4">
            <div className="text-sm text-hotel-stone">
              A confirmation email has been sent to {bookingData.email}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmation;