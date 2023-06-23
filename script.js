// Generate a unique link
function generateUniqueLink() {
    var timestamp = Date.now();
    return 'resume-' + timestamp;
  }
  
  // Submit the form
  function submitForm() {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var dob = document.getElementById('dob').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var experience = document.getElementById('experience').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
  
    var user = {
      name: name,
      age: age,
      dob: dob,
      phone: phone,
      email: email,
      address: address,
      experience: experience,
      education: education,
      skills: skills
    };
  
    var uniqueLink = generateUniqueLink();
    user.uniqueLink = uniqueLink;
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.push(user);
        saveDataToJsonFile(data);
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  }
  
  // Save the JSON data to a file
  function saveDataToJsonFile(data) {
    var jsonData = JSON.stringify(data);
  
    var blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data.json');
  
    var uniqueLink = data[data.length - 1].uniqueLink;
    window.location.href = 'resume.html?id=' + uniqueLink;
  }
  
  // Retrieve resume data from JSON file and display it
  function retrieveResumeData() {
    var urlParams = new URLSearchParams(window.location.search);
    var uniqueLink = urlParams.get('id');
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        var userData = data.find(user => user.uniqueLink === uniqueLink);
        if (userData) {
          displayResume(userData);
        } else {
          console.error('User data not found');
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  }
  
  // Display the resume data
  function displayResume(userData) {
    var resumeContent = document.getElementById('resumeContent');
  
    var nameElement = document.createElement('p');
    nameElement.textContent = 'Name: ' + userData.name;
    resumeContent.appendChild(nameElement);
  
    var ageElement = document.createElement('p');
    ageElement.textContent = 'Age: ' + userData.age;
    resumeContent.appendChild(ageElement);
  
    var dobElement = document.createElement('p');
    dobElement.textContent = 'Date of Birth: ' + userData.dob;
    resumeContent.appendChild(dobElement);
  
    var phoneElement = document.createElement('p');
    phoneElement.textContent = 'Phone: ' + userData.phone;
    resumeContent.appendChild(phoneElement);
  
    var emailElement = document.createElement('p');
    emailElement.textContent = 'Email: ' + userData.email;
    resumeContent.appendChild(emailElement);
  
    var addressElement = document.createElement('p');
    addressElement.textContent = 'Address: ' + userData.address;
    resumeContent.appendChild(addressElement);
  
    var experienceElement = document.createElement('p');
    experienceElement.textContent = 'Experience: ' + userData.experience;
    resumeContent.appendChild(experienceElement);
  
    var educationElement = document.createElement('p');
    educationElement.textContent = 'Education: ' + userData.education;
    resumeContent.appendChild(educationElement);
  
    var skillsElement = document.createElement('p');
    skillsElement.textContent = 'Skills: ' + userData.skills;
    resumeContent.appendChild(skillsElement);
  }
  
  // Call the necessary function based on the current page
  if (window.location.pathname === '/form.html') {
    retrieveResumeData();
  } else if (window.location.pathname === '/resume.html') {
    retrieveResumeData();
  } else {
    // Home page
  }
  