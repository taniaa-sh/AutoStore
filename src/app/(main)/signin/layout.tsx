export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body className="bg-gray-100 h-full w-full">
        {children}
      </body>
  );
}
