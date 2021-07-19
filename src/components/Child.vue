<template>
  <div>
    <!-- <pre>{{ searchBoxState }}</pre> -->
    <input
      :value="searchBoxState.query"
      @input="event => searchBoxState.refine(event.target.value)"
    />
  </div>
</template>

<script>
import { useSearchBox } from '../compositions';

export default {
  setup() {
    const searchBoxState = useSearchBox();
    console.log('# searchBoxState: ', searchBoxState);
    return { searchBoxState };
  },
};
</script>
