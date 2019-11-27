export function get_equi_triangle(top_pos, height, col) {
  const side = height / Math.sqrt(3);
  const inner_side = side / 2;
  const inner_top = top_pos + height / 3;
  const inner_height = height / 2;
  const pos = [
    [0, top_pos],
    [side, top_pos + height],
    [-side, top_pos + height]
  ];
  const inner_pos = [
    [0, inner_top],
    [inner_side, inner_top + inner_height],
    [-inner_side, inner_top + inner_height]
  ];

  return { pos, inner_pos, col };
}

export function round(val, magnitude) {
  return Math.floor(val / magnitude) * magnitude;
}
