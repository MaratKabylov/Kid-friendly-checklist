const colors = ['blue', 'purple', 'pink', 'yellow', 'orange', 'indigo'];

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}