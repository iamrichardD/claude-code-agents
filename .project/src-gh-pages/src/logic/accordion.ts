// Define the shape of the state
export type AccordionState = {
  openIndex: number | null;
};

// Define the interface for the machine itself
export type AccordionMachine = {
  getState: () => AccordionState;
  transition: (event: string, payload: { index: number }) => void;
};

export function createAccordionMachine(itemCount: number): AccordionMachine {
  let state: AccordionState = {
    openIndex: null,
  };

  const transition = (event: string, payload: { index: number }) => {
    if (event === 'TOGGLE') {
      const { index } = payload;

      // Ignore clicks on invalid indexes
      if (index < 0 || index >= itemCount) {
        return;
      }

      if (state.openIndex === index) {
        // The clicked item is already open, so close it.
        state.openIndex = null;
      } else {
        // A new item is clicked, so open it.
        state.openIndex = index;
      }
    }
  };

  const getState = () => {
    return state;
  };

  return {
    transition,
    getState,
  };
}