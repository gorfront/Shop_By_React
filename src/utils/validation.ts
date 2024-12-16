export const validateRegistrationForm = (formData: any) => {
  const errors: Record<string, string> = {};

  if (formData.name.firstname.trim().length < 2) {
    errors.firstname = "First name must be at least 2 characters.";
  }
  if (formData.name.lastname.trim().length < 2) {
    errors.lastname = "Last name must be at least 2 characters.";
  }
  if (formData.username.trim().length < 2) {
    errors.username = "Username must be at least 2 characters.";
  }
  if (formData.city.trim().length < 2) {
    errors.city = "City must be at least 2 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format. (example@example.com)";
  }
  if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!/^[0-9]+$/.test(formData.phone)) {
    errors.phone = "Phone number must contain only digits.";
  }

  return errors;
};
