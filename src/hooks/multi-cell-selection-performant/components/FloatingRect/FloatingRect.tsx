import classNames from "classnames";
import React from "react";

import { Merge } from "../../utils/type-utils";

type DivType = JSX.IntrinsicElements["div"];
interface FloatingRectProps
  extends Merge<DivType, React.RefAttributes<HTMLElementTagNameMap["div"]>> {
  firstRectRef: React.RefObject<HTMLElement>;
  lastRectRef: React.RefObject<HTMLElement>;
}

export const FloatingRect: React.FC<FloatingRectProps> = React.forwardRef(
  (props, ref) => {
    const { children, firstRectRef, lastRectRef, className, ...rest } = props;

    const getFloatingRectStyles = () => {
      if (!firstRectRef.current || !lastRectRef.current) return;
      const firstRect = firstRectRef.current.getBoundingClientRect();
      const lastRect = lastRectRef.current.getBoundingClientRect();
      return calculateTopLeftBottomRight(firstRect, lastRect);
      // if(firstRect.top < lastRect.top && firstRect.left < lastRect.left)
      // return calculateTopLeftBottomRight();
    };
    const calculateTopLeftBottomRight = (
      firstRect: DOMRect,
      lastRect: DOMRect
    ) => {
      return {
        top: firstRect.top,
        left: firstRect.left,
        width: lastRect.left + lastRect.width - firstRect.left,
        height: lastRect.top + lastRect.height - firstRect.top
      };
    };
    const calculateBottomLeftTopRight = () => {};
    const calculateBottomRightTopLeft = () => {};
    const calculateTopLeftBottomLeft = () => {};
    return (
      <div
        ref={ref}
        style={getFloatingRectStyles()}
        className={classNames("floating-rect", className, {})}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
