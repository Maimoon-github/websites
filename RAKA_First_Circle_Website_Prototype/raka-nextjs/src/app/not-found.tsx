import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header variant="guide" />
      <main
        id="main"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 20px",
          background:
            "radial-gradient(ellipse at center, #1b1813 0%, #0b0b0a 70%)",
        }}
      >
        <div className="container" style={{ maxWidth: "600px" }}>
          <p className="overline">404 — NOT FOUND</p>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(48px, 6vw, 72px)",
              margin: "20px 0",
              fontWeight: 400,
            }}
          >
            Page not <em>found.</em>
          </h1>
          <p
            style={{
              color: "#b5b0a7",
              lineHeight: 1.8,
              marginBottom: "35px",
            }}
          >
            The page you are looking for does not exist or may have moved.
          </p>
          <Link href="/" className="btn btn-gold">
            Return to First Circle <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
