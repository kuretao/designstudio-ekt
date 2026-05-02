"use client";

import Link from "next/link";

function NotFoundPage() {
  return (
    <section className="page-in flex min-h-screen items-center px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#C58351]">404</p>
        <h1 className="text-6xl font-light tracking-[-0.06em] md:text-8xl">Страница не найдена</h1>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-[#C58351] px-7 py-4 text-xs uppercase tracking-[0.24em] text-[#050505]">
          На главную
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
