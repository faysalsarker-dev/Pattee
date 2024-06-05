import  { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@material-tailwind/react";

const Donationdetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');

    const handleDonate = () => {
        // Logic to handle donation
        setShowModal(false);
        // Display success message or navigate to a success page
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Donation Details</h1>
            <div className="flex justify-center">
                <Button
                    color="blue"
                    onClick={() => setShowModal(true)}
                >
                    Donate Now
                </Button>
            </div>

            <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>Donate Now</ModalHeader>
                <ModalBody>
                    <div className="mb-4">
                        <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">Donation Amount</label>
                        <Input
                            type="number"
                            id="donationAmount"
                            name="donationAmount"
                            placeholder="Enter donation amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            required
                            fullWidth
                        />
                    </div>
                    {/* Stripe Credit Card Element */}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="blue"
                        onClick={handleDonate}
                    >
                        Donate
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Recommended Donation Section */}
        </div>
    );
}

export default Donationdetails;
