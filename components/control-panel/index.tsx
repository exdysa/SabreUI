"use client";

import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FilePlusIcon, UpdateIcon, PinTopIcon, PinBottomIcon, TrashIcon, GearIcon } from "@radix-ui/react-icons";
import NodePickerComponent from "./node-picker";
import WorkflowPageComponent from "./workflow-page";
import { QueuePromptButton } from "../queue-prompt-button";

enum TABS {
  NODES = "Nodes",
  WORKFLOW = "Workflow",
  GALLERY = "Gallery",
}

const TooltipButton = ({ content, children }: any) => 
  <Tooltip>
    <TooltipTrigger asChild>
      {children}
    </TooltipTrigger>
    <TooltipContent side="left" className="text-xs">
      {content}
    </TooltipContent>
  </Tooltip>

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState(TABS.NODES);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetTriggerClick = (tab: TABS) => {
    if (activeTab === tab) {
      setIsSheetOpen(!isSheetOpen);
    } else {
      setActiveTab(tab);
      setIsSheetOpen(true);
    }
  };

  const tabs = useMemo(
    () => [
      {
        label: TABS.NODES,
        key: TABS.NODES,
        children: <NodePickerComponent />,
      },
      {
        label: TABS.WORKFLOW,
        key: TABS.WORKFLOW,
        children: <WorkflowPageComponent />,
      },
      // {
      //   label: TABS.GALLERY,
      //   key: TABS.GALLERY,
      //   children: <GalleryComponent />,
      // },
    ],
    []
  );

  return (
    <Sheet modal={false} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div className="fixed right-4 top-4 flex flex-col gap-3 m-2">
        <TooltipProvider delayDuration={50}>
          <TooltipButton content="Queue prompt">
            <QueuePromptButton />
          </TooltipButton>

          <TooltipButton content="Save/load workflows">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick(TABS.WORKFLOW)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <FilePlusIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Recalculate node positions">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick(TABS.WORKFLOW)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <UpdateIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Toggle parameter dropdowns">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick(TABS.WORKFLOW)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <PinBottomIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Clear">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick(TABS.WORKFLOW)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <TrashIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>

          <TooltipButton content="Settings">
            <SheetTrigger asChild>
              <Button
                onClick={() => handleSheetTriggerClick(TABS.WORKFLOW)}
                className="relative rounded-3xl shadow-lg hover:bg-background hover:rounded-lg transition-all duration-200 h-12 w-12"
                variant="outline"
              >
                <GearIcon />
              </Button>
            </SheetTrigger>
          </TooltipButton>
        </TooltipProvider>
      </div>
      <SheetContent side={"left"} className="overflow-y-scroll">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TABS)}
          className="mt-8"
        >
          <div className="px-2">
            <TabsList className="w-full mb-4">
              {tabs.map((tab) => (
                <TabsTrigger className="w-full" key={tab.key} value={tab.key}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {tab.children}
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default React.memo(ControlPanel);