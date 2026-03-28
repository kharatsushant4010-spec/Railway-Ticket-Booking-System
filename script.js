function startBooking() {
    document.getElementById('bookTicketText').style.display = 'none';
    document.getElementById('bookingContent').style.display = 'block';
}

document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateCustomerForm()) {
        document.getElementById('customerForm').style.display = 'none';
        document.getElementById('ticketForm').style.display = 'block';
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    }
});

document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateTicketForm()) {
        bookTicket();
    }
});

function validateCustomerForm() {
    let isValid = true;
    var name = document.getElementById('passengerName').value;
    var phone = document.getElementById('phoneNumber').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var dob = document.getElementById('dob').value;
    var gender = document.getElementById('gender').value;

    if (name.length < 6) {
        document.getElementById('nameError').textContent = 'Name must be at least 6 characters long';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (address.length < 5) {
        document.getElementById('addressError').textContent = 'Please enter a valid address';
        isValid = false;
    } else {
        document.getElementById('addressError').textContent = '';
    }

    if (!dob) {
        document.getElementById('dobError').textContent = 'Please enter a valid date of birth';
        isValid = false;
    } else {
        document.getElementById('dobError').textContent = '';
    }

    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select your gender';
        isValid = false;
    } else {
        document.getElementById('genderError').textContent = '';
    }

    return isValid;
}

function validateTicketForm() {
    let isValid = true;
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var date = document.getElementById('date').value;
    var passengers = document.getElementById('passengers').value;
    var travelClass = document.getElementById('class').value;

    if (!from) {
        document.getElementById('fromError').textContent = 'Please enter a starting location';
        isValid = false;
    } else {
        document.getElementById('fromError').textContent = '';
    }

    if (!to) {
        document.getElementById('toError').textContent = 'Please enter a destination';
        isValid = false;
    } else {
        document.getElementById('toError').textContent = '';
    }

    if (!date) {
        document.getElementById('dateError').textContent = 'Please enter a valid travel date';
        isValid = false;
    } else {
        document.getElementById('dateError').textContent = '';
    }

    if (passengers <= 0) {
        document.getElementById('passengersError').textContent = 'Please enter a valid number of passengers';
        isValid = false;
    } else {
        document.getElementById('passengersError').textContent = '';
    }

    if (!travelClass) {
        document.getElementById('classError').textContent = 'Please select a travel class';
        isValid = false;
    } else {
        document.getElementById('classError').textContent = '';
    }

    return isValid;
}

function bookTicket() {
    document.getElementById('ticketForm').style.display = 'none';
    document.getElementById('bookingDetails').style.display = 'block';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');

    // Store booking details for receipt generation
    window.bookingDetails = {
        customer: {
            name: document.getElementById('passengerName').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value
        },
        journey: {
            from: document.getElementById('from').value,
            to: document.getElementById('to').value,
            date: document.getElementById('date').value,
            passengers: document.getElementById('passengers').value,
            travelClass: document.getElementById('class').value,
            price: calculatePrice()
        }
    };
}

function calculatePrice() {
    const basePrice = 500; // Example base price
    var passengers = document.getElementById('passengers').value;
    return basePrice * passengers; // Calculate price based on passengers
}

function generateReceipt() {
    var { customer, journey } = window.bookingDetails;

    var customerDetails = `
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <p><strong>Date of Birth:</strong> ${customer.dob}</p>
        <p><strong>Gender:</strong> ${customer.gender}</p>
    `;

    var journeyDetails = `
        <p><strong>From:</strong> ${journey.from}</p>
        <p><strong>To:</strong> ${journey.to}</p>
        <p><strong>Date:</strong> ${journey.date}</p>
        <p><strong>Passengers:</strong> ${journey.passengers}</p>
        <p><strong>Class:</strong> ${journey.travelClass}</p>
        <p><strong>Total Price:</strong> Rs. ${journey.price}</p>
    `;

    document.getElementById('ticketReceipt').innerHTML = `
        <h2>Ticket Receipt</h2>
        <div>${customerDetails}</div>
        <div>${journeyDetails}</div>
        <p>Thank you for booking with us!</p>
    `;
    document.getElementById('ticketReceipt').style.display = 'block';
    document.getElementById('generateReceiptBtn').style.display = 'none';
}
