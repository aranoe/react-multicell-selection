import "./SelectionBox.css";

import classNames from "classnames";
import React, { useContext } from "react";

import { SelectionStateContext } from "../../context/SelectionStateContext";
import { Merge } from "../../utils/type-utils";
import { FloatingRect } from "../FloatingRect/FloatingRect";

type DivType = JSX.IntrinsicElements["div"];
interface SelectionProps
  extends Merge<DivType, React.RefAttributes<HTMLElementTagNameMap["div"]>> {}

export const SelectionBox: React.FC<SelectionProps> = React.forwardRef(
  (props, ref) => {
    const { children, className, ...rest } = props;
    const { state } = useContext(SelectionStateContext);

    return (
      <FloatingRect
        firstRectRef={state.primeCells.first.elementRef}
        lastRectRef={state.primeCells.last.elementRef}
        ref={ref}
        className={classNames("selection", className)}
        {...rest}
      >
        {children}
      </FloatingRect>
    );
  }
);
