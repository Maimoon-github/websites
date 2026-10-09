interface PrototypeRibbonProps {
  text?: string;
}

export default function PrototypeRibbon({
  text = "INTERACTIVE PREVIEW — NO DATA IS SENT OR STORED",
}: PrototypeRibbonProps) {
  return (
    <div className="prototype-ribbon" role="note">
      <span className="ribbon-dot" aria-hidden="true" /> {text}
    </div>
  );
}
