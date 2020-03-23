import "./SelectionBox.css";

import classNames from "classnames";
import React, { useContext } from "react";

import { SelectionRectsStateContext } from "../../context/SelectionRectsStateContext";
import { Merge } from "../../utils/type-utils";
import { FloatingRect } from "../FloatingRect/FloatingRect";

type DivType = JSX.IntrinsicElements["div"];
interface SelectionProps
  extends Merge<DivType, React.RefAttributes<HTMLElementTagNameMap["div"]>> {}

export const SelectionBox: React.FC<SelectionProps> = React.forwardRef(
  (props, ref) => {
    const { children, className, ...rest } = props;
    const { state } = useContext(SelectionRectsStateContext);

    return (
      <FloatingRect
        firstRectRef={state.selectionRects.first}
        lastRectRef={state.selectionRects.last}
        ref={ref}
        className={classNames("selection", className)}
        {...rest}
      >
        {children}
      </FloatingRect>
    );
  }
);
