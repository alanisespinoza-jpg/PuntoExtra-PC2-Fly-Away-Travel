import { useState } from "react";
import {
  IconPlaneDeparture,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

const links = [
  {
    label: "Buscar vuelos",
    href: "/search",
    icon: <IconPlaneDeparture className="h-5 w-5 shrink-0 text-[#7c1fa0]" />,
  },
  {
    label: "Mis Reservas",
    href: "/my-bookings",
    icon: <IconCalendarEvent className="h-5 w-5 shrink-0 text-[#7c1fa0]" />,
  },
];

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-start gap-2">
        <div className="flex flex-col gap-1 w-full mt-2">
          {links.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              className="text-[#1e1b4b] font-medium"
            />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
