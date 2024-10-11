"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { ListXIcon, ListChecksIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

import Button from "~/ui/buttons";

interface SelectControlledProps {
  list: { label: string; value: string }[];
  singleSelect?: boolean;
  values: string[];
  onChange: (values: { label: string; value: string }[]) => void;
  title: string;
  className?: string;
  withSelectAll?: boolean;
}

export function SelectControlled({
  list = [],
  singleSelect = false,
  values,
  onChange,
  title,
  className = "",
  withSelectAll = false,
}: SelectControlledProps): JSX.Element {
  const selectAllState = values.length < list.length;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-1  px-2 text-center sm:px-0",
        className,
      )}
    >
      <MultiSelect
        className="input_shift min-w-0 "
        placeholder={title}
        placeholderSearch="جستجو..."
        defaultValue={[]}
        value={list.filter((a) => values.includes(a.value)).map((a) => a.label)}
        onValueChange={(c_values) => {
          if (values.length <= 0) return onChange([]);
          let _values = c_values.filter((a) => a);

          if (singleSelect) _values = [c_values[c_values.length - 1]];
          let result = _values.map((v) => {
            return list.find((a) => a.label === v);
          });

          onChange(result);
        }}
      >
        {list.map((item) => {
          return (
            <MultiSelectItem
              className="flex justify-start gap-2"
              key={item.value}
              value={item.label}
            />
          );
        })}
      </MultiSelect>
      {withSelectAll && list.length > 0 && (
        // <TooltipProvider>
        //   <Tooltip>
        //     <TooltipTrigger>
        <Button
          className={cn(
            "font-bold",
            selectAllState
              ? "border border-primary/20 p-1.5 text-emerald-600 transition-all duration-300 hover:bg-emerald-50/20"
              : "border border-primary/20 bg-primary/10 p-1.5 text-rose-600 transition-all duration-300 hover:bg-primary/20",
          )}
          onClick={() => {
            if (values.length === list.length) {
              onChange([]);
            } else {
              onChange(list);
            }
          }}
        >
          {selectAllState ? <ListChecksIcon /> : <ListXIcon />}
        </Button>
        //    </TooltipTrigger>
        //     <TooltipContent className="bg-primary">
        //       {selectAllState ? "انتخاب همه" : "پاک کردن انتخاب ها"}
        //     </TooltipContent>
        //   </Tooltip>
        // </TooltipProvider>
      )}
    </div>
  );
}
