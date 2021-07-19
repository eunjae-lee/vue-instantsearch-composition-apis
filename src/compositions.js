import { inject, ref, watch } from 'vue';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

const noop = () => {};

export function useConnect(connector, props, initialState) {
  const instantSearchInstance = inject('$_ais_instantSearchInstance');
  const getParentIndex = inject('$_ais_getParentIndex');
  const indexWidget = getParentIndex && getParentIndex();
  const parent = indexWidget || instantSearchInstance;
  const state = ref(initialState);
  let widget = ref(null);

  const addWidget = () => {
    if (widget.value) {
      parent.removeWidgets([widget.value]);
    }
    const createWidget = connector(newState => {
      state.value = newState;
    });
    widget.value = createWidget(props);
    parent.addWidgets([widget.value]);
  };

  addWidget();
  // watch(connector, addWidget);
  // watch(props, addWidget);

  return state;
}

export function useSearchBox(props) {
  return useConnect(connectSearchBox, props, {
    query: '',
    refine: noop,
    clear: noop,
    isSearchStalled: false,
  });
}
