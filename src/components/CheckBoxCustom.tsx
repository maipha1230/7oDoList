import React from "react";
import { TodoTypeEnum } from "../constants/todoTypeEnum";

type CheckBoxInput = {
  text: string;
  value: boolean;
  onChange: () => void;
};

function CheckBoxCustom({ text, value, onChange }: CheckBoxInput) {
  return (
    <div className="flex flex-row gap-1 justify-center items-center">
      <input type="checkbox" checked={value} onChange={onChange} className={`cursor-pointer focus:outeline-none rounded-full select-none ${text === TodoTypeEnum.FRUIT ? 'accent-orange-500' : 'accent-green-500' } `} />
      <span>{text}</span>
    </div>
  )
}

export default CheckBoxCustom;
