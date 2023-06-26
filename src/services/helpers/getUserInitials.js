// Function to get user initials
export default function getUserInitials(fullName) {
  if (!fullName) {
    return '';
  }

  const firstNameInitial = fullName.firstName ? fullName.firstName[0] : '';
  const lastNameInitial = fullName.lastName ? fullName.lastName[0] : '';

  return `${firstNameInitial}${lastNameInitial}`;
}
