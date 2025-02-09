// Notification function to display real-time feedback
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = type === "error" ? "notification error" : "notification success";
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }
  
  // Example of form validation
  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    
    if (!name || !email || !phone) {
      showNotification("Please fill in all fields.", "error");
      return false;
    }
    showNotification("Profile updated successfully!", "success");
    return true;
  }
  
  // Handling button clicks
  document.getElementById("updateInfo").addEventListener("click", () => {
    if (validateForm()) {
      // Perform the update logic here
    }
  });
  
  document.getElementById("saveEmergencyContact").addEventListener("click", () => {
    const emergencyName = document.getElementById("emergency-name").value;
    const emergencyPhone = document.getElementById("emergency-phone").value;
    const relationship = document.getElementById("relationship").value;
  
    if (!emergencyName || !emergencyPhone || !relationship) {
      showNotification("Please complete the emergency contact information.", "error");
    } else {
      showNotification("Emergency contact saved.", "success");
    }
  });
  