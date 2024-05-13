import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/sheet";
import { Button } from "@/components/shadcn/button";

import { mainMenu } from "@/config/menu";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Logo } from "../logo";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shadcn/Accordion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="supports-backdrop-blur sticky top-0 z-50 w-full bg-background/90 backdrop-blur">
      <div className="container px-4 md:px-8 flex h-[80px] items-center">
        <div className="mr-4 hidden md:flex">
          <NavLink to="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </NavLink>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {mainMenu.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.to ?? ""}
                className={({ isActive }) =>
                  cn(
                    "text-xl font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )
                }
              >
                {menu.title}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* mobile */}
        <a href="/" className=" flex items-center space-x-2 md:hidden">
          <NavLink to="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </NavLink>
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <ViewVerticalIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2"
            >
              <Logo />
            </NavLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  "item-" +
                  mainMenu.findIndex((item) =>
                    item.items !== undefined
                      ? item.items
                          .filter((subitem) => subitem.to !== undefined)
                          .map((subitem) => subitem.to)
                          .includes(location.pathname)
                      : false
                  )
                }
              >
                <div className="flex flex-col space-y-3">
                  {mainMenu.map((menu, index) =>
                    menu.items !== undefined ? (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b-0 pr-6"
                      >
                        <AccordionTrigger
                          className={cn(
                            "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                            menu.items
                              .filter((subitem) => subitem.to !== undefined)
                              .map((subitem) => subitem.to)
                              .includes(location.pathname)
                              ? "text-foreground"
                              : "text-foreground/60"
                          )}
                        >
                          <div className="flex">{menu.title}</div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4">
                          <div className="mt-1">
                            {menu.items.map((submenu, subindex) =>
                              submenu.to !== undefined ? (
                                <NavLink
                                  key={subindex}
                                  to={submenu.to}
                                  onClick={() => setOpen(false)}
                                  className={({ isActive }) =>
                                    cn(
                                      "block justify-start py-1 h-auto font-normal hover:text-primary",
                                      isActive
                                        ? "text-foreground"
                                        : "text-foreground/60"
                                    )
                                  }
                                >
                                  {submenu.title}
                                </NavLink>
                              ) : submenu.label !== "" ? null : (
                                <div className="px-3">
                                  {/* <Separator /> */}
                                </div>
                              )
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <NavLink
                        key={index}
                        to={menu.to ?? ""}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "py-1 text-sm font-medium transition-colors hover:text-primary",
                            isActive ? "text-foreground" : "text-foreground/60"
                          )
                        }
                      >
                        {menu.title}
                      </NavLink>
                    )
                  )}
                </div>
              </Accordion>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* right */}
        <div className="flex flex-1 items-center  space-x-2 justify-end">
          <ConnectButton chainStatus="none" />
        </div>
      </div>
    </header>
  );
}
