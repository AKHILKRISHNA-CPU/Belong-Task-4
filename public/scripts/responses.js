function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "hi") {
        return "Hello there!";
    } else if (input == "This is Akhil") {
        return "Hey Akhil How Do You Do!";
    } 
    else if (input == "Book Appointment") {
        return "There are differnet time Slots Avaliable!";
    }
    else if (input == "Book at 10am") {
        return "Your appointment booked!";
    }
    else if (input == "goodbye") {
        return "Talk to you later!";
    }
    else {
        return "Try asking something else!";
    }
}