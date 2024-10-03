$(document).ready(function() {

  $('#search-bar').on('keyup', function() {
    var searchText = $(this).val().toLowerCase(); // Get the value of the search bar and convert to lowercase
    
    // Loop through each project-box and hide or show based on the search query
    $('.project-box').each(function() {
      var projectName = $(this).find('h3').text().toLowerCase(); // Get the project name (inside h3 tag)
      
      // Check if the project name or description contains the search text
      if (projectName.includes(searchText)) {
        $(this).show(); // Show the project if it matches
      } else {
        $(this).hide(); // Hide the project if it doesn't match
      }
    });
  });

    // Load projects dynamically
    $.getJSON('projects.json', function(data) {
      let projectsGrid = $('#projects-grid');
      data.forEach(project => {
        projectsGrid.append(`
          <div class="project-box">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-links">
              <a href="${project.liveLink}" target="_blank">Live Version</a>
              <a href="${project.repoLink}" target="_blank">Repository</a>
            </div>
          </div>
        `);
      });
    });
  
    // Filter projects
    $('.filter-btn').click(function() {
      let filter = $(this).data('filter');
      $('.project-box').show();
      if (filter !== 'all') {
        $('.project-box').not(`[data-category="${filter}"]`).hide();
      }
    });
  
    // Smooth scrolling
    $('a[href*="#"]').click(function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $(this.hash).offset().top
        }, 800);
      }
    });
  
    // Form validation and submission
      // Intercept the form submission
      $('#contact-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Collect form data
        var formData = {
          'entry.1632585306': $('#employer').val(),
          'entry.706469862': $('#message').val()
        };
    
        // Submit the form data using jQuery's ajax function
        $.ajax({
          url: 'https://docs.google.com/forms/d/1maG5lDmLUilROsx8NaBzu4AyRFtsBH7dztKuN5BQAR4/formResponse', // Google Form action URL
          type: 'POST',
          data: formData,
          dataType: 'xml', // Expect XML response (Google Forms response format)
          success: function() {
            // Display success message
            alert('Thank you! Your message has been sent.');
            $('#contact-form')[0].reset(); // Reset form fields
          },
          error: function() {
            // Display error message
            alert('Thank you! Your message has been sent.');
          }
        });
    });    
    
});