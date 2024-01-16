import { loadModel } from './components/model/model.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { Scene, BackSide, SkeletonHelper, MeshBasicMaterial, Group, SkinnedMesh, Skeleton, Vector3, Vector4, Matrix4, Matrix3 } from 'https://cdn.skypack.dev/three@v0.132.2';
import { OBJExporter } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/exporters/OBJExporter.js';
import { GLTFExporter } from 'https://cdn.skypack.dev/three@v0.132.2/examples/jsm/exporters/GLTFExporter.js';


let bonenames = [
  "c_pelvis01_jj_01",
  "c_tail03_jj_03",
  "c_tail04_jj_04",
  "c_tail05_jj_05",
  "c_tail06_jj_06",
  "c_tail07_jj_07",
  "c_tail08_jj_08",
  "c_tail09_jj_09",
  "c_tail10_jj_010",
  "c_tail11_jj_011",
  "c_tail12_jj_012",
  "c_tail13_jj_013",
  "c_tail14_jj_014",
  "c_tail15_jj_015",
  "c_tail16_jj_016",
  "c_tail17_jj_017",
  "c_tail18_jj_018",
  "c_tail19_jj_019",
  "c_tail20_jj_020",
  "c_tail21_jj_021",
  "c_tail22_jj_022",
  "c_tail23_jj_023",
  "c_spine01_jj_024",
  "c_spine02_jj_025",
  "organ_protect_L_2_099",
  "c_spine03_jj_026",
  "organ_protect_L_096",
  "organ_protect_S_097",
  "c_spine04_jj_027",
  "organ_protect_2_094",
  "c_spine05_jj_028",
  "c_neck01_jj_029",
  "c_head01_jj_030",
  "l_ear01_jj_033",
  "r_ear01_jj_036",
  "l_eye01_jj_039",
  "r_eye01_jj_040",
  "organ_protect_1_L_041",
  "organ_protect_1_R_042",
  "l_scapula01_jj_043",
  "l_humerus01_jj_044",
  "l_metacarpus01_jj_046",
  "r_scapula01_jj_066",
  "r_humerus01_jj_067",
  "r_metacarpus01_jj_069",
  "organ_protect_B_L_089",
  "organ_protect_B_R_091",
  "l_femur01_jj_0100",
  "l_metatarsus01_jj_0101",
  "r_femur01_jj_0123",
  "r_metatarsus01_jj_0125",
  "l_ulna01_jj_045",
  "r_ulna01_jj_068",
  "l_tibia01_jj_00",
  "r_tibia01_jj_0124"
]

let jointNames = {
  c_pelvis01_jj_01: "Pelvis",
  c_tail03_jj_03: "Tail-03",
  c_tail04_jj_04: "Tail-04",
  c_tail05_jj_05: "Tail-05",
  c_tail06_jj_06: "Tail-06",
  c_tail07_jj_07: "Tail-07",
  c_tail08_jj_08: "Tail-08",
  c_tail09_jj_09: "Tail-09",
  c_tail10_jj_010: "Tail-10",
  c_tail11_jj_011: "Tail-11",
  c_tail12_jj_012: "Tail-12",
  c_tail13_jj_013: "Tail-13",
  c_tail14_jj_014: "Tail-14",
  c_tail15_jj_015: "Tail-15",
  c_tail16_jj_016: "Tail-16",
  c_tail17_jj_017: "Tail-17",
  c_tail18_jj_018: "Tail-18",
  c_tail19_jj_019: "Tail-19",
  c_tail20_jj_020: "Tail-20",
  c_tail21_jj_021: "Tail-21",
  c_tail22_jj_022: "Tail-22",
  c_tail23_jj_023: "Tail-23",
  c_spine01_jj_024: "Spine-01",
  c_spine02_jj_025: "Spine-02",
  c_spine03_jj_026: "Spine-03",
  c_spine04_jj_027: "Spine-04",
  c_spine05_jj_028: "Spine-05",
  c_neck01_jj_029: "Neck",
  c_head01_jj_030: "Head",
  l_ear01_jj_033: "L-Ear",
  r_ear01_jj_036: "R-Ear",
  l_eye01_jj_039: "L-Eye",
  r_eye01_jj_040: "R-Eye",
  organ_protect_1_L_041: "Organ-Protect-L",
  organ_protect_1_R_042: "Organ-Protect-R",
  l_scapula01_jj_043: "L-Scapula",
  l_humerus01_jj_044: "L-Humerus",
  l_ulna01_jj_045: "L-Ulna",
  l_metacarpus01_jj_046: "L-Metacarpus",
  r_scapula01_jj_066: "R-Scapula",
  r_humerus01_jj_067: "R-Humerus",
  r_ulna01_jj_068: "R-Ulna01",
  r_metacarpus01_jj_069: "R-Metacarpus",
  organ_protect_B_L_089: "Organ-Protect-B-L",
  organ_protect_B_R_091: "R-Organ-Protect-B",
  organ_protect_2_094: "Organ-Protect-2",
  organ_protect_L_096: "Organ-Protect-L",
  organ_protect_S_097: "Organ-Protect-S",
  organ_protect_L_2_099: "Organ-Protect-L-2",
  l_femur01_jj_0100: "L-Femur",
  l_tibia01_jj_00: "L-Tibia",
  l_metatarsus01_jj_0101: "L-Metatarsus",
  r_femur01_jj_0123: "R-Femur",
  r_tibia01_jj_0124: "R-Tibia",
  r_metatarsus01_jj_0125: "R-Metatarsus"
}

