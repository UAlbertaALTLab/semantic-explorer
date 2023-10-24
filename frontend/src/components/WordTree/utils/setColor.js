export default function setColor(depth, isInit) {
  const colors = ["#a20010", "#820010", "#620010", "#420010", "#220010", "#020010"]
  // 
  if (isInit) {
    return "#1976d2"
  }
  if (depth < colors.length) {
    return colors[depth]
  } else {
    return colors[colors.length - 1]
  }
}
