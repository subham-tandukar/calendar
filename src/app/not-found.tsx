import Image from "next/image";

export default function NotFound() {
  return (
    <div className="main-section">
      <div className="okv4-container ">
        <div className="error-404">
          <Image className="ok-not-found-img" width={900} height={500} src="/img/404.png" alt="Page not found" />
        </div>
      </div>
    </div>
  );
}