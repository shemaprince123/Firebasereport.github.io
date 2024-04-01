// Fetch the report.json file
fetch("report.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then((data) => {
    // Call function to populate content with data
    populateContent(data);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Function to populate content with data from report.json
function populateContent(data) {
  // Get the container element
  var container = document.getElementById("content");

  // Populate quiz questions
  var quizHTML = "<h2>Quiz</h2>";
  for (var question in data.Quiz) {
    quizHTML += `<div class="quiz-question">
                        <p>${question}</p>
                        <ul>`;
    for (var option in data.Quiz[question]) {
      quizHTML += `<li>${option} ${data.Quiz[question][option]}</li>`;
    }
    quizHTML += `</ul></div>`;
  }

  // Populate courses
  var coursesHTML = "<h2>Courses</h2>";
  for (var course in data.courses) {
    coursesHTML += `<div class="course">
                            <h3>${data.courses[course].courseName}</h3>
                            <p>${data.courses[course].courseDescription}</p>
                        </div>`;
  }

  // Populate progress data
  var progressHTML = "<h2>Progress</h2>";
  for (var key in data.progress) {
    progressHTML += `<div class="progress">
                            <p>Email: ${data.progress[key].email}</p>
                            <p>Full Name: ${data.progress[key].fullName}</p>
                            <p>Progress Data:</p>
                            <ul>`;
    for (var year in data.progress[key].data) {
      progressHTML += `<li>${year}: Profit/Loss: $${data.progress[key].data[year].profitLoss}</li>`;
    }
    progressHTML += `</ul></div>`;
  }

  // Populate user emails
  var userEmailsHTML = "<h2>User Emails</h2><ul>";
  for (var user in data.users) {
    userEmailsHTML += `<li>${data.users[user].email}</li>`;
  }
  userEmailsHTML += "</ul>";

  // Set the content of the container
  container.innerHTML = quizHTML + coursesHTML + progressHTML + userEmailsHTML;
}
