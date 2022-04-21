import logo from './logo.svg';
import './App.css';
import image from './assets/images/map.jpg'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import MapContainer from './components/MapContainer';

function App() {
  const [imageSize, setImageSize] = useState(undefined)

  useEffect(() => {
    const img = new Image()
    console.log(image)
    img.src = image
    img.onload = () => {
      console.log(img.width)
      console.log(img.height)
      const imageDimensions = {
        width: img.width,
        height: img.height
      }
      setImageSize(imageDimensions)
    }
  }, [])

  return (
    <Wrapper>
      <MapContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
`

export default App;
