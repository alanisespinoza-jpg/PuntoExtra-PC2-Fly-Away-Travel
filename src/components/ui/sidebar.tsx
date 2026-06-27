import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export interface NavLink {
  label: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-6 hidden md:flex md:flex-col shrink-0 border-r border-purple-100 bg-white",
        className
      )}
      animate={{ width: animate ? (open ? "220px" : "60px") : "220px" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const MobileSidebar = ({
  className,
  children,
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div className="md:hidden">
      <div className="flex items-center px-4 py-3 bg-white border-b border-purple-100">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#7c1fa0] text-xl font-bold leading-none"
        >
          ☰
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl p-6 flex flex-col",
                className
              )}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
}: {
  link: NavLink;
  className?: string;
}) => {
  const { open, animate } = useSidebar();

  const label = (
    <motion.span
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      transition={{ duration: 0.15 }}
      className="text-sm whitespace-pre !m-0 !p-0 group-hover/sidebar-link:translate-x-1 transition-transform duration-150"
    >
      {link.label}
    </motion.span>
  );

  const sharedClass = cn(
    "flex items-center gap-3 group/sidebar-link py-2.5 px-2 rounded-lg hover:bg-purple-50 transition-colors duration-150 w-full",
    className
  );

  if (link.onClick) {
    return (
      <button onClick={link.onClick} className={sharedClass}>
        <span className="shrink-0">{link.icon}</span>
        {label}
      </button>
    );
  }

  return (
    <Link to={link.href || "/"} className={sharedClass}>
      <span className="shrink-0">{link.icon}</span>
      {label}
    </Link>
  );
};
