import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { type GraphNode } from './langgraph';
import { Rect, Text, Polygon } from '../components/svg_components';
import { useAtom } from 'jotai';
import { GraphNodesAtom } from '../atom';
import CanvasHeader from './graph_header';
interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Point {
  x: number;
  y: number;
}
const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #111827;
  display: flex;
  flex-direction: column;
`;
const SvgContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;
const StyledSvg = styled.svg<{ $isDragging: boolean }>`
  width: 100%;
  height: 100%;
  cursor: ${props => props.$isDragging ? 'grabbing' : 'grab'};
`;
const Footer = styled.div`
  background-color: #1f2937;
  color: white;
  padding: 0.75rem;
  font-size: 0.75rem;
  display: flex;
  gap: 1.5rem;
`;

export default function Canvas() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({ x: 0, y: 0, width: 1000, height: 800 });
    const [isPanning, setIsPanning] = useState<boolean>(false);
    const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });
    const [draggedRect, setDraggedRect] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
    // 기본 노드
    const [nodes, setNodeRects] = useAtom(GraphNodesAtom);

  // SVG 좌표로 변환
  const screenToSvg = (screenX: number, screenY: number): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    
    const pt = svg.createSVGPoint();
    pt.x = screenX;
    pt.y = screenY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: svgPt.x, y: svgPt.y };
  };

  // 줌 (휠)
  const handleWheel = (e: WheelEvent): void => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1.1 : 0.9;
    const mouse = screenToSvg(e.clientX, e.clientY);
    
    setViewBox(prev => {
      const newWidth = prev.width * delta;
      const newHeight = prev.height * delta;
      const newX = mouse.x - (mouse.x - prev.x) * delta;
      const newY = mouse.y - (mouse.y - prev.y) * delta;
      
      return { x: newX, y: newY, width: newWidth, height: newHeight };
    });
  };

  // SVG 패닝 시작
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>): void => {
    const target = e.target as SVGElement;
    // rect가 아닌 경우에만 SVG 패닝 시작
    if (target.tagName !== 'rect' || target.getAttribute('width') === '100%') {
      setIsPanning(true);
      const svgPt = screenToSvg(e.clientX, e.clientY);
      setPanStart(svgPt);
    }
  };

  // Rect 드래그 시작
  const handleRectMouseDown = (e: React.MouseEvent<SVGElement>, node: GraphNode): void => {
    e.stopPropagation();
    setDraggedRect(node.id);
    const svgPt = screenToSvg(e.clientX, e.clientY);
    setDragStart({ x: svgPt.x - node.rect.x, y: svgPt.y - node.rect.y });
  };

  // 마우스 이동
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>): void => {
    const svgPt = screenToSvg(e.clientX, e.clientY);
    
    if (isPanning) {
      const dx = panStart.x - svgPt.x;
      const dy = panStart.y - svgPt.y;
      setViewBox(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy
      }));
    }
    
    if (draggedRect !== null) {
      setNodeRects(prev => prev.map(node => 
        node.id === draggedRect
          ? { ...node, rect:{...node.rect, x: svgPt.x - dragStart.x, y: svgPt.y - dragStart.y }}
          : node
      ));
    }
  };

  // 마우스 업
  const handleMouseUp = (): void => {
    setIsPanning(false);
    setDraggedRect(null);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false });
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, [viewBox]);

  return (
    <MainBox>
      <CanvasHeader />
      <SvgContainer>
        <StyledSvg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          $isDragging={isPanning}
          onMouseDown={handleSvgMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 그리드 배경 */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4"
                    orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 Z" fill="#404258" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* 드래그 가능한 Rects */}
          {nodes.map(node => (
            <g key={node.id}>
              {
                node.type === 'condition' ?
                <Polygon 
                  points={`${node.rect.x + node.rect.width / 2},${node.rect.y} 
                           ${node.rect.x + node.rect.width},${node.rect.y + node.rect.height / 2} 
                           ${node.rect.x + node.rect.width / 2},${node.rect.y + node.rect.height} 
                           ${node.rect.x},${node.rect.y + node.rect.height / 2}`}
                  fill={node.rect.fill}
                  onMouseDown={(e) => handleRectMouseDown(e, node)}
                /> :
                <Rect
                  x={node.rect.x}
                  y={node.rect.y}
                  width={node.rect.width}
                  height={node.rect.height}
                  // transform={"rotate(90 0 0)"}
                  $dragging={draggedRect === node.id}
                  $nodetype={node.type}
                  onMouseDown={(e) => handleRectMouseDown(e, node)}
                />
              }
              <Text
                x={node.rect.x + node.rect.width / 2}
                y={node.rect.y + node.rect.height / 2}
              >
                {node.name}
              </Text>
            </g>
          ))}
        </StyledSvg>
      </SvgContainer>
      
      <Footer>
        <span>ViewBox: ({viewBox.x.toFixed(0)}, {viewBox.y.toFixed(0)}) - {viewBox.width.toFixed(0)}×{viewBox.height.toFixed(0)}</span>
        <span>Zoom: {(800 / viewBox.width * 100).toFixed(0)}%</span>
      </Footer>
    </MainBox>
  );
}