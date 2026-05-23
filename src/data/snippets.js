export const SNIPPETS = {
  map: {
    title: 'map — transform every element',
    theory:
      'map() creates a new array by applying a function to every element. It never mutates the original. Always returns an array of the same length.',
    difficulty: 'fresher',
    patterns: [
      {
        label: 'Basic transform',
        code: `const prices = [10, 20, 30];\nconst withTax = prices.map(p => p * 1.18);\nconsole.log(withTax); // [11.8, 23.6, 35.4]`,
      },
      {
        label: 'Extract a property',
        code: `const users = [\n  { name: "Arjun", age: 24 },\n  { name: "Priya", age: 28 },\n];\nconst names = users.map(u => u.name);\nconsole.log(names); // ["Arjun", "Priya"]`,
      },
      {
        label: 'Map with index',
        code: `const items = ["a", "b", "c"];\nconst indexed = items.map((item, i) => \`\${i+1}. \${item}\`);\nconsole.log(indexed); // ["1. a", "2. b", "3. c"]`,
      },
      {
        label: 'Add a computed field',
        code: `const products = [\n  { name: "Shirt", price: 500, qty: 3 },\n  { name: "Shoes", price: 1200, qty: 1 },\n];\nconst withTotal = products.map(p => ({\n  ...p,\n  total: p.price * p.qty,\n}));\nconsole.log(withTotal[0].total); // 1500`,
      },
    ],
    interview: [
      {
        q: 'What does map() return?',
        a: 'Always a new array of the same length. It never mutates the original array.',
      },
      {
        q: 'When would you use map over forEach?',
        a: 'When you need the transformed values. forEach is for side effects only — it returns undefined.',
      },
      {
        q: 'Can map() change the array length?',
        a: 'No. map() always returns an array with the same number of elements as the input.',
      },
    ],
    gotcha:
      "Never use map() if you don't need the returned array — use forEach instead. Also, map() skips empty slots in sparse arrays.",
  },

  filter: {
    title: 'filter — keep matching elements',
    theory:
      'filter() returns a new array containing only elements that pass a test (truthy return). The original array is unchanged.',
    difficulty: 'fresher',
    patterns: [
      {
        label: 'Filter by condition',
        code: `const scores = [45, 72, 38, 91, 55];\nconst passing = scores.filter(s => s >= 50);\nconsole.log(passing); // [72, 91, 55]`,
      },
      {
        label: 'Filter objects',
        code: `const devs = [\n  { name: "Sushant", stack: "MERN" },\n  { name: "Ananya", stack: "Django" },\n  { name: "Rahul", stack: "MERN" },\n];\nconst mernDevs = devs.filter(d => d.stack === "MERN");\nconsole.log(mernDevs.length); // 2`,
      },
      {
        label: 'Remove falsy values',
        code: `const mixed = [0, "hello", null, 42, "", undefined, true];\nconst truthy = mixed.filter(Boolean);\nconsole.log(truthy); // ["hello", 42, true]`,
      },
    ],
    interview: [
      {
        q: 'What does filter return if no elements match?',
        a: 'An empty array [], never null or undefined.',
      },
      {
        q: 'How is filter different from find?',
        a: 'filter returns all matching elements as an array. find returns the first match as a single value (or undefined).',
      },
    ],
    gotcha:
      'filter(Boolean) is a common pattern to remove falsy values — but it also removes 0 and empty strings, which may be valid data.',
  },

  reduce: {
    title: 'reduce — accumulate to single value',
    theory:
      "reduce() applies a function to each element, accumulating a single result. It's the most powerful array method — map and filter can both be implemented using reduce.",
    difficulty: 'mid',
    patterns: [
      {
        label: 'Sum an array',
        code: `const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum); // 15`,
      },
      {
        label: 'Group by property',
        code: `const people = [\n  { name: "Arjun", city: "Mumbai" },\n  { name: "Priya", city: "Delhi" },\n  { name: "Rohan", city: "Mumbai" },\n];\nconst byCity = people.reduce((acc, p) => {\n  acc[p.city] = acc[p.city] || [];\n  acc[p.city].push(p.name);\n  return acc;\n}, {});\nconsole.log(byCity.Mumbai); // ["Arjun", "Rohan"]`,
      },
      {
        label: 'Flatten nested arrays',
        code: `const nested = [[1,2], [3,4], [5]];\nconst flat = nested.reduce((acc, arr) => acc.concat(arr), []);\nconsole.log(flat); // [1, 2, 3, 4, 5]`,
      },
    ],
    interview: [
      {
        q: "What happens if you don't pass an initial value?",
        a: 'reduce uses the first element as the initial accumulator and starts iterating from index 1. On an empty array it throws a TypeError.',
      },
      {
        q: 'Can reduce return non-primitive values?',
        a: 'Yes. The accumulator can be an object, array, Map, or anything — not just a number.',
      },
    ],
    gotcha:
      'Always pass the initial value as the second argument to reduce. Omitting it causes bugs on empty arrays and makes intent unclear.',
  },
}