function StripeButton() {
    const handleButtonClick = () => {
        // Redirects directly to the external link
        window.location.href = "https://buy.stripe.com/bIY01o7n57T8gx28wz"; // Change to your desired URL
    };

    return (
        <div>
            <button className='btn btn-light btn-lg' onClick={handleButtonClick}>Access API</button>
        </div>
    );
}

export default StripeButton;
