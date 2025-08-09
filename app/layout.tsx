import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

const navbar = <Navbar logo={<b>Карманная книга</b>} />;
const footer = <Footer>2025-{new Date().getFullYear()} © FOCKUSTY</Footer>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          docsRepositoryBase="https://github.com/focksuty/type-handbook-nextjs/tree/main"
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
