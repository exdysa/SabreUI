"use client";

import { useAppStore } from "@/store";
import type { Widget } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import NodePickerGroup from "./node-picker-group";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ContextMenuSeparator } from "@/components/ui/context-menu";

const NodePickerComponent = ({ setActiveItem }: any) => {
  const { widgets, onAddNode } = useAppStore(
    useShallow((state) => ({
      widgets: state.widgets,
      onAddNode: state.onAddNode,
    }))
  );
  const [category, setCategory] = useState<any>({});
  const [keywords, setKeywords] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const byCategory: any = {};

    const addWidgetToCategory = (categoryPath: string[], widget: Widget) => {
      let currentLevel = byCategory;
      categoryPath.forEach((category, index) => {
        if (!currentLevel[category]) {
          currentLevel[category] = { widgets: [], subcategories: {} };
        }
        if (index === categoryPath.length - 1) {
          currentLevel[category].widgets.push(widget);
        }
        currentLevel = currentLevel[category].subcategories;
      });
    };

    let widgetsValues = Object.values(widgets);
    if (keywords) {
      widgetsValues = widgetsValues.filter((widget) =>
        widget.name.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    for (const widget of widgetsValues) {
      const categoryPath = widget.category.split("/");
      addWidgetToCategory(categoryPath, widget);
    }

    setCategory(byCategory);
  }, [widgets, keywords]);

  const handleKeywordsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(event.target.value);
    }, []
  );

  return (
    <div className="flex flex-col max-w-[15rem] overflow-hidden">
      <div className="flex px-2 w-[15rem] overflow-hidden">
        <div className="relative w-full max-w-[15rem]">
          <input
            name="search"
            type="text"
            className="px-9 flex h-6 w-max rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search..."
            onChange={handleKeywordsChange}
            onKeyDown={e => e.stopPropagation()}
            autoFocus={true}
          />
          <div
            className="absolute inset-y-0 left-0 pl-2  
              flex items-center  
              pointer-events-none"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <ContextMenuSeparator />

      <div className="flex flex-row flex-col t-0 l-0 w-[15.95rem] overflow-y-scroll" style={{ maxHeight: '14rem' }}>
        {Object.entries(category).map(([cat, items], index) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.01,
              duration: 0.2,
            }}
          >
            <NodePickerGroup
              key={cat}
              category={cat}
              items={items}
              setActiveItem={setActiveItem}
              onAddNode={onAddNode}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NodePickerComponent);