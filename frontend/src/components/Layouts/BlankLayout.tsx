import React from "react";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <div className="min-h-screen flex items-center justify-center">{children}</div>;
};

export default BlankLayout;
