import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { contentUpdated } from "@/content/dates";
import { formatDate } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero, PageHeroFallback } from "@/components/sections/page-hero";

const updated = contentUpdated.legal;

const legalPages = {
  privacy: {
    title: "Privacy Policy",
    description: `How ${site.name} collects, uses and protects personal information shared through this website.`,
    sections: [
      {
        h: "Who we are",
        p: [
          `${site.legalName} ("Zeta", "we", "us") operates ${site.url}. We are the controller of the personal information described in this policy. For any privacy question or request, email ${site.email} or call ${site.phoneDisplay}.`,
        ],
      },
      {
        h: "What we collect",
        p: [
          "Information you give us: the project form on this website does not send or store anything itself. It prepares an email in your own mail app, which you choose whether to send. When you email us, we receive your name, email address and anything else you include, such as your company, phone number, the services you are interested in, a budget range and your message.",
          "Technical information: like most websites, our hosting provider automatically processes basic request data such as IP address, browser type and the pages requested, to deliver the site securely and to prevent abuse. We do not use advertising cookies or cross-site tracking.",
        ],
      },
      {
        h: "How we use it",
        p: [
          "We use the information you send us only to reply to your enquiry, to discuss and scope a potential project, and to keep a record of our correspondence. We use technical information to operate, secure and improve the website.",
          "We do not sell personal information, and we do not use it for automated decisions that affect you.",
        ],
      },
      {
        h: "Who we share it with",
        p: [
          "We share personal information only with service providers that help us run the website and handle email, such as our hosting and email providers. They process it on our behalf and only for that purpose.",
          "We may disclose information where required by law or to protect our rights, users or the public.",
        ],
      },
      {
        h: "How long we keep it",
        p: [
          "We keep enquiry correspondence for as long as needed to respond and for a reasonable period afterwards to maintain business records, normally no longer than three years unless we go on to work together, in which case contract records are kept as required by law.",
        ],
      },
      {
        h: "Your rights",
        p: [
          `You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, at any time by emailing ${site.email}. We will respond within 30 days. Depending on where you live, you may also have the right to complain to your local data protection authority.`,
        ],
      },
      {
        h: "Security",
        p: [
          "The website is served over HTTPS, and access to enquiries is limited to the people at Zeta who need it to respond. No method of transmission or storage is completely secure, but we take reasonable measures to protect the information you share.",
        ],
      },
      {
        h: "Changes to this policy",
        p: ["We may update this policy from time to time. The date at the top of this page shows when it last changed."],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    description: `The terms that apply when you use the ${site.name} website and its content.`,
    sections: [
      {
        h: "About these terms",
        p: [
          `These terms apply to your use of ${site.url}, operated by ${site.legalName}. By using the website you agree to them. If you do not agree, please do not use the site.`,
        ],
      },
      {
        h: "Information on this website",
        p: [
          "The content on this website is provided for general information about our services. It is not professional advice for your specific situation, and it may change without notice.",
          "Case studies are labelled by status. Solution blueprints and discovery-stage engagements describe proposed approaches and the measures we would use; they are not claims of delivered results. Interface images marked as illustrative are design concepts.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          `Unless stated otherwise, the content, design, text, graphics and logos on this website belong to ${site.legalName}. You may view and share links to our pages, but you may not copy, modify or republish substantial parts of the content without our written permission. Third-party names and trademarks belong to their respective owners.`,
        ],
      },
      {
        h: "Acceptable use",
        p: [
          "You agree not to misuse the website, including by attempting to gain unauthorised access, interfering with its operation, submitting false or malicious information through our forms, or using it to send unsolicited messages.",
        ],
      },
      {
        h: "Links to other websites",
        p: ["We link to third-party websites and sources for reference. We are not responsible for their content or practices."],
      },
      {
        h: "Project work",
        p: [
          "Any work we do for you is governed by a separate written agreement or statement of work. Nothing on this website creates a contract for services.",
        ],
      },
      {
        h: "Liability",
        p: [
          "We work to keep the website accurate and available, but we provide it \"as is\" without warranties of any kind. To the extent permitted by law, we are not liable for any loss arising from your use of, or reliance on, the website.",
        ],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of India. Any dispute relating to them will be subject to the jurisdiction of the courts of India."],
      },
      {
        h: "Contact",
        p: [`Questions about these terms can be sent to ${site.email}.`],
      },
    ],
  },
} as const;

type Slug = keyof typeof legalPages;

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug as Slug];
  return page ? pageMetadata({ title: page.title, description: page.description, path: `/legal/${slug}` }) : {};
}

export default function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<PageHeroFallback />}>
        <LegalContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function LegalContent({ params }: Pick<PageProps<"/legal/[slug]">, "params">) {
  const { slug } = await params;
  const page = legalPages[slug as Slug];
  if (!page) notFound();

  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: page.title, path: `/legal/${slug}` }])} />
      <PageHero
        eyebrow="Legal"
        title={[page.title]}
        description={
          <>
            Last updated <time dateTime={updated}>{formatDate(updated)}</time>
          </>
        }
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            {page.sections.map((s) => (
              <div key={s.h} className="flex flex-col gap-3">
                <h2 className="text-h4">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="text-fg-muted">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
