import { describe, it, expect, beforeEach } from 'vitest';
import { createAccordionMachine, AccordionMachine } from '../logic/accordion';

describe('Accordion State Machine', () => {
  let machine: AccordionMachine;

  beforeEach(() => {
    // Re-create the machine before each test to ensure a clean state
    machine = createAccordionMachine(3); // Assuming 3 items for our tests
  });

  it('should initialize with all items closed', () => {
    expect(machine.getState()).toEqual({ openIndex: null });
  });

  it('should open an item when a toggle event occurs', () => {
    machine.transition('TOGGLE', { index: 1 });
    expect(machine.getState()).toEqual({ openIndex: 1 });
  });

  it('should close an already open item when the same item is toggled again', () => {
    // First toggle opens it
    machine.transition('TOGGLE', { index: 1 });
    expect(machine.getState()).toEqual({ openIndex: 1 });

    // Second toggle closes it
    machine.transition('TOGGLE', { index: 1 });
    expect(machine.getState()).toEqual({ openIndex: null });
  });

  it('should close the previously open item when a new item is toggled', () => {
    // First, open item 0
    machine.transition('TOGGLE', { index: 0 });
    expect(machine.getState()).toEqual({ openIndex: 0 });

    // Then, open item 2
    machine.transition('TOGGLE', { index: 2 });
    expect(machine.getState()).toEqual({ openIndex: 2 }); // Item 0 should now be closed
  });

  it('should not open an item if the index is out of bounds', () => {
    machine.transition('TOGGLE', { index: 5 }); // Index 5 is out of bounds for a machine with 3 items
    expect(machine.getState()).toEqual({ openIndex: null });
  });

  it('should handle multiple state transitions correctly', () => {
    machine.transition('TOGGLE', { index: 2 });
    expect(machine.getState()).toEqual({ openIndex: 2 });

    machine.transition('TOGGLE', { index: 0 });
    expect(machine.getState()).toEqual({ openIndex: 0 });

    machine.transition('TOGGLE', { index: 0 });
    expect(machine.getState()).toEqual({ openIndex: null });
  });
});