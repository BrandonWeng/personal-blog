'use client'
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { GithubLogo, XLogo } from "@phosphor-icons/react";

const NavigationFields = {
  navbar: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/BrandonWeng",
        icon: GithubLogo,
      },
      X: {
        name: "X",
        url: "https://x.com/bxweng",
        icon: XLogo,
      },
    },
  },
};

export function Nav() {
  return (
      <Dock direction="middle">
        {NavigationFields.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Link
              href={item.href}
              prefetch={true}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-full",
              )}
            >
                {item.label}
            </Link>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(NavigationFields.contact.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-full",
              )}
            >
                <social.icon className="size-4" />
            </Link>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
            <ModeToggle />
        </DockIcon>
      </Dock>
  );
}
