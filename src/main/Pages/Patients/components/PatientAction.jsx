import React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MoreHorizontal,
  Edit,
  Copy,
  Archive,
  AlertCircle,
  CalendarPlus,
  FileText,
} from "lucide-react";

const PatientAction = () => {
  const actions = [
    {
      icon: CalendarPlus,
      label: "Add Appointments",
      onClick: () => console.log("Edit clicked"),
    },
    {
      icon: FileText,
      label: "View Records",
      onClick: () => console.log("Archive clicked"),
    },
    {
      icon: Archive,
      label: "Archive",
      onClick: () => console.log("Archive clicked"),
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="grid gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm"
              onClick={action.onClick}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PatientAction;
