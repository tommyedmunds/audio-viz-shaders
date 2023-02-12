// This function will be converted into a string so
// the scope is limited to this function only.

// To pass external data use the 'input' function. See other examples.

export function spCode() {
  // Put your Shader Park Code here
  let audio = input();
  let morph = input();
  let rand = input();

  rotateY((morph * PI) / 2 + time * 0.5);
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

  // console.log(audio);
  let pos1 = vec3(-0.2, -0.2, -0.2);
  let pos2 = vec3(0.2, 0.2, 0.2);
  let numPoints = input(40, 0, 75);

  torus(0.9 + n, 0.08 + n);
  //mixGeo(abs(sin(audio * 0.0009)));
  mixGeo(abs(sin(time * audio * 0.000001)));

  sphere(0.5 + n);

  let distro = sphericalDistribution(s, numPoints);
  expand(distro.w * 0.5);

  // fractal noise wtfffffff

  // let s = getSpace();
  // let scale = 0.4;
  // let amplitude = 0.9;
  // let speed = 0.1 * time;
  // color(ray + 0.2);
  // let n = fractalNoise(s * amplitude + speed + audio * 0.000015) * scale;

  // box(0.3, 0.3, 0.3);
  // expand(n);
}
