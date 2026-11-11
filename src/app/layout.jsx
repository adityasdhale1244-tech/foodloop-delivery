import './globals.css';

export const metadata = {
  title: 'FoodLoop — Food delivery, made delightful',
  description: 'Discover the best restaurants, dishes and delivery deals near you.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
