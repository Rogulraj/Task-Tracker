// packages
import React, { CSSProperties, FC, useCallback, useMemo } from "react";

// css
import ds from "./PrimaryButton.module.css";

// types
type PrimaryButtonVariants = "fill" | "outline";
interface PrimaryButtonPropsType {
  variant: PrimaryButtonVariants;
  style?: CSSProperties;
  className?: string;
  title: string;
  type: HTMLButtonElement["type"];
  onClickFn?: () => void;
}

const PrimaryButton: FC<PrimaryButtonPropsType> = ({
  title,
  type,
  variant,
  style,
  className,
  onClickFn,
}) => {
  const Button = useMemo(() => {
    switch (variant) {
      case "fill":
        return (
          <button
            style={style}
            onClick={onClickFn}
            type={type}
            className={`${ds.btn_style} ${ds.btn_fill} ${className}`}>
            {title}
          </button>
        );
      case "outline":
        return (
          <button
            style={style}
            onClick={onClickFn}
            type={type}
            className={`${ds.btn_style} ${ds.btn_outline} ${className}`}>
            {title}
          </button>
        );

      default:
        return null;
    }
  }, [variant, title, type, style, className]);

  return Button;
};

export default PrimaryButton;
