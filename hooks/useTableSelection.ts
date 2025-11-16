
// Fix: Import ChangeEvent to use it as a type for the event handler.
import { useState, useCallback, ChangeEvent } from 'react';

export const useTableSelection = <T extends { id: string }>(data: T[]) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Fix: Changed React.ChangeEvent to ChangeEvent.
  const handleSelectAll = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = new Set(data.map((item) => item.id));
      setSelected(newSelected);
    } else {
      setSelected(new Set());
    }
  }, [data]);

  const handleSelectOne = useCallback((id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  }, [selected]);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

  const numSelected = selected.size;
  const isAllSelected = data.length > 0 && numSelected === data.length;

  return {
    selected,
    numSelected,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
    clearSelection,
  };
};
