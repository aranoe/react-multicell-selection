import "./FloatingRect.css";

import classNames from "classnames";
import React from "react";

import { Merge } from "../../utils/type-utils";

type DivType = JSX.IntrinsicElements["div"];
interface FloatingRectProps
  extends Merge<DivType, React.RefAttributes<HTMLElementTagNameMap["div"]>> {
  firstRectRef: React.RefObject<HTMLElement> | null;
  lastRectRef: React.RefObject<HTMLElement> | null;
}

export const FloatingRect: React.FC<FloatingRectProps> = React.forwardRef(
  (props, ref) => {
    const { children, firstRectRef, lastRectRef, className, ...rest } = props;

    const getFloatingRectDimensions = () => {
      if (!firstRectRef?.current || !lastRectRef?.current) return;
      const firstRect = firstRectRef.current.getBoundingClientRect();
      const lastRect = lastRectRef.current.getBoundingClientRect();

      const topCell = getMostTopCell(firstRect, lastRect);
      const rightCell = getMostRightCell(firstRect, lastRect);
      const bottomCell = getMostBottomCell(firstRect, lastRect);
      const leftCell = getMostLeftCell(firstRect, lastRect);

      const topLeftCell = {
        top: topCell.top,
        left: leftCell.left,
        width: leftCell.width,
        height: leftCell.height
      };

      const bottomRightCell = {
        top: bottomCell.top,
        left: rightCell.left,
        width: rightCell.width,
        height: rightCell.height
      };

      const rectPosition = {
        top: topLeftCell.top + window.scrollY,
        left: topLeftCell.left + window.scrollX,
        width: bottomRightCell.left + bottomRightCell.width - topLeftCell.left,
        height: bottomRightCell.top + bottomRightCell.height - topLeftCell.top
      };

      return rectPosition;
    };

    const getMostTopCell = (firstRect: DOMRect, lastRect: DOMRect) =>
      firstRect.top < lastRect.top ? firstRect : lastRect;

    const getMostLeftCell = (firstRect: DOMRect, lastRect: DOMRect) =>
      firstRect.left < lastRect.left ? firstRect : lastRect;

    const getMostBottomCell = (firstRect: DOMRect, lastRect: DOMRect) =>
      firstRect.bottom > lastRect.bottom ? firstRect : lastRect;

    const getMostRightCell = (firstRect: DOMRect, lastRect: DOMRect) =>
      firstRect.right > lastRect.right ? firstRect : lastRect;

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

    const getFirstRectDimensions = () => {
      if (!firstRectRef?.current) return;
      const firstRect = firstRectRef.current.getBoundingClientRect();

      return {
        top: firstRect.top + window.scrollY,
        left: firstRect.left + window.scrollX,
        width: firstRect.width,
        height: firstRect.height
      };
    };

    return (
      <>
        <div
          className={classNames("floating-rect first-selected")}
          style={getFirstRectDimensions()}
        ></div>
        <div
          ref={ref}
          style={getFloatingRectDimensions()}
          className={classNames("floating-rect", className, {})}
          {...rest}
        ></div>
      </>
    );
  }
);