let shapeNames = [
  "MouseLiver-Back",
  "MouseHeart-Squash",
  "MouseHeart-Back",
  "Gland1-Long-Scale",
  "Gland1-Wide-Scale",
  "Gland1-Left-Bend",
  "Gland1-Right-Bend",
  "Gland2-Long-Scale",
  "Gland2-Wide-Scale",
  "Gland2-Left-Bend",
  "Gland2-Right-Bend",
]

let shapeClassNames = [
  "inputLiver",
  "inputHeart",
  "inputGland1",
  "inputGland2"
]

let camera;
let controls;
let renderer;
let scene;
let loop;
let blends = [];
let blend_models = [];
let bones = [];
let tem_bones = [];
let rotations = [];
let positions = [];
let initialRotations = [];
let initialBlends = [];
let initialJointTransforms = {};
let currentJointTransforms = {};
let inputx;
let inputy;
let inputz;
let inputRx;
let inputRy;
let inputRz;
let inputMeshes;
let inputBlendShapes



class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);
    const { ambientLight, mainLight1, mainLight2, mainLight3, mainLight4, mainLight5, mainLight6 } = createLights();
    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight1, mainLight2, mainLight3, mainLight4, mainLight5, mainLight6);
    const resizer = new Resizer(container, camera, renderer);
    let self = this;
  }

  async init() {

    const { modelData } = await loadModel('./assets/models/scene.gltf');

    const material = new MeshBasicMaterial({
      color: 0xff0000
    });

    let boneStructure;

    let helper;
    let bonesinittemp = []
    let bonestemp = []
    let model = modelData.scene.children[0].children[0].children[0].children[0];
    let blend_meshes = []
    let blend_shapes = []
    model.rotation.set(0, 0, 0);
    controls.target.copy(model.rotation);
    model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);
    model.traverse((child) => {
      if (child.material) {
        child.material.side = BackSide;
      }
      if (child.morphTargetDictionary) {
        blend_meshes.push(child.name);
        initialBlends.push(
          { value: child.morphTargetInfluences, name: child.name, position: child.position, rotation: child.rotation }
        )
      }
    })
    // console.log(initialBlends)
    boneStructure = scene.getObjectByProperty('type', "Bone");
    boneStructure.traverse((child) => {
      bonestemp.push(child);
      initialRotations.push({
        rx: child.rotation.x,
        ry: child.rotation.y,
        rz: child.rotation.z,
        px: child.position.x,
        py: child.position.y,
        pz: child.position.z,
        name: child.name
      });
      if (child.isBone) {
        initialJointTransforms[child.name] = {
          x: child.rotation.x,
          y: child.rotation.y,
          z: child.rotation.z,
          px: child.position.x,
          py: child.position.y,
          pz: child.position.z,
        };
      }
    });

    for (let i = 0; i < bonestemp.length; i++) {
      if (bonenames.includes(bonestemp[i].name)) {

        bones.push(bonestemp[i]);
      }
    }


    document.getElementById("joint-container").innerHTML = (bones.map((bone, index) => {
      positions.push({ x: 0, y: 0, z: 0 });
      rotations.push({ x: 0, y: 0, z: 0 });
      // parameters.push({px: bone.position.x, py: bone.position.y, pz: bone.position.z, rx: bone.rotation.x, ry: bone.rotation.y, rz: bone.rotation.z})

      return `<div class="joint-card">
          <div class="joint-title">${jointNames[bone.name]}</div>
          <div class="joint-input">
              <div class="label" for="">PX</div>
              <input class="joint-input-X input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
          <div class="joint-input">
              <div class="label" for="">PY</div>
              <input class="joint-input-Y input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
          <div class="joint-input">
              <div class="label" for="">PZ</div>
              <input class="joint-input-Z input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
          <div class="joint-input">
              <div class="label" for="">RX</div>
              <input class="joint-input-RX input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
          <div class="joint-input">
              <div class="label" for="">RY</div>
              <input class="joint-input-RY input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
          <div class="joint-input">
              <div class="label" for="">RZ</div>
              <input class="joint-input-RZ input-mesh" type="number" step="0.05" placeholder="" value=0>
          </div>
      </div>`
    }).join(" "));

    // console.log(parameters)

    let shapeIndex = 0;
    let content = "";

    for (let i = 0; i < blend_meshes.length; i++) {
      blend_models.push(scene.getObjectByName(blend_meshes[i]));
      blends.push(scene.getObjectByName(blend_meshes[i]).morphTargetDictionary);

      for (let j = 0; j < Object.keys(blends[i]).length; j++) {
        console.log(shapeNames[shapeIndex])
        console.log(scene.getObjectByName(blend_meshes[i]))
        content += `
        <div class="blend-shape" style="height: auto; position: relative; display: flex; align-items: center; margin-bottom: 15px; color: white;">
            <label style="font-size: 20px; margin-right: 10px;">${shapeNames[shapeIndex]}</label> 
            <input class="${shapeClassNames[i]} input-blend-shape" style="width: 100%; width: 150px; position: relative; border-radius: 10px; background-color: darkgray; border: none; outline: none; color: white; font-size: 18px; padding: 4px 10px; margin-right: 20px;" step="0.05" type="number" placeholder="" min=-10 max=10 value=0>
        </div>
      `
        shapeIndex++
      }
    }
    console.log(blend_models)
    document.getElementById("slider-container").innerHTML = content;

    let inputLiver = document.getElementsByClassName("inputLiver");
    let inputHeart = document.getElementsByClassName("inputHeart");
    let inputGland1 = document.getElementsByClassName("inputGland1");
    let inputGland2 = document.getElementsByClassName("inputGland2");

    for (let i = 0; i < inputLiver.length; i++) {
      inputLiver[i].addEventListener("change", () => {
        blend_models[0].morphTargetInfluences[i] = parseFloat(Number(inputLiver[i].value));
        blend_models[0].morphTargetInfluences.needsUpdate = true;
      })
    }

    for (let i = 0; i < inputHeart.length; i++) {
      inputHeart[i].addEventListener("change", () => {
        blend_models[1].morphTargetInfluences[i] = parseFloat(Number(inputHeart[i].value));
        blend_models[0].morphTargetInfluences.needsUpdate = true;
      })
    }

    for (let i = 0; i < inputGland1.length; i++) {
      inputGland1[i].addEventListener("change", () => {
        blend_models[2].morphTargetInfluences[i] = parseFloat(Number(inputGland1[i].value));
        blend_models[0].morphTargetInfluences.needsUpdate = true;
      })
    }

    for (let i = 0; i < inputGland2.length; i++) {
      inputGland2[i].addEventListener("change", () => {
        blend_models[3].morphTargetInfluences[i] = parseFloat(Number(inputGland2[i].value));
        blend_models[0].morphTargetInfluences.needsUpdate = true;
      })
    }

    inputBlendShapes = document.getElementsByClassName("input-blend-shape");
    inputx = document.getElementsByClassName("joint-input-X");
    inputy = document.getElementsByClassName("joint-input-Y");
    inputz = document.getElementsByClassName("joint-input-Z");
    inputRx = document.getElementsByClassName("joint-input-RX");
    inputRy = document.getElementsByClassName("joint-input-RY");
    inputRz = document.getElementsByClassName("joint-input-RZ");
    inputMeshes = document.getElementsByClassName("input-mesh");


    let inputLen = inputRx.length;
    for (let i = 0; i < inputLen; i++) {
      inputx[i].addEventListener("change", () => {
        bones[i].position.setX(parseFloat(bones[i].position.x + (Number(inputx[i].value) - positions[i].x)));
        positions[i].x = Number(inputx[i].value);
        bones[i].position.needsUpdate = true;
      })

      inputy[i].addEventListener("change", () => {
        bones[i].position.setY(parseFloat(bones[i].position.y + Number((inputy[i].value) - positions[i].y)));
        positions[i].y = Number(inputy[i].value);
        bones[i].position.needsUpdate = true;
      })

      inputz[i].addEventListener("change", () => {
        bones[i].position.setZ(parseFloat(bones[i].position.z + (Number(inputz[i].value) - positions[i].z)));
        positions[i].z = Number(inputz[i].value);
        bones[i].position.needsUpdate = true;
      })
      inputRx[i].addEventListener("change", () => {
        bones[i].rotation.x = parseFloat(parseFloat(bones[i].rotation.x + (Number(inputRx[i].value) - rotations[i].x)));
        rotations[i].x = Number(inputRx[i].value);
        bones[i].rotation.needsUpdate = true;
      })

      inputRy[i].addEventListener("change", () => {
        bones[i].rotation.y = parseFloat(parseFloat(bones[i].rotation.y + (Number(inputRy[i].value) - rotations[i].y)));
        rotations[i].y = Number(inputRy[i].value);
        bones[i].rotation.needsUpdate = true;
      })

      inputRz[i].addEventListener("change", () => {
        bones[i].rotation.z = parseFloat(parseFloat(bones[i].rotation.z + (Number(inputRz[i].value) - rotations[i].z)));
        rotations[i].z = Number(inputRz[i].value);
        bones[i].rotation.needsUpdate = true;
      })
    }

    function numberSlice(number) {
      // Using toFixed to round to two decimal places
      var truncatedNumber = Number(number.toFixed(3));
      return truncatedNumber;
    }
    
    function importCsv() {
      const input = document.getElementById('csvInput');
      const file = input.files[0];
      let event = new Event('change');
      let meshParams = [];
      let shapeParams = [];
    
      if (file) {
        const reader = new FileReader();
    
        reader.onload = function (e) {
          const csvContent = e.target.result;
          const data = parseCSV(csvContent);
          // Use the parsed data as needed
          for (let i = 1; i <= 55; i++) {
            let row = data[i].split(",");
            for (let j = 1; j <= 6; j++) {
              meshParams.push(Number(row[j]));
            }
          }
    
          for (let k = 56; k <= 66; k++) {
            let row = data[k].split(",");
            shapeParams.push(Number(row[1]));
          }
    
          for (let j = 0; j <= meshParams.length - 1; j++) {
            inputMeshes[j].value = Number(meshParams[j]);
            inputMeshes[j].dispatchEvent(event);
          }
    
          for (let l = 0; l <= shapeParams.length - 1; l++) {
            inputBlendShapes[l].value = Number(shapeParams[l]);
            inputBlendShapes[l].dispatchEvent(event);
          }
    
        };
    
        reader.readAsText(file);
      } else {
        console.error('No file selected.');
      }
    }
    
    function parseCSV(csv) {
      // Your CSV parsing logic here
      const rows = csv.split('\n');
      const result = rows;
      return result;
    }

    function getBoneNormalTransform() {

      var basenormal = new Vector3();

      var skinindex = new Vector4();
      var skinweight = new Vector4();

      var vector = new Vector3();
      var matrix = new Matrix4();
      var matrix3 = new Matrix3();

      return function (index, target) {

        var skeleton = this.skeleton;
        var geometry = this.geometry;

        skinindex.fromBufferAttribute(geometry.attributes.skinindex, index);
        skinweight.fromBufferAttribute(geometry.attributes.skinweight, index);

        basenormal.fromBufferAttribute(geometry.attributes.normal, index).applyNormalMatrix(matrix3.applyNormalMatrix(this.bindmatrix));

        target.set(0, 0, 0);

        for (var i = 0; i < 4; i++) {

          var weight = skinweight.getComponent(i);

          if (weight !== 0) {

            var boneindex = skinindex.getComponent(i);

            matrix.multiplyMatrices(skeleton.bones[boneindex].matrixworld, skeleton.boneinverses[boneindex]);

            target.addScaledVector(vector.copy(basenormal).applyNormalMatrix(matrix3.applyNormalMatrix(matrix)), weight);

          }

        }
        matrix3.applyNormalMatrix(this.bindMatrixInverse);
        return target.applyNormalMatrix(matrix3);

      };

    }

    document.getElementById("export-btn").addEventListener("click", function () {      
      scene.traverse(function (object) {
        if (!object.isSkinnedMesh) return;
        if (object.geometry.isBufferGeometry !== true) throw new error('only buffergeometry supported.');
        if (object.geometry.morphAttributes && Object.keys(object.geometry.morphAttributes).length > 0) {
        }


        let filtered_blends = initialBlends.filter(blend => object.name === blend.name);
        if (filtered_blends.length > 0) {
          let influences = filtered_blends[0].value;
          for (let i = 0; i < influences.length; i++) {
            object.morphTargetInfluences[i] = influences[i];
          }
        }

        object.skeleton.bones.forEach(bone => {
          let filtered = initialRotations.filter(rot => {
            return rot.name == bone.name
          })
          if (filtered.length > 0) {
            console.log(bone.name)
            console.log(bone.rotation)
            console.log(filtered[0])
            bone.rotation.x = filtered[0].rx;
            bone.rotation.y = filtered[0].ry;
            bone.rotation.z = filtered[0].rz;
            bone.position.x = filtered[0].px;
            bone.position.y = filtered[0].py;
            bone.position.z = filtered[0].pz;         
          }
          else {
            bone.rotation.set(0, 0, 0)
          }
        });

        var positionattribute = object.geometry.getAttribute('position');
        var normalattribute = object.geometry.getAttribute('normal');
        var v1 = new Vector3();
        for (var j = 0; j < positionattribute.count; j++) {
          object.boneTransform(j, v1);
          // object.getVertexPosition(j, v1);
          positionattribute.setXYZ(j, v1.x, v1.y, v1.z);
          getBoneNormalTransform.call(object, j, v1);
          normalattribute.setXYZ(j, v1.x, v1.y, v1.z);
        }
        positionattribute.needsUpdate = true;
        normalattribute.needsUpdate = true;
      });
    
      // Create a new OBJExporter
      var exporter = new OBJExporter();

      // Export the updated scene
      const result = exporter.parse(scene);
      const blob = new Blob([result], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "exported_model.obj";
      link.click();      
    });

    document.getElementById("import-btn").addEventListener("click", function () {
      document.getElementById("csvInput").click();
    });

    document.getElementById("csvInput").addEventListener("change", function () {
      importCsv();
    });
  }

  render() {
    controls.update();
    for (let i = 0; i < inputx.length; i++) {
      inputx[i].value = parseFloat(bones[i].rotation.x - initialRotations[i].rx).toFixed(2);
      inputy[i].value = parseFloat(bones[i].rotation.y - initialRotations[i].ry).toFixed(2);
      inputz[i].value = parseFloat(bones[i].rotation.z - initialRotations[i].rz).toFixed(2);
    }
    renderer.render(scene, camera);
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop();
  }
}
export { World };
