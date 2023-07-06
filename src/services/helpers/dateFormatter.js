export default function formatCreatedAt(createdAt) {
  if (!createdAt || !createdAt._seconds) {
    return '';
  }

  const date = new Date(createdAt._seconds * 1000);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}
