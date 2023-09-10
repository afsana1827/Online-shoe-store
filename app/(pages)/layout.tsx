import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default PageLayout;
