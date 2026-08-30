import { Button } from "@/components/ui/Button";
import { IconWhatsapp, IconArrowRight } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function CTABanner({
  title = "Need a Professional Cleaning Solution?",
  description = "Tell us what needs to be cleaned and our team will help determine the right service for your property, fleet, or facility.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(28,123,214,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(231,161,37,0.25), transparent 45%)",
        }}
      />
      <div className="container-page relative py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/quote/" variant="accent" size="lg" icon={<IconArrowRight className="h-5 w-5" />}>
              Request a Quote
            </Button>
            <Button
              href={siteConfig.contact.whatsappHrefWithMessage("Hello CDCS, I'd like to request a quote.")}
              variant="outline"
              size="lg"
              icon={<IconWhatsapp className="h-5 w-5" />}
              external
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
