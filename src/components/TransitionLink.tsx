"use client";
import React from "react";
import NextLink, { LinkProps } from "next/link";
import { usePageTransition } from "./PageTransition";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const TransitionLink = ({ href, children, onClick, ...props }: TransitionLinkProps) => {
  const { navigate } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If there is an existing onClick handler, call it
    if (onClick) onClick(e);

    // Prevent default Next.js navigation
    e.preventDefault();

    const target = href.toString();
    
    // Check if external link
    if (target.startsWith("http") || target.startsWith("mailto:") || target.startsWith("tel:")) {
        window.location.href = target;
        return;
    }

    // Trigger custom transition
    navigate(target);
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
};

export default TransitionLink;
