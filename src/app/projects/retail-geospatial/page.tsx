import type { Metadata } from "next";
import { Database, Map, BarChart3, Layers, Award, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { ProjectGallery, ExternalEmbed } from "@/components/ProjectGallery";
import { ProjectDeepHero, DeepSection } from "@/components/ProjectDeepHero";
import { HypothesisCallout } from "@/components/HypothesisCallout";
import { getProject } from "@/lib/projects";
import { getProjectAssets } from "@/lib/project-assets";

const project = getProject("retail-geospatial")!;
const assets = getProjectAssets("retail-geospatial");

export const metadata: Metadata = {
  title: project.shortTitle,
  description: project.tagline,
  alternates: { canonical: "/projects/retail-geospatial" },
};

const stats = [
  { label: "Data sources", value: "Stores + census" },
  { label: "Join", value: "Point-in-polygon" },
  { label: "Team", value: "4 people" },
  { label: "Public data", value: "Synthetic" },
];

export default function RetailGeospatialPage() {
  return (
    <article className="container max-w-5xl py-16 md:py-24">
      <ProjectDeepHero project={project} assets={assets} stats={stats} />

      <HypothesisCallout>
        Can store locations and census districts be joined spatially to
        compare districts of different sizes by store potential per
        resident, and show the result on a single map?
      </HypothesisCallout>

      <FadeIn>
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-4 w-4 text-amber-400" />
            <div className="text-sm leading-relaxed text-muted">
              <p className="font-semibold text-amber-200">
                Mock data, real methodology
              </p>
              <p className="mt-2">
                Fater&apos;s data was provided for educational use only. The
                map below and the public repo use synthetic data that
                mirrors the structure of the original. The spatial join and
                the per-capita store-potential metric are the same method;
                the numbers are not real.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <DeepSection
          eyebrow="Overview"
          title="An industry challenge for a Procter and Gamble joint venture"
          icon={<Database className="h-4 w-4" />}
        >
          <p>
            Fater S.p.A. is the P&amp;G + Angelini Industries joint venture
            that owns Pampers Italia, Lines, and Tampax for the Italian
            market. The brief, set as part of the Statistical Learning and
            Data Analysis course at Federico II: estimate the potential of
            sales points in the children&apos;s diapers category by
            neighbourhood, combining Fater&apos;s store data with census
            data.
          </p>
          <p>
            A university team of four: Shayan Ekramnia, Farshad Farahtaj,
            Sara Aboudarda and me. I did the statistics and analysis part.
          </p>
        </DeepSection>

        <DeepSection
          eyebrow="Methodology"
          title="From store points to a per-capita district map"
          icon={<Map className="h-4 w-4" />}
        >
          <p>
            Three steps, in order:
          </p>
          <ol className="ml-6 list-decimal space-y-2">
            <li>
              <strong className="text-text">Load.</strong> Store records
              (location, store type, sales area, Fater&apos;s potential
              score) came from a MySQL database; census district polygons
              and population came from ISTAT.
            </li>
            <li>
              <strong className="text-text">Spatial join.</strong> A
              GeoPandas point-in-polygon pipeline (EPSG:4326) attached each
              store to its district polygon so per-district counts could be
              computed from raw store points.
            </li>
            <li>
              <strong className="text-text">Per-capita metric.</strong> The
              summed store-potential score of each district, divided by its
              population, so districts of different sizes can be compared.
            </li>
          </ol>
        </DeepSection>

        <DeepSection
          eyebrow="Interactive map (mock data)"
          title="Choropleth of per-capita store potential"
          icon={<Map className="h-4 w-4" />}
        >
          <p>
            The map below shows the method on synthetic data (see the note
            at the top of this page), so the approach can be inspected
            without the original data.
          </p>
          {assets.externalEmbed ? (
            <div className="mt-6">
              <ExternalEmbed {...assets.externalEmbed} />
            </div>
          ) : null}
        </DeepSection>

        <DeepSection
          eyebrow="Static deliverable"
          title="Choropleth of potential per resident (synthetic data)"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <ProjectGallery charts={assets.charts} cols={1} />
        </DeepSection>

        <DeepSection
          eyebrow="Certificate"
          title="Attendance certificate from Fater leadership"
          icon={<Award className="h-4 w-4" />}
        >
          <p>
            Signed by Fater&apos;s Sales &amp; Digital Business Analyst
            Manager, Head of Data &amp; Analytics, and Sales &amp; Digital
            Data Scientist Project Manager. The certificate names the exact
            brief (a Neighborhood Analytics model for sales-point potential
            in the children&apos;s diapers category) and confirms the
            collaboration with the MSc Data Science programme at Federico II.
          </p>
          <a
            href="/projects/retail-geospatial/fater-attendance.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-text hover:border-accent/60 hover:text-accent transition-colors"
          >
            <Award className="h-4 w-4" />
            <span className="flex flex-col">
              <span className="font-medium">View the certificate (PDF)</span>
              <span className="text-xs text-muted">
                Issued 11 April 2024, Naples
              </span>
            </span>
          </a>
        </DeepSection>

        <DeepSection
          eyebrow="Tech stack"
          title="Frameworks and infrastructure"
          icon={<Layers className="h-4 w-4" />}
        >
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Source code on{" "}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </DeepSection>
      </FadeIn>
    </article>
  );
}
