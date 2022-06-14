/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, FunctionComponent, useEffect } from "react";
import { Button, SafeAreaView, StatusBar, Text, TextInput, View, ViewPagerAndroid, ViewProps } from "react-native";
import { EngineView, useEngine } from "@babylonjs/react-native";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Camera } from "@babylonjs/core/Cameras/camera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/loaders/glTF";
import { Color3, Color4, double, float, HemisphericLight, Mesh, MeshBuilder, Nullable, PointerEventTypes, Scene, Vector3 } from "@babylonjs/core";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";


const EngineScreen: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();


  const addTree = (lat: double, long: double) => {
    const r = 3.9
    if (!tree) return
    console.log("adding tree")
    const newTree = tree.clone(lat + "_" + long + "TREE", null)
    newTree!.setAbsolutePosition(sphericalTocartesian(r, lat, long))
    newTree!.lookAt(new Vector3(0, 0, 0))
    // add tree 
    setTrees((prev) =>
      [...prev, newTree!]
    )
  }

  const sphericalTocartesian = (r: double, lat: double, long: double) => {
    const latRad = degToRad(lat)
    const longRad = degToRad(long + 90);
    const x = r * Math.cos(latRad) * Math.cos(longRad);
    const z = r * Math.cos(latRad) * Math.sin(longRad);
    const y = r * Math.sin(latRad);
    return new Vector3(x, y, z)
  }

  const degToRad = (x: double) => x * Math.PI / 180.0
  var mainScene: Scene | null = null
  const [trees, setTrees] = useState<AbstractMesh[]>([])
  const [tree, setTree] = useState<AbstractMesh | null>(null)
  const [activeTree, setActiveTree] = useState<AbstractMesh | null>(null)

  useEffect(() => {
    engine?.displayLoadingUI()
    if (engine) {
      //const url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf";
      const rootUrl = require('./assets/earth.json');
      //SceneLoader.LoadAsync(url, undefined, engine).then((scene) => {
      SceneLoader.LoadAsync('', "data:" + JSON.stringify(rootUrl), engine).then((scene) => {
        mainScene = scene
        scene.createDefaultCameraOrLight(true, undefined, true);
        (scene.activeCamera as ArcRotateCamera).alpha -= Math.PI;
        (scene.activeCamera as ArcRotateCamera).radius = 18;
        (scene.activeCamera as ArcRotateCamera).pinchPrecision = 200;
        setCamera(scene.activeCamera!);
        scene.clearColor = new Color4(1, 1, 1, 1)
        scene.ambientColor = new Color3(1, 1, 1)
        addInteraction(scene)
        // const light = new HemisphericLight("ligh1", new Vector3(0, 1, 0), scene)
        loadTree(scene).then(it => {
          if (it.meshes[0]) {
            setTree(it.meshes[0])
            console.log("setting tree")
          } else {
            console.log("tree mesh is null")
          }

        })
      });
    }
  }, [engine]);

  const addSampleTrees = () => {
    //add few trees
    // Malaysia, Kuala Lumpur
    addTree(3.1696310633564817, 101.62758374646651)
    // Thailand,Bangkok
    addTree(13.796296619451399, 100.50129004668075)
    // France, Paris
    addTree(48.854388354464, 2.361150772477247)
    //Egypt,Cairo
    addTree(30.077775356543658, 31.22545479966078)
  }

  const addInteraction = (scene: Scene) => {
    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERPICK:
          const mesh = pointerInfo.pickInfo?.pickedMesh
          // reomve selection from all tress

          // if mesh is clicked and it is not the earth mesh set ot to render the outline
          if (mesh && mesh.name != "Cube.001") {

            mesh._scene.meshes.forEach((mesh) => mesh.renderOutline = false)
            mesh.renderOutline = true
            setActiveTree(mesh)
          }
          console.log("POINTER PICK: " + JSON.stringify(pointerInfo.pickInfo?.pickedMesh?.name));
          break;
      }
    }
    )
  }

  const loadTree = (scene: Scene) => {
    const rootUrl = require('./assets/tree.json');

    return SceneLoader.ImportMeshAsync('', '', "data:" + JSON.stringify(rootUrl), scene)
  }

  const getTreeInfo = () => {
    const info = activeTree ? activeTree.name.split("TREE")[0] : "-_-"
    const coords = info.split("_")
    return `Latitude: ${coords[0]}\nLongtude: ${coords[1]}`
  }

  const [latitude, onLatChange] = React.useState("")

  const [longtude, onLongChange] = React.useState("")
  const inputWidth = "40%"
  return (
    <>
      <View style={props.style}>
        <View style={{ flex: 1, minWidth: "100%"}}>
          <Text style={{padding:4}}>Add tree at specific coords </Text>
          <View style={{ flex: 1, flexDirection: "row", maxHeight: 50, padding: 4 }}>
            <TextInput style={{ minWidth: inputWidth }}
              value={latitude}
              onChangeText={onLatChange}
              placeholder="Latitude"
              keyboardType="numeric"
            />
            <TextInput
              style={{ minWidth: inputWidth }}
              value={longtude}
              onChangeText={onLongChange}
              placeholder="longtiude"
              keyboardType="numeric"
            />
            <View style={{}}>
              <Button title="Add"
                onPress={() => addTree(parseFloat(latitude), parseFloat(longtude))}
              />
            </View>
          </View>
          <Text style={{padding:4}}>Or you can add sample trees</Text>
          <View style={{ flex: 1, flexDirection: "row", maxHeight: 50, padding: 4 }}>
            <Button title="Add trees"
              onPress={() => addSampleTrees()}
            />
          </View>
          <EngineView camera={camera} displayFrameRate={true} />
          <View style={{ padding: 4 }}>
            <Text>{getTreeInfo()}</Text>
          </View>
        </View>
      </View>
    </>
  );
};


const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <EngineScreen style={{ flex: 1 }} />
      </SafeAreaView>
    </>
  );
};

export default App;
