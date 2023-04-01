// This function will be converted into a string so
// the scope is limited to this function only.

// To pass external data use the 'input' function. See other examples.

export function spCode() {
  // Put your Shader Park Code here
  let audio = input();
  let morph = input();
  let rand = input();

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // rotateY((morph * PI) / 2 + time * 0.5);
  // rotateZ((morph * PI) / 4 + time * 0.5);
  rotateY((morph * PI) / 2 + audio * 0.000025);
  rotateZ((morph * PI) / 4 + time * 0.5);
  //rotateX((mouse.y * PI) / 2);
  let ray = getRayDirection();
  let scale = 3.0;
  //rotateX(ray.x * 4);
  // metal(.5);
  // shine(.4);
  rotateX(ray.x * 4);
  //rotateY(getRayDirection().y * 4 + time);
  // boxFrame(vec3(0.4), 0.02);
  expand(0.02);
  // blend(nsin(audio) * 0.6);
  let s = getSpace();
  let n = 0.1 * noise(scale * s + audio * 0.0004);
  color(ray + 0.2);

  console.log(audio);
  let pos1 = vec3(-0.2, -0.2, -0.2);
  let pos2 = vec3(0.2, 0.2, 0.2);
  let numPoints = input(40, 0, 75);

  // blend(0.23);
  // displace(-0.25, 0, 0);
  mirrorXYZ();
  // displace(sin(s.y + time * 0.08), 0, 0);
  displace(0, sin(s.y + n * 0.06), 0);
  torus(0.07 + n, 0.08 + n);
  // displace(0.5, 0, 0);
  // mixGeo(abs(sin(time * audio * 0.0000018)));
  mixGeo(abs(sin(time * audio * 0.000009)));

  expand(0.075);
  blend(0.2);

  sphere(0.06 + n);

  let distro = sphericalDistribution(s, randomIntFromInterval(1, 75));
  // expand(distro.w * 0.5);
}
