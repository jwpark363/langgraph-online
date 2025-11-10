import type React from "react";
import styled from "styled-components";

const _Rect = styled.rect`
    filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 4px 6px);
    &:hover{
      cursor: pointer;
    }
`;
const _Text = styled.text`
  &:hover{
    cursor: pointer;
  }
`;

interface RectProps{
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  fill: string;
  stroke: string;
  stroke_width?: number;
  label?: string;
  labelColor?: string;
  fontSize?: number;
  handler?: React.MouseEventHandler<SVGElement>|undefined;
};
export default function Rect({
    x,y,width,height,rx=12,ry=12,
    fill,stroke, stroke_width=2,
    label="", labelColor="black",
    fontSize=16, handler=undefined
}:RectProps){
    return(
    <>
     <_Rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx} ry={ry}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke_width}
        onClick={handler}
      />
      {label && (
        <_Text
          x={x + width / 2}
          y={y + height / 2}
          fill={labelColor}
          fontSize={fontSize}
          textAnchor="middle"
          dominantBaseline="middle"
          onClick={handler}
        >
          {label}
        </_Text>
      )}
    </>
    )
}