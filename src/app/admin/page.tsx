export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <span>hello</span>
      {" "}
      {/* Admin layout without navbar, footer, banner, and contact widget */}{" "}
      {children}{" "}
    </div>
  );
}
