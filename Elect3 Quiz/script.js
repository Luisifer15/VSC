// Function to show a specific question
function showQuestion(questionNumber) {
    $(`#q${questionNumber}`).show();
}

// Function to hide a specific question
function hideQuestion(questionNumber) {
    $(`#q${questionNumber}`).hide();
}

// Add this function to your JavaScript file
function updateProgressBar(currentQuestion, totalQuestions) {
    let progress = (currentQuestion / totalQuestions) * 100;
    $("#progress-bar").css("width", `${progress}%`);
}

$(document).ready(function () {
    let currentQuestion = 1;
    let totalQuestions = 5;
    let score = 0;

    // Start the quiz by hiding landing page and showing the first question
    $("#start-quiz").click(function () {
        $("#landing-page").hide();
        $("#quiz-section").show();
        showQuestion(currentQuestion);
        updateProgressBar(currentQuestion, totalQuestions);
    });

    // Submit answer button functionality
    $(".submit-btn").click(function () {
        $(".feedback").stop(true, true).hide();
        let selectedAnswer = $(`input[name='q${currentQuestion}']:checked`).val();
        
        if (!selectedAnswer) {
            $("#no-answer-feedback").fadeIn().delay(2000).fadeOut();
            return;
        }

        // Check if the answer is correct
        if (selectedAnswer === "correct") {
            score++;
            $("#correct-feedback").fadeIn().delay(2000).fadeOut();
        } else {
            $("#incorrect-feedback").fadeIn().delay(2000).fadeOut();
        }

        // Move to the next question or end quiz
        if (currentQuestion < totalQuestions) {
            hideQuestion(currentQuestion);
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgressBar(currentQuestion, totalQuestions);
        } else {
            // End of quiz, show score
            $("#quiz-section").hide();
            $("#score").text(`You scored ${score} out of ${totalQuestions}`);
            $("#score-card").show();
        }
    });
    
    $("#restart-quiz").click(function () {
        
    $(".feedback").stop(true, true).hide();
        currentQuestion = 1;
        score = 0;
        $("input[type='radio']").prop("checked", false); // Deselect all radio buttons
        $("#score-card").hide();
        hideQuestion(totalQuestions);
        showQuestion(currentQuestion);
        $("#quiz-section").show();
        updateProgressBar(currentQuestion, totalQuestions);
        // Add a smooth scroll to top when restarting the quiz
        $('html, body').animate({scrollTop:0}, 'slow');
    });
});