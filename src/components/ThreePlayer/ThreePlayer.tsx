/* eslint-disable react/no-unknown-property */
import { FC, useMemo, useRef } from 'react'

import { Text } from '@react-three/drei'
import { Canvas, applyProps, useFrame, useLoader } from '@react-three/fiber'
import { Group, Mesh, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { getRandomInt } from './getRandomInt'

export interface ThreePlayerProps {
  showText?: boolean
}

// https://codesandbox.io/s/lwo219?file=/src/App.js
// https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/
// https://codesandbox.io/s/basic-surface-sampling-3-nd48q5?file=/src/index.js
// https://github.com/pmndrs/react-three-fiber/discussions/2125
// https://github.com/pmndrs/drei#sampler

function getBoolean() {
  return getRandomInt(0, 1) === 0 ? 1 : -1
}

const Model = (props: any) => {
  const { nodes, materials }: any = useLoader(GLTFLoader, '/3d/single.glb')
  const mesh = useRef<Mesh>()

  useMemo(() => {
    applyProps(materials.Material, {
      color: '#eeeeee',
      roughness: 0.6,
      transparent: true,
      opacity: 0.9,
    })
  }, [materials])

  useFrame((_, delta) => {
    if (mesh.current) {
      const value = (delta + getRandomInt(0, 100) * 0.001) * 0.1

      if (getBoolean()) {
        mesh.current.rotation.x += value
        mesh.current.rotation.y += value
      } else {
        mesh.current.rotation.z -= value
      }
    }
  })

  return (
    <mesh
      ref={mesh}
      geometry={nodes.Curve.geometry}
      material={materials.Material}
      rotation={[45, getRandomInt(0, 45), 45]}
      {...props}
    />
  )
}

function getSafePosition(
  initPositionArray: [number, number, number][]
): [number, number, number] {
  const y = 0.03 * getRandomInt(30, 90)

  let initPosition: [number, number, number] = [
    0.085 * getRandomInt(0, y * 6) * getBoolean(),
    y,
    0.085 * getRandomInt(0, y * 6) * getBoolean(),
  ]

  if (initPositionArray.length > 2) {
    const need = initPositionArray.find((p) => {
      const aVector3 = new Vector3(p[0], p[1], p[2])
      const bVector3 = new Vector3(
        initPosition[0],
        initPosition[1],
        initPosition[2]
      )

      const distance = aVector3.distanceTo(bVector3)

      return distance < 0.2
    })

    if (need) {
      initPosition = getSafePosition(initPositionArray)
    }
  }

  return initPosition
}

const OneKeyGroup = () => {
  const groupRef = useRef<Group>(null)

  const initPositionArray: [number, number, number][] = []

  useFrame((_, delta) => {
    if (groupRef.current) {
      const value = delta * 0.1

      groupRef.current.rotation.y += value
    }
  })

  return (
    <group ref={groupRef}>
      {new Array(50).fill(0).map((_, index) => {
        const initPosition = getSafePosition(initPositionArray)

        initPositionArray.push(initPosition)

        return <Model key={`name${index}`} position={initPosition} scale={12} />
      })}
    </group>
  )
}

export const ThreePlayer: FC<ThreePlayerProps> = (props) => {
  const { showText = true } = props
  const directionLI = 0.4

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
      }}
      camera={{
        position: [0, 2, 2],
        rotation: [0, 0, 0],
      }}>
      <directionalLight intensity={directionLI} position={[10, 10, 10]} />
      <directionalLight intensity={directionLI} position={[-10, 10, 10]} />
      <directionalLight intensity={directionLI} position={[10, 10, -10]} />
      <directionalLight intensity={directionLI} position={[-10, 10, -10]} />
      <directionalLight intensity={directionLI} position={[10, -10, 10]} />
      <directionalLight intensity={directionLI} position={[-10, -10, 10]} />
      <directionalLight intensity={directionLI} position={[10, -10, -10]} />
      <directionalLight intensity={directionLI} position={[-10, -10, -10]} />

      <OneKeyGroup />

      {showText && (
        <group>
          <Text
            position={[0, 2.4, 0]}
            color={'black'}
            fontSize={0.05}
            material-toneMapped={false}
            anchorX='center'
            anchorY='middle'>
            ERROR 404
          </Text>
          <Text
            position={[0, 2.2, 0]}
            color={'black'}
            fontSize={0.28}
            material-toneMapped={false}
            anchorX='center'
            anchorY='middle'>
            {'lost your way'}
          </Text>
          <Text
            position={[0, 1.9, 0]}
            color={'black'}
            fontSize={0.06}
            material-toneMapped={false}
            anchorX='center'
            anchorY='middle'>
            {'we cant seem to find the page youre looking for'}
          </Text>
        </group>
      )}
    </Canvas>
  )
}
