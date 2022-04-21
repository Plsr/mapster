import styled from '@emotion/styled'
import Map from '../assets/images/map.jpg'
import { useState, useEffect } from 'react'

export default function MapContainer({ size = 600 }) {
  const [imageSize, setImageSize] = useState(size)
  const [scale, setScale] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0})

  // x = 10
  // y = 200
  // n = 8
  // step = (y - x) / (n - 1)

  // frames = [x + step * i for i in range(n)]
  const initialScale = size / 12000
  const lastScale = 1
  const steps = 10
  const step = (lastScale - initialScale) / (9)

  //const scales = new Array(steps).fill(0).map((_, i) => initialScale + step * i)
  const scales = [(size/12000), 0.25, 0.5, 0.75, 1]

  console.log(scales)
  const handleToggleZoom = () => {
    setScale(scale === 1 ? size / 12000 : 1)
  }

  const handleToogleMove = () => {
    console.log('Called')
    setPosition({ x: position.x === 0 ? -100 : 0, y: position.y === 0 ? -100 : 0 })
  }

  // TODO: Calculation is way off
  const handleWheel = (event) => {
    let nextScale
    if (event.deltaY > 0) {
      if (scale + 1 > scales.length -1) return
      nextScale = scale + 1
    }
    if (event.deltaY < 0) {
      if (scale - 1 < 0) return
      nextScale = scale - 1
    }
    console.log(event.deltaY)
    console.log(event.clientX)
    console.log(event.clientY)
    const ratio = 1 - scales[nextScale] / scales[scale]
    const { clientX, clientY } = event
    const transl = {
      x: (clientX - translate.x) * ratio,
      y: (clientY - translate.y) * ratio
    }
    setScale(nextScale)
    setTranslate(transl)
  }

  return (
    <>
      <Wrapper onWheel={handleWheel} size={size}>
        <Image src={Map} alt="map" size={imageSize} translate={translate} scale={scales[scale]} position={position} />
      </Wrapper>
      <button onClick={handleToggleZoom}>Toogle zoom</button>
      <button onClick={handleToogleMove}>Toogle move</button>
    </>
  )
}

const Wrapper = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  width: 12000px;
  height: 12000px;
  transform: scale(${props => props.scale}) translate(${props => props.translate.x}px, ${props => props.translate.y}px);
`
