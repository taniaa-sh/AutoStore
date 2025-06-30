export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 h-full w-full">
        {children}
      </body>
    </html>
  );
}
