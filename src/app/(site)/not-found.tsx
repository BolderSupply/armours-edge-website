import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 sm:py-32">
      <h1 className="text-5xl text-evergreen sm:text-7xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-xl text-ink/85">
        That page doesn&apos;t exist or has moved. Try our projects or services, or get in touch.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/projects" className="btn btn-solid">
          See our projects
        </Link>
        <Link href="/" className="btn btn-line">
          Back to home
        </Link>
      </div>
    </section>
  );
}
