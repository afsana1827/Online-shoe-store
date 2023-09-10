"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  deleteSizesValue,
  setSizesQuantity,
  setSizesValue,
} from "@/store/selectedSizeSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ProductType } from "@/types";
import { allSizes } from "@/utils/sizes";

import { UseFormSetValue } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<ProductType>;
};
function SelectedMultipleSize({ setValue }: Props) {
  const { selectedSizes } = useAppSelector((state) => state.selectedSizes);
  const dispatch = useAppDispatch();

  return (
    <Popover
      onOpenChange={(e) => {
        if (!e) {
          setValue("sizes", selectedSizes, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-500 font-normal flex justify-start w-full h-full py-2"
        >
          {selectedSizes.length
            ? selectedSizes.map((size) => size.size + " ")
            : "Select Sizes..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        {allSizes.map((size) => {
          const isSelected = selectedSizes.find((value) => value.size === size);
          return (
            <div key={size} className="py-1 px-2 flex items-center gap-5">
              <div className="flex items-center gap-1 w-1/4">
                <Checkbox
                  defaultChecked={isSelected ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      dispatch(setSizesValue({ size, quantity: 1 }));
                    } else {
                      dispatch(deleteSizesValue(size));
                    }
                  }}
                  id={size}
                  className="rounded-sm"
                />
                <Label htmlFor={size}>{size}</Label>
              </div>
              <Input
                value={isSelected?.quantity || 1}
                disabled={!isSelected}
                onChange={(e) => {
                  dispatch(
                    setSizesQuantity({ size, quantity: +e.target.value })
                  );
                }}
                className="flex-1 disabled:bg-gray-100"
                type="number"
                min={1}
              />
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export default SelectedMultipleSize;
