import React, { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import withModalState from "~/ui/modals/with-modal-state";

interface ListItem {
  key: string;
  value: string;
}

interface Props {
  className?: string;
  values?: string[];
  list: ListItem[];
  onChange?: (selectedKeys: string[]) => void;
}

export default function MultiSelectBox({
  className = " ",
  values = [],
  list,
  onChange = () => {},
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(values);
  const isSelected = (key: string) => selectedKeys.includes(key);

  useEffect(() => {
    onChange(selectedKeys);
  }, [selectedKeys]);

  return (
    <>
      <div className="flex gap-2">
        {list.map((item) => (
          <button
            className={cn(
              " w-auto cursor-pointer select-none rounded-full px-2 hover:shadow-md",
              isSelected(item.key)
                ? "bg-accent text-white shadow-2xl"
                : "ring-1 ring-gray-300",
            )}
            key={item.key}
            onClick={() => {
              setSelectedKeys((prev) =>
                prev.includes(item.key)
                  ? prev.filter((i) => i !== item.key)
                  : [...prev, item.key],
              );
            }}
          >
            {item.value}
          </button>
        ))}
      </div>
    </>
  );
}
