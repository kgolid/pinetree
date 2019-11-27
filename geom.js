export function get_equi_triangle(top_pos, height, col) {
  const side = height / Math.sqrt(3);
  const pos = [
    [0, top_pos],
    [side, top_pos + height],
    [-side, top_pos + height]
  ];

  return { pos, col };
}

export function round(val, magnitude) {
  return Math.floor(val / magnitude) * magnitude;
}
