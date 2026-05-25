export type Credential = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  href?: string;
};

// Ordered most recent first. "Currently attending" sits at the top.
export const credentials: Credential[] = [
  {
    title: "5G Academy",
    issuer: "Federico II in partnership with Nokia, TIM, and PagoPA",
    date: "Currently attending",
    detail:
      "Postgraduate programme on 5G and digital transformation. Industry-aligned curriculum delivered jointly with EU telecom and public-tech partners.",
    href: "https://www.5gacademy.unina.it/",
  },
  {
    title: "Federico II Apple Foundation Program",
    issuer: "Università degli Studi di Napoli Federico II, Apple Developer Academy",
    date: "January 2025",
    detail:
      "Signed by Giorgio Ventre, Scientific Director of the Apple Developer Academy at Federico II.",
    href: "/credentials/apple-foundation-attendance.pdf",
  },
  {
    title: "Fater S.p.A. Business Game (P&G + Angelini)",
    issuer:
      "Fater S.p.A. in collaboration with the MSc Data Science programme, Federico II",
    date: "April 2024",
    detail:
      "Attendance signed by Fater's Sales & Digital Business Analyst Manager, Head of Data & Analytics, and Sales & Digital Data Scientist Project Manager.",
    href: "/projects/retail-geospatial/fater-attendance.pdf",
  },
];
