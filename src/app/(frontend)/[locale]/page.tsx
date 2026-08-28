export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Bone</h1>
      <p className="text-sm text-black/60 dark:text-white/60">
        Le contenu se gère depuis{" "}
        <a className="underline underline-offset-4" href="/admin">
          le back-office
        </a>
        .
      </p>
    </main>
  );
}
