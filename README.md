<p align="center">
  <img src="https://raw.githubusercontent.com/vuefrag/vue-use-until/main/banner.svg" alt="vue-use-until" width="100%" />
</p>

<h1 align="center">vue-use-until</h1>

<p align="center">A Vue 3 composition API utility that creates promise-based watchers for reactive values. Wait for conditions to be met with async/await syntax, perfect for coordinating async operations with reactive state.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-use-until"><img src="https://img.shields.io/npm/v/vue-use-until.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/vue-use-until"><img src="https://img.shields.io/npm/dm/vue-use-until.svg" alt="npm downloads" /></a>
</p>

## Installation

```bash
npm install vue-use-until
```

## Usage

```ts
import { until } from 'vue-use-until'
import { ref } from 'vue'

const count = ref(0)

setTimeout(() => {
  count.value = 5
}, 100)

until(count).toBe(5).then(() => {
  console.log('Count reached 5!')
})
```

## License

MIT

Extracted from [VueUse](https://vueuse.org/) for standalone use.
