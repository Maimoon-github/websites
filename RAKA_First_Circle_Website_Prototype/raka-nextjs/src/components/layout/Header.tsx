import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  variant?: "home" | "guide";
}

export default function Header({ variant = "home" }: HeaderProps) {
  const isGuide = variant === "guide";

  return (
    <header className="site-header">
      <div className="container nav">
        <Link
          className="brand"
          href={isGuide ? "/" : "#top"}
          aria-label="RAKA — top of page"
        >
          <Image
            src="/brand/raka-wordmark.png"
            width={140}
            height={58}
            alt="RAKA"
            priority
            style={{ width: "110px", height: "46px", objectFit: "contain" }}
          />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-suffix">FIRST CIRCLE</span>
        </Link>

        {!isGuide && (
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#idea">Our thinking</a>
            <a href="#benefits">Your invitation</a>
            <a href="#questions">Questions</a>
          </nav>
        )}

        {isGuide ? (
          <Link className="nav-cta" href="/#join">
            Back to the Circle <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <a className="nav-cta" href="#join">
            Join the Circle <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </header>
  );
}
