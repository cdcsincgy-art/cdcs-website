import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-5 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-base text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
        <Button href="/quote/" variant="ghost" size="lg" icon={<IconArrowRight className="h-4 w-4" />}>
          Request a Quote
        </Button>
      </div>
    </section>
  );
}
