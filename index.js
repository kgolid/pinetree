import { get_equi_triangle, round } from './geom';
import * as tome from 'bekk-chromotome';
import polyclip from 'polygon-clipping';

const stem_length = 600;
const number_of_triangles = 8;
const t_mean_size = 300;
const t_variance = 75;
const palette = tome.get('bekk03m');

let sketch = function(p) {
  let THE_SEED;

  p.setup = function() {
    p.createCanvas(800, 800);
    THE_SEED = p.floor(p.random(9999999));
    p.randomSeed(THE_SEED);
    p.noLoop();
    p.noStroke();
  };

  p.draw = function() {
    p.translate(p.width / 2, 100);
    const triangles = generate_triangles();
    triangles.forEach(draw_triangle);
  };

  function generate_triangles() {
    let triangles = [];

    for (let i = 0; i < number_of_triangles; i++) {
      const height = round(p.random(-t_variance, t_variance) + t_mean_size, 50);
      const top = get_triangle_pos(i, height);
      const color = p.floor(p.random() * palette.colors.length);

      const next_triangle = get_equi_triangle(top, height, color);

      if (i == 0) triangles.push(next_triangle);
      else triangles = add_triangle(triangles, next_triangle);
    }

    return triangles;
  }

  function get_triangle_pos(i, triangle_height) {
    if (i == 0) return 0;
    if (i == number_of_triangles - 1) return stem_length - triangle_height;
    return round(p.random(0, stem_length - triangle_height), 50);
  }

  function add_triangle(ts, t) {
    const diff1 = polyclip
      .difference(
        [t.pos],
        ts.map(t => [t.pos])
      )
      .flatMap(pos => pos.map(pp => ({ col: t.col, pos: pp })));

    const diff2 = ts.flatMap(tr =>
      polyclip
        .difference([tr.pos], [t.pos])
        .flatMap(pos => pos.map(pp => ({ col: tr.col, pos: pp })))
    );

    const intersections = ts.flatMap(tr =>
      polyclip
        .intersection([t.pos], [tr.pos])
        .flatMap(pos => pos.map(pp => ({ col: combine(t.col, tr.col), pos: pp })))
    );

    return intersections.concat(diff1, diff2);
  }

  function draw_triangle({ col, pos }) {
    p.fill(palette.colors[col]);
    p.beginShape();
    for (const pnt of pos) {
      p.vertex(...pnt);
    }
    p.endShape(p.CLOSE);
  }

  function combine(a, b) {
    const arr = [
      [5, 2, 3, 4, 5, 1],
      [2, 3, 4, 5, 0, 2],
      [3, 4, 5, 0, 1, 3],
      [4, 5, 0, 1, 2, 4],
      [5, 0, 1, 2, 3, 0],
      [1, 2, 3, 4, 0, 1]
    ];

    return arr[a][b];
  }

  p.keyPressed = function() {
    if (p.keyCode === 80) p.saveCanvas('pinetree_' + THE_SEED, 'png');
  };
};
new p5(sketch);
