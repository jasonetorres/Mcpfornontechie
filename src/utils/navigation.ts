// Navigation utility to ensure pages scroll to top
export const navigateToTop = (path: string) => {
  window.location.href = path;
  // Alternative approach using React Router with scroll behavior
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};