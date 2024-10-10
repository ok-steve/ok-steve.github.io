export default function (list, blacklist = [], negate = false) {
  return list.filter((item) => negate ^ blacklist.includes(item));
}
